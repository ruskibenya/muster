const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url:{
        type:String,
        required:[true,'must have a url']
    },
    name:{
        type:String,
        required:[true,'must have a name']
    }
});


module.exports = ImageSchema;