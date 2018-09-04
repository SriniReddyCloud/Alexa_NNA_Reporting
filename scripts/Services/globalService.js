'use strict';
angular.module('nissanInfinitiApp').service('GlobalService', GlobalServiceFunction)

GlobalServiceFunction.$inject = ['$localStorage'];

function GlobalServiceFunction($localStorage) {
    var serviceURL;
    return {
        setUrlData: function (data) {
            //To be called when the data stored needs to be discarded
            $localStorage.serviceURL = data;
        },
        getUrlData: function () {
            //To be called when the data stored needs to be discarded
            return $localStorage.serviceURL;
        },
    };
};