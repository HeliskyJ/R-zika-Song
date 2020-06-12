const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    artists : {
        type : String,
        required : true
    },
    release : {
        type : Date,
        required : true
    } ,
    position : {
        type : Number,
        required : true
    },
    rankingcountry : {
        type : String,
        required : true
    },
    lenguage : {
        type : String,
        required : true
    },
    frontcover : {
        type : String
    },
    fav : {
        type : Boolean,
        default : 0
    }

});

module.exports = mongoose.model('Song', SongSchema);