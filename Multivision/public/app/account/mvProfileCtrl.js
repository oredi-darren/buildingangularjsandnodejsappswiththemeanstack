angular.module('app').factory('mvProfileCtrl', function ($http, mvNotifier, mvAuth, mvIdentity) {
    $scope.email = mvIdentity.local.username;
    $scope.firstName = mvIdentity.local.firstName;
    $scope.lastName = mvIdentity.local.lastName;
    $scope.update = function () {
        var newUserData = {
            local: {
                username: $scope.email
                , firstName: $scope.firstName
                , lastName: $scope.lastName
            }
        };

        if($scope.password && $scope.password.length > 0) {
            newUserData.local.password = $scope.password
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
});