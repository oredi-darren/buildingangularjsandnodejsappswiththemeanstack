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
            , userName: String
        }
    });

    var User = mongoose.model('User', userSchema);
    User.find({}, function (err, collection) {
        if(collection.length === 0) {
            User.create({
                local:{
                    firstName: 'Darren'
                    , lastName: 'Seet'
                    , userName: 'darren'
                }
            });

            User.create({
                local:{
                    firstName: 'John'
                    , lastName: 'Papa'
                    , userName: 'john'
                }
            });

            User.create({
                local:{
                    firstName: 'Dan'
                    , lastName: 'Wahlin'
                    , userName: 'dan'
                }
            });
        }
    });
};
