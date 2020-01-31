// const assert = require('assert');
// const Fact = require('../src/models/fact');
// const Stop = require('../src/models/stop');

// describe('Creating facts', ()=> {
//     it('saves a fact', (done) => {
//         const test_stop = new Stop({ 
//             name: "Jaffa Clock Tower",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         });
//         const coolFact = new Fact({ 
//             stop: test_stop,
//             description: "This is a really cool stop!"
//         });
//         coolFact.save()
//             .then(() => {
//                 assert(!coolFact.isNew);
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
//         const coolFact = new Fact({ 
//             stop: test_stop,
//             description: "This is a really cool stop!"
//         });
//         coolFact.save()
//             .then(() => {
//                 // console.log(coolFact.tour_guide);
//                 assert(Array.isArray(coolFact.images) && coolFact.images.length === 0);
//                 done(); 
//             })
//     })

//     // Validation tests
//     it('Stop is required', (done) => {
//         const coolFact = new Fact({ 
//             description: "This is a really cool stop!"
//         });
//         const validationResult = coolFact.validateSync();
//         const { message } = validationResult.errors.stop;
//         assert( message === 'A Fact must have a Stop!');
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
//         const coolFact = new Fact({ 
//             stop: test_stop,
//         });
//         const validationResult = coolFact.validateSync();
//         const { message } = validationResult.errors.description;
//         assert( message === 'A Fact must have a description!');
//         done();
//     })

// })

// // describe('Reading facts out of the database', () => {
// //     let coolFact;
// //     let test_stop;

// //     // before each test need to populate the db  with instances that we test for
// //     beforeEach((done) => {
// //         test_stop = new Stop({ 
// //             name: "coolFact",
// //             location:{
// //                 longitutde: 32.33,
// //                 latitude: 35.55,
// //                 address: "123 Street",
// //                 city: "Tel Aviv"
// //             }
// //         })
// //         coolFact = new Fact({ 
// //             stop: test_stop,
// //             description: "This is a really cool stop!"
// //         });
// //         coolFact.save()
// //             .then(() => done());
// //     });

// //     it('finds all facts with a first name of coolFact', (done) => {
// //         Fact.findMany({ stop: test_stop })
// //         .then((facts) => {
// //             // _id doesn't work the way you imagine, it's type is ObjectId so need to convert for comparison
// //             assert(facts[0]._id.toString() === coolFact._id.toString());
// //             done();
// //         });
// //     });

// //     it('find a fact with a particular id', (done) => {
// //         Fact.findOne({ _id: coolFact._id })
// //             .then((fact) => {
// //                 console.log(fact)
// //                 assert(fact._name === 'coolFact');
// //                 done();
// //             });
// //     });
// // });

// describe('Updating facts', () => {
//     let coolFact;
//     let test_stop;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         test_stop = new Stop({ 
//             name: "coolFact",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         })
//         coolFact = new Fact({ 
//             stop: test_stop,
//             description: "This is a really cool stop!"
//         });
//         coolFact.save()
//             .then(() => done());
//     });

//     const assertName = (operation, done) => {
//         operation
//             // find all facts
//             .then(() =>  Fact.find({}))
//             .then((facts) => {
//                 assert(facts.length === 1);
//                 assert(facts[0].description === 'This is an even better stop!');
//                 done();
//             })
//     };

//     // best to use if updating multiple properties at different times
//     it('instance type using set n save', (done) => {
//         // when we call set the db is not updated, only in local memory
//         coolFact.set('description', 'This is an even better stop!');
//         assertName(coolFact.save(), done);
//     });

//     // // best when making updates and want to save in one move
//     it('A model instance can update', (done) => {
//         assertName(coolFact.updateOne({ description: 'This is an even better stop!' }), done);
//     });

//     it('A model class can update', (done) => {
//         // for every record in this collection with description This is a really cool stop!, change description to This is a really cool stop!
//         assertName(
//             Fact.updateMany({ description: 'This is a really cool stop!'}, { description: 'This is an even better stop!'}),
//             done
//         );
//     });

//     it('A model class can update one record', (done) => {
//         assertName(
//             Fact.findOneAndUpdate({ description: 'This is a really cool stop!'}, { description: 'This is an even better stop!'}),
//             done
//         )
//     });

//     it('A model class can find a record with an Id and update', (done) => {
//         assertName(
//             Fact.findByIdAndUpdate(coolFact._id, {description: 'This is an even better stop!'}),
//             done
//         )
//     });

// });


// describe('Deleting a fact', () => {
//     let coolFact;
//     let test_stop;

//     // before each test need to populate the db  with instances that we test for
//     beforeEach((done) => {
//         test_stop = new Stop({ 
//             name: "coolFact",
//             location:{
//                 longitutde: 32.33,
//                 latitude: 35.55,
//                 address: "123 Street",
//                 city: "Tel Aviv"
//             }
//         })
//         coolFact = new Fact({ 
//             stop: test_stop,
//             description: "This is a really cool stop!"
//         });
//         coolFact.save()
//             .then(() => done());
//     });

//     it('model instance remove', (done) => {
//         // returns a promise
//         coolFact.remove()
//         // upon promise being returned then execute:
//         // try to find a fact with a first_name of 'coolFact'
//             .then(() => Fact.findOne({ description: 'This is a really cool stop!'}))
//             // upon second promising being returned, query of findOne
//             // run the assertion 
//             .then((fact) => {
//                 assert(fact === null);
//                 done();
//             });


//     });

//     it('class method deleteMany', (done) => {
//         // Remove a bunch of records with some given criteria
//         Fact.deleteMany({ description: 'This is a really cool stop!' })
//             .then(() => Fact.findOne({ description: 'This is a really cool stop!'}))
//             .then((fact) => {
//                 assert(fact === null);
//                 done();
//             });

//     });

//     it('class method findAndDelete', (done) => {
//         Fact.findOneAndDelete({ description: 'This is a really cool stop!' })
//             .then(() => Fact.findOne({ description: 'This is a really cool stop!'}))
//                 .then((fact) => {
//                     assert(fact === null);
//                     done();
//                 });
//     });

//     it('class method findByIdAndDelete', (done) => {
//         Fact.findByIdAndDelete(coolFact._id)
//             .then(() => Fact.findOne({ description: 'This is a really cool stop!'}))
//             .then((fact) => {
//                 assert(fact === null);
//                 done();
//             });
//     });
// }); 