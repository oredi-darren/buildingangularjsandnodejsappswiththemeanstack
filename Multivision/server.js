/**
 * Created by darren on 8/28/14.
 */
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;

app.listen(3030);
console.log("Listening on port: ", port);