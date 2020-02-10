const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

// es6 implementation of promises
// not sure that we need it though, wasn't getting deprication in lecture 25
// mongoose.Promise = global.Promise;



// before webhook that is executed one time before connection to mongo is made
before((done) => {
    // connect to mongo, explicitly tell which server of mongo (local server)
    // tells to connect to users_test database in our local instance of mongodb
    // check what useNewUrlParser and useUnifiedTopology do, added because of deprication errors
    mongoose.connect('mongodb://localhost/muster_test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    // when mongoose has finished trying  to make a connection 
    mongoose.connection
        // one time, when mongoose emits event 'open', run this code
        .once('open', () => { done() })
        // every time mongoose emits event 'error', run this code
        .on('error', () => (error) => {
            console.warn('Warning', error);
        });

});



// add hook to run before each test runs
 beforeEach((done) => {
     // direct connection to users, tours, stops, etc collections inside db
    const { users, stops, facts, recommendations, tours, tourinstances } = mongoose.connection.collections;
    
    // Mongo can't drop mutliple collections at a time :/
    // drop accepts a callback function to be executed once drop is finished

    // // if testing associations do this: 
    // users.drop(() => {
    //     stops.drop(() => {
    //         facts.drop(() => {
    //             recommendations.drop(() => {
    //                 tours.drop(() => {
    //                     tourinstances.drop(() => {
    //                         // Ready to run the next test!
    //                         // By calling done function, tells mocha to run next test
    //                         done();
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })

    // if testing controller actions do this: 
    users.drop()
    // stops.drop()
    // facts.drop()
    // recommendations.drop()
    tours.drop()
    stops.drop()
    facts.drop()
    recommendations.drop()
    tourinstances.drop()
    // tourinstances.drop()
    .then(() => users.createIndexes({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    // very first time the test suite is run and collection doesn't exist,
    // we will receive an error(can't drop collection that doesn't exist)
    // catch handles the error and allows us to keep going
    .catch(() => done());
 });