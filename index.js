const express = require('express');
const app = express();

//Routes
app.get('/', (req, res)=>{
    res.send('Iniciamos');
});

//start server 
app.listen('3000', ()=>{
    console.log('server started');
});