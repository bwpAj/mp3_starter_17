
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
    var condition = {};
    var _reqParam = req.query||{};
    var query = User.find(condition);
    if(_reqParam){
        var _where = _reqParam.where;
        var _sort = _reqParam.sort;
        var _select = _reqParam.select;
        var _skip = _reqParam.skip;
        var _limit = _reqParam.limit;
        var _count = _reqParam.count == 'true'?true:false;
        if(_where){
            condition = Object.assign(condition,JSON.parse(_where));
            query = User.find(condition);
        }
        if(_sort){
            query.sort(JSON.parse(_sort));
        }
        if(_select){
            _select = JSON.parse(_select);
            for(var key in _select){
                if(_select[key] == 1){
                    delete _select[key];
                }
            }
            query = User.find(condition,_select);
        }
        if(_skip){
            query.skip(parseInt(_skip));
        }
        if(_limit){
            query.limit(parseInt(_limit));
        }
        if(_count){
            query.count(condition, function (err, total) {
                if(!err){
                    dealReturnFn(res,{message:'ok',data:{total:total}})
                }else{
                    dealReturnFn(res,{message:getErrorMessage(err),data:{}})
                }
            })
        }else{
            query.exec(function(err,users){
                if(!err){
                    dealReturnFn(res,{message:'ok',data:users})
                }else{
                    dealReturnFn(res,{message:getErrorMessage(err),data:{}})
                }
            })
        }
    }else{
        dealReturnFn(res,{message:'no param',data:{}})
    }

};

/**
 * create user
 * @param req
 * @param res
 */
exports.createUser = function(req, res){
    console.log('---------createUser------------'+new Date());
    var _body = req.body;
    if(_body){
        var _user = new User(_body);
        _user.save(function(err,user){
            if(!err){
                res.status(201);
                dealReturnFn(res,{message:'ok',data:user})
            }else{
                res.status(500);
                dealReturnFn(res,{message:getErrorMessage(err),data:{}})
            }
        })
    }else{
        dealReturnFn(res,{message:'no param',data:{}})
    }
};

/**
 * before get User
 * @param req
 * @param res
 * @param next
 */
exports.filterUserById = function(req,res,next){
    console.log('---------filterUserById------------'+new Date());
    var _id = req.params.id;
    User.findById(_id).exec(function(err,user){
        if(err || !user){
            res.status(404);
            dealReturnFn(res,{message:!user?'can not find user by id'+_id:err?getErrorMessage(err||{}):'',data:{}})
        }else{
            next()
        }
    })
};

/**
 * return user detail
 * @param req
 * @param res
 */
exports.userDetail = function(req, res){
    console.log('---------userDetail------------'+new Date());
    var _id = req.params.id;
    User.findById(_id).exec(function(err,user){
        if(err || !user){
            res.status(404);
            dealReturnFn(res,{message:getErrorMessage(err),data:{}})
        }else{
            dealReturnFn(res,{message:'ok',data:user})
        }
    })
};



/**
 * update user
 * @param req
 * @param res
 * @param next
 */
exports.updateUser = function(req, res,next){
    console.log('---------updateUser------------'+new Date());
    var _id = req.params.id;
    var _body = req.body;
    _body.dateCreated = new Date();
    User.findOneAndUpdate({_id:_id},
        _body,
        {'upsert': 'true'},
        function (err, user) {
            console.log('======',user);
            if(err){
                res.status(404);
                dealReturnFn(res,{message:getErrorMessage(err),data:{}})
            }else{
                next()
            }
        }
    );
};

/**
 * delete user
 * @param req
 * @param res
 */
exports.deleteUser = function(req,res){
    console.log('---------deleteUser------------'+new Date());
    var id = req.params.id;
    User.remove({"_id":id}).exec(function (err) {
        if (err) {
            res.status(404);
            dealReturnFn(res,{message:getErrorMessage(err),data:{}})
        } else {
            dealReturnFn(res,{message:'ok',data:{}})
        }
    });
};




/**
 * return taskList
 * @param req
 * @param res
 */
