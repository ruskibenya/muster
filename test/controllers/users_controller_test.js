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
});