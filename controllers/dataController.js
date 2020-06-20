const fetch = require('node-fetch');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');
const swal = require('sweetalert');


async function index(req, res){
    let page = req.query.page;
    let url = "http://localhost:5000/song?page="+page ;

        await fetch(url)
        .then(res => res.json())
        .then(data => {
                res.render('index', {data});
        }).catch(err =>{
        console.log(error);

    });
}
//upload
function multerMiddle(){
  return upload.single('frontcover');
}

 async function create(req, res){
   let file = req.file
    let song  = req.body;

    const body = {
      'title' : song.title,
      'gender' : song.gender,
      'duration' : song.duration,
      'artists' : song.artists,
      'release' : song.release,
      'position' : song.position,
      'lenguage' : song.lenguage,
      'rankingcountry' : song.rankingcountry,
      'file' : file.path
    };
 await fetch('http://localhost:5000/song/', {
            method : 'post',
            headers : {'content-type': 'application/json; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'},
            body :  JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
          res.redirect('/show/'+json._id);
        //  res.render('index', {respon : 'success'});
        })
        .catch(error => {
          res.render('index', {respon : 'wrong'});
            console.log(error);
        });
}

function show(req, res){
  //specific song
  let idsong = req.params.songId;
  let url = "http://localhost:5000/song/"+idsong ;

      fetch(url)
      .then(res => res.json())
      .then(data => {
             res.render('show',{data})
      }).catch(err =>{
      console.log(error);

  });
}

function edit(req, res){
    //specific data song
    let idsong = req.params.songId;
    let url = "http://localhost:5000/song/"+idsong ;
  
        fetch(url)
        .then(res => res.json())
        .then(data => {
               res.render('edit',{data})
        }).catch(err =>{
        console.log(error);
  
    });
  }

 async function update(req, res){
  //  let file;
  //  let song  = req.body;
  //  if(!undefined){
  //    file = req.file
  //  }else{
  //    file = req.body.frontcover
  //  }
  let song = req.body;
  let idsong = req.params.songId;
    const body = {
      '_id' :song._id,
      'title' : song.title,
      'gender' : song.gender,
      'duration' : song.duration,
      'artists' : song.artists,
      'release' : song.release,
      'position' : song.position,
      'lenguage' : song.lenguage,
      'rankingcountry' : song.rankingcountry,
      'frontcover' : song.frontcover,
      'fav' : song.fav
      // 'file' : file.path
    };
 await fetch('http://localhost:5000/song/'+idsong, {
            method : 'patch',
            headers : {'content-type': 'application/json; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'},
            body :  JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
          res.redirect('/show/'+idsong);
          // res.sendStatus(200)
        //  res.render('index', {respon : 'success'});
        })
        .catch(error => {
          res.render('index', {respon : 'wrong'});
            console.log(error);
        });
  }

  function remove(req, res){
        //specific data song
        let idsong = req.params.songId;
        let url = "http://localhost:5000/song/"+idsong ;
      
            fetch(url)
            .then(res => res.json())
            .then(data => {
                   res.render('remove',{data})
            }).catch(err =>{
            console.log(error);     
        });
  }

  async function destroy(req, res){
    let songId = req.params.songId;
   await fetch('http://localhost:5000/song/'+songId, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => {
      res.redirect('/?page=1')
    }).catch(error => {
      res.render('index', {respon : 'wrong'});
      console.log(error);
    });
  }


function search(req, res){
    //specific song
    let idsong = req.query.searchID;
    console.log(idsong);
    let url = "http://localhost:5000/song/search/buscar?searchID="+idsong ;
  
        fetch(url)
        .then(res => res.json())
        .then(data => {
               res.render('show',{data})
        }).catch(err =>{
        console.log(error);
  
    });
  }


  // function autocomplete(req, res, next){
  //   var regex = new RegExp(req.query["term"], 'i');

  //   var songfilter = Song.find({title : regex}, {'name': 1}).sort({'position' : 1}).limit(20);
  //   songfilter.exec(function(err, data){
  //       console.log(data);
  //       var result = [];
  //       if(!err){
  //           if(data && data.length && data.length > 0){
  //               data.forEach(song => {
  //                   let obj = {
  //                     id : song._id,
  //                     label : song.title
  //                   };
  //                   result.push(obj);
  //               });
  //           }
  //           res.jsonp(result);
  //       }
  //   });
// }
    module.exports = {index, create, multerMiddle, show, edit, update, remove, destroy, search}
