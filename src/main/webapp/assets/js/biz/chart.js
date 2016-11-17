/**
 * 차트 클래스
 * @type {{init: chartClass.init}}
 */
var chartClass = {
    init: function () {

        // hichart 시작
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        // 시스템 정보 jsonp cross domain  
        chart_spline(); // cpu, 메모리 점유율 call
        // 하드웨어 정보 jsonp cross domain
        fnAjaxJsonpHardWareDataCall();

        // 1개월, 3개월, 6개월
        $(".btn-month-1").css("background", "#38383a");
        $(".btn-month-1").css("color","#fff");
        $(".btn-month-1").css("border","1px solid #fff");

        $(".btn-month").on("click", function() {
            $(".btn-month").css("background", "#38383a");
            $(".btn-month").css("color", "#999");
            $(".btn-month").css("border", "none");

            $(this).css("background", "#38383a");
            $(this).css("color","#fff");
            $(this).css("border","1px solid #fff");
        });

        // 비활성
        $(".button-chart-column-top-right").css("background", "#38383a");
        $(".button-chart-column-top-right").css("color", "#999");
        $(".button-chart-column-top-right").css("border", "none");
        $(".button-chart-column2-top-right").css("background", "#38383a");
        $(".button-chart-column2-top-right").css("color", "#999");
        $(".button-chart-column2-top-right").css("border", "none");

        // 활성
        $(".button-chart-column-top-left").css("background", "#38383a");
        $(".button-chart-column-top-left").css("color","#fff");
        $(".button-chart-column-top-left").css("border","1px solid #fff");
        $(".button-chart-column2-top-left").css("background", "#38383a");
        $(".button-chart-column2-top-left").css("color","#fff");
        $(".button-chart-column2-top-left").css("border","1px solid #fff");

        $("#chart_column_1").css("visibility", "hidden");
        
        this.btnChartSearch();
    },
    monthText: '1',
    btnMonthClick: function(mm) {
        this.monthText = mm;
        $("#chart_column_title h1").text("(" + mm +"개월)");
        var arrayDataType = [];
        var data = {};
        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        data = {
            ramblyList: jsTreeClass.arraySelectedData, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            month: mm || 1
        }
        $("#chart_column_1").css("visibility", "visible");
        commonClass.fnAjaxCallback("/getTotalAvgReqCntList.do", data, function (data) {
            $("#chart_column_1").css("visibility", "hidden");
            chart_column(data)
        },'post'); // 지방 의회별 데이터 전송건수
    },
    dataCollectionPaginationInfo: {},
    dataColumn1PaginationInfo: {},
    dataCollectionCurrentPage : 1,
    dataColumn1CurrentPag : 1,
    dataAreaArray : ["002001", "051001", "053001", "032001", "062001", "042001", "052001", "044001", "031001", "033001", "043001", "041001", "063001", "061001", "054001", "055001", "064001"],
    fnNextRightProc: function() {

        if(jsTreeClass.arraySelectBasic.length == 0) {
            return;
        }

        // 다음 버튼 공통
        var arrayDataType = [];
        var data = {};
        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        data.paginationInfo = chartClass.dataColumn1PaginationInfo;
        if(data.paginationInfo.lastPageNo > data.paginationInfo.currentPageNo) {
            chartClass.dataColumn1CurrentPag = data.paginationInfo.currentPageNo+1;
        } else {
            chartClass.dataColumn1CurrentPag = data.paginationInfo.currentPageNo;
        }
        var sendData = {
            ramblyList: jsTreeClass.arraySelectBasic, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            month: this.monthText || 1,
            pageIndex: chartClass.dataColumn1CurrentPag,
            pageUnit: 17
        }
        $("#chart_column_1").css("visibility", "visible");
        commonClass.fnAjaxCallback("/getTotalAvgReqCntList.do", sendData, function (data) {
            $("#chart_column_1").css("visibility", "hidden");
            chartClass.dataColumn1PaginationInfo = data.paginationInfo;
            chart_column(data)
        },'post'); // 데이터 수집 현황

        data.paginationInfo = chartClass.dataCollectionPaginationInfo;
        if(data.paginationInfo.lastPageNo > data.paginationInfo.currentPageNo) {
            chartClass.dataCollectionCurrentPage = data.paginationInfo.currentPageNo+1;
        } else {
            chartClass.dataCollectionCurrentPage = data.paginationInfo.currentPageNo;
        }
        sendData = {
            ramblyList: jsTreeClass.arraySelectBasic, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            pageIndex: chartClass.dataCollectionCurrentPage,
            pageUnit: 17
        }

        $(".chart_column2_screen").show();
        commonClass.fnAjaxCallback("/getDataCollectionList.do", sendData, function (data) {
            $(".chart_column2_screen").hide();
            chartClass.dataCollectionPaginationInfo = data.paginationInfo;
            chart_column2(data)
        },'post'); // 데이터 수집 현황

        agentClass.fnAjaxMainAreaData();

        // 광역도시 이외에 도시가 선택되었는지 체크
        var c = _.difference(jsTreeClass.arraySelectedData, chartClass.dataAreaArray);
        if(c.length > 0) {
            chartClass.fnButtonRightEnable();
        }
    },
    fnPrevLeftProc: function() {

        if(jsTreeClass.arraySelectWide.length == 0) {
            return;
        }

        // 이전 버튼 공통
        var arrayDataType = [];
        var data = {};
        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        data.paginationInfo = chartClass.dataColumn1PaginationInfo;
        if(2 <= data.paginationInfo.currentPageNo) {
            chartClass.dataColumn1CurrentPag = data.paginationInfo.currentPageNo-1;
        } else {
            chartClass.dataColumn1CurrentPag = data.paginationInfo.currentPageNo;
        }
        var sendData = {
            ramblyList: jsTreeClass.arraySelectWide, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            month: this.monthText || 1,
            pageIndex: chartClass.dataColumn1CurrentPag,
            pageUnit: 17
        }
        $("#chart_column_1").css("visibility", "visible");
        commonClass.fnAjaxCallback("/getTotalAvgReqCntList.do", sendData, function (data) {
            $("#chart_column_1").css("visibility", "hidden");
            chartClass.dataColumn1PaginationInfo = data.paginationInfo;
            chart_column(data)
        },'post'); // 데이터 수집 현황

        data.paginationInfo = chartClass.dataCollectionPaginationInfo;
        if(2 <= data.paginationInfo.currentPageNo) {
            chartClass.dataCollectionCurrentPage = data.paginationInfo.currentPageNo-1;
        } else {
            chartClass.dataCollectionCurrentPage = data.paginationInfo.currentPageNo;
        }
        sendData = {
            ramblyList: jsTreeClass.arraySelectWide, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            pageIndex: chartClass.dataCollectionCurrentPage,
            pageUnit: 17
        }
        $(".chart_column2_screen").show();
        commonClass.fnAjaxCallback("/getDataCollectionList.do", sendData, function (data) {
            $(".chart_column2_screen").hide();
            chartClass.dataCollectionPaginationInfo = data.paginationInfo;
            chart_column2(data)
        },'post'); // 데이터 수집 현황

        agentClass.fnAjaxMainAreaData();

        // 광역도시 이외에 도시가 선택되었는지 체크
        chartClass.fnButtonLeftEnable();
    },
    btnColumnNext: function() {
        // 지방 의회별 데이터 전송건수 다음 버튼
        this.fnNextRightProc();
    },
    btnColumnPrev: function() {
        // 지방 의회별 데이터 전송건수 이전 버튼
        this.fnPrevLeftProc();
    },
    btnNext: function() {
        // 데이터 수집 현황 다음 버튼
        this.fnNextRightProc();
    },
    btnPrev: function() {
        // 데이터 수집 현황 이전 버튼
        this.fnPrevLeftProc();
    },
    btnLeftClick: function() { // 광역 버튼
        this.fnPrevLeftProc();
    },
    btnRightClick: function() { // 기초 버튼
        this.fnNextRightProc();
    },
    fnButtonLeftEnable: function() {
        // 비활성
        $(".button-chart-column-top-right").css("background", "#38383a");
        $(".button-chart-column-top-right").css("color", "#999");
        $(".button-chart-column-top-right").css("border", "none");
        $(".button-chart-column2-top-right").css("background", "#38383a");
        $(".button-chart-column2-top-right").css("color", "#999");
        $(".button-chart-column2-top-right").css("border", "none");

        // 활성
        $(".button-chart-column-top-left").css("background", "#38383a");
        $(".button-chart-column-top-left").css("color","#fff");
        $(".button-chart-column-top-left").css("border","1px solid #fff");
        $(".button-chart-column2-top-left").css("background", "#38383a");
        $(".button-chart-column2-top-left").css("color","#fff");
        $(".button-chart-column2-top-left").css("border","1px solid #fff");
    },
    fnButtonRightEnable: function() {
        // 비활성
        $(".button-chart-column-top-left").css("background", "#38383a");
        $(".button-chart-column-top-left").css("color", "#999");
        $(".button-chart-column-top-left").css("border", "none");
        $(".button-chart-column2-top-left").css("background", "#38383a");
        $(".button-chart-column2-top-left").css("color", "#999");
        $(".button-chart-column2-top-left").css("border", "none");

        // 활성
        $(".button-chart-column-top-right").css("background", "#38383a");
        $(".button-chart-column-top-right").css("color","#fff");
        $(".button-chart-column-top-right").css("border","1px solid #fff");
        $(".button-chart-column2-top-right").css("background", "#38383a");
        $(".button-chart-column2-top-right").css("color","#fff");
        $(".button-chart-column2-top-right").css("border","1px solid #fff");
    },
    btnChartSearch: function () { // 차트 검색(회의록, 부록, 의안, 의원, 의회별)

        var arrayDataType = [];
        var data = {};

        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        if(arrayDataType.length === 0) {
            arrayDataType.push(1);
            arrayDataType.push(2);
            arrayDataType.push(3);
            arrayDataType.push(4);
        }
        data = {
            ramblyList: (function() {
                if(jsTreeClass.arraySelectWide.length == 0) {
                    return jsTreeClass.arraySelectedData;
                } else {
                    return jsTreeClass.arraySelectWide;
                }
            })(), // 의회(기초,광역,지역)
            dataTypeList: arrayDataType, // 회의록, 부록, 의안, 의원
            cntcIdList: arrayDataType, // 회의록, 부록, 의안, 의원
            month: this.monthText // 1개월
        }
        agentClass.fnAjaxMainAreaData();
        this.fnAllChartCallback(data); // 차트 데이터 호출
        var c = _.difference(jsTreeClass.arraySelectedData, chartClass.dataAreaArray);
        if(c.length > 0) {
            this.fnButtonLeftEnable();
            var d = _.intersection(jsTreeClass.arraySelectedData, chartClass.dataAreaArray);
            if(d.length == 0) {
                this.fnButtonRightEnable();
            }
        }
        if(jsTreeClass.arraySelectWide.length > 0) {
            this.fnButtonLeftEnable();
        }
    },
    fnAllChartCallback: function (sendData) {
        $(".chart_column2_screen").show();
        sendData.pageIndex = 1;
        sendData.pageUnit = 17;
        commonClass.fnAjaxCallback("/getTransactionList.do", sendData, function (data) {
            chart_scatter(data)
        },'post'); // 트랜잭션 뷰
        commonClass.fnAjaxCallback("/getTotalAvgReqCntList.do", sendData, function (data) {
            chartClass.dataColumn1PaginationInfo = data.paginationInfo;
            chart_column(data)
        },'post'); // 지방 의회별 데이터 전송건수
        commonClass.fnAjaxCallback("/getDataCollectionList.do", sendData, function (data) {
            $(".chart_column2_screen").hide();
            chartClass.dataCollectionPaginationInfo = data.paginationInfo;
            chart_column2(data)
        },'post'); // 데이터 수집 현황
    }
};

