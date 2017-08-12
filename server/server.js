var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var port = 5000;

var tasks = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.use('/tasks', tasks);

app.listen(port, function(){
    console.log('Listening on port', port);
    
})