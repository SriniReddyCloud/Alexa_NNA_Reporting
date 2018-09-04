'use strict';
angular.module('smsGatewayApp').service('modalService', modalServiceFunction);

modalServiceFunction.$inject = [];
function modalServiceFunction() {
    var productList = [];
    var addProduct = function (newObj) {
        productList = newObj;
    };

    var getProducts = function () {
        return productList;
    };
    return {
        addProduct: addProduct,
        getProducts: getProducts
    };
};