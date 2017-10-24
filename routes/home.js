var secrets = require('../config/secrets');
var system = require('../controller/controller');

module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + connectionString });
    });

    router.route('/users').get(system.userList).post(system.createUser);

    return router;
}
