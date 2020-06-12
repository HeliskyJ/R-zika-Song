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

//specific song
router.get('/:songId', async(req, res) => {
    try{
        const song = await Song.findById(req.params.songId);
        res.json(song);
    }catch(err){
        res.json({message : err});
    }
});

//update song
router.patch('/:songId', async (req, res) => {
    try{
        const updateSong = await Song.findByIdAndUpdate(req.params.songId, {
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
        res.json(updateSong);
    }catch(err){
        res.json({message : err});
    }
});
module.exports = router;
