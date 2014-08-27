/**
 * Created by darren on 8/28/14.
 */
var express = require('express')
    , stylus = require('stylus')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';



var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }
));

mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function () {
   console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Messages', messageSchema);

app.use(express.static(__dirname + '/public'));
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});
app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;

app.listen(3030);
console.log("Listening on port: ", port);