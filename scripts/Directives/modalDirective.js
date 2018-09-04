'use strict';
angular.module('smsGatewayApp').directive('modal', modalFunction)

function modalFunction() {
    return {
        restrict: 'EA',
        scope: {
            title: '=modalTitle',
            header: '=modalHeader',
            body: '=modalBody',
            footer: '=modalFooter',
            callbackbuttonleft: '&ngClickLeftButton',
            callbackbuttonright: '&ngClickRightButton',
            handler: '=lolo'
        },
        templateUrl: 'views/modal/partialmodal.html',
        transclude: true,
        controller: function ($scope) {
            $scope.handler = 'pop';
        },
    };
};