// 1회성 하드웨어 정보 호출 (서버 용량 체크)
function fnAjaxJsonpHardWareDataCall() {
    var url = "http://10.201.27.151:19081/rest/api/hardware_info.do?fnHardwareCallback=?";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        contentType:"application/json; charset=utf-8",
    });// 연계파일 저장용량 모니터링
}

// 실시간 5초 주기 시스템정보 호출
function fnAjaxJsonpSystemInfoDataCall() {
    var url = "http://10.201.27.151:19081/rest/api/system_info.do?fnSystemInfoCallback=?";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
    });
}

// 성능 이슈로 현재 서버위치에서 호출
function fnAjaxJsonSystemInfoDataCall() {

    // 아래 내용은 progressbar가 필요없기 때문에 global 옵션을 추가 함.
    var promise = $.ajax({
        url: "/getSystemInfoList.do",
        type: 'get', // default : get
        dataType: 'json',
        global: false,
        contentType: "application/json; charset=utf-8",
        data: jQuery.param({}),
    });

    promise.done(function(data){
        var chart = $('#chart_spline').highcharts();
        var series = chart.series[0];
        var series1 = chart.series[1];

        var shift = series.data.length > 5;
        var shift1 = series1.data.length > 5;

        var x = (new Date()).getTime(), // current time
            y = parseFloat(data.memList).toFixed(2);
        series.addPoint([x, parseFloat(y)], true, shift);

        var y2 = parseFloat(data.cpuList).toFixed(2);
        series1.addPoint([x, parseFloat(y2)], true, shift);
        //chart_spline();
        setTimeout(fnAjaxJsonSystemInfoDataCall, 5000);
    });
}