exports.taskList = function(req, res){
    console.log('---------taskList------------'+new Date());
    var condition = {};
    var _reqParam = req.query||{};
    var query = Task.find(condition);
    if(_reqParam){
        var _where = _reqParam.where;
        var _sort = _reqParam.sort;
        var _select = _reqParam.select;
        var _skip = _reqParam.skip;
        var _limit = _reqParam.limit;
        var _count = _reqParam.count == 'true'?true:false;
        if(_where){
            condition = Object.assign(condition,JSON.parse(_where));
            query = Task.find(condition);
        }
        if(_sort){
            query.sort(JSON.parse(_sort));
        }
        if(_select){
            _select = JSON.parse(_select);
            for(var key in _select){
                if(_select[key] == 1){
                    delete _select[key];
                }
            }
            query = Task.find(condition,_select);
        }
        if(_skip){
            query.skip(parseInt(_skip));
        }
        if(_limit){
            query.limit(parseInt(_limit));
        }
        if(_count){
            query.count(condition, function (err, total) {
                if(!err){
                    dealReturnFn(res,{message:'ok',data:{total:total}})
                }else{
                    res.status(500);
                    dealReturnFn(res,{message:getErrorMessage(err),data:{}})
                }
            })
        }else{
            query.exec(function(err,tasks){
                if(!err){
                    dealReturnFn(res,{message:'ok',data:tasks})
                }else{
                    dealReturnFn(res,{message:getErrorMessage(err),data:{}})
                }
            })
        }
    }else{
        dealReturnFn(res,{message:'no param',data:{}})
    }
};

/**
 * create createTask
 * @param req
 * @param res
 */
exports.createTask = function(req, res){
    console.log('---------createTask------------'+new Date());
    var _body = req.body;
    if(_body){
        var _task = new Task(_body);
        _task.save(function(err,task){
            if(!err){
                res.status(201);
                dealReturnFn(res,{message:'ok',data:task})
            }else{
                res.status(500);
                dealReturnFn(res,{message:getErrorMessage(err),data:{}})
            }
        })
    }else{
        dealReturnFn(res,{message:'no param',data:{}})
    }
};


/**
 * before get Task
 * @param req
 * @param res
 * @param next
 */
exports.filterTaskById = function(req,res,next){
    console.log('---------filterTaskById------------'+new Date());
    var _id = req.params.id;
    Task.findById(_id).exec(function(err,task){
        if(err || !task){
            res.status(404);
            dealReturnFn(res,{message:!task?'can not find task by id'+_id:err?getErrorMessage(err||{}):'',data:{}})
        }else{
            next()
        }
    })
};

/**
 * return task detail
 * @param req
 * @param res
 */
exports.taskDetail = function(req, res){
    console.log('---------taskDetail------------'+new Date());
    var _id = req.params.id;
    Task.findById(_id).exec(function(err,task){
        if(err || !task){
            res.status(404);
            dealReturnFn(res,{message:getErrorMessage(err),data:{}})
        }else{
            dealReturnFn(res,{message:'ok',data:task})
        }
    })
};



/**
 * update task
 * @param req
 * @param res
 * @param next
 */
exports.updateTask = function(req, res,next){
    console.log('---------updateTask------------'+new Date());
    var _id = req.params.id;
    var _body = req.body;
    _body.deadline = new Date();
    Task.findOneAndUpdate({_id:_id},
        _body,
        {'upsert': 'true'},
        function (err, task) {
            console.log('======',task);
            if(err){
                res.status(404);
                dealReturnFn(res,{message:getErrorMessage(err),data:{}})
            }else{
                next()
            }
        }
    );
};

/**
 * delete task
 * @param req
 * @param res
 */
exports.deleteTask = function(req,res){
    console.log('---------deleteUser------------'+new Date());
    var id = req.params.id;
    Task.remove({"_id":id}).exec(function (err) {
        if (err) {
            res.status(404);
            dealReturnFn(res,{message:getErrorMessage(err),data:{}})
        } else {
            dealReturnFn(res,{message:'ok',data:{}})
        }
    });
};

/**
 * deal res return
 */
function dealReturnFn(res,arg){

    res.json(arg);
}

/**
 * get error message
 * @param err
 * @returns {*}
 */
function getErrorMessage (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else if (err.message) {
        return err.message;
    } else {
        return 'Unkown server error';
    }
}