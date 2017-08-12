var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var port = 5000;

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

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/tasks', function(req, res) {
    console.log('app.get test', taskArray);
    res.send(taskArray);
})

app.post('/tasks', function(req, res) {
    console.log('app.post test', req.body);
    taskArray.push(req.body);
    res.sendStatus(201);
    
})

app.listen(port, function(){
    console.log('Listening on port', port);
    
})