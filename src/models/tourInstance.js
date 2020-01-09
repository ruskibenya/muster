const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tourInstanceSchema = new Schema({
    tour:{
        type: Schema.Types.ObjectId,
        ref:'Tour',
        required:[true, 'must have a tour'],
    },
    guide:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'must have a guide'],
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    start_time:{
        type: Date,
        required:[true,'must have a starting time']
    }
});
const TourInstance = mongoose.model('TourInstance',tourInstanceSchema);
module.exports = TourInstance;