const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    longitude:{
        type:Number,
        required:[true,'must have a longitude']
    },
    latitude: {
        type:Number,
        required:[true,'must have a latitue']
    },
    address:{
        type:String,
        required:[true,'must have an address']
    },
    city:{
        type:String,
        required:[true,'must have a city']
    },
});


module.exports = { LocationSchema }