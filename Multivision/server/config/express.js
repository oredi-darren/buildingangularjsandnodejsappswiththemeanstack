var express = require('express')
    , stylus = require('stylus')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , passport = require('passport');


module.exports = function(app, config) {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());                             // This is important to pass json request body
    app.use(bodyParser.urlencoded({ extended: false }));    // This is important to pass form post request body
    app.use(session({
        secret: 'multi vision unicorns'
        , saveUninitialized: true
        , resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function (str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(express.static(config.rootPath + '/public'));
};