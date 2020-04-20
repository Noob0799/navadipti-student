const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

router.get('/get/:class&:subject', (req,res,next) => {
    console.log('class:',req.params.class, 'subject:', req.params.subject);
    Homework.find({class: req.params.class, subject: req.params.subject})
        .then(response => {
            if(response) {
                res.status(201).json({message: "Homework fetched successfully!!", data: response});
            } else {
                res.status(201).json({message: "Homework not present!!", data: []});
            }
        })
})

module.exports = router;