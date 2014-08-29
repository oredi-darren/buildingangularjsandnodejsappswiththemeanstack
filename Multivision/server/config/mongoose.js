var mongoose = require('mongoose')
    , encrypt = require('../utilities/encryption');


module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error....'));
    db.once('open', function () {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        local: {
            firstName: String
            , lastName: String
            , username: String
            , salt: String
            , hashed_password: String
        },
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return encrypt.hashPassword(this.local.salt, passwordToMatch) === this.local.hashed_password;
        }
    }

    var User = mongoose.model('User', userSchema);
    User.find({}, function (err, collection) {
        if(collection.length === 0) {
            var salt, hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'darren');
            User.create({
                local:{
                    firstName: 'Darren'
                    , lastName: 'Seet'
                    , username: 'darren'
                    , salt: salt
                    , hashed_password: hash
                }
                , roles: ['admin']
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'john');
            User.create({
                local:{
                    firstName: 'John'
                    , lastName: 'Papa'
                    , username: 'john'
                    , salt: salt
                    , hashed_password: hash
                }
                , roles: []
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'dan');
            User.create({
                local:{
                    firstName: 'Dan'
                    , lastName: 'Wahlin'
                    , username: 'dan'
                    , salt: salt
                    , hashed_password: hash
                }
            });
        }
    });
};
