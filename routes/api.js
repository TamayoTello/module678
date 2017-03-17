var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Task =require('../models/tasksList');

/* GET home page. */
router.get('/user', function(req, res) {
    res.json(req.user);
});

router.get('/task/:filterState', function(req, res) {
    var filterState = req.params.filterState;
    console.log(filterState)

    if(req.user === undefined) {
        res.redirect('/')
    }

    if(filterState === 'all') {
        var userId = req.user._id;
        console.log(userId)
        User.findById(userId).populate('tasks').exec(function(err, tasks) {
            if (err) {
                console.log(err)
                return;
            }
            console.log("Success");
            res.json(tasks.tasks);
        })
    }

    if(filterState === 'undone') {
        User.findById(userId).populate('tasks').exec(function(err, tasks) {
            if (err) {
                console.log(err)
            }
            else {
                var undoneData = {
                    owner: req.user._id,
                    isDone: false
                }
                Task.find(undoneData).exec(function(err, undoneTask) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(undoneTask)
                    }
                })
            }
        })
    }

    if(filterState === 'finished') {
        User.findById(userId).populate('tasks').exec(function(err, tasks) {
            if (err) {
                console.log(err)
            }
            else {
                var finishedData = {
                    owner: req.user._id,
                    isDone: true
                }
                Task.find(finishedData).exec(function(err, finishedTask) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(finishedTask)
                    }
                })
            }
        })
    }


});

router.post('/:userId/task', function(req, res) {
    var userId = req.params.userId;
    var task = new Task ()

    console.log(userId);

    task.name = req.body.name
    task.owner = userId
    
    task.save(function(err, task) {
        if (err) {
            console.log(err)
            res.json({
                error: err
            })
        }
        else {
            var taskId = task._id;
            User.findByIdAndUpdate(userId, {
                $push: {tasks: taskId}},
                {safe: true, upsert: true},
                function(err, result) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        User.findById(userId).populate('tasks').exec(function(err, tasks) {
                            if (err) {
                                console.log(err)
                                return;
                            }
                                console.log("Success");
                                res.json(tasks.tasks);
                        })
                    }
                }
            )

        }
    })

});

router.put('/:taskId', function(req, res){
    var taskId = req.params.taskId;
    var userId = req.user._id;
    var editTask = req.body.data;

    console.log(editTask);
    
    Task.findByIdAndUpdate(taskId, editTask, function(err, task) {
        if(err) {
            console.log("Failed", err);
        }

        User.findById(userId).populate('tasks').exec(function(err, tasks) {
            if (err) {
                console.log(err)
                return;
            }

            console.log("Success");
            res.json(tasks.tasks);
        })
    })
})

router.delete('/:taskId', function(req, res){
    var taskToDelId = req.params.taskId
    var userId = req.user._id

    Task.findByIdAndRemove(taskToDelId, function(err, task){
        if (err) {
            console.log("Failed", err)
        }
        else {
            var taskId = task._id;
            User.findByIdAndUpdate(userId, {
                $pull: {tasks: taskId}},
                {new: true, upsert: true},
                function(err, result) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        User.findById(userId).populate('tasks').exec(function(err, tasks) {
                            if (err) {
                                console.log(err)
                                return;
                            }

                                console.log("Success");
                                res.json(tasks.tasks);
                        })
                    }
                }
            )
        }
    })
/*
        Task.find(function(err, tasks){
            if(err) {
                res.send(err);
            }
            res.json(tasks);
        })
    });
*/
})

router.delete('/:userId/deleteAll', function(req, res) {
    var userId = req.params.userId
    var taskArray;
    var taskIdArray = [];

    User.findById(userId).populate('tasks').exec(function(err, tasks) {
        if (err) {
            console.log(err)
            return;
        }
        taskArray = tasks.tasks
        for(var i = 0; i < taskArray.length; i++) {
            taskIdArray.push(taskArray[i]._id);

            Task.findByIdAndRemove(taskArray[i]._id, function(err, task){
                if (err) {
                    console.log("Failed", err)
                }
                else {
                    console.log(task);
                }
            })
        }

        for(var i = 0; i < taskArray.length; i++) {
            User.findByIdAndUpdate(userId, {
                $pull: {tasks: taskArray[i]._id}},
                {new: true, upsert: true},
                function(err, result) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Success", result);
                    }
            })
        }

        User.findById(userId).populate('tasks').exec(function(err, tasks) {
            if (err) {
                console.log(err)
                return;
            }
            else {
                res.json(tasks.tasks)
            }
        })
    })
})

module.exports = router;
