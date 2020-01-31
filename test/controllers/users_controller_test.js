const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const User = mongoose.model('User');

describe('Users controller', () => {
    it('Post request to /api/users creates a new user', done => {
        User.countDocuments().then(count => {
            request(app)
            .post('/api/users')
            .send({ 
                firstName: "Dean",
                lastName: "Shmuel",
                email: "dean@gmail.com",
                password: "12345"
            })
            .end(() => {
                User.countDocuments().then(newCount => {
                    assert(count + 1 === newCount)
                    done();
                });
            });
        });
    });

    it('Put to /api/users/id edits an existing user', done => {
        const user = new User({
            firstName: "Test",
            lastName: "User",
            email: "t@t.com",
            password: "12345",
            tourGuide: false
        });
        user.save().then(() => {
            request(app)
                .put(`/api/users/${user._id}`)
                .send({ tourGuide: true })
                .end(() => {
                    User.findOne({ email: 't@t.com' })
                    .then(user => {
                        assert(user.tourGuide === true );
                        done();
                    });
                });
        });
    });

    it('DELETE to /api/user/id deletes a user', done => {
        const user = new User({
            firstName: "Test",
            lastName: "User",
            email: "delete@t.com",
            password: "12345",
            tourGuide: false
        });
        user.save().then(() => {
            request(app)
                .delete(`/api/users/${user._id}`)
                .end(() => {
                    User.findOne({ email: 'delete@t.com'})
                    .then((user) => {
                        assert(user === null);
                        done();
                    });
                });
        });
    });

    it('GET to /api/users with lng and lat params finds users in a location', done => {
        // so create two users in totally diferrent locations
        const seattleUser = new User({
            firstName: "Seattle",
            lastName: "Dean",
            email: "seattle@test.com",
            password: "12345",
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiUser = new User({
            firstName: "Miami",
            lastName: "Dean",
            email: "miami@test.com",
            password: "12345",
            geometry:  { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([ seattleUser.save(), miamiUser.save() ])
            .then(() => {
                request(app)
                // here we need to specify the center of the search
                .get('/api/users?lng=-80&lat=25')
                .end((err, response) => {
                    // test to make sure we find some users
                    assert(response.body.length === 1);
                    // test to make sure the max Distance works
                    assert(response.body[0].email === 'miami@test.com');
                    done();
                })
            })
    })


    it('GET to /api/users finds all users', done => {
        // so create two users in totally diferrent locations
        const seattleUser = new User({
            firstName: "Seattle",
            lastName: "Dean",
            email: "seattle@test.com",
            password: "12345",
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiUser = new User({
            firstName: "Miami",
            lastName: "Dean",
            email: "miami@test.com",
            password: "12345",
            geometry:  { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([ seattleUser.save(), miamiUser.save() ])
            .then(() => {
                request(app)
                // here we need to specify the center of the search
                .get('/api/users')
                .end((err, response) => {
                    // console.log(response);
                    // test to make sure we find some users
                    assert(response.body.length === 2);
                    // test to make sure the max Distance works
                    assert(response.body[0].email === 'seattle@test.com');
                    done();
                })
            })
    })

});