/**
 * Created by darren on 8/28/14.
 */
angular.module('app', ['ngResource', 'ngRoute']);
angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizedCurrentUserForRoute('admin');
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main'
            , controller: 'mvMainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list'
            , controller: 'mvUserListCtrl'
            , resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        console.log(rejection);
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});