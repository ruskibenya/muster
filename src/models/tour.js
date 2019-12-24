const mongoose = require('mongoose');
const TourStopSchema = require('../subdocs/tour_stop');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Each stop must have an author'],
    },
    name: {
        type:String,
        required:[true,'Name is required'],
        unique: 1
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    tour_stops:[TourStopSchema],
});

const Tour = mongoose.model('Tour',tourSchema);
module.exports = { Tour }