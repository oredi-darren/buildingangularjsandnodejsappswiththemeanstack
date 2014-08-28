angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, mvAuth, mvIdentity, mvNotifier) {
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if(success) {
                mvNotifier.notify('You have successfully signed in!');
            } else {
                mvNotifier.notify('Username/Password incorrect');
            }
        });
    };

    $scope.identity = mvIdentity;
});