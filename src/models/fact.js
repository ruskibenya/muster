const mongoose = require('mongoose');
const ImageSchema = require('../subdocs/image');
const Schema = mongoose.Schema;

const factSchema = new Schema({
    stop: {
        type: Schema.Types.ObjectId,
        ref:'Stop',
        required:[true, 'must have a Stop'],
    },
    description: {
        type: String,
        required: [true,'must have a description']
    },
    images: {
        type:[ImageSchema],
        default:[]
    }
});

const Fact = mongoose.model('Fact',factSchema);
module.exports = { Fact }