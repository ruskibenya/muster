const mongoose = require('mongoose');
const TourStopSchema = require('../subdocs/tour_stop');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    // author:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required:[true, 'Tour must have an author!']
    // },
    name: {
        type:String,
        required:[true,'Name is required!'],
        unique: true
    },
    city: {
        type: String,
        required: [true, 'City is required!']
    },
    tour_stops:[TourStopSchema],
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;