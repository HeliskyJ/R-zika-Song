const express = require('express');
const router = express.Router();
const Song = require('../models/song.model');

//Get all songs
router.get('/', async(req, res) => {
    try{
        const songs = await Song.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;

// //submit a song
// router.post('/', async(req, res) => {
//     const song = new Song({
//         title : req.body.title,
//         gender : req.body.gender,
//         duration : req.body.duration,
//         artists : req.body.artists,

//     })
})