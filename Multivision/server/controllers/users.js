var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}, function (err, collection) {
        res.send(collection);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.local.salt = encrypt.createSalt();
    userData.local.hashed_password = encrypt.hashPassword(userData.local.salt, userData.local.password);
    User.create(userData, function (err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }

        req.logIn(user, function (err) {
            if(err) { return next(err); }
            res.send(user);
        });
    });
};