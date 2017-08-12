var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// var taskArray = [
//     {
//         task: 'blue',
//     },
//     {
//         task: 'red',
//     },
//     {
//         task: 'green'
//     }];

router.get('/', function (req, res) {
    console.log('router.get test');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks_table;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows)
                    console.log(result.rows);
                }
            })
        }
    })
})

router.post('/', function (req, res) {
    console.log('app.post test', req.body);
    taskArray.push(req.body);
    res.sendStatus(201);

})

module.exports = router;