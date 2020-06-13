const Song = require('../models/song.model');

function index (req, res){
    //Get back songs
    // try {
        Song.paginate({}, {page: req.query.page || 1, limit: 8, sort: {'position': 1}})
        .then(docs=>{
            res.json(docs);
        }).catch(err => {
            console.log(err);
        res.json({ message: err });
})
}

function create(req, res){
    //create new song
     Song.create({
        title: req.body.title,
        gender: req.body.gender,
        duration: req.body.duration,
        artists: req.body.artists,
        release: req.body.release,
        position: req.body.position,
        rankingcountry: req.body.rankingcountry,
        lenguage: req.body.lenguage,
        frontcover: req.body.frontcover,
        fav: req.body.fav
    }).then(doc=>{
        res.json(doc);
    }).catch (err => {
        res.json({ message: err });
    })
}

function show(req, res){
    //Specific song
        Song.findById(req.params.songId)
        .then(doc =>{
            res.json(doc);
        }).catch(err =>{
            console.log(err);
            res.json({ message: err });
    })
}


function update(req, res){
    //update song
      Song.findByIdAndUpdate(req.params.songId, {
            title: req.body.title,
            gender: req.body.gender,
            duration: req.body.duration,
            artists: req.body.artists,
            release: req.body.release,
            position: req.body.position,
            rankingcountry: req.body.rankingcountry,
            lenguage: req.body.lenguage,
            frontcover: req.body.frontcover,
            fav: req.body.fav
        }).then(doc =>{
            res.json(doc);
        }).catch (err => {
            console.log(err)
        res.json({ message: err });
    })
}

function destroy(req, res){
    //Remove song

       Song.findByIdAndRemove(req.params.songId).then(doc => {
           res.json(doc);
       }).catch (err => {
        console.log(err);
        res.json({ message: err });
    });
}


module.exports = {index,show,create,destroy,update};