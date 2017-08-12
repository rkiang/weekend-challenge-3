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
    console.log('router.post test');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO tasks_table (item) VALUES ($1);', [req.body.task], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

module.exports = router;