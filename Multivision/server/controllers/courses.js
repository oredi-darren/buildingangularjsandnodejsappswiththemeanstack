var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    Course.find({}, function (err, collection) {
        res.send(collection);
    });
};

exports.getCourseById = function (req, res) {
    Course.findOne({_id:req.params.id}, function (err, course) {
        res.send(course);
    });
};