// 하드웨어 hdd 차트 정보 데이터
function fnHardwareCallback(d) {
    chart_bar(d);
}

// 메모리, cpu 차트 정보 데이터
function fnSystemInfoCallback(data) {

    var chart = $('#chart_spline').highcharts();
    var series = chart.series[0];
    var series1 = chart.series[1];

    var shift = series.data.length > 5;
    var shift1 = series1.data.length > 5;

    var x = (new Date()).getTime(), // current time
        y = parseFloat(data.memList).toFixed(4);
    series.addPoint([x, parseFloat(y)], true, shift);

    var y2 = parseFloat(data.cpuList).toFixed(4);
    series1.addPoint([x, parseFloat(y2)], true, shift);
    //chart_spline();
    setTimeout(fnAjaxJsonpSystemInfoDataCall, 1000);
}

function chart_spline() {

    $(function () {

        var chart = $('#chart_spline').highcharts({
            chart: {
                type: 'spline',
                defaultSeriesType: 'spline',
                events: {
                    load: fnAjaxJsonpSystemInfoDataCall
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: '서버 자원 사용현황'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: [{
                min: 0,
                max: 100,
                tickInterval: 10,
                labels: {
                    format: "{value} %"
                },
                title: {
                    text: '',
                    rotation: '360',
                },
                plotLines: [{
                    value: 1,
                    width: 1,
                    color: '#808080'
                }],
                minPadding: 0.2,
                maxPadding: 0.2
            }
            ],
            tooltip: {
                formatter: function() {
                    var points = this.points || '';
                    var template = "";
                    if(points != '') {
                        if(points.length > 1) {
                            var y = points[0].series.name + " : <span style='float:right;'>" + points[0].y + " %</span><br />";
                            y += points[1].series.name + " : <span style='float:right;'>"  + points[1].y + " %</span><br />";
                            template += '<table style="width:130px;"><tr>' +
                                '<td style="padding:0;font-size:16px;"><b>'+y+'</b></td></tr>';
                            var footer = '</table>';
                            template += footer;
                        }
                    }
                    return template;
                },
                shared: true,
                useHTML: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '메모리',
                type: 'spline',
                animation: true,
                data: []
                // data: (function () {
                //     var data = [],
                //         time = (new Date()).getTime(),
                //         i, y = 0;
                //     for (i = -19; i <= 0; i += 1) {
                //         y = y * 100;
                //         data.push({
                //             x: time + i * 500,
                //             y: y
                //         });
                //         y = 1;
                //     }
                //     return data;
                // }())
            },
            {
                name: 'CPU',
                type: 'spline',
                animation: true,
                data: []
                // data: (function () {
                //     var data = [],
                //         time = (new Date()).getTime(),
                //         i, y = 0;
                //     for (i = -19; i <= 0; i += 1) {
                //         y = y * 100;
                //         data.push({
                //             x: time + i * 1000,
                //             y: y
                //         });
                //         y = 1;
                //     }
                //     return data;
                // }())
            }]
        });
    });
}

function chart_column(ajaxData) {

    // if(commonClass.fnIsObjectNullCheck(ajaxData))
    //     return;

    var categories = _(ajaxData.list3).pluck('rasmblyNm');
    var list3 = _(ajaxData.list3).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var max = _.max(list3);

    $(function () {
        $('#chart_column').highcharts({
            chart: {
                type: 'column',
                height: '290'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '지방 의회별 데이터 전송건수 '
            },
            xAxis: {
                categories: categories,
                // visible: false,
                labels: {
                    formatter: function() {
                        return this.value;
                        // var temp = "";
                        // for (var i = 0; i < this.value.length; i++) {
                        //     temp += this.value.charAt(i) + '<br />';
                        // }
                        // return temp;
                    }
                },
                title: {
                    text: '<span style="color:#3c3c3e">1</span><br/><span style="color:#3c3c3e">1</span><br/> '
                }
            },
            yAxis: {
                min: 0,
                max: max,
                tickInterval: (function(max) {
                    if(max < 10) {
                        return 10;
                    } else {
                        max;
                    }
                })(),
                title: {
                    text: '',
                    rotation: 360,
                }
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                shared: true,
                formatter: function() {
                    var y = commonClass.fnComma(this.y);
                    var x = this.x;
                    var series_name = '최근 ' + chartClass.monthText +'개월';
                    var header = '<span style="font-size:16px">'+x+'</span><table style="width: 130px;">';
                    var template = "";
                    template += header;
                    template += '<tr><td style="color:{series.color};padding:0;font-size:16px;">'+series_name+' : </td>' +
                        '<td style="padding:0;font-size:16px;float:right;"><b>'+y+' 건</b></td></tr>';
                    var footer = '</table>';
                    template += footer;
                    return template;
                },
                useHTML: true
            },
            // plotOptions: {
            //     column: {
            //         pointPadding: 0,
            //         borderWidth: 1,
            //         dataLabels: {
            //             y: -1,
            //             enabled: true,
            //             formatter: function() {
            //                 return this.y;
            //             }
            //
            //         },
            //     }
            // },
            legend: {
                enabled: false
            },
            series: [{
                name: '최근1개월',
                data: list3
            }]
        });
    });
}

function chart_column2(ajaxData) {

    // if(commonClass.fnIsObjectNullCheck(ajaxData))
    //     return;

    var categories = _.pluck(ajaxData.list, 'rasmblyNm');
    var yData1 = _(ajaxData.list1).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var yData2 = _(ajaxData.list2).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var yData3 = _(ajaxData.list3).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var yData4 = _(ajaxData.list4).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var yData1dt = _(ajaxData.list1).pluck('dt');
    var yData2dt = _(ajaxData.list2).pluck('dt');
    var yData3dt = _(ajaxData.list3).pluck('dt');
    var yData4dt = _(ajaxData.list4).pluck('dt');

    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    _.each(yData1, function(i, e) {
        data1.push({name: commonClass.fnStringToDate(yData1dt[e] || ''),y: yData1[e] || 0});
    });
    _.each(yData2, function(i, e) {
        data2.push({name: commonClass.fnStringToDate(yData2dt[e] || ''),y: yData2[e] || 0});
    });
    _.each(yData3, function(i, e) {
        data3.push({name: commonClass.fnStringToDate(yData3dt[e] || ''),y: yData3[e] || 0});
    });
    _.each(yData4, function(i, e) {
        data4.push({name: commonClass.fnStringToDate(yData4dt[e] || ''),y: yData4[e] || 0});
    });

    $(function () {

        $('#chart_column2').highcharts({
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                formatter: function() {
                    var points = this.points;
                    var y = "";
                    if(points.length === 1) {
                        y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 (" + points[0].key + ")</span><br />";
                    } else if (points.length === 2) {
                        y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 (" + points[0].key + ")</span><br />";
                        y += points[1].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[1].y) + " 건 (" + points[1].key + ")</span><br />";
                    } else {
                        y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 (" + points[0].key + ")</span><br />";
                        y += points[1].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[1].y) + " 건 (" + points[1].key + ")</span><br />";
                        y += points[2].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[2].y) + " 건 (" + points[2].key + ")</span><br />";
                    }
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px">'+x+'</span><table style="width:260px;">';
                    var template = "";
                    template += header;
                    template += '<tr>' +
                        '<td style="padding:0;font-size:16px;"><b>'+y+'</b></td></tr>';
                    var footer = '</table>';
                    template += footer;
                    return template;
                },
                shared: true,
                useHTML: true
            },
            title: {
                text: '데이터 수집 현황'
            },
            // subtitle: {
            //     text: '(단위:개)'
            // },
            xAxis: {
                categories: categories,
                labels: {
                    formatter: function() {
                        return this.value;
                        // var temp = "";
                        // for (var i = 0; i < this.value.length; i++) {
                        //     temp += this.value.charAt(i) + '<br />';
                        // }
                        // return temp;
                    }
                },
                title: {
                    text: '<span style="color:#3c3c3e">1</span><br/><span style="color:#3c3c3e">1</span><br/> '
                }
            },
            yAxis: {
                min: 0,
                tickInterval: 3500,
                title: {
                    text: '',
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        pointPadding: 0,
                        borderWidth: 0,
                        y: 0,
                        enabled: false,
                        formatter: function() {
                            var temp = "";
                            for (var i = 0; i < this.x.length; i++) {
                                temp += this.x.charAt(i) + '<br />';
                            }
                            return temp;
                        }
                    }
                }
            },
            series: [{
                name: '회의록',
                data: data1
            },
            //     {
            //     name: '부록',
            //     data: data2
            //
            // },
                {
                name: '의안',
                data: data3

            }, {
                name: '의원',
                data: data4

            }
            ]
        });
    });

}

