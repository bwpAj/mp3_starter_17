// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    deadline:{
        type:Date
    },
    completed:{
        type:Boolean,
        default:false
    },
    //The _id field of the user this task is assigned to - default ""
    assignedUser:{
        type:String,
        default:''
    },
    //The name field of the user this task is assigned to - default "unassigned"
    assignedUserName:{
        type:String,
        default:'unassigned'
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);
