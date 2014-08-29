angular.module('app').controller('mvProfileCtrl', function ($scope, mvNotifier, mvAuth, mvIdentity) {
    $scope.email = mvIdentity.currentUser.local.username;
    $scope.firstName = mvIdentity.currentUser.local.firstName;
    $scope.lastName = mvIdentity.currentUser.local.lastName;
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