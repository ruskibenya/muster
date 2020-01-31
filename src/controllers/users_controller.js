const User = require('../models/user');


module.exports = {
    greeting(req, res){
        res.send({ hi: 'there' });
    },

    index(req, res, next){
        // if search with lng && lat params, will find users near a given spot
        // will come from query in the https request, params but will do this through get request!
        // lng, lat will be the center point, from the user making the request
        if (req.query.lng && req.query.lat){
            const { lng, lat } = req.query;
            const point = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
    
            // give me all the drivers near this one point
            User.aggregate([
                {
                    $geoNear: {
                        near: point,
                        spherical: true,
                        // max distance is in meters, so 200,000 -> 200km
                        maxDistance: 200000,
                        distanceField: 'dist.calculated'
                    }
                }
            ])
            .then(users => res.send(users))
            .catch(next);
        } else {
            User.find()
            .then(users => res.send(users))
            .catch(next);
        }
    },

    create(req, res, next){
        const userProps = req.body;
        // console.log(userProps);
        
        User.create(userProps)
            .then(user => res.send(user))
            .catch(next);
    },
    
    edit(req, res, next){
        const userId = req.params.id;
        const userProps = req.body;

        User.findOneAndUpdate({ _id: userId}, userProps)
         .then(() => User.findById({ _id: userId }))
         .then(user => res.send(user))
         .catch(next);
    },

    delete(req, res, next){
        const userId = req.params.id;
        User.findByIdAndRemove({ _id: userId })
        .then((user) => res.status(204).send(user))
        .catch(next);
    }
    
}