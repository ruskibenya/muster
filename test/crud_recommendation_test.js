// const assert = require('assert');
// const Recommendation = require('../src/models/recommendation');
// const Stop = require('../src/models/stop');

// describe('Creating recs', ()=> {
//     it('saves a recommendation', (done) => {
//         const test_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const coolRec = new Recommendation({ 
//             stop: test_stop,
//             description: "This is a really cool stop!",
//             location:{
//                 longitutde: 34.33,
//                 latitude: 36.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         coolRec.save()
//             .then(() => {
//                 assert(!coolRec.isNew);
//                 done(); 
//             })
//     })

//     it('Default value of images is empty array', (done) => {
//         const test_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const coolRec = new Recommendation({ 
//             stop: test_stop,
//             description: "This is a really cool stop!",
//             location:{
//                 longitutde: 34.33,
//                 latitude: 36.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         coolRec.save()
//             .then(() => {
//                 // console.log(coolRec.tour_guide);
//                 assert(Array.isArray(coolRec.images) && coolRec.images.length === 0);
//                 done(); 
//             })
//     })

//     // Validation tests
//     it('Stop is required', (done) => {
//         const coolRec = new Recommendation({ 
//             description: "This is a really cool stop!"
//         });
//         const validationResult = coolRec.validateSync();
//         const { message } = validationResult.errors.stop;
//         assert( message === 'A Recommendation must have a Stop!');
//         done();
//     })

//     it('Description is required', (done) => {
//         const test_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const coolRec = new Recommendation({ 
//             stop: test_stop,
//         });
//         const validationResult = coolRec.validateSync();
//         const { message } = validationResult.errors.description;
//         assert( message === 'A Recommendation must have a description!');
//         done();
//     })

//     it('Location is required', (done) => {
//         const test_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const coolRec = new Recommendation({ 
//             stop: test_stop,
//             description: "This is a really cool stop!"
//         });
//         const validationResult = coolRec.validateSync();
//         const { message } = validationResult.errors.location;
//         assert( message === 'A Recommendation must have a location!');
//         done();
//     })

// })

// // describe('Reading recommendations out of the database', () => {
// //     let coolRec;
// //     let test_stop;

// //     // before each test need to populate the db  with instances that we test for
// //     beforeEach((done) => {
// //         test_stop = new Stop({ 
// //             name: "coolRec",
// //             location:{
// //                 longitutde: 32.33,
// //                 latitude: 35.55,
// //                 address: "123 Street",
// //                 city: "Tel Aviv"
// //             }
// //         })
// //         coolRec = new Recommendation({ 
// //             stop: test_stop,
// //             description: "This is a really cool stop!"
// //         });
// //         coolRec.save()
// //             .then(() => done());
// //     });

// //     it('finds all recs with a first name of coolRec', (done) => {
// //         Recommendation.findMany({ stop: test_stop })
// //         .then((recs) => {
// //             // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
// //             assert(recs[0]._id.toString() === coolRec._id.toString());
// //             done();
// //         });
// //     });

// //     it('find a recommendation with a particular id', (done) => {
// //         Recommendation.findOne({ _id: coolRec._id })
// //             .then((recommendation) => {
// //                 console.log(recommendation)
// //                 assert(recommendation._name === 'coolRec');
// //                 done();
// //             });
// //     });
// // });

// describe('Updating recs', () => {
//     let coolRec;
//     let test_stop;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         test_stop = new Stop({ 
//             name: "coolRec",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         })
//         coolRec = new Recommendation({ 
//             stop: test_stop,
//             description: "This is a really cool stop!",
//             location:{
//                 longitutde: 34.33,
//                 latitude: 36.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         coolRec.save()
//             .then(() => done());
//     });

//     const assertName = (operation, done) => {
//         operation
//             // find all recs
//             .then(() =>  Recommendation.find({}))
//             .then((recs) => {
//                 assert(recs.length === 1);
//                 assert(recs[0].description === 'This is an even better stop!');
//                 done();
//             })
//     };

//     // // best to use if updating multiple properties at different times
//     it('instance type using set n save', (done) => {
//         // when we call set the db is not updated, only in local memory
//         coolRec.set('description', 'This is an even better stop!');
//         assertName(coolRec.save(), done);
//     });

//     // // // best when making updates and want to save in one move
//     it('A model instance can update', (done) => {
//         assertName(coolRec.updateOne({ description: 'This is an even better stop!' }), done);
//     });

//     it('A model class can update', (done) => {
//         // for every record in this collection with description This is a really cool stop!, change description to This is a really cool stop!
//         assertName(
//             Recommendation.updateMany({ description: 'This is a really cool stop!'}, { description: 'This is an even better stop!'}),
//             done
//         );
//     });

//     it('A model class can update one record', (done) => {
//         assertName(
//             Recommendation.findOneAndUpdate({ description: 'This is a really cool stop!'}, { description: 'This is an even better stop!'}),
//             done
//         )
//     });

//     it('A model class can find a record with an Id and update', (done) => {
//         assertName(
//             Recommendation.findByIdAndUpdate(coolRec._id, {description: 'This is an even better stop!'}),
//             done
//         )
//     });

// });


// describe('Deleting a recommendation', () => {
//     let coolRec;
//     let test_stop;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         test_stop = new Stop({ 
//             name: "coolRec",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         })
//         coolRec = new Recommendation({ 
//             stop: test_stop,
//             description: "This is a really cool stop!",
//             location:{
//                 longitutde: 34.33,
//                 latitude: 36.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         coolRec.save()
//             .then(() => done());
//     });

//     it('model instance remove', (done) => {
//         // returns a promise
//         coolRec.remove()
//         // upon promise being returned then execute:
//         // try to find a recommendation with a first_name of 'coolRec'
//             .then(() => Recommendation.findOne({ description: 'This is a really cool stop!'}))
//             // upon second promising being returned, query of findOne
//             // run the assertion 
//             .then((recommendation) => {
//                 assert(recommendation === null);
//                 done();
//             });


//     });

//     it('class method deleteMany', (done) => {
//         // Remove a bunch of records with some given criteria
//         Recommendation.deleteMany({ description: 'This is a really cool stop!' })
//             .then(() => Recommendation.findOne({ description: 'This is a really cool stop!'}))
//             .then((recommendation) => {
//                 assert(recommendation === null);
//                 done();
//             });

//     });

//     it('class method findAndDelete', (done) => {
//         Recommendation.findOneAndDelete({ description: 'This is a really cool stop!' })
//             .then(() => Recommendation.findOne({ description: 'This is a really cool stop!'}))
//                 .then((recommendation) => {
//                     assert(recommendation === null);
//                     done();
//                 });
//     });

//     it('class method findByIdAndDelete', (done) => {
//         Recommendation.findByIdAndDelete(coolRec._id)
//             .then(() => Recommendation.findOne({ description: 'This is a really cool stop!'}))
//             .then((recommendation) => {
//                 assert(recommendation === null);
//                 done();
//             });
//     });
// }); 