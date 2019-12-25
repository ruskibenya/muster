const  User  = require('../../models/user');

//middleware to check if the user is authenticated by querying its token.
// if authenticated execute the "next" method
let auth = (req,res,next) => {
    let token = req.cookies.muster_auth;

    User.findByToken(token,(err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error:true
        });
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }