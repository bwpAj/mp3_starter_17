
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Task = mongoose.model('Task'),
    http = require('http');



/**
 * return userList
 * @param req
 * @param res
 */
exports.userList = function(req, res){
    console.log('---------userList------------'+new Date());
    User.find().exec(function(err,users){
        console.log(users);   
        dealReturnFn(res,{message:'ok',data:users})
    })
};

/**
 * create user
 * @param req
 * @param res
 */
exports.createUser = function(req, res){
    console.log('---------createUser------------'+new Date());

    dealReturnFn(res,{message:'ok',data:{}})
};


/**
 * return taskList
 * @param req
 * @param res
 */
exports.taskList = function(req, res){
    console.log('---------taskList------------'+new Date());

    dealReturnFn(res,{message:'ok',data:{}})
};

/**
 * create user
 * @param req
 * @param res
 */
exports.createTask = function(req, res){
    console.log('---------createTask------------'+new Date());

    dealReturnFn(res,{message:'ok',data:{}})
};


/**
 * deal res return
 */
function dealReturnFn(res,arg){

    res.json(arg);
}
