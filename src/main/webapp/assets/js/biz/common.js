var v_combo_data_list = new Vue({
    el: '#tpl_commbo_list',
    data: {
        commonList_1: [],
        commonList_2: [],
        commonList_3: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                if(url == '/getBrtcCodeList.do') {
                    Vue.set(v_combo_data_list, 'commonList_1', data);
                }
                if(url == '/getInsttClCodeList.do') {
                    Vue.set(v_combo_data_list, 'commonList_2', data);
                }
                if(url == '/getLoasmInfo.do') {
                    Vue.set(v_combo_data_list, 'commonList_3', data);
                }
            });
        }
    }
});

var v_log_data_list = new Vue({
    el: '#tpl-log-data-list',
    data: {
        items: [],
        prev : false,
        firstPageNoOnPageList : 0,
        lastPageNoOnPageList : 0,
        next : false,
        page : 0,
        prevPage : 0,
        nextPage : 0
    },
    methods: {
        fetchData: function(url, data, page){
            commonClass.fnAjaxCallback(url, data, function(data){
                var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
                var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
                var recordCountPerPage = data.paginationInfo.recordCountPerPage;
                var totalRecordCount = data.paginationInfo.totalRecordCount;
                var prev = firstPageNoOnPageList === 1 ? false : true;
                var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;
                Vue.set(v_log_data_list, 'items', data.list);
                Vue.set(v_log_data_list, 'firstPageNoOnPageList', firstPageNoOnPageList - 1);
                Vue.set(v_log_data_list, 'lastPageNoOnPageList', lastPageNoOnPageList);
                Vue.set(v_log_data_list, 'prev', prev);
                Vue.set(v_log_data_list, 'next', next);
                Vue.set(v_log_data_list, 'page', page);
                Vue.set(v_log_data_list, 'prevPage', firstPageNoOnPageList - 1);
                Vue.set(v_log_data_list, 'nextPage', lastPageNoOnPageList + 1);
            });
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        },
        dataFormat: function(strDate) {
            return commonClass.fnStringToDate(strDate);
        },
        activeOn: function(event) {
            var par = $(event.target).parent();
            $(".log-row").css("background", "");
            par.css("background", "red");
        }
    }
});

var v_log_data_detail = new Vue({
    el: '#tpl-log-data-detail',
    data: {
        item: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_log_data_detail, 'item', data);
                $(".logData").addClass("openPop");
            });
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        },
        dataFormat: function(strDate) {
            return commonClass.fnStringToDate(strDate);
        }
    }
});

