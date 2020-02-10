const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Tour = mongoose.model('Tour');
const User = mongoose.model('User');
// const Stop = mongoose.model('Stop');

describe('Tours controller', () => {
    it('Post request to /api/tours creates a new tour', done => {
        const  guide = new User({ 
            first_name: 'Dean',
            last_name: "Shmuel",
            email: "dean@lewagon.com",
            password:  "12345"
        });
        Tour.countDocuments().then(count => {
            request(app)
            .post('/api/tours')
            .send({ 
                name: "Awesome New Tour",
                author: guide,
                city: "Tel Aviv"
            })
            .end(() => {
                Tour.countDocuments().then(newCount => {
                    assert(count + 1 === newCount)
                    done();
                });
            });
        });
    });

    // it('Put to /api/tours/id edits and', done => {
    //     const  guide = new User({ 
    //         first_name: 'Dean',
    //         last_name: "Shmuel",
    //         email: "dean@lewagon.com",
    //         password:  "12345"
    //     });

    //     const firstStop = new Stop({ 
    //         name: "Jaffa Clock Tower",
    //         location:{
    //             longitude: 32.33,
    //             latitude: 35.55,
    //             address: "123 Street",
    //             city: "Tel Aviv"
    //         }
    //     });

    //     const secStop = new Stop({ 
    //         name: "Jaffa Falafel",
    //         location:{
    //             longitude: 32.63,
    //             latitude: 35.65,
    //             address: "123 Falafel St",
    //             city: "Tel Aviv"
    //         }
    //     });

    //     const firstTourStop = {
    //         stop: firstStop,
    //         order: 1,
    //         facts: [],
    //         recommendations: []
    //     }

    //     const secondTourStop = {
    //         stop: secStop,
    //         order: 1,
    //         facts: [],
    //         recommendations: []
    //     }

    //     const tour =  new Tour({ name: 'Rad Tour', city: "Boston", author: guide });
    //     tour.save().then(() => {
    //         request(app)
    //             .put(`/api/tours/${tour._id}/addStops`)
    //             .send({tourStops: [firstTourStop, secondTourStop] })
    //             .end(() => {
    //                 Tour.findOne({ name: 'Rad Tour'  })
    //                 .then(tour => {
    //                     assert(tour.tourStops.countDocuments() === 2 );
    //                     done();
    //                 })
    //             })
    //     })
    // })

});