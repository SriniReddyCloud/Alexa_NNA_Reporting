'use strict';
var app = angular.module('nissanInfinitiApp', ['ui.router', 'ui.bootstrap', 'ngIdle', 'angular-loading-bar', 'ngStorage', 'nissanInfinitidashCtrlApp'])

/*, 'angular-loading-bar', 'ngStorage', 'ngIdle'*/
app.run(['$http', 'GlobalService', 'Idle', '$rootScope', '$state', 'GetServiceValues', '$localStorage', '$location', function ($http, GlobalService, Idle, $rootScope, $state, GetServiceValues, $localStorage, $location) {
    var promise = $http.get('./env.properties').success(function (responseData) {
        GlobalService.setUrlData(responseData.serviceURL);
    });
    // Idle.watch();
    $rootScope.$state = $state;
    return {
        promise: promise
    }
     }])
/*.run(['$localStorage', '$rootScope', '$location', 'GetServiceValues', function ($localStorage, $rootScope, $location, GetServiceValues) {        
             $rootScope.$on('$locationChangeStart', function (event, next, current) {
                 // redirect to login page if not logged in and trying to access a restricted page
                 if ($localStorage.userName === undefined && $localStorage.userPassword === undefined) {
                     $location.path('/login');
                 }
             });

     }]);*/
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: "views/dashboardPage/dash.html",
        controller: 'dashCtrl'
    })
}]);
/*app.config(function (IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(1800);
    IdleProvider.timeout(1800);
    KeepaliveProvider.interval(5);
});*/
/*app.all('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
    next();
});*/

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With']
}]);
/* .controller('dashCtrl', function ($scope) {


 });*/

angular.element(document).ready(function () {
    angular.bootstrap(document, ["nissanInfinitiApp"]);
});

app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})