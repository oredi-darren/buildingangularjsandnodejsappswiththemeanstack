var express = require('express')
    , stylus = require('stylus')
    , logger = require('morgan')
    , bodyParser = require('body-parser');

module.exports = function(app, config) {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
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