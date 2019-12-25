const mongoose = require('mongoose');
const ImageSchema = require('../subdocs/image');
const LocationSchema = require('../subdocs/location');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    stop: {
        type: Schema.Types.ObjectId,
        ref:'Stop',
        required:[true, 'A Recommendation must have a Stop!'],
    },
    description: {
        type: String,
        required: [true,'A Recommendation must have a description!']
    },
    images: {
        type:[ImageSchema],
        default:[]
    },
    location: {
        type:LocationSchema,
        required:[true,'A Recommendation must have a location!']
    },
});

const Recommendation = mongoose.model('Recommendation',recommendationSchema);
module.exports = Recommendation;