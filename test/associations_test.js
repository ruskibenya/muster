const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/models/user');
const Tour = require('../src/models/tour');
const Stop = require('../src/models/stop');
const Fact = require('../src/models/fact');
const Recommendation = require('../src/models/recommendation');
 

describe('Associations', () => {
    let dean, coolTour, firstStop, funFact, goodRec;
    beforeEach((done) => {
        dean = new User({ 
            first_name: "Dean",
            last_name: "Shmuel",
            email: "dean@gmail.com",
            password: "12345",
        });

        firstStop = new Stop({ 
            name: "Jaffa Clock Tower",
            location:{
                longitutde: 32.33,
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
                longitutde: 34.33,
                latitude: 36.55,
                address: "123 Street",
                city: "Tel Aviv"
            }
        });

        coolTour = new Tour({ 
            name: "Awesome New Tour",
            city: "Tel Aviv",
            author: dean,
        });
    
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;


        // if we need to save/update/delete multiple objects 
        // then we don't know which one will return the promise last,  to  call done()
        // so we need to use Promise.all
        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        // Go into the User collection
        // find a user with the name of Joe
        // load up any associated blogPosts that Joe has
        // then call the function we pass to then / execute the query
        User.findOne({ name: 'Joe' })
            // resolves the blogPosts relationship in User model
            .populate('blogPosts')
            .then((user) =>  {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
        .populate({
            // in that user find the blogPosts property and load up all blogPosts
            path: 'blogPosts',
            // inside of all those blogPosts, find the comments property and load all associated comments
            populate: {
                path: 'comments',
                model: 'comment',
                // like inception we can go further!
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe' );
            assert(user.blogPosts[0].title === 'JS is Great');
            assert(user.blogPosts[0].comments[0].content === 'Congrats on great post!' );
            assert(user.blogPosts[0].comments[0].user.name === 'Joe' )
            done();
        })
    })
})