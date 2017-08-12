var express = require('express');
var router = express.Router();

var taskArray = [
    {
        task: 'blue', 
    },
    {
        task: 'red', 
    },
    {
        task: 'green'
    }];

router.get('/', function(req, res) {
    console.log('app.get test', taskArray);
    res.send(taskArray);
})

router.post('/', function(req, res) {
    console.log('app.post test', req.body);
    taskArray.push(req.body);
    res.sendStatus(201);
    
})

module.exports = router;