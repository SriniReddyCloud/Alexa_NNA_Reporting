'use strict';
/*GetAllBranches Tele Dashboard*/

angular.module('nissanInfinitiApp').service('GetServiceValues', GetServiceValuesFunction);

GetServiceValuesFunction.$inject = ['$http', 'GlobalService'];

function GetServiceValuesFunction($http, GlobalService) {
    var getDetailServiceValue = function (serviceParams, serviceCmd, mthd) {
        var requestUrl = GlobalService.getUrlData() + serviceCmd;
        var req;
        console.log('mthd', mthd);
        console.log('serviceCmd', serviceCmd);
        console.log('serviceParams', serviceParams);

        if (mthd === 'POST') {
            req = {
                method: 'POST',
                url: requestUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'header': 'nissanUSA'
                },
                data: {
                    "skill": serviceParams.skill,
                    "fromDate": serviceParams.fromDate,
                    "toDate": serviceParams.toDate
                }
            };
        } else {
            req = {
                method: 'GET',
                url: requestUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'header': 'nissanUSA'
                },
                data: {
                    "skill": "LEAF",
                    "fromDate": serviceParams.fromDate.toString(),
                    "toDate": serviceParams.toDate.toString()
                }
            };
        }

        return $http(req).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };
    return {
        getDetailServiceValue: getDetailServiceValue
    };
};


/* var chart = AmCharts.makeChart("chartdiv", {
                "type": "pie",
                "theme": "light",
                "dataProvider": [{
                    "feature": "LGHT_1",
                    "totalAccessCount": 100,
                    "successCount": 80,
                    "failureCount": 20,
                    "noOfUsers": 1,
                    "featurename": "Feature 1"
                }, {
                    "feature": "DOOR_ULCK",
                    "totalAccessCount": 3,
                    "successCount": 1,
                    "failureCount": 2,
                    "noOfUsers": 2,
                    "featurename": "Feature 2"
                }, {
                    "feature": "DOOR_LCK",
                    "totalAccessCount": 9,
                    "successCount": 0,
                    "failureCount": 9,
                    "noOfUsers": 1,
                    "featurename": "Feature 3"
                }, {
                    "feature": "Engine Stop",
                    "totalAccessCount": 100,
                    "successCount": 80,
                    "failureCount": 20,
                    "noOfUsers": 1,
                    "featurename": "Feature 4"
                }, {
                    "feature": "Flash Lights",
                    "totalAccessCount": 3,
                    "successCount": 1,
                    "failureCount": 2,
                    "noOfUsers": 2,
                    "featurename": "Feature 5"
                }, {
                    "feature": "Honk the Horn",
                    "totalAccessCount": 9,
                    "successCount": 0,
                    "failureCount": 9,
                    "noOfUsers": 1,
                    "featurename": "Feature 6"
                }, {
                    "feature": "Climate Control ON",
                    "totalAccessCount": 100,
                    "successCount": 80,
                    "failureCount": 20,
                    "noOfUsers": 1,
                    "featurename": "Feature 7"
                }, {
                    "feature": "Climate Control OFF",
                    "totalAccessCount": 3,
                    "successCount": 1,
                    "failureCount": 2,
                    "noOfUsers": 2,
                    "featurename": "Feature 8"
                }, {
                    "feature": "Start Remote Charge",
                    "totalAccessCount": 9,
                    "successCount": 0,
                    "failureCount": 9,
                    "noOfUsers": 1,
                    "featurename": "Feature 9"
                }, {
                    "feature": "Get Battery Status",
                    "totalAccessCount": 100,
                    "successCount": 80,
                    "failureCount": 20,
                    "noOfUsers": 1,
                    "featurename": "Feature 10"
                }, {
                    "feature": "Climate Control OFF",
                    "totalAccessCount": 3,
                    "successCount": 1,
                    "failureCount": 2,
                    "noOfUsers": 2,
                    "featurename": "Feature 11"
                }],
                "titleField": "feature",
                "valueField": "totalAccessCount",
                "labelRadius": 5,
                "pullOutOnlyOne": true,
                "radius": "40%",
                "innerRadius": "50%",
                "labelText": "[[totalAccessCount]]",
                "export": {
                    "enabled": true
                }
            });*/