function chart_scatter(ajaxData) {

    if(commonClass.fnIsObjectNullCheck(ajaxData)){
        return;
    }

    var today = new Date();
    var mm = today.getMonth()+1; //January is 0!
    // 의원
    var list1 = ajaxData.list1;
    var arrayList1 = [];
    for (var i = 0; i < list1.length; i++) {
        var arrayData1 = {
        name: list1[i].xdata || '',
        y: parseInt(list1[i].ydata || 0)
        }
        arrayList1.push(arrayData1);
    }
    // 회의록
    var list2 = ajaxData.list2;
    var arrayList2 = [];
    for (var i = 0; i < list2.length; i++) {
        var arrayData2 = {
            name: list2[i].xdata || '',
            y: parseInt(list2[i].ydata || 0)
        }
        arrayList2.push(arrayData2);
    }
    // 부록
    var list3 = ajaxData.list3;
    var arrayList3 = [];
    for (var i = 0; i < list3.length; i++) {
        var arrayData3 = {
            name: list3[i].xdata || '',
            y: parseInt(list3[i].ydata || 0)
        }
        arrayList3.push(arrayData3);
    }
    // 의안
    var list4 = ajaxData.list4;
    var arrayList4 = [];
    for (var i = 0; i < list4.length; i++) {
        // if(parseInt(list4[i].xdata) > mm) {
        //     continue;
        // }
        var arrayData4 = {
            name: list4[i].xdata || '',
            y: parseInt(list4[i].ydata || 0)
        }
        arrayList4.push(arrayData4);
    }

    $(function () {
        $('#chart_scatter').highcharts({
            chart: {
                type: 'line',
                height: '290'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                positioner: function() {
                  return {x: 50, y: 50};
                },
                formatter: function() {
                    var points = this.points;
                    var y = "";
                    if(points.length === 1) {
                        y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건</span><br />";
                    } else if (points.length === 2) {
                        y += points[0].series.name + " :<span style='float:right;'>" + commonClass.fnComma(points[0].y) + " 건</span><br />";
                        y += points[1].series.name + " : <span style='float:right;'>" + commonClass.fnComma(points[1].y) + " 건</span><br />";
                    } else {
                        y += points[0].series.name + " : <span style='float:right;'>" + commonClass.fnComma(points[0].y) + " 건</span><br />";
                        y += points[1].series.name + " : <span style='float:right;'>" + commonClass.fnComma(points[1].y) + " 건</span><br />";
                        y += points[2].series.name + " : <span style='float:right;'>" + commonClass.fnComma(points[2].y) + " 건</span><br />";
                    }
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px; z-index:9999;">'+x+'</span><table style="width: 130px;">';
                    var template = "";
                    template += header;
                    template += '<tr>' +
                        '<td style="padding:0;font-size:16px; z-index:9999;"><b>'+y+'</b></td></tr>';
                    var footer = '</table>';
                    template += footer;
                    return template;
                },
                shared: true,
                useHTML: true
            },
            title: {
                text: '월별 데이터 항목별 수집 현황'
            },
            xAxis: {
                categories: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                title: {
                    enabled: true,
                    text: '<span style="color:#3c3c3e">1</span><br/><span style="color:#3c3c3e">1</span><br/> '
                },
                labels: {
                    format: '{value}'
                }
            },
            yAxis: {
                min: 0,
                // max: 50000,
                tickInterval: 5000,
                title: {
                    text: '',
                    rotation: 360
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 4,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: '회의록',
                    data: arrayList2
                },
                // {
                //     name: '부록',
                //     data: arrayList3
                // },
                {
                    name: '의안',
                    data: arrayList4
                },
                {
                    name: '의원',
                    data: arrayList1,
                    color: '#2772C3'
                }
            ]
        });
    });
}

