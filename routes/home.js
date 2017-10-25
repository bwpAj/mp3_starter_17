var secrets = require('../config/secrets');
var system = require('../controller/controller');

module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + connectionString });
    });

    router.route('/users').get(system.userList).post(system.createUser);
    router.route('/users/:id').get(system.filterUserById,system.userDetail).put(system.filterUserById,system.updateUser,system.userDetail).delete(system.filterUserById,system.deleteUser);
    router.route('/tasks').get(system.taskList).post(system.createTask);
    router.route('/tasks/:id').get(system.filterTaskById,system.taskDetail).put(system.filterTaskById,system.updateTask,system.taskDetail).delete(system.filterTaskById,system.deleteTask);

    return router;
};
