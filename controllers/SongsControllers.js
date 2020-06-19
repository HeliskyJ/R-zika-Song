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

//multer upload image
function multerMiddle(){
    return upload.single('frontcover');
}
//middleware create new song and next save image
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

//save image 
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


// async function search(req, res){
//     //search song
//     console.log('palabra'+req.params.search);
// let searching = req.params.search;
// let rank = '0';
//     if(Number(searching)){
//         rank = searching;
//     }else{
//        rank = '0';
//     }

//    await Song.find({ $or:[
//     {'title': new RegExp(searching, 'i') }, {'artists': new RegExp(searching, 'i')}, {'position': rank }
//    ] },function(err, result){

//         if(err){
//             (res.send(err))
//         }
//         else{
//             res.json(result)
//         }
// })
// }

function autocomplete(req, res, next){
    var regex = new RegExp(req.query["term"], 'i');
    let rank = '0';
    if(Number(req.query['term'])){
        rank = req.query['term'];
    }else{
       rank = '0';
    }

    var songfilter = Song.find({$or:[
        {title : regex}, {'title': 1},
        {artists : regex}, {'artists': 1},
        {position : rank}, {'position': 1}
    
    ]}).sort({'position' : 1}).limit(20);
    songfilter.exec(function(err, data){
        
        var result = [];
        if(!err){
            if(data && data.length && data.length > 0){
                data.forEach(song => {
                    let obj = {
                      id : song._id,
                      label : song.title
                    };
                    result.push(obj);
                });
            }
            res.jsonp(result);
        }
    });
}


function search(req, res){
    //Specific song
        Song.findById(req.query.searchID)
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
module.exports = {index,show,create,destroy,update,multerMiddle, saveImage, search, autocomplete};
// multerMiddle, 