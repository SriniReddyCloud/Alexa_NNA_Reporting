'use strict';
angular.module('nissanInfinitidashCtrlApp', [])
    .controller('dashCtrl', function ($scope, $http, $localStorage, GetServiceValues) {

        $scope.chartTitle;
        $scope.chartFlag;
        $scope.chartValue;

        $scope.showPieDatas = false;
        $scope.showuttrance = false;
        $scope.showDailyCmdGraph = false;
        $scope.showPieChart = false;
        $scope.logoStatus = false;
        $scope.showSignin = true;
        $scope.logoutShow = false;

        $scope.piechartdata = [];
        $scope.exportUttranceData = [];

        $scope.pieChartFeatureNameDummy = [];

        $scope.setSkill;


        $scope.registerNow = function (regValue) {
            if (regValue) {
                alert("User Registered Successfully");
                window.location.reload();
            }
        }


        $scope.doc_classes_colors = [
             "rgb(103, 183, 220)",
             "rgb(253, 212, 0)",
             "rgb(132, 183, 97)",
             "rgb(204, 71, 72)",

            "rgb(205, 130, 173)",
            "rgb(47, 64, 116)",
            "rgb(68, 142, 77)",
            "rgb(183, 184, 63)",

            "rgb(185, 120, 63)",
            "rgb(185, 62, 61)",
            "rgb(145, 49, 103)",
            "rgb(91, 114, 213)",

            "rgb(120, 85, 177)",
            "rgb(89, 118, 175)",
            "rgb(7, 50, 149)",
            "rgb(227, 201, 178)"
        ];
        $scope.pieChartFeatureName = [];
        $scope.skillFeatureNames = [
            {
                'name': "ENGN_STRT",
                'orgName': "Remote Engine Start"
            },
            {
                'name': "ENGN_STP",
                'orgName': "Remote Engine Stop"
            },
            {
                'name': "DOOR_LCK",
                'orgName': "Remote Door Lock"
            },
            {
                'name': "DOOR_ULCK",
                'orgName': "Remote Door UnLock"
            },
            {
                'name': "LGHT_1",
                'orgName': "Flash Lights"
            },
            {
                'name': "HORN_1",
                'orgName': "Honk Horn"
            },
            {
                'name': "BTRY_STS",
                'orgName': "Get Battery Status"
            },
            {
                'name': "BTRY_CHRG",
                'orgName': "Remote Charging Request"
            },
            /*{
                'name': "BTRY_SCHDL_CHRG",
                'orgName': "Schedule Remote Charging"
            },*/

            {
                'name': "HVAC_GET_TEMP",
                'orgName': "Get Cabin Temperature"
            },
            {
                'name': "HVAC_SET_TEMP",
                'orgName': "Set Cabin Temperature"
            },
            {
                'name': "HVAC_GET_SCHDL",
                'orgName': "Get Hvac Schedule"
            },
            {
                'name': "HVAC_ON",
                'orgName': "Hvac On"
            },
            {
                'name': "HVAC_OFF",
                'orgName': "Hvac Off"
            },
            /*{
                'name': "HVAC_UPDT",
                'orgName': "Update Hvac Schedule"
            },*/
            {
                'name': "HVAC_SET_SCHDL",
                'orgName': "Set Hvac Schedule"
            }
        ];

        $scope.toMaxDate = new Date();

        $('#myModalNorm').modal('show');
        $('#myModalNorm').modal({
            backdrop: 'static',
            keyboard: false
        });



        $scope.logout = function () {
            $localStorage.$reset();
            window.location.reload();
        };
        $scope.hideErrorDiv = function () {
            $scope.errorloggin = false;
        }


        /*barchart filter 1 date*/
        $scope.opendoughtFromdateValue1 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openeddoughtFromdate1 = true;
            $scope.openeddoughtTodate1 = false;
            $scope.openeddoughtTodate = false;
            $scope.openedfromdate = false;
            $scope.openedtodate = false;
            $scope.openeddoughtFromdate = false;
        };
        $scope.doughtFromdate1 = new Date();
        $scope.optionsdoughtFromdate1 = {
            formatDay: 'd',
            showWeeks: false
        };
        $scope.doughtTodate1 = new Date();
        $scope.optionsdoughtTodate1 = {
            formatDay: 'd',
            showWeeks: false
        };
        $scope.opendoughtTodateValue1 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openeddoughtTodate1 = true;
            $scope.openeddoughtFromdate = false;
            $scope.openedfromdate = false;
            $scope.openedtodate = false;
            $scope.openeddoughtTodate = false;
            $scope.openeddoughtFromdate1 = false;
        };

        /*doughnut chart from to date*/
        $scope.doughtFromdate = new Date();
        $scope.optionsdoughtFromdate = {
            formatDay: 'd',
            showWeeks: false
        }
        $scope.opendoughtFromdateValue = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openeddoughtFromdate = true;
            $scope.openeddoughtTodate = false;
            $scope.openeddoughtTodate1 = false;
            $scope.openedfromdate = false;
            $scope.openedtodate = false;
            $scope.openeddoughtFromdate1 = false;
        };

        $scope.doughtTodate = new Date();
        $scope.optionsdoughtTodate = {
            formatDay: 'd',
            showWeeks: false
        };
        $scope.opendoughtTodateValue = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openeddoughtTodate = true;
            $scope.openeddoughtFromdate = false;
            $scope.openedfromdate = false;
            $scope.openedtodate = false;
            $scope.openeddoughtTodate1 = false;
        };

        /*bar chart from to date1 starts*/
        $scope.fromdate = new Date();
        $scope.optionsfromdate = {
            formatDay: 'd',
            showWeeks: false
        }
        $scope.openfromDateValue = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedfromdate = true;
            $scope.openedtodate = false;
            $scope.openeddoughtTodate1 = false;
            $scope.openeddoughtTodate = false;
            $scope.openeddoughtFromdate = false;
            $scope.openeddoughtFromdate1 = false;
        };

        $scope.todate = new Date();
        $scope.optionstodate = {
            formatDay: 'd',
            showWeeks: false
        };
        $scope.opentoDateValue = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedtodate = true;
            $scope.openedfromdate = false;
            $scope.openeddoughtTodate = false;
            $scope.openeddoughtTodate1 = false;
            $scope.openeddoughtFromdate = false;
        };
        $scope.toDateValue = function (dta1) {
            console.log(dta1);
        };
        /*bar chart from to date1 ends*/

        $scope.unrecognizedUttrances = function (fd, td) {
            var fdyr = fd.getFullYear();
            var fdmn = fd.getMonth() + 1;
            var fddt = fd.getDate();
            var tdyr = td.getFullYear();
            var tdmn = td.getMonth() + 1;
            var tddt = td.getDate();
            if (fddt < 10) {
                fddt = "0" + fddt;
            } else {
                fddt = fddt;
            }
            if (tddt < 10) {
                tddt = "0" + tddt;
            } else {
                tddt = tddt;
            }
            if (fdmn < 10) {
                fdmn = "0" + fdmn;
            } else {
                fdmn = fdmn;
            }
            if (tdmn < 10) {
                tdmn = "0" + tdmn;
            } else {
                tdmn = tdmn;
            }
            var fromDate = fdyr + "-" + fdmn + "-" + fddt;
            var toDate = tdyr + "-" + tdmn + "-" + tddt;
            /*alert(fromDate.toString());
            alert(toDate.toString());*/

            var datas = {
                "skill": $scope.setSkill,
                "fromDate": fromDate.toString(),
                "toDate": toDate.toString()

            };
            var serviceUrl = "getUtteranceDetails";
            var mthd = "POST";
            $scope.exportUttranceData = [];

            $scope.getSaveDetails = GetServiceValues.getDetailServiceValue(datas, serviceUrl, mthd);
            $scope.getSaveDetails.then(function successCallback(response) {
                console.log(response);
                if (response.data.length > 0) {
                    $scope.showuttrance = true;
                    var uttarDatas = [];
                    var utData = [];
                    for (var i = 0; i < response.data.length; i++) {
                        uttarDatas[i] = response.data[i].Count;
                        utData[i] = response.data[i].Period;
                    }
                    console.log(uttarDatas);
                    Highcharts.chart('CartUttrances', {

                        chart: {
                            type: 'column'
                        },

                        title: {
                            text: 'Styling axes and columns'
                        },
                        xAxis: {
                            categories: utData,
                            labels: {
                                rotation: 90,
                                x: 0
                            }
                        },

                        yAxis: [{
                            className: 'highcharts-color-0',
                            title: {
                                text: 'Primary axis'
                            }
                        }, {
                            className: 'highcharts-color-1',
                            opposite: true,
                            title: {
                                text: 'Secondary axis'
                            }
                        }],

                        plotOptions: {
                            column: {
                                borderRadius: 5
                            }
                        },

                        series: [{
                            data: uttarDatas
                        }]

                    }, function (chart) { // on complete
                        console.log(chart);
                        chart.legend.allItems[0].update({
                            name: 'Utterance Count'
                        });

                    });
                } else {
                    $scope.showuttrance = false;
                }
            }, function errorCallback(response) {
                console.log(response);
            });

            var excelserviceUrl = "getUtteranceDetailsToExcel";
            $scope.getExcelDatas = GetServiceValues.getDetailServiceValue(datas, excelserviceUrl, mthd);
            $scope.getExcelDatas.then(function successCallback(response) {
                    console.log("getUtteranceDetailsToExcel", response);
                    var skill = response.data.skill;
                    $scope.cDatas = [];
                    $scope.uDatas = [];
                    if (response.data) {
                        // if (response.data.utterance.length === response.data.createTs.length) {

                        for (var i = 0; i < response.data.length; i++) {
                            var CreateTs = response.data[i].CreateTimeStamp;
                            var Utterance = response.data[i].Utterance;
                            if ((CreateTs !== undefined) && (Utterance !== undefined)) {
                                for (var j = 0; j < CreateTs.length; j++) {
                                    $scope.exportUttranceData.push({
                                        'skill': response.data[i].Skill,
                                        'CreateTimeStamp(CST)': CreateTs[j],
                                        'Utterance': Utterance[j]

                                    });
                                }
                            }

                        }

                        console.log($scope.cDatas);
                        console.log($scope.uDatas);

                        $scope.URUT = function () {
                            alasql('SELECT * INTO XLSX("UtteranceDetails.xlsx",{headers:true}) FROM ?', [$scope.exportUttranceData]);
                        };
                        console.log("$scope.exportUttranceData", $scope.exportUttranceData);
                        //} 

                    } else {
                        $scope.exportUttranceData.push({
                            "Skill": "Error",
                            "Utterance": "No Data Found for Selected Date"
                        });
                    }
                },
                function errorCallback(response) {
                    console.log(response);
                });
        };
        //$scope.unrecognizedUttrances($scope.doughtFromdate, $scope.doughtTodate);

        $scope.dailyCmdReport = function (fmDate, toDate) {
            var fdyr = fmDate.getFullYear();
            var fdmn = fmDate.getMonth() + 1;
            var fddt = fmDate.getDate();
            var tdyr = toDate.getFullYear();
            var tdmn = toDate.getMonth() + 1;
            var tddt = toDate.getDate();
            if (fddt < 10) {
                fddt = "0" + fddt;
            } else {
                fddt = fddt;
            }
            if (tddt < 10) {
                tddt = "0" + tddt;
            } else {
                tddt = tddt;
            }
            if (fdmn < 10) {
                fdmn = "0" + fdmn;
            } else {
                fdmn = fdmn;
            }
            if (tdmn < 10) {
                tdmn = "0" + tdmn;
            } else {
                tdmn = tdmn;
            }
            var fromDate = fdyr + "-" + fdmn + "-" + fddt;
            var toDate = tdyr + "-" + tdmn + "-" + tddt;
            /* alert(fromDate.toString());
             alert(toDate.toString());*/

            var datas = {
                "skill": $scope.setSkill,
                "fromDate": fromDate.toString(),
                "toDate": toDate.toString()

            };
            var serviceUrl = "getDailyCommandDetailsAlt";
            var mthd = "POST";

            $scope.getSaveDetails = GetServiceValues.getDetailServiceValue(datas, serviceUrl, mthd);
            $scope.getSaveDetails.then(function successCallback(response) {
                console.log(response);
                if (response.data.length > 0) {
                    $scope.showDailyCmdGraph = true;
                    var uttarCmdTotalDataChart = [];
                    var uttarCmdSuccessDataChart = [];
                    var uttarCmdFailureDataChart = [];
                    var utData = [];
                    for (var i = 0; i < response.data.length; i++) {
                        uttarCmdTotalDataChart[i] = response.data[i].TotalAccessCount;
                        uttarCmdSuccessDataChart[i] = response.data[i].SuccessCount;
                        uttarCmdFailureDataChart[i] = response.data[i].FailureCount;
                        utData[i] = response.data[i].Period
                    }

                    Highcharts.chart('chartCommands', {
                        chart: {
                            type: 'column'
                        },

                        title: {
                            text: 'Styling axes and columns'
                        },
                        xAxis: {
                            categories: utData,
                            labels: {
                                rotation: 90,
                                x: 0
                            }
                        },

                        yAxis: [{
                            className: 'highcharts-color-0',
                            title: {
                                text: 'Primary axis'
                            }
                            }, {
                            className: 'highcharts-color-1',
                            opposite: true,
                            title: {
                                text: 'Secondary axis'
                            }
                            }],

                        plotOptions: {
                            column: {
                                borderRadius: 5
                            }
                        },

                        series: [{
                            data: uttarCmdTotalDataChart
                        }, {
                            data: uttarCmdFailureDataChart,

                        }, {
                            data: uttarCmdSuccessDataChart
                        }, ]

                    }, function (chart) { // on complete
                        console.log(chart);
                        chart.legend.allItems[0].update({
                            name: 'Total Count'
                        });
                        chart.legend.allItems[1].update({
                            name: 'Failure Count'
                        });
                        chart.legend.allItems[2].update({
                            name: 'Success Count'
                        });
                    });
                } else {
                    $scope.showDailyCmdGraph = false;
                }
            }, function errorCallback(response) {
                console.log(response);
            });

            var excelUrl = "getDailyCommandExportToExcelAlt";
            $scope.getexcelDetails = GetServiceValues.getDetailServiceValue(datas, excelUrl, mthd);
            $scope.getexcelDetails.then(function successCallback(response) {
                console.log(response.data);
                if (response.data.length > 0) {
                    $scope.RCMS = function () {
                        alasql('SELECT * INTO XLSX("RemoteCommandSummary.xlsx",{headers:true}) FROM ?', [response.data]);
                    };
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        //$scope.dailyCmdReport($scope.doughtFromdate1, $scope.doughtTodate1);


        $scope.getPieChartDatas = function (fd, td) {
            $scope.showPieDatas = false;
            var fdyr = fd.getFullYear();
            var fdmn = fd.getMonth() + 1;
            var fddt = fd.getDate();
            var tdyr = td.getFullYear();
            var tdmn = td.getMonth() + 1;
            var tddt = td.getDate();
            if (fddt < 10) {
                fddt = "0" + fddt;
            } else {
                fddt = fddt;
            }
            if (tddt < 10) {
                tddt = "0" + tddt;
            } else {
                tddt = tddt;
            }

            if (fdmn < 10) {
                fdmn = "0" + fdmn;
            } else {
                fdmn = fdmn;
            }
            if (tdmn < 10) {
                tdmn = "0" + tdmn;
            } else {
                tdmn = tdmn;
            }


            var fromDate = fdyr + "-" + fdmn + "-" + fddt;
            var toDate = tdyr + "-" + tdmn + "-" + tddt;
            /*alert(fromDate.toString());
            alert(toDate.toString());*/

            var datas = {
                "skill": $scope.setSkill,
                "fromDate": fromDate.toString(),
                "toDate": toDate.toString()

            };
            var serviceUrl = "getPieChartDetailsAlts";
            var mthd = "POST";

            $scope.getSaveDetails = GetServiceValues.getDetailServiceValue(datas, serviceUrl, mthd);
            $scope.pieDatasDummy = [];
            $scope.pieClickValues = function (data) {
                $scope.pieDatas = [];
                if (data) {
                    if (data.featurename !== $scope.pieDatasDummy.featurename) {
                        $scope.$apply(function () {
                            $scope.showPieDatas = true;

                            $scope.pieDatas.push(data);
                            $scope.setSelected($scope.pieDatas[0].featurename);
                        });
                        $scope.pieDatasDummy = data;
                    } else {
                        $scope.$apply(function () {
                            $scope.showPieDatas = false;
                            $scope.setSelected(data.featurename);
                            $scope.pieDatasDummy = [];
                        });
                    }
                    console.log(data);
                    data = [];

                } else {
                    $scope.showPieChart = false;
                    $scope.showFeatureNames = false;
                }
            };
            $scope.getSaveDetails.then(function successCallback(response) {
                    console.log(response);
                    if (response.data.length > 0) {
                        $scope.pieChartFeatureName = [];
                        $scope.piechartdata = [];
                        $scope.pieChartFeatureNameDummy = [];
                        $scope.showPieChart = true;
                        $scope.showFeatureNames = true;
                        for (var i = 0; i < response.data.length; i++) {
                            // $scope.piechartdata.push(response.data[i]);
                            for (var j = 0; j < $scope.skillFeatureNames.length; j++) {
                                if ((response.data[i].Feature === $scope.skillFeatureNames[j].name) && (response.data[i].TotalAccessCount > 0)) {
                                    $scope.pieChartFeatureName.push({
                                        'orgName': $scope.skillFeatureNames[j].orgName,
                                        'name': $scope.skillFeatureNames[j].name
                                    });
                                    $scope.pieChartFeatureNameDummy.push($scope.skillFeatureNames[j].orgName);
                                    $scope.piechartdata.push({
                                        "totalAccessCount": response.data[i].TotalAccessCount,
                                        "successCount": response.data[i].SuccessCount,
                                        "failureCount": response.data[i].FailureCount,
                                        "noOfUsers": response.data[i].NoOfUsers,
                                        "featurename": $scope.skillFeatureNames[j].orgName
                                    });
                                }
                            }
                        }
                        console.log($scope.pieChartFeatureName);
                        var chart = AmCharts.makeChart("chartdiv", {
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": $scope.piechartdata,
                            "titleField": "featurename",
                            "valueField": "totalAccessCount",
                            "labelRadius": 5,
                            "pullOutOnlyOne": true,
                            "radius": "40%",
                            "innerRadius": "50%",
                            "labelText": "[[totalAccessCount]]",
                            "export": {
                                "enabled": true
                            }
                        });

                        chart.addListener("clickSlice", function (event) {
                            console.log(event.dataItem.dataContext);
                            var req = {
                                "totalAccessCount": event.dataItem.dataContext.totalAccessCount,
                                "successCount": event.dataItem.dataContext.successCount,
                                "failureCount": event.dataItem.dataContext.failureCount,
                                "noOfUsers": event.dataItem.dataContext.noOfUsers,
                                "featurename": event.dataItem.dataContext.featurename
                            }
                            $scope.$broadcast('pieChartValues', req);
                            $scope.pieClickValues(req);
                        });

                        $scope.idSelectedVote = null;
                        $scope.idselec = null;
                        $scope.setSelected = function (idSelectedVote) {
                            if (idSelectedVote !== $scope.idselec) {
                                $scope.idSelectedVote = idSelectedVote;
                                $scope.idselec = idSelectedVote;
                            } else {
                                $scope.idSelectedVote = null;
                                $scope.idselec = null;
                            }
                            console.log(idSelectedVote);
                        }


                        /*$scope.pieDatasDummy = [];
                        $scope.$on('pieChartValues', function (event, data) {
                            $scope.pieDatas = [];
                            if (data) {
                                if (data.featurename !== $scope.pieDatasDummy.featurename) {
                                    $scope.$apply(function () {
                                        $scope.showPieDatas = true;

                                        $scope.pieDatas.push(data);
                                        $scope.setSelected($scope.pieDatas[0].featurename);
                                    });
                                    $scope.pieDatasDummy = data;
                                } else {
                                    $scope.$apply(function () {
                                        $scope.showPieDatas = false;
                                        $scope.setSelected(data.featurename);
                                        $scope.pieDatasDummy = [];
                                    });
                                }
                                console.log(data);
                                data = [];
                            }
                        });*/
                        if ($scope.piechartdata.length === 0) {
                            $scope.showPieChart = false;
                        }
                    } else {
                        $scope.showPieChart = false;
                        $scope.showFeatureNames = false;
                    }
                },
                function errorCallback(response) {
                    console.log(response);
                });

        };

        $scope.skillChange = function (skilll) {
            // alert(skilll);
            $scope.setSkill = skilll;
            $scope.fmDat = new Date();
            $scope.toDat = new Date();


            $scope.fromdate = new Date();
            $scope.todate = new Date();

            $scope.doughtFromdate1 = new Date();
            $scope.doughtTodate1 = new Date();

            $scope.doughtFromdate = new Date();
            $scope.doughtTodate = new Date();

            $scope.showPieDatas = false;

            $scope.unrecognizedUttrances($scope.fmDat, $scope.toDat);
            $scope.dailyCmdReport($scope.fmDat, $scope.toDat);
            $scope.getPieChartDatas($scope.fmDat, $scope.toDat);
        };

        $scope.logoClick = function (logoParams) {
            if (logoParams === "nissan") {
                $scope.infinityStatus = false;
                $scope.nissanStatus = true;
                $scope.dropValues = [{
                    'key': "NALL",
                    'value': "ALL"
                }, {
                    'key': "NISSAN",
                    'value': "NissanConnect Services"
                }, {
                    'key': "LEAF",
                    'value': "NissanConnect EV"
                }];
                $scope.selectedValue = "NALL";
                $scope.skillChange($scope.selectedValue);
            } else {
                $scope.dropValues = [{
                    'key': "IALL",
                    'value': "ALL"
                }, {
                    'key': "INFINITIIS",
                    'value': "INFINITI InTouch Services"
                }, {
                    'key': "INFINITI",
                    'value': "INFINITI Connection"
                }];
                $scope.selectedValue = "IALL";

                $scope.infinityStatus = true;
                $scope.nissanStatus = false
                $scope.skillChange($scope.selectedValue);
            }
        };

        $scope.errorloggin = false;
        $scope.loggin = function (usr, pwd) {
            $scope.errorloggin = false;
            if (usr === 'admin' && pwd === 'admin') {
                //alert('Login Success');
                $localStorage.userName = usr;
                $scope.uName = $localStorage.userName;
                $('#myModalNorm').modal('hide');
                $scope.areaStatus = !$scope.areaStatus;
                $scope.showSignin = false;
                $scope.logoClick("nissan");
            } else {
                $scope.errorloggin = true;
            }
        };
        $scope.showCreateNewInterfacePanel = true;
        $scope.areaStatus = true;
        $scope.showDash = function () {
            window.location.reload();
            $timeout(function () {
                $scope.showCreateNewInterfacePanel = true;
                $scope.showMgmtPanel = false;
                $scope.areaStatus = !$scope.areaStatus;
            }, 2000);

        };



        $scope.modalClose = function () {
            $('#myModalNorm').modal('hide');
            $scope.areaStatus = !$scope.areaStatus;
        };
        $scope.showMgmt = function () {
            $scope.showMgmtPanel = true;
            $scope.showCreateNewInterfacePanel = false;
        }


        /*login modal form events*/
        $(function () {
            $('#login-form-link').click(function (e) {
                $("#register-form").fadeOut(1000);
                $('#register-form-link').removeClass('active');
                $("#login-form").delay(1000).fadeIn(1000);
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#register-form-link').click(function (e) {
                $("#login-form").fadeOut(1000);
                $('#login-form-link').removeClass('active');
                $("#register-form").delay(1000).fadeIn(1000);
                $(this).addClass('active');
                e.preventDefault();
            });

        });

        $().ready(function () {
            $("#card").flip({
                trigger: 'manual'
            });
        });


        $(".signup_link").click(function () {

            $(".signin_form").css('opacity', '0');
            $(".signup_form").css('opacity', '100');


            $("#card").flip(true);

            return false;
        });

        $("#unflip-btn").click(function () {

            $(".signin_form").css('opacity', '100');
            $(".signup_form").css('opacity', '0');

            $("#card").flip(false);

            return false;

        });

    });
