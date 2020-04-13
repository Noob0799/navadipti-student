const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

router.get('/get', (req,res,next) => {
    Homework.find({})
        .then((result) => {
            res.status(201).json({message: "Homework fetched successfully!!", data: result});
        })
})

module.exports = router;