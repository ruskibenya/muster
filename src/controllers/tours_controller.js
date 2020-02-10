const Tour = require('../models/tour');


module.exports = {

    create(req, res, next){
        const tourProps = req.body;
        // console.log(userProps);
        
        Tour.create(tourProps)
            .then(tour => res.send(tour))
            .catch(next);
    },

    addTourStops(req, res, next){
        const tourId = req.params.id;
        const tourProps = req.body;

        Tour.findByIdAndUpdate({ _id: tourId }, tourProps)
            .then(() => Tour.findById( {_id: tourId }))
            .then(tour => res.send(tour))
            .catch(next);
    }
}