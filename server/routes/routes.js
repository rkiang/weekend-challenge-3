var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('router.get test');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks_table ORDER BY status DESC;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query:', errorMakingQuery);
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
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("INSERT INTO tasks_table (item, status) VALUES ($1, 'incomplete');", [req.body.task], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query:', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

router.put('/:id', function (req, res) {
    console.log(req.params.id);
    console.log('router.put test');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("UPDATE tasks_table SET status = 'complete' WHERE id = $1;", [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query:', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    console.log('router.delete test');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM tasks_table WHERE id=$1;', [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query:', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
})

module.exports = router;