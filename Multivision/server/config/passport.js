var mongoose = require('mongoose')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , User = mongoose.model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
            User.findOne({'local.username': username }, function (err, user) {
                if (err)
                    return done(err);
                if(user && user.authenticate(password)) {
                    return done(null, user);
                }

                return done(null, false);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        if(user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id:id}, function (err, user) {
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        });
    });
}