function chart_bar(ajaxData) {

    if(commonClass.fnIsObjectNullCheck(ajaxData))
        return;

    $(function () {
        $('#chart_bar').highcharts({
            chart: {
                type: 'bar'
            },
            exporting: {
                enabled: false
            },
            title: {
                text: '연계파일 저장용량 모니터링'
            },
            subtitle: {
                text: ''
            },
            legend: {
              reversed: true
            },
            tooltip: {
                formatter: function() {
                    var points = this.points;
                    var y = points[1].series.name + " :<span style='float:right;'> " + commonClass.fnComma(points[1].y) + " GB</span><br />";
                    y += points[0].series.name + " :<span style='float:right;'> " + commonClass.fnComma(points[0].y) + " GB</span><br />";
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px">'+x+'</span><table style="width:150px;">';
                    var template = "";
                    template += header;
                    template += '<tr>' +
                        '<td style="padding:0;font-size:16px;"><b>'+y+'</b></td></tr>';
                    var footer = '</table>';
                    template += footer;
                    return template;
                },
                shared: true,
                useHTML: true
            },
            xAxis: {
                categories: ['/clik-cols', '/clik-data', '/clikapi-file/clik001'],
                title: {
                    text: ""
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'GB',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    },
                }
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: '남은 용량',
                    data: [parseInt(ajaxData.clikColsDiskFreeSizeGB), parseInt(ajaxData.clikDataDiskFreeSizeGB), parseInt(ajaxData.clikapiFileDiskFreeSizeGB)]
                },
                {
                    name: '사용 용량',
                    data: [parseInt(ajaxData.clikColsDiskUsableSizeGB), parseInt(ajaxData.clikDataDiskUsableSizeGB), parseInt(ajaxData.clikapiFileDiskUsableSizeGB)]
                }
                ]
        });
    });
}

