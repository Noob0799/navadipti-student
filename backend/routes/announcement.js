const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');

router.get('/get', (req,res,next) => {
    Announcement.find({})
        .then((result) => {
            res.status(201).json({message: "Announcements fetched successfully!!", data: result});
        })
})

module.exports = router;