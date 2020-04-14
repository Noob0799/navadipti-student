const express = require('express');
const router = express.Router();
const Syllabus = require('../models/syllabus');

router.get('/get', (req,res,next) => {  
    Syllabus.find({})
        .then((result) => {
            res.status(201).json({message: "Syllabus fetched successfully!!", data: result});
        })
})

module.exports = router;