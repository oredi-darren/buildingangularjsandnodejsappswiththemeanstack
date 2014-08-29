var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    Course.find({}, function (err, collection) {
        res.send(collection);
    });
};