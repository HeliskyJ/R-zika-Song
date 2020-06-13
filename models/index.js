const mongoose = require('mongoose');
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false},
    (error) => {
        if(!error){
        console.log('Connected to DB');    
    }else{
        console.log('Error connecting to database');    
        }
    });
