var mongoose = require('mongoose')
    , crypto = require('crypto');


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
            , hashed_pwd: String
        },
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPassword(this.local.salt, passwordToMatch) === this.local.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);
    User.find({}, function (err, collection) {
        if(collection.length === 0) {
            var salt, hash;

            salt = createSalt();
            hash = hashPassword(salt, 'darren');
            User.create({
                local:{
                    firstName: 'Darren'
                    , lastName: 'Seet'
                    , username: 'darren'
                    , salt: salt
                    , hashed_pwd: hash
                }
                , roles: ['admin']
            });

            salt = createSalt();
            hash = hashPassword(salt, 'john');
            User.create({
                local:{
                    firstName: 'John'
                    , lastName: 'Papa'
                    , username: 'john'
                    , salt: salt
                    , hashed_pwd: hash
                }
                , roles: []
            });

            salt = createSalt();
            hash = hashPassword(salt, 'dan');
            User.create({
                local:{
                    firstName: 'Dan'
                    , lastName: 'Wahlin'
                    , username: 'dan'
                    , salt: salt
                    , hashed_pwd: hash
                }
            });
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}