/**
 * Agent 지방의회 팝업 차트
 */
function chart_bar2(rasmblyId) {

    var url = "getAreaDetailChart.do";
    var data = {
        rasmblyId: rasmblyId
    };
    commonClass.fnAjaxCallback(url, data, function (data) {

        if(commonClass.fnIsObjectNullCheck(data))
            return;

        // 차트 만들기
        $(function () {
            $('#chart_bar2').highcharts({
                chart: {
                    type: 'bar'
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '데이터 건수'
                },
                tooltip: {
                    formatter: function() {
                        var points = this.points;

                        var y = "";
                        if(points.length === 1) {
                            y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 </span><br />";
                        } else if (points.length === 2) {
                            y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 </span><br />";
                            y += points[1].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[1].y) + " 건 </span><br />";
                        } else {
                            y += points[0].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[0].y) + " 건 </span><br />";
                            y += points[1].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[1].y) + " 건 </span><br />";
                            y += points[2].series.name + " : <span style='float:right;'> " + commonClass.fnComma(points[2].y) + " 건 </span><br />";
                        }
                        var header = '<span style="font-size:16px">데이터 건수</span><table style="width:150px;">';
                        var template = "";
                        template += header;
                        template += '<tr>' +
                            '<td style="padding:0;font-size:16px;"><b>'+y+'</b></td></tr>';
                        var footer = '</table>';
                        template += footer;
                        return template;
                    },
                    shared: true,
                    useHTML: true
                },
                xAxis: {
                    categories: ['회의록', '부록', '의안', '의원'],
                    labels: {
                        formatter : function() {
                            var template = this.chart.series[0].name + "<br />";
                            template += this.chart.series[1].name + "<br />";
                            template += this.chart.series[2].name + "<br />";
                            return template
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'

                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: (data.list.x1) ? "회의록" : data.list.x1,
                    data: [parseInt(data.list.y1)]
                },
                //     {
                //     name: (data.list.x1) ? "부록" : data.list.x2,
                //     data: [parseInt(data.list.y2)]
                // },
                {
                    name: (data.list.x1) ? "의안" : data.list.x3,
                    data: [parseInt(data.list.y3)]
                }, {
                    name: (data.list.x1) ? "의원" : data.list.x4,
                    data: [parseInt(data.list.y4)]
                }]
            });
        });
    });
}