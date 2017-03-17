var mongoose = require('mongoose'),
    Schema = mongoose.Schema
var User = require('./users')

var Task = new Schema ({
    name: {type:String, default: 'Default Task Name'},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isCompleted : {type : Boolean, default : false},
    createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', Task);