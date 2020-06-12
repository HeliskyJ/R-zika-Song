const connection = require('./models');
const express = require('express');
const app = express();

// import routes
const songRoute = require('./controllers/song');
app.use('/song', songRoute);

//Routes
app.get('/', (req, res)=>{
    res.send('Iniciamos');
});

//start server 
app.listen('3000', ()=>{
    console.log('server started');
});
