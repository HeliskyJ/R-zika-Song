const fetch = require('node-fetch');

async function index(req, res){
    let page = req.query.page;
    let url = "http://localhost:5000/song?page="+page ;

        await fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
                res.render('index', {data});
        }).catch(err =>{
        console.log(error);

    });
}
    module.exports = {index}
