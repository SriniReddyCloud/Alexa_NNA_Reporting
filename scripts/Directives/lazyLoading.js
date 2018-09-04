'use strict';
angular.module('smsGatewayApp').directive('pvScrolled', pvScrolledFunction);

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