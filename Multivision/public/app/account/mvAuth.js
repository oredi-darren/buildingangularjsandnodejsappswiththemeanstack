angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q) {
    return {
        authenticateUser: function (username, password) {
            var defer = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function (response) {
                if(response.data.success) {
                    mvIdentity.currentUser = response.data.user;
                    defer.resolve(true);
                } else {
                    defer.resolve(false);
                }
            });

            return defer.promise;
        }
    }
});
