'use strict';
var directive;
angular.module('smsGatewayApp')
    .directive('ngEnter', ngEnterFunction)
    .directive('pvScrolled', pvScrolledFunction)
    .directive('bindFile', bindFile)
    .directive('resize', resize)

function resize($window) {
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
                    'height': (newValue.h - 350) + 'px'
                    /*,'width': (newValue.w - 350) + 'px'*/
                };
            };
            scope.sendCmdStyle = function () {
                return {
                    'height': (newValue.h - 150) + 'px'
                    /*,'width': (newValue.w - 350) + 'px'*/
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
}

function bindFile() {
    return {
        require: "ngModel",
        restrict: 'A',
        link: function ($scope, el, attrs, ngModel) {
            el.bind('change', function (event) {
                ngModel.$setViewValue(event.target.files[0]);
                $scope.$apply();
            });

            $scope.$watch(function () {
                return ngModel.$viewValue;
            }, function (value) {
                if (!value) {
                    el.val("");
                }
            });
        }
    };
}

function pvScrolledFunction() {
    return function (scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.pvScrolled);
            }
        });
    };
};

function ngEnterFunction() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
};
