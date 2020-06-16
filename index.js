const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {config, engine} = require('express-edge');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true,
    // limit : '50mb'
}));
// import Models
const connection = require('./models');
const Song = require('./models/song.model');
// import routes
const songRoute = require('./routes/api');
app.use('/song', songRoute);

// static files
app.use(express.static('public'));
//sets view engine and add not notation to app.render
app.use(engine);
app.set('views',`${__dirname}/views/`);

//Routes
const dataRoute = require('./routes/wep');
app.use('/', dataRoute);
// app.get('/', (req, res)=>{
//     res.render('index');
// });

//start server 
app.listen('5000', ()=>{
    console.log('server started');
});
