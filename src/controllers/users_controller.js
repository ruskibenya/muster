const User = require('../models/user');


module.exports = {
    greeting(req, res){
        res.send({ hi: 'there' });
    },

    // index(req, res, next){
    //    User. 
    // }

    create(req, res, next){
        const userProps = req.body;
        // console.log(userProps);
        
        User.create(userProps)
            .then(user => res.send(user))
            .catch(next);
    }
}