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
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/js', express.static(__dirname +'/node_modules/bootstrap-autocomplete/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/sweetalert/dist'));
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
