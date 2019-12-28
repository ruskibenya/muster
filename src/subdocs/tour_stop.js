const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TourStopSchema = new Schema({
    stop: {
        type: Schema.Types.ObjectId,
        ref:'Stop',
        required:[true, 'must have a Stop'],
    },
    mandatory: {
        type:Boolean,
        default: false
    },
    check_in_time: {
        type: Number,
        default: 0
    },
    order: {
        type:Number,
        required: [true, 'Must have an order']
    },
    facts: [{
        type: Schema.Types.ObjectId,
        ref:'Fact'
    }],
    recommendations: [{
        type: Schema.Types.ObjectId,
        ref:'Recommendation'
    }]
});


module.exports = TourStopSchema;