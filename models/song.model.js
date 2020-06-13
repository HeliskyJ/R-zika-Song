const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('../models/Uploader');

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
//upload image
SongSchema.methods.updateAvatar = function(path){
return uploader(path)
.then(secure_url => this.saveCoverUrl(secure_url));
}
//save image
SongSchema.methods.saveCoverUrl = function(secureUrl){
    this.frontcover = secureUrl;
    return this.save();
}
SongSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Song', SongSchema);