var commonClass = {
    init: function() { // 초기화
        this.fnAjaxBrtcCodeList(); // 기관유형
        this.fnErrorLogListClose(); // 에러목록페이지 닫기

        var option = {
            beforeSubmit : function() {
                alert('서브밋 직전입니다!');
            },
            success : function() {
                alert('전송 성공!');
            }
        };
        $("#apiServerUpdateForm").ajaxForm(option);

        $(".log-row").css("cursor", "pointer");
        $(".log-row").on("click", function () {
            $(".log-row").css("background", "");
            $(this).css("background", "red");
        });

    },
    mainInit: function() {
        this.tabsInit(); // 통계관리 탭 초기화
    },
    fnIsObjectNullCheck: function(data) {
        // true : null, false : not null
        return Object.keys(data).length === 0;
    },
    tabCurrentIdx : "1",
    fnAgentStart : function(){
        var rasmblyId = $("#rasmblyId").val();
        $("#rasmblyCode").val(rasmblyId);
        $("#cmmndCode").val("REQ001");
        $("#apiServerUpdateForm").submit();
    },
    fnAgentEnd : function(){
        var rasmblyId = $("#rasmblyId").val();
        $("#rasmblyCode").val(rasmblyId);
        $("#cmmndCode").val("REQ002");
        $("#apiServerUpdateForm").submit();

    },
    fnAgentRollback : function(){
        alert("Agent 구동을 롤백을 요청 합니다.");
        // TODO: 차후 개발 해야 함.
    },
    fnAgentUpdate : function(){
        $(".agent-update-layer-popup").show();
    },
    fnAgentSetProc: function() {
        var rasmblyId = $("#rasmblyId").val();
        $("#rasmblyCode").val(rasmblyId);
        $("#apiServerUpdateForm").submit();
    },
    fnAgentSetClose: function() {
        $(".agent-update-layer-popup").hide();
    },
    fnMemoReg: function() {
        var rasmblyId = $("#rasmblyId").val();
        $("#rasmblyCode").val(rasmblyId);
        $("#memo").val($("#note").val());
        $("#cmmndCode").val("NOTE_UPDATE");
        $("#apiServerUpdateForm").submit();
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
    fnAjaxCallback: function(url, data, callback, type) {
        type = type || 'GET';
        type = type.toUpperCase();

        var deferred = $.Deferred();

        var promise = $.ajax({
            url: url,
            type: type, // default : get
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: (type === "GET") ? jQuery.param(data) : JSON.stringify(data),
            success: function(d) {
                deferred.resolve(d);
            }
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

        v_combo_data_list.fetchData(url,data);

        // this.fnAjaxCallback(url, data, function(data) {
        //     var commonList = {
        //         commonList: data
        //     };
        //     var htmlText = commonClass.getHtmlText("brtc-code-template");
        //     $("#brtc_code_div").html(htmlText(commonList)); // 기관유형 selectBox UI 만들기
        //     commonClass.fnAjaxInsttClCodeList(); // 지역선택 selectBox UI 만들기 함수 call
        // });
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

        v_combo_data_list.fetchData(url,data);

        // this.fnAjaxCallback(url, data, function(data) {
        //     var commonList = {
        //         commonList: data
        //     };
        //     var htmlText = commonClass.getHtmlText("instt-cl-code-template");
        //     $("#instt_cl_code_div").html(htmlText(commonList)); // 지역선택 selectBox UI 만들기
        //     // 초기화
        //     $('select[name=insttClCode] option:selected').val(''); // 지역선택 selectBox 초기화
        //     $('select[name=loasmCode]').attr('disabled',true); // 지방의회선택 비활성화
        //     $('select[name=loasmCode] option:selected').val(''); // 지방의회 초기화
        // },"post");
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

        v_combo_data_list.fetchData(url,data);

        // this.fnAjaxCallback(url, data, function(data) {
        //     var commonList = {
        //         commonList: data
        //     };
        //     var htmlText = commonClass.getHtmlText("loasm_code-template");
        //     // 초기화
        //     $("#loasm_code_div").html(htmlText(commonList)); // 지방의회선택 selectBox UI 만들기
        // }, 'post');
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
    /**
     * 에러정보상세
     * @param requstId
     */
    fnLogDetailData: function (requstId) {
        $(".agentServerInfo").removeClass("openPop");

        var url = "getLogDataInfo.do";
        var data = {
            requstId: requstId || ''
        };
        v_log_data_detail.fetchData(url, data);
    },
    /**
     * 에러정보상세 닫기
     */
    fnLogDataClose: function () {
        $(".logData").removeClass("openPop");
        $(".screen").css("display", "none");
    },
    /**
     * 에러정보목록
     * @param currentPage
     */
    fnLogDataList : function(page) {
        page = page || 1;
        var url = "getLogDataList.do?currentPage=" + page;
        var data = {
            "pageIndex": page
        };
        v_log_data_list.fetchData(url, data, page);
    },
    /**
     * 에러정보목록 닫기
     */
    fnErrorLogListClose: function () {
        $(".popup").hide();
    },
    fnMenuStyle: function(sel) {
        if(sel === "main") {
            $(".menu").css("color", "none");
            $(".menu_1").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(1)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        } else if (sel === 'stat') {
            $(".menu").css("color", "none");
            $(".menu_2").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(2)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        } else if (sel === 'meta') {
            $(".menu").css("color", "none");
            $(".menu_4").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(3)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        } else if (sel === 'mail') {
            $(".menu").css("color", "none");
            $(".menu_5").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(4)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        } else if (sel === 'range') {
            $(".menu").css("color", "none");
            $(".menu_3").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(5)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        } else {
            $(".menu").css("color", "none");
            $(".menu_1").css("color", "#d84d2c");
            $(".main-menu-left ul li:nth-child(1)").css("border-bottom", "5px solid rgb(255, 100, 69)");
        }
    }
};