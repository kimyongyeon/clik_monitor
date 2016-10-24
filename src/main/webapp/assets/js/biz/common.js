var console = console || {log: function() {} };
// 프로그레스 바
$(document).ajaxStart(function () {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px'
        }
    });
});

$(document).ajaxStop(function () {
    $.unblockUI();
});
// 프로그레스 바

var commonClass = {
    init: function() { // 초기화
        this.fnAjaxBrtcCodeList(); // 기관유형
        this.fnErrorLogListClose(); // 에러목록페이지 닫기
    },
    mainInit: function() {
        this.tabsInit(); // 통계관리 탭 초기화
        this.mailInit(); // 메일링관리 탭 초기화
    },
    tabCurrentIdx : "1",
    fnAgentStart : function(){
        alert("Agent 구동을 시작을 요청 합니다.");
        var url = "/insertCouncilSystemControl.do";
        var data = {
            cmmndCode: "REQ001",
            rasmblyId: $("#rasmblyId").val()
        }
        this.fnAjaxCallback(url, data, function(data) {
            alert(data);
        });
    },
    fnAgentEnd : function(){
        alert("Agent 구동을 정지를 요청 합니다.");
        var url = "/insertCouncilSystemControl.do"
        var data = {
            cmmndCode: "REQ002",
            rasmblyId: $("#rasmblyId").val()
        }
        this.fnAjaxCallback(url, data, function(data) {
            alert(data);
        });
    },
    fnAgentRollback : function(){
        alert("Agent 구동을 롤백을 요청 합니다.");
        // var url = "/insertCouncilSystemControl.do"
        // this.fnAjaxCallback(url, data, function(data) {
        //     alert(data);
        // });
    },
    fnAgentUpdate : function(){
        alert("Agent 구동을 업데이트를 요청 합니다.");
        var url = "/insertCouncilSystemControl.do"
        var data = {
            cmmndCode: "REQ003",
            rasmblyId: $("#rasmblyId").val()
        }
        this.fnAjaxCallback(url, data, function(data) {
            alert(data);
        });
    },
    fnMemoReg: function() {
        alert("메모 합니다.");
        // var url = "/insertCouncilSystemControl.do"
        // this.fnAjaxCallback(url, data, function(data) {
        //     alert(data);
        // });
    },
    tabsInit: function() {
        var tab01 = $("#sideBar > .sideBar_tabMenu > ul > li.list01 > a");
        var tab02 = $("#sideBar > .sideBar_tabMenu > ul > li.list02 > a");

        $("#rTreeBox").show();
        $("#aTreeBox").hide();
        $(tab01).addClass("hover");

        // jquery 1.7 ->
        $(tab01).on("click", function (e) {
            e.preventDefault(e);
            $(tab01).addClass("hover");
            $(tab02).removeClass("hover");

            $("#rTreeBox").show();
            $("#aTreeBox").hide();

            commonClass.tabCurrentIdx = 1;
        });

        $(tab02).on("click", function (e) {
            e.preventDefault(e);
            $(tab01).removeClass("hover");
            $(tab02).addClass("hover");

            $("#rTreeBox").hide();
            $("#aTreeBox").show();

            commonClass.tabCurrentIdx = 2;
        });
    },
    mailInit: function() {
        /*메일링 관리*/
        var tab0001 = $("#subRightBox .topTable .adminTab02 ul li.listTab01 a");
        var tab0002 = $("#subRightBox .topTable .adminTab02 ul li.listTab02 a");
        var tab0003 = $("#subRightBox .topTable .adminTab02 ul li.listTab03 a");
        // $(".bottomTable > .tab04Box").css("display", "none");
        // $(".bottomTable > .tab05Box").css("display", "none");
        // $(".topTable > .table03").css("display", "none");
        $(".mail_list").show();
        $(".send_list").hide();
        $(".mail_set").hide();
        $(tab0003).addClass("hover01");

        $(tab0001).on("click", function (e) {
            e.preventDefault();
            $(tab0001).addClass("hover01");
            $(tab0002).removeClass("hover01");
            $(tab0003).removeClass("hover01");

            $(".mail_list").hide();
            $(".send_list").show();
            $(".mail_set").hide();

            // $(".bottomTable > .tab04Box").show();
            // $(".topTable > table.table03").show();
            // $(".topTable > .btnSearch01").show();
            // $(".mail_list").hide();
            // $(".bottomTable > .tab05Box").hide();
            // $(".bottomTable > .tab05Box").hide();
        });

        $(tab0002).on("click", function (e) {
            e.preventDefault();
            $(tab0002).addClass("hover01");
            $(tab0001).removeClass("hover01");
            $(tab0003).removeClass("hover01");
            $(".mail_list").hide();
            $(".send_list").hide();
            $(".mail_set").show();

            // $(".bottomTable > .tab04Box").hide();
            // $(".topTable > table.table03").hide();
            // $(".topTable > .btnSearch01").hide();
            // $(".mail_list").hide();
            // $(".bottomTable > .tab05Box").show();
            // $(".bottomTable > .tab05Box").show();
        });

        $(tab0003).on("click", function (e) {
            e.preventDefault();
            $(tab0003).addClass("hover01");
            $(tab0001).removeClass("hover01");
            $(tab0002).removeClass("hover01");
            $(".mail_list").show();
            $(".send_list").hide();
            $(".mail_set").hide();

            // $(".bottomTable > .tab04Box").hide();
            // $(".topTable > table.table03").hide();
            // $(".topTable > .btnSearch01").hide();
            // $(".bottomTable > .tab05Box").hide();
            // $(".bottomTable > .tab05Box").hide();
        });
    },
    screenPop: function() {
        var size = $(window).height();
        $(".screen").css("height", size + "px");
        $(".screen").css("display", "block");
    },
    getHtmlText: function(templateID) {
        var templateText = $("#" + templateID).html();
        var compiledText = Handlebars.compile(templateText);
        return compiledText;
    },
    page_go: function(sel) {
        if(sel === "main") {
            location.href = "/main.do";
            return;
        } else if (sel === 'stat') {
            location.href = "/statistics_list.do";
            return;
        } else if (sel === 'range') {
            location.href = "/range_setting_list.do";
            return;
        } else if (sel === 'mail') {
            location.href = "/mail_list.do";
            return;
        } else if (sel === 'meta') {
            location.href = "/metadata_list.do";
            return;
        } else if (sel === 'range_setting_reg') {
            location.href = "/range_setting_reg.do";
            return;
        } else if (sel === 'login') {
            location.href = "/login/login.do";
            return;
        }
        else {
            location.href = "/main.do";
        }
    },
    jsGridInit: function(selector, data, fields) {
        $("#" + selector).jsGrid({
              width: "100%"
            , height: "auto"
            , sorting: true
            // , paging: true
            // , pageSize: 10
            // , pageButtonCount: 5
            , data: data
            , fields: fields
        });
    },
    fnPaging: function(currentPageNo) {
        /* ********************************************************
         * 페이징
         ******************************************************** */
        var varForm = document.listForm;
        varForm.pageIndex.value = currentPageNo;
        varForm.target = "_self";
        varForm.action = "#";
        varForm.submit();
    },
    fnAjaxCallback: function(url, data, callback, type) {
        type = type || 'GET';
        type = type.toUpperCase();
        var promise = $.ajax({
            url: url,
            type: type, // default : get
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: (type === "GET") ? jQuery.param(data) : JSON.stringify(data)
        });

        promise.done(function(data) {
            callback(data);
        });

        promise.fail(function(data){
            callback(data);
        });

        promise.always(function(data){
        });

        promise.progress(function(data){
        });
    },
    fnAjaxBrtcCodeList: function() { // 기관유형 : 공통함수에서 초기화용으로 사용하고 화면에서 호출되는 부분이 없음.
        var url = "/getBrtcCodeList.do";
        var data = {};
        this.fnAjaxCallback(url, data, function(data) {
            var commonList = {
                commonList: data
            };
            var htmlText = commonClass.getHtmlText("brtc-code-template");
            $("#brtc_code_div").html(htmlText(commonList)); // 기관유형 selectBox UI 만들기
            commonClass.fnAjaxInsttClCodeList(); // 지역선택 selectBox UI 만들기 함수 call
        });
    },
    fnAjaxInsttClCodeList: function() { // 지역선택 : 기관유형 EventHandle

        var brtcCode = $('select[name=brtcCode] option:selected').val();
        if(brtcCode === '') {
            $('select[name=insttClCode]').empty(); // 지역선택 초기화
            $('select[name=insttClCode]').append("<option value=''>지역선택</option>");
            $('select[name=loasmCode]').empty(); // 지방의회 초기화
            $('select[name=loasmCode]').append("<option value=''>지방의회선택</option>");
            return;
        }

        var url = "/getInsttClCodeList.do";
        var data = {brtcCode: 'LMC'};
        this.fnAjaxCallback(url, data, function(data) {
            var commonList = {
                commonList: data
            };
            var htmlText = commonClass.getHtmlText("instt-cl-code-template");
            $("#instt_cl_code_div").html(htmlText(commonList)); // 지역선택 selectBox UI 만들기
            // 초기화
            $('select[name=insttClCode] option:selected').val(''); // 지역선택 selectBox 초기화
            $('select[name=loasmCode]').attr('disabled',true); // 지방의회선택 비활성화
            $('select[name=loasmCode] option:selected').val(''); // 지방의회 초기화
        },"post");
    },
    fnAjaxLoasmCodeList: function() { // 지방의회선택 : 지역 EventHandle
        var url = "/getLoasmInfo.do";
        var brtcCode = $('select[name=brtcCode] option:selected').val() || '';
        var insttClCode = $('select[name=insttClCode] option:selected').val() || '';
        insttClCode = insttClCode + "";
        var data = {
            brtcCode: brtcCode.toUpperCase(),
            insttClCode: insttClCode
        };
        this.fnAjaxCallback(url, data, function(data) {
            var commonList = {
                commonList: data
            };
            var htmlText = commonClass.getHtmlText("loasm_code-template");
            // 초기화
            $("#loasm_code_div").html(htmlText(commonList)); // 지방의회선택 selectBox UI 만들기
        }, 'post');
    },
    // 당일 : fnToday(0)
    // 1주일 : fnToday(-7)
    // 2주일 : fnToday(-14)
    // 1개월 : fnToday(-30)
    // 3개월 : fnToday(-90)
    fnToday: function(select,i) {
        var today = new Date();
        today = this.fnDateFormat(today);
        var d = this.fnDateAdd(today, i);
        $("#" + select + "1").val(d);
        $("#" + select + "2").val(today);
    },
    fnToday2: function(select,i) {
        var today = new Date();
        today = this.fnDateFormat(today);
        var d = this.fnDateAdd(today, i);
        $("#" + select + "21").val(d);
        $("#" + select + "22").val(today);
    },
    fnDateAdd: function(sDate, nDays) {
        var yy = parseInt(sDate.substr(0, 4), 10);
        var mm = parseInt(sDate.substr(5, 2), 10);
        var dd = parseInt(sDate.substr(8), 10);
        d = new Date(yy, mm - 1, dd + nDays);
        yy = d.getFullYear();
        mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
        dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
        return '' + yy + '-' +  mm  + '-' + dd;
    },
    fnStringToDate: function(d) {
        var dateString = d;
        var year = dateString.substring(0,4);
        var month = dateString.substring(4,6);
        var day = dateString.substring(6,8);
        var date = this.fnDateFormat(new Date(year, month-1, day));
        return date;
        // return new Date(year, month-1, day);
    },
    // YYYY-MM-DD
    fnDateFormat: function(today) {
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd;
        return today;
    },
    fnDatePickerUiInit: function() {
        return {
            //달력 아이콘
            showOn: "button",
            buttonImage: "img/btn/calendar.gif",
            buttonImageOnly: true,
            buttonText: "Select date",

            //한글버전
            dateFormat: 'yy-mm-dd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            yearSuffix: '년'
        }
    },
    fnComma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    fnErrorLogListClose: function () {
        $(".flotingBox").hide();
    },
    /**
     * 에러정보목록
     * @param currentPage
     */
    fnLogDataList : function(page) {
       
        page = page || 1;
        var url = "getLogDataList.do?currentPage=" + page;
        var data = {};
        commonClass.fnAjaxCallback(url, data, function (data) {

            // 페이지 시작
            var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
            var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
            var recordCountPerPage = data.paginationInfo.recordCountPerPage;
            var totalRecordCount = data.paginationInfo.totalRecordCount;
            var prev = firstPageNoOnPageList === 1 ? false : true;
            var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;

            var pageHtml = "";
            if (prev) {
                var currentPage = firstPageNoOnPageList - 1;
                pageHtml += "<li><a href='#' onclick='commonClass.fnLogDataList(" + currentPage + ")'>&laquo;</a><li>";
            }

            for (var i = firstPageNoOnPageList; i < lastPageNoOnPageList; i++) {
                var currentPage = i;
                if (page === i) {
                    pageHtml += "<li class='active'><a href='#' onclick='commonClass.fnLogDataList(" + currentPage + ")'>" + i + "</a><li>";
                } else {
                    pageHtml += "<li><a href='#' onclick='commonClass.fnLogDataList(" + currentPage + ")'>" + i + "</a><li>";
                }

            }

            if (next) {
                var currentPage = lastPageNoOnPageList + 1;
                pageHtml += "<li><a href='#' onclick='commonClass.fnLogDataList(" + currentPage + ")'>&raquo;</a><li>";
            }

            $(".error_log_info_list").empty();
            $(".error_log_info_list").html(pageHtml);
            // 페이지 종료


            var htmlText = commonClass.getHtmlText("logdata_list_popup-template");

            $(".logData_list_popup").html(htmlText(data));
            $(".logData_list_popup table tr td.dateFormat").each(function (index) {
                var temp = $(this).text();
                $(this).text(commonClass.fnStringToDate(temp));
            });

            $(".log-row").on("click", function () {
                $(".log-row").css("background", "");
                $(this).css("background", "beige");
            });
        });
    }
};