const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const User  = require('../models/user');


//middlwares
const {auth} = require('./middleware/auth');


//=================================
//           USERS
//=================================

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isGuide: req.user.tour_guide,
        isAuth: true,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.user._id},
        {token:''},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true,
            })
        }
    )
})

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    
    user.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            //userdata:doc,
        })
    });
})

app.post('/api/users/login',(req,res)=>{
    //find email
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,mesage:'email not found'});
        //check password
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'email or password were incorrect'});
            // generate token
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('muster_auth',user.token).status(200).json({
                    loginSuccess:true
                })
            })

        })
    })
    

})

const port = process.env.PORT || 3302;

app.listen(port,()=>{console.log(`server running on ${port}`)});


