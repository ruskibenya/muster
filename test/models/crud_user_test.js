// const assert = require('assert');
// const User = require('../src/models/user');

// describe('Creating users', ()=> {
//     it('saves a user', (done) => {
//         const dean = new User({ 
//             first_name: "Dean",
//             last_name: "Shmuel",
//             email: "dean@gmail.com",
//             password: "12345",
//         });
//         dean.save()
//             .then(() => {
//                 assert(!dean.isNew);
//                 done(); 
//             })
//     })

//     it('Default value of tour guide is false', (done) => {
//         const dean = new User({ 
//             first_name: "Dean",
//             last_name: "Shmuel",
//             email: "dean@aol.com",
//             password: "12345",
//         });
//         dean.save()
//             .then(() => {
//                 // console.log(dean.tour_guide);
//                 assert(dean.tour_guide === false);
//                 done(); 
//             })
//     })

//     // Validation tests
//     it('First name is required', (done) => {
//         const dean = new User({ 
//             last_name: "Shmuel",
//             email: "dean@walla.com",
//             password: "12345",
//         });
//         const validationResult = dean.validateSync();
//         const { message } = validationResult.errors.first_name;
//         assert( message === 'First name is required!');
//         done();
//     })

//     it('Last name is required', (done) => {
//         const dean = new User({ 
//             first_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password: "12345",
//         });
//         const validationResult = dean.validateSync();
//         const { message } = validationResult.errors.last_name;
//         assert( message === 'Last name is required!');
//         done();
//     })

// })

// describe('Reading users out of the database', () => {
//     let dean;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         Dean = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         Dean.save()
//             .then(() => done());
//     });

//     it('finds all users with a first name of Dean', (done) => {
//         User.find({ first_name: 'Dean' })
//         .then((users) => {
//             // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
//             assert(users[0]._id.toString() === Dean._id.toString());
//             done();
//         });
//     });

//     it('find a user with a particular id', (done) => {
//         User.findOne({ _id: Dean._id })
//             .then((user) => {
//                 assert(user.first_name === 'Dean');
//                 done();
//             });
//     });
// });

// describe('Updating records', () => {
//     let dean;

//     beforeEach((done) => {
//         dean = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345",
//             tour_guide: false
//         });
//         dean.save()
//             .then(() => done());
//     });

//     const assertName = (operation, done) => {
//         operation
//             // find all users
//             .then(() =>  User.find({}))
//             .then((users) => {
//                 assert(users.length === 1);
//                 assert(users[0].first_name === 'Alex');
//                 done();
//             })
//     };

//     // best to use if updating multiple properties at different times
//     it('instance type using set n save', (done) => {
//         // when we call set the db is not updated, only in local memory
//         dean.set('first_name', 'Alex');
//         assertName(dean.save(), done);
//     });

//     // best when making updates and want to save in one move
//     it('A model instance can update', (done) => {
//         assertName(dean.updateOne({ first_name: 'Alex' }), done);
//     });

//     it('A model class can update', (done) => {
//         // for every record in this collection with first_name Dean, change first_name to Alex
//         assertName(
//             User.updateMany({ first_name: 'Dean'}, { first_name: 'Alex'}),
//             done
//         );
//     });

//     it('A model class can update one record', (done) => {
//         assertName(
//             User.findOneAndUpdate({ first_name: 'Dean'}, { first_name: 'Alex'}),
//             done
//         )
//     });

//     it('A model class can find a record with an Id and update', (done) => {
//         assertName(
//             User.findByIdAndUpdate(dean._id, {first_name: 'Alex'}),
//             done
//         )
//     });

//     // xit tells mocha, don't run this test
//     it('A user can have their postcount incremented by 1', (done) => {
//         User.updateMany({ first_name: 'Dean'}, { $set: { last_name: "Sellam" }})
//             .then(() => User.findOne({ first_name: 'Dean' }))
//             .then((user) => {
//                 assert(user.last_name === "Sellam");
//                 done();
//             })
//     });

// });


// describe('Deleting a user', () => {
//     let dean;

//     beforeEach((done) => {
//         dean = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345",
//             tour_guide: false
//         });
//         dean.save()
//             .then(() => done());
//     });

//     it('model instance remove', (done) => {
//         // returns a promise
//         dean.remove()
//         // upon promise being returned then execute:
//         // try to find a user with a first_name of 'Dean'
//             .then(() => User.findOne({ first_name: 'Dean'}))
//             // upon second promising being returned, query of findOne
//             // run the assertion 
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });


//     });

//     it('class method deleteMany', (done) => {
//         // Remove a bunch of records with some given criteria
//         User.deleteMany({ first_name: 'Dean' })
//             .then(() => User.findOne({ first_name: 'Dean'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });

//     });

//     it('class method findAndDelete', (done) => {
//         User.findOneAndDelete({ first_name: 'Dean' })
//             .then(() => User.findOne({ first_name: 'Dean'}))
//                 .then((user) => {
//                     assert(user === null);
//                     done();
//                 });
//     });

//     it('class method findByIdAndDelete', (done) => {
//         User.findByIdAndDelete(dean._id)
//             .then(() => User.findOne({ first_name: 'Dean'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });
//     });
// }); 