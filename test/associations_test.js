const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/models/user');
const Tour = require('../src/models/tour');
const Stop = require('../src/models/stop');
const Fact = require('../src/models/fact');
const Recommendation = require('../src/models/recommendation');
const TourInstance = require('../src/models/tourInstance');
 

describe('Associations', () => {
    let guide, touristOne, touristTwo, coolTour, firstStop, funFact, goodRec, todayCoolTour, today;
    beforeEach((done) => {
        guide = new User({ 
            first_name: "Dean",
            last_name: "Shmuel",
            email: "dean@gmail.com",
            password: "12345",
        });

        touristOne = new User({ 
            first_name: "Ben",
            last_name: "Shmuel",
            email: "ben@gmail.com",
            password: "12345",
        });

        touristTwo = new User({ 
            first_name: "Gabi",
            last_name: "Shmuel",
            email: "gabi@gmail.com",
            password: "12345",
        });

        firstStop = new Stop({ 
            name: "Jaffa Clock Tower",
            location:{
                longitude: 32.33,
                latitude: 35.55,
                address: "123 Street",
                city: "Tel Aviv"
            }
        });

        
        funFact = new Fact({ 
            stop: firstStop,
            description: "This is a really cool fact!"
        });
        
        goodRec = new Recommendation({ 
            stop: firstStop,
            description: "This is a really cool rec!",
            location:{
                longitude: 34.33,
                latitude: 36.55,
                address: "123 Street",
                city: "Tel Aviv"
            }
        });

        secondRec = new Recommendation({ 
            stop: firstStop,
            description: "This is a second rec!",
            location:{
                longitude: 34.33,
                latitude: 36.55,
                address: "123 Street",
                city: "Tel Aviv"
            }
        });
        
        firstTourStop = {
            stop: firstStop,
            order: 1,
            facts: [],
            recommendations: []
        }

        coolTour = new Tour({ 
            name: "Awesome New Tour",
            city: "Tel Aviv",
            // author: guide,
            tour_stops: []
        });

        today = new Date();

        todayCoolTour = new TourInstance({
            tour: coolTour,
            guide: guide,
            start_time: today,
            participants: [touristTwo]
        });
        
        // This is weird, why do I need to push the coolTour into guide.tours manually ????
        todayCoolTour.participants.push(touristOne);
        funFact.stop = firstStop;
        goodRec.stop = firstStop;
        firstTourStop.facts.push(funFact);
        firstTourStop.recommendations.push(goodRec);
        firstTourStop.recommendations.push(secondRec);
        coolTour.tour_stops.push(firstTourStop);
        guide.tours.push(coolTour);

        // if we need to save/update/delete multiple objects 
        // then we don't know which one will return the promise last,  to  call done()
        // so we need to use Promise.all
        Promise.all([ todayCoolTour.save(), guide.save(), coolTour.save(), firstStop.save(), goodRec.save(), secondRec.save() ])
            .then(() => done());
    });

    it('saves a relation between a user and a tour', (done) => {
        // Go into the User collection
        // find a user with the name of Dean
        // load up any associated tours that Dean has
        // then call the function we pass to then / execute the query
        User.findOne({ first_name: 'Dean' })
            // resolves the tours relationship in User model
            .populate('tours')
            .then((user) =>  {
                // console.log(user.tours)
                assert(user.tours[0].name === 'Awesome New Tour');
                done();
            })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({ first_name: 'Dean' })
        .populate({
            // in that user find the tours property and load up all tours
            path: 'tours',
            // inside of all those tours, find the tourstops property and load all associated stops
            // populate: {
            //     path: 'tour_stops',
            //     // model: 'Stop',
            //     // like inception we can go further!
            //     populate: {
            //         path: 'stop',
            //         model: 'Stop'
            //     }
            // },
            populate: {
                path: 'tour_stops.facts',
                model: 'Fact'
            },
            populate: {
                path: 'tour_stops.stop',
                model: 'Stop'
            }
        })
        .then((user) => {
            // console.log(user.tours[0].tour_stops[0].stop);
            console.log(user.tours[0].tour_stops[0]);
            // console.log(user.tours[0])
            // assert(user.first_name === 'Dean' );
            // assert(user.blogPosts[0].title === 'JS is Great');
            // assert(user.blogPosts[0].comments[0].content === 'Congrats on great post!' );
            // assert(user.blogPosts[0].comments[0].user.name === 'Joe' )
            done();
        })
    })
})