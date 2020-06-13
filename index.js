const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import Models
const connection = require('./models');
const Song = require('./models/song.model');
// import routes
const songRoute = require('./routes/api');
app.use('/song', songRoute);

// static files
app.use('/static', express.static(__dirname + '/public'));
//Routes
app.get('/', (req, res)=>{
    res.send('Iniciamos');
});

//start server 
app.listen('4000', ()=>{
    console.log('server started');
});
