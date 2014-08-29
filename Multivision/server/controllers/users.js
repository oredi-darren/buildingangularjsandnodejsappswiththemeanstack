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
    userData.local.username = userData.local.username.toLowerCase();
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

exports.updateUser = function (req, res, next) {
    var userUpdates = req.body;

    if(req.user._id !== userUpdates._id && req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.local.firstName = userUpdates.local.firstName;
    req.user.local.lastName = userUpdates.local.lastName;
    req.user.local.username = userUpdates.local.username;

    if(userUpdates.local.password && userUpdates.local.password.length > 0) {
        req.user.local.salt = encrypt.createSalt();
        req.user.local.hashed_password = encrypt.hashPassword(req.user.local.salt, userUpdates.local.password);
    }

    req.user.save(function (err, user) {
        if(err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }

        res.send(req.user);
    });
};