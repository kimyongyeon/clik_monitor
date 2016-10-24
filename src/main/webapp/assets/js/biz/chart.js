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

        // DB연동으로 구하는 차트
        var data = {
            rasmblyId: ''
        }

        // 비활성
        $(".button-chart-cloumn-top-right").css("background", "#484848");
        $(".button-chart-cloumn-top-right").css("color", "#ababab");
        $(".button-chart-cloumn2-top-right").css("background", "#484848");
        $(".button-chart-cloumn2-top-right").css("color", "#ababab");

        // 활성
        $(".button-chart-cloumn-top-left").css("background", "#ff6445");
        $(".button-chart-cloumn-top-left").css("color: ","#fff");
        $(".button-chart-cloumn2-top-left").css("background", "#ff6445");
        $(".button-chart-cloumn2-top-left").css("color: ","#fff");
    },
    btnLeftClick: function() {
        var arrayDataType = [];
        var data = {};
        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        jsTreeClass.arraySelectedData = jsTreeClass.arrayWide;
        $(".topNemo").show();
        this.fnAgentServerInfoListShowHide();

        data = {
            ramblyList: jsTreeClass.arrayWide, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType // 회의록, 부록, 의안, 의원
        }
        this.fnAllChartCallback(data); // 차트 데이터 호출
        // 비활성
        $(".button-chart-cloumn-top-right").css("background", "#484848");
        $(".button-chart-cloumn-top-right").css("color", "#ababab");
        $(".button-chart-cloumn2-top-right").css("background", "#484848");
        $(".button-chart-cloumn2-top-right").css("color", "#ababab");

        // 활성
        $(".button-chart-cloumn-top-left").css("background", "#ff6445");
        $(".button-chart-cloumn-top-left").css("color","#fff");
        $(".button-chart-cloumn2-top-left").css("background", "#ff6445");
        $(".button-chart-cloumn2-top-left").css("color","#fff");
    },
    btnRightClick: function() {
        var arrayDataType = [];
        var data = {};
        $.each($("input[name=radioBox01]:checked"), function (idx, value) {
            arrayDataType.push($(this).val());
        });
        jsTreeClass.arraySelectedData = jsTreeClass.arrayBasic;
        $(".topNemo").hide();
        this.fnAgentServerInfoListShowHide();
        data = {
            ramblyList: jsTreeClass.arrayBasic, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType // 회의록, 부록, 의안, 의원
        }
        this.fnAllChartCallback(data); // 차트 데이터 호출
        // 비활성
        $(".button-chart-cloumn-top-left").css("background", "#484848");
        $(".button-chart-cloumn-top-left").css("color", "#ababab");
        $(".button-chart-cloumn2-top-left").css("background", "#484848");
        $(".button-chart-cloumn2-top-left").css("color", "#ababab");

        // 활성
        $(".button-chart-cloumn-top-right").css("background", "#ff6445");
        $(".button-chart-cloumn-top-right").css("color","#fff");
        $(".button-chart-cloumn2-top-right").css("background", "#ff6445");
        $(".button-chart-cloumn2-top-right").css("color","#fff");
    },
    fnAgentServerInfoListShowHide: function () {
        $("#agent_server_info_list1 ul li").hide();
        $("#agent_server_info_list2 ul li").hide();
        var dataLen = jsTreeClass.arraySelectedData.length;
        for (var i = 0; i < dataLen; i++) {
            $("#li_" + jsTreeClass.arraySelectedData[i]).show();
        }
    }, btnChartSearch: function () { // 차트 검색(회의록, 부록, 의안, 의원, 의회별)

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

        $(".topNemo").show();

        // if(jsTreeClass.arraySelectedData.length == 0) {
        //     // jsTreeClass.arraySelectedData = ['002001','051001','053001','032001','062001','042001','052001','044001','031001','033001',
        //     //     '043001','041001','063001','061001','054001','055001','064001','031012','031031','033002',
        //     //     '043012','041900','041009','063014','061012','054010','055002','055005'];
        //     // 광역
        //     jsTreeClass.arraySelectedData = ["002001", "051001", "053001", "032001", "062001", "042001", "052001", "044001", "031001", "033001", "043001", "041001", "063001", "061001", "054001", "055001", "064001"]
        // }
        this.fnAgentServerInfoListShowHide();

        data = {
            ramblyList: jsTreeClass.arraySelectedData, // 의회(기초,광역,지역)
            dataTypeList: arrayDataType // 회의록, 부록, 의안, 의원
        }
        this.fnAllChartCallback(data); // 차트 데이터 호출
    },
    fnAllChartCallback: function (sendData) {
        commonClass.fnAjaxCallback("/getTotalAvgReqCntList.do", sendData, function (data) {
            chart_cloumn(data)
        },'post'); // 지방 의회별 데이터 전송건수
        commonClass.fnAjaxCallback("/getDataCollectionList.do", sendData, function (data) {
            chart_cloumn2(data)
        },'post'); // 데이터 수집 현황
        commonClass.fnAjaxCallback("/getTransactionList.do", sendData, function (data) {
            chart_scatter(data)
        },'post'); // 트랜잭션 뷰
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

// 실시간 1초 주기 시스템정보 호출
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
            y = parseInt(data.memList || 0);
        series.addPoint([x, y], true, shift);

        var y2 = parseInt(data.cpuList || 0);
        series1.addPoint([x, y2], true, shift);
        //chart_spline();
        setTimeout(fnAjaxJsonSystemInfoDataCall, 1000); // 사용자 요구사항으로 1초에서 5초로 조정함.
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

    var x = (new Date()).getTime(), // current time
        y = parseInt(data.memList || 0);
    series.addPoint([x, y], true, true);

    var y2 = parseInt(data.cpuList || 0);
    series1.addPoint([x, y2], false, true);
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
                    load: fnAjaxJsonSystemInfoDataCall
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
                tickInterval: 150,
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
                            var y = points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "%<br />";
                            y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "%<br />";
                            template += '<table><tr>' +
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

function chart_cloumn(ajaxData) {

    var categories = _(ajaxData.list3).pluck('rasmblyNm');
    var list3 = _(ajaxData.list3).pluck('ydata').map(function (v) {
        return parseInt(v);
    });
    var max = _.max(list3);

    $(function () {
        $('#chart_cloumn').highcharts({
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '지방 의회별 데이터 전송건수 (최근1개월)'
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
                tickInterval: 30000,
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
                    var series_name = '최근1개월';
                    var header = '<span style="font-size:16px">'+x+'</span><table>';
                    var template = "";
                    template += header;
                    template += '<tr><td style="color:{series.color};padding:0;font-size:16px;">'+series_name+': </td>' +
                        '<td style="padding:0;font-size:16px;"><b>'+y+'건</b></td></tr>';
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

function chart_cloumn2(ajaxData) {

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

        $('#chart_cloumn2').highcharts({
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
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 (" + points[0].key + ")<br />";
                    } else if (points.length === 2) {
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 (" + points[0].key + ")<br />";
                        y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 (" + points[1].key + ")<br />";
                    } else {
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 (" + points[0].key + ")<br />";
                        y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 (" + points[1].key + ")<br />";
                        y += points[2].series.name + ":" + commonClass.fnComma(points[2].y) + "건 (" + points[2].key + ")<br />";
                    }
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px">'+x+'</span><table>';
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

    ajaxData.list1 = ajaxData.list1 || {};
    if ( ajaxData.list1.length == 0 ){
        return;
    }
    ajaxData.list2 = ajaxData.list2 || {};
    if ( ajaxData.list2.length == 0 ){
        return;
    }
    ajaxData.list3 = ajaxData.list3 || {};
    if ( ajaxData.list3.length == 0 ){
        return;
    }
    ajaxData.list4 = ajaxData.list4 || {};
    if ( ajaxData.list4.length == 0 ){
        return;
    }
    var today = new Date();
    var mm = today.getMonth()+1; //January is 0!
    // 의원
    var list1 = ajaxData.list1;
    var arrayList1 = [];
    for (var i = 0; i < list1.length; i++) {
        // if(parseInt(list1[i].xdata) > mm) {
        //     continue;
        // }
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
        // if(parseInt(list2[i].xdata) > mm) {
        //     continue;
        // }
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
        // if(parseInt(list3[i].xdata) > mm) {
        //     continue;
        // }
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
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                    } else if (points.length === 2) {
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                        y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 <br />";
                    } else {
                        y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                        y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 <br />";
                        y += points[2].series.name + ":" + commonClass.fnComma(points[2].y) + "건 <br />";
                    }
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px; z-index:9999;">'+x+'</span><table>';
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
                tickInterval: 50000,
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
                    data: arrayList1
                }
            ]
        });
    });
}

function chart_bar(ajaxData) {

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
                    var y = points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "GB<br />";
                    y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "GB<br />";
                    var x = this.x;
                    //var series_name =  points[0].key;
                    var header = '<span style="font-size:16px">'+x+'</span><table>';
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
                    name: '사용용량',
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
                            y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                        } else if (points.length === 2) {
                            y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                            y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 <br />";
                        } else {
                            y += points[0].series.name + ":" + commonClass.fnComma(points[0].y) + "건 <br />";
                            y += points[1].series.name + ":" + commonClass.fnComma(points[1].y) + "건 <br />";
                            y += points[2].series.name + ":" + commonClass.fnComma(points[2].y) + "건 <br />";
                        }
                        var header = '<span style="font-size:16px">데이터 건수</span><table>';
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
                    // labels: {
                    //     overflow: 'justify'
                    //
                    // }
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