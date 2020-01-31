const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
    app.get('/api', UsersController.greeting);
    app.post('/api/users', UsersController.create);
}