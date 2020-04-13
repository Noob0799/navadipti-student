const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/get', (req,res,next) => {
    Event.find({})
        .then((result) => {
            res.status(201).json({message: "Events fetched successfully!!", data:result});
        })
})

module.exports = router;