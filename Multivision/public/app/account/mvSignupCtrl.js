angular.module('app').controller('mvSignupCtrl', function ($scope, $location, mvAuth, mvNotifier) {
    $scope.signup = function () {
        var newUserData = {
            local: {
                username: $scope.email
                , password: $scope.password
                , firstName: $scope.firstName
                , lastName: $scope.lastName
            }
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function (reason) {
            console.log(reason);
            mvNotifier.error(reason);
        });
    }
});