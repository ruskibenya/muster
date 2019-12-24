const assert = require('assert');
const User = require('../src/models/user');

describe('Creating users', ()=> {
    it('saves a user', (done) => {
        const dean = new User({ 
            first_name: "Dean",
            last_name: "Shmuel",
            email: "dean@gmail.com",
            password: "12345",
        });
        dean.save()
            .then(() => {
                assert(!dean.isNew);
                done(); 
            })
    })


    it('Default value of tour guide is false', (done) => {
        const dean = new User({ 
            first_name: "Dean",
            last_name: "Shmuel",
            email: "dean@aol.com",
            password: "12345",
        });
        dean.save()
            .then(() => {
                // console.log(dean.tour_guide);
                assert(dean.tour_guide === false);
                done(); 
            })
    })

    // Validation tests
    it('First name is required', (done) => {
        const dean = new User({ 
            last_name: "Shmuel",
            email: "dean@walla.com",
            password: "12345",
        });
        const validationResult = dean.validateSync();
        const { message } = validationResult.errors.first_name;
        assert( message === 'First name is required!');
        done();
    })

})