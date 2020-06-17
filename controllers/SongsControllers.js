const Song = require('../models/song.model');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');


function find(req, res, next){
    Song.findById(req.params.songId)
    .then(song =>{
        req.song = song;
        next();
    }).catch(err => {
        next(err);
    });
}

function index (req, res){
    //Get back songs
    Song.paginate({}, {page: req.query.page || 1, limit: 8, sort: {'position': 1}})
    .then(docs=>{
        res.json(docs);
    }).catch(err => {
        console.log(err);
     res.json({ message: err });
})
}

function create(req, res, next){
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
    }).then(doc =>{
        req.song = doc;
        next();
    }).catch (err => {
        console.log(err);
        next(err);
    })
}

function show(req, res){
    //Specific song
        Song.findById(req.params.songId)
        .then(doc =>{
            let song = {};
            song._id = doc._id;
            song.title =doc.title;
            song.gender = doc.gender;
            song.duration = doc.duration;
            song.artists = doc.artists;
            song.position = doc.position;
            song.rankingcountry = doc.rankingcountry;
            song.lenguage = doc.lenguage;
            song.release = doc.daterelease;
            song.frontcover =doc.frontcover;
            song.fav = doc.fav;
            res.json(song);
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

function multerMiddle(){
    return upload.single('frontcover');
}

function saveImage(req, res){
    if(req.song){
        if(req.body.file){
            const path = req.body.file;
            req.song.updateAvatar(path).then(result => {
                res.json(req.song);
            })
            // uploader(path).then(result => {
            //     console.log(result);
            //     res.json(req.song);
            // }).catch(err => {
            //     console.log(err);
            //     res.json(err);
            // })
        }
    }else{
        res.status(422).json({
            error: req.error || 'Could not save song'
        });
    }
}

module.exports = {index,show,create,destroy,update,multerMiddle, saveImage};
// multerMiddle, 