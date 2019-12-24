const mongoose = require('mongoose');
const LocationSchema = require('../subdocs/location');
const ImageSchema = require('../subdocs/image');
const Schema = mongoose.Schema;

const stopSchema = new Schema({
    name:{
        type: String,
        required:[true,'must have a name']
    },
    location:LocationSchema,
    categories: {
        type: [String],
        default:[]
    },
    images:{
        type:[ImageSchema],
        default:[]
    }
});

const Stop = mongoose.model('Stop',stopSchema);
module.exports = { Stop }