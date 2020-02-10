// const assert = require('assert');
// const Stop = require('../../src/models/stop');

// describe('Creating stops', ()=> {
//     it('saves a user', (done) => {
//         const first_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => {
//                 assert(!first_stop.isNew);
//                 done(); 
//             })
//     })

//     it('Default value of categories is empty array', (done) => {
//         const first_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => {
//                 assert(Array.isArray(first_stop.categories) && first_stop.categories.length === 0);
//                 done(); 
//             })
//     })

//     it('Default value of images is empty array', (done) => {
//         const first_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => {
//                 assert(Array.isArray(first_stop.images) && first_stop.images.length === 0);
//                 done(); 
//             })
//     })

//     // Validation tests
//     it('Name is required', (done) => {
//         const first_stop = new Stop({ 
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const validationResult = first_stop.validateSync();
//         const { message } = validationResult.errors.name;
//         assert( message === 'Must have a name!');
//         done();
//     })

// })

// describe('Reading stops out of the database', () => {
//     let first_stop;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         first_stop = new Stop({ 
//             name: "Rothschild Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => done());
//     });

//     it('finds all stops with a name of Rothschild Tower', (done) => {
//         Stop.find({ name: 'Rothschild Tower' })
//         .then((stops) => {
//             // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
//             assert(stops[0]._id.toString() === first_stop._id.toString());
//             done();
//         });
//     });

//     it('find a user with a particular id', (done) => {
//         Stop.findOne({ _id: first_stop._id })
//             .then((stop) => {
//                 assert(stop.name === 'Rothschild Tower');
//                 done();
//             });
//     });
// });

// describe('Updating stop', () => {
//     let first_stop;

//     beforeEach((done) => {
//         first_stop = new Stop({ 
//             name: "Rothschild Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => done());
//     });

//     const assertName = (operation, done) => {
//         operation
//             // find all stops
//             .then(() =>  Stop.find({}))
//             .then((stops) => {
//                 assert(stops.length === 1);
//                 assert(stops[0].name === 'Jaffa Clock Tower');
//                 done();
//             })
//     };

//     // best to use if updating multiple properties at different times
//     it('instance type using set n save', (done) => {
//         // when we call set the db is not updated, only in local memory
//         first_stop.set('name', 'Jaffa Clock Tower');
//         assertName(first_stop.save(), done);
//     });

//     // best when making updates and want to save in one move
//     it('A model instance can update', (done) => {
//         assertName(first_stop.updateOne({ name: 'Jaffa Clock Tower' }), done);
//     });

//     it('A model class can update', (done) => {
//         // for every record in this collection with first_name Dean, change first_name to Alex
//         assertName(
//             Stop.updateMany({ name: 'Rothschild Tower'}, { name: 'Jaffa Clock Tower'}),
//             done
//         );
//     });

//     it('A model class can update one record', (done) => {
//         assertName(
//             Stop.findOneAndUpdate({ name: 'Rothschild Tower'}, { name: 'Jaffa Clock Tower'}),
//             done
//         )
//     });

//     it('A model class can find a record with an Id and update', (done) => {
//         assertName(
//             Stop.findByIdAndUpdate(first_stop._id, {name: 'Jaffa Clock Tower'}),
//             done
//         )
//     });

// });


// describe('Deleting a stop', () => {
//     let first_stop;

//     beforeEach((done) => {
//         first_stop = new Stop({ 
//             name: "Rothschild Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         first_stop.save()
//             .then(() => done());
//     });

//     it('model instance remove', (done) => {
//         // returns a promise
//         first_stop.remove()
//         // upon promise being returned then execute:
//         // try to find a user with a first_name of 'Dean'
//             .then(() => Stop.findOne({ name: 'Rothschild Tower'}))
//             // upon second promising being returned, query of findOne
//             // run the assertion 
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });


//     });

//     it('class method deleteMany', (done) => {
//         // Remove a bunch of records with some given criteria
//         Stop.deleteMany({ name: 'Rothschild Tower' })
//             .then(() => Stop.findOne({ name: 'Rothschild Tower'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });

//     });

//     it('class method findAndDelete', (done) => {
//         Stop.findOneAndDelete({ name: 'Rothschild Tower' })
//             .then(() => Stop.findOne({ name: 'Rothschild Tower'}))
//                 .then((user) => {
//                     assert(user === null);
//                     done();
//                 });
//     });

//     it('class method findByIdAndDelete', (done) => {
//         Stop.findByIdAndDelete(first_stop._id)
//             .then(() => Stop.findOne({ name: 'Rothschild Tower'}))
//             .then((user) => {
//                 assert(user === null);
//                 done();
//             });
//     });
// }); 