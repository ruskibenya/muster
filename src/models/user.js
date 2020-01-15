const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SALT_I = 10;
// require('dotenv').config();
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: [true, 'Email is required!'],
        trim:true,
        unique: 1,
    },
    password:{
        type:String,
        required: [true, 'Password is required!' ],
        minlength:5,
    },
    firstName:{
        required: [true, 'First name is required!' ],
        type:String,
        maxlength:100,
    },
    lastName:{
        required: [true, 'Last name is required!' ],
        type:String,
        maxlength:100,
    },
    tourGuide:{
        type: Boolean,
        default: false
    },
    tours: [{
        type: Schema.Types.ObjectId,
        ref: 'Tour'
    }],
    token:{
        type:String,
    }
});

// if the user changes the password, we rehash a new password to our DB
// userSchema.pre('save',function(next){
//     let user = this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(SALT_I,function(err,salt){
//             if(err) return next(err);
//             bcrypt.hash(user.password,salt,function(err,hash){
//                 if(err) return next(err);
//                 user.password = hash;
//                 next();
//             })
//         })
//     } else {
//         next();
//     }
// })

// // compare password to check if the user entered the correct password
// userSchema.methods.comparePassword = function(candidatePassword,cb){
//   bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
//     if(err) return cb(err);
//     cb(null,isMatch)
//   })  
// }

// // just generates a token and saves the token to the user schema
// userSchema.methods.generateToken = function(cb){
//     var user = this;
//     var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
//     user.token = token;
//     user.save(function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }

// // helper method to find a user by a token
// userSchema.statics.findByToken=function(token,cb){
//     var user = this;
//     jwt.verify(token,process.env.SECRET,function(err,decode){
//         //if(err) return cb(err);
//         user.findOne({"_id":decode,"token":token},function(err,user){
//             if(err) return cb(err);
//             cb(null,user);
//         })
//     })
// }

const User = mongoose.model('User', userSchema);
module.exports =  User;