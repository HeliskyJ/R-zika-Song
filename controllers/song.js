const express = require('express');
const router = express.Router();
const Song = require('../models/song.model');

//Get all songs
router.get('/', async(req, res) => {
    try{
        const songs = await Song.find();
        res.json(songs);
    }catch(err){
        res.json({message:err});
    }
});

// //submit a song
router.post('/', async(req, res) => {
    const song = new Song({
        title : req.body.title,
        gender : req.body.gender,
        duration : req.body.duration,
        artists : req.body.artists,
        release : req.body.release,
        position : req.body.position,
        rankingcountry : req.body.rankingcountry,
        lenguage : req.body.lenguage,
        frontcover : req.body.frontcover,
        fav : req.body.fav
    });
    try{
        const savedSong = await song.save();
        res.json(savedSong);
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;
