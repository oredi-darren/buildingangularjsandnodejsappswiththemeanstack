var mongoose = require('mongoose');


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
        }
    });

    var User = mongoose.model('User', userSchema);
    User.find({}, function (err, collection) {
        if(collection.length === 0) {
            User.create({
                local:{
                    firstName: 'Darren'
                    , lastName: 'Seet'
                    , username: 'darren'
                }
            });

            User.create({
                local:{
                    firstName: 'John'
                    , lastName: 'Papa'
                    , username: 'john'
                }
            });

            User.create({
                local:{
                    firstName: 'Dan'
                    , lastName: 'Wahlin'
                    , username: 'dan'
                }
            });
        }
    });
};
