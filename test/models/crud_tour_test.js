// const assert = require('assert');
// const Tour = require('../src/models/tour');
// const User = require('../src/models/user');

// describe('Creating tours', ()=> {
//     it('saves a tour', (done) => {
//         guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         const first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             author: guide,
//             city: "Tel Aviv"
//         });
//         first_tour.save()
//             .then(() => {
//                 assert(!first_tour.isNew);
//                 done(); 
//             })
//     })

//     // it('Name must be unique', (done) => {
//     //     guide = new User({ 
//     //         first_name: 'Dean',
//     //         last_name: "Shmuel",
//     //         email: "dean@lewagon.com",
//     //         password:  "12345"
//     //     });
//     //     const first_tour = new Tour({ 
//     //         name: "Awesome New Tour",
//     //         author: guide,
//     //         city: "Tel Aviv"
//     //     });
//     //     const second_tour = new Tour({ 
//     //         name: "Awesome New Tour",
//     //         author: guide,
//     //         city: "Boston"
//     //     });
//     //     first_tour.save()
//     //         .then(() => {
//     //             const validationResult = first_tour.validateSync();
//     //             const { message } = validationResult.errors.name;
//     //             assert( message === 'Must have a name!');

//     //             done(); 
//     //         })
//     // })


//     // // Validation tests
//     it('Author is required', (done) => {
//         const guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         const first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             city: "Tel Aviv"
//         });
//         const validationResult = first_tour.validateSync();
//         const { message } = validationResult.errors.author;
//         assert( message === 'Tour must have an author!');
//         done();
//     })

//     it('City is required', (done) => {
//         const guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         const first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             author: guide,
//         });
//         const validationResult = first_tour.validateSync();
//         const { message } = validationResult.errors.city;
//         assert( message === 'City is required!');
//         done();
//     })

//     it('Name is required', (done) => {
//         const guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         const first_tour = new Tour({ 
//             city: "Tel Aviv",
//             author: guide,
//         });
//         const validationResult = first_tour.validateSync();
//         const { message } = validationResult.errors.name;
//         assert( message === 'Name is required!');
//         done();
//     })

// })

// describe('Reading tours out of the database', () => {
//     let first_tour;
//     let guide;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             city: "Tel Aviv",
//             author: guide,
//         });
//         first_tour.save()
//             .then(() => done());
//     });

//     it('finds all tours with a name of Awesome New Tour', (done) => {
//         Tour.find({ name: 'Awesome New Tour' })
//         .then((tours) => {
//             // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
//             assert(tours[0]._id.toString() === first_tour._id.toString());
//             done();
//         });
//     });

//     it('find a user with a particular id', (done) => {
//         Tour.findOne({ _id: first_tour._id })
//             .then((tour) => {
//                 assert(tour.name === 'Awesome New Tour');
//                 done();
//             });
//     });
// });

// describe('Updating tour', () => {
//     let first_tour;
//     let guide;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             city: "Tel Aviv",
//             author: guide,
//         });
//         first_tour.save()
//             .then(() => done());
//     });

//     const assertName = (operation, done) => {
//         operation
//             // find all tours
//             .then(() =>  Tour.find({}))
//             .then((tours) => {
//                 assert(tours.length === 1);
//                 assert(tours[0].name === 'Awesome New Tour');
//                 done();
//             })
//     };

//     // best to use if updating multiple properties at different times
//     it('instance type using set n save', (done) => {
//         // when we call set the db is not updated, only in local memory
//         first_tour.set('name', 'Awesome New Tour');
//         assertName(first_tour.save(), done);
//     });

//     // best when making updates and want to save in one move
//     it('A model instance can update', (done) => {
//         assertName(first_tour.updateOne({ name: 'Awesome New Tour' }), done);
//     });

//     it('A model class can update', (done) => {
//         // for every record in this collection with first_name Dean, change first_name to Alex
//         assertName(
//             Tour.updateMany({ name: 'Awesome New Tour'}, { name: 'Awesome New Tour'}),
//             done
//         );
//     });

//     it('A model class can update one record', (done) => {
//         assertName(
//             Tour.findOneAndUpdate({ name: 'Awesome New Tour'}, { name: 'Awesome New Tour'}),
//             done
//         )
//     });

//     it('A model class can find a record with an Id and update', (done) => {
//         assertName(
//             Tour.findByIdAndUpdate(first_tour._id, {name: 'Awesome New Tour'}),
//             done
//         )
//     });

// });


// describe('Deleting a tour', () => {
//     let first_tour;
//     let guide;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         guide = new User({ 
//             first_name: 'Dean',
//             last_name: "Shmuel",
//             email: "dean@lewagon.com",
//             password:  "12345"
//         });
//         first_tour = new Tour({ 
//             name: "Awesome New Tour",
//             city: "Tel Aviv",
//             author: guide,
//         });
//         first_tour.save()
//             .then(() => done());
//     });

//     it('model instance remove', (done) => {
//         // returns a promise
//         first_tour.remove()
//         // upon promise being returned then execute:
//         // try to find a user with a first_name of 'Dean'
//             .then(() => Tour.findOne({ name: 'Awesome New Tour'}))
//             // upon second promising being returned, query of findOne
//             // run the assertion 
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });


//     });

//     it('class method deleteMany', (done) => {
//         // Remove a bunch of records with some given criteria
//         Tour.deleteMany({ name: 'Awesome New Tour' })
//             .then(() => Tour.findOne({ name: 'Awesome New Tour'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });

//     });

//     it('class method findAndDelete', (done) => {
//         Tour.findOneAndDelete({ name: 'Awesome New Tour' })
//             .then(() => Tour.findOne({ name: 'Awesome New Tour'}))
//                 .then((user) => {
//                     assert(user === null);
//                     done();
//                 });
//     });

//     it('class method findByIdAndDelete', (done) => {
//         Tour.findByIdAndDelete(first_tour._id)
//             .then(() => Tour.findOne({ name: 'Awesome New Tour'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });
//     });
// }); 