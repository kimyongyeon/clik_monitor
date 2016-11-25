// 메일목록
var v_mail_list = new Vue({
    el: '#tpl-mail-list',
    data: {
        items: [],
        prev : false,
        firstPageNoOnPageList : 0,
        lastPageNoOnPageList : 0,
        next : false,
        page : 0,
        prevPage : 0,
        nextPage : 0,
    },
    methods: {
        fetchData: function(url, data, page){
            commonClass.fnAjaxCallback(url, data, function(data){

                var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
                var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
                var recordCountPerPage = data.paginationInfo.recordCountPerPage;
                var totalRecordCount = data.paginationInfo.totalRecordCount;

                var totalPageCount = data.paginationInfo.totalPageCount;
                if(totalPageCount <= lastPageNoOnPageList) {
                    lastPageNoOnPageList = totalPageCount;
                } else {
                    lastPageNoOnPageList = 10;
                }

                var prev = firstPageNoOnPageList === 1 ? false : true;
                var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;
                Vue.set(v_mail_list, 'items', data.list);
                Vue.set(v_mail_list, 'firstPageNoOnPageList', firstPageNoOnPageList - 1);
                Vue.set(v_mail_list, 'lastPageNoOnPageList', lastPageNoOnPageList);
                Vue.set(v_mail_list, 'prev', prev);
                Vue.set(v_mail_list, 'next', next);
                Vue.set(v_mail_list, 'page', page);
                Vue.set(v_mail_list, 'prevPage', firstPageNoOnPageList - 1);
                Vue.set(v_mail_list, 'nextPage', lastPageNoOnPageList + 1);
                $("#myTable5 img").hide();
            });
        }
    }
});

// 발송내역
var v_send_list = new Vue({
    el: '#tpl-send-list',
    data: {
        items: [],
        prev : false,
        firstPageNoOnPageList : 0,
        lastPageNoOnPageList : 0,
        next : false,
        page : 0,
        prevPage : 0,
        nextPage : 0,
    },
    methods: {
        fetchData: function(url, data, page){
            commonClass.fnAjaxCallback(url, data, function(data){
                var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
                var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
                var recordCountPerPage = data.paginationInfo.recordCountPerPage;
                var totalRecordCount = data.paginationInfo.totalRecordCount;

                var totalPageCount = data.paginationInfo.totalPageCount;
                if(totalPageCount <= lastPageNoOnPageList) {
                    lastPageNoOnPageList = totalPageCount;
                } else {
                    lastPageNoOnPageList = 10;
                }

                var prev = firstPageNoOnPageList === 1 ? false : true;
                var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;
                Vue.set(v_send_list, 'items', data.list)
                Vue.set(v_send_list, 'firstPageNoOnPageList', firstPageNoOnPageList - 1);
                Vue.set(v_send_list, 'lastPageNoOnPageList', lastPageNoOnPageList);
                Vue.set(v_send_list, 'prev', prev);
                Vue.set(v_send_list, 'next', next);
                Vue.set(v_send_list, 'page', page);
                Vue.set(v_send_list, 'prevPage', firstPageNoOnPageList - 1);
                Vue.set(v_send_list, 'nextPage', lastPageNoOnPageList + 1);
                $("#myTable4 img").hide();
            });
        },
        dataFormat: function(strDate) {
            return commonClass.fnStringToDate(strDate);
        }
    }
});

var onCreateClass = {
    init: function () {

        commonClass.fnErrorLogListClose(); // 에러목록페이지 닫기
        
        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());
        $("#datepicker21, #datepicker22").datepicker(commonClass.fnDatePickerUiInit());

        this.fnDateMonth_30(); // 1개월
        this.fnDateMonth2_30(); // 1개월

        // 검색
        this.btnSearch(); // 발송내역
        this.btnMailListSearch(); // 메일목록
        // 의회 목록
        this.fnAjaxAreaList();

        // 발송내역
        $("#keyWordText").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.btnSearch();
            }
        });

        // 메일목록
        $("#keyWordText2").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.btnMailListSearch();
            }
        });
        // 모든 input 엔터
        $("input").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
            }
        });
        // 메뉴 바 설정
        commonClass.fnMenuStyle("mail");
        // 탭 초기화
        this.mailInit(); // 메일링관리 탭 초기화

    },
    btnSearch: function() { // 발송내역 검색
        this.fnAjaxTableList(1);
    },
    btnMailListSearch: function() { // 메일목록 검색
        this.fnAjaxTableMailList(1);
    },
    fnAjaxAreaList: function() {
        var url = "getJstree.do";
        var data = {};
        commonClass.fnAjaxCallback(url, data, function(data){

            // 광역
            var example1 = new Vue({
                el: '#areas',
                data: {
                    wide: data.wide
                }
            });
            // 기초
            var example2 = new Vue({
                el: '#areas2',
                data: {
                    basic: data.basic
                }
            });
            onCreateClass.fnAllChecked();
        });
    },
    fnAllChecked: function() {
      
        // 광역의회  
        $("#chkAll1").on("click", function(){

            if($(this).filter(":checked").val()) {
                $("#areas1_div").find(':checkbox').prop("checked", true);
            } else {
                $("#areas1_div").find(':checkbox').prop("checked", false);
            }
        });
        
        // 기초의회  
        $("#chkAll2").on("click", function(){
            if($(this).filter(":checked").val()) {
                $("#areas2_div").find(':checkbox').prop("checked", true);
            } else {
                $("#areas2_div").find(':checkbox').prop("checked", false);
            }
        });
    },
    btnExcelSave: function() {
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var keyWordType = $("select[name=keyWordType] option:selected").val(); // 검색항목
        var keyWordText = $("#keyWordText").val(); // 검색명
        if(startDate != '') {
            startDate = startDate.replace(/-/gi,'');
        }
        if(endDate != '') {
            endDate = endDate.replace(/-/gi,'');
        }
        var data = {
            startDate: startDate,
            endDate: endDate,
            keyWordText: keyWordText || '',
            keyWordSub: keyWordType || '',
            pageIndex: this.currentPage,
            pageUnit:10,
            keyWordType:3
        };
        location.href = "/excelDownload.do?" + jQuery.param(data);
    },
    currentPage: 1,
    fnAjaxTableList: function(page) { // 발송 내역

        page = page || 1;
        this.currentPage = page;

        var url = "getMailList.do";
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var keyWordType = $("select[name=keyWordType] option:selected").val(); // 검색항목
        var keyWordText = $("#keyWordText").val(); // 검색명
        if(startDate != '') {
            startDate = startDate.replace(/-/gi,'');
        }
        if(endDate != '') {
            endDate = endDate.replace(/-/gi,'');
        }
        var data = {
            startDate: startDate,
            endDate: endDate,
            keyWordText: keyWordText,
            keyWordSub: keyWordType,
            "pageIndex": page,
            "pageUnit":10
        };
        v_send_list.fetchData(url, data, page);
    },
    fnAjaxTableMailList: function(page) { // 메일 목록

        page = page || 1;

        var url = "getMailSetList.do";
        var startDate = $("#datepicker21").val();
        var endDate = $("#datepicker22").val();
        var keyWordType = $("select[name=keyWordType2] option:selected").val(); // 검색항목
        var keyWordText = $("#keyWordText2").val(); // 검색명
        var data = {
            startDate: startDate,
            endDate: endDate,
            keyWordText: keyWordText,
            keyWordSub: keyWordType,
            "pageIndex": page,
            "pageUnit":10
        };
        v_mail_list.fetchData(url, data, page);
    },
    mailInit: function() {
        /*메일링 관리*/
        var tab0001 = $(".listTab01");
        var tab0002 = $(".listTab02");
        var tab0003 = $(".listTab03");
        $(".mail_list").show();
        $(".send_list").hide();
        $(".mail_set").hide();
        $(tab0003).addClass("active");

        // 발송내역
        $(tab0001).on("click", function (e) {
            e.preventDefault();
            $(tab0001).addClass("active");
            $(tab0002).removeClass("active");
            $(tab0003).removeClass("active");

            $(".mail_list").hide();
            $(".send_list").show();
            $(".mail_set").hide();

            onCreateClass.fnAjaxTableList(1);

        });

        // 메일설정
        $(tab0002).on("click", function (e) {
            e.preventDefault();

            $("#receiver").val("");
            $("#mailTitle").val("");
            $("#emailId").val("");
            $("#areas").val("");
            $("#areas2").val("");
            
            $(tab0002).addClass("active");
            $(tab0001).removeClass("active");
            $(tab0003).removeClass("active");
            $(".mail_list").hide();
            $(".send_list").hide();
            $(".mail_set").show();

            $("#btn-mail-set-delete").hide();
        });

        // 메일목록
        $(tab0003).on("click", function (e) {
            e.preventDefault();
            $(tab0003).addClass("active");
            $(tab0001).removeClass("active");
            $(tab0002).removeClass("active");
            $(".mail_list").show();
            $(".send_list").hide();
            $(".mail_set").hide();

            onCreateClass.fnAjaxTableMailList(1);
        });

    },
    fnList: function() {
        var tab0003 = $(".listTab03");
        var tab0001 = $(".listTab01");
        var tab0002 = $(".listTab02");
        $(tab0003).addClass("active");
        $(tab0001).removeClass("active");
        $(tab0002).removeClass("active");
        $(".mail_list").show();
        $(".send_list").hide();
        $(".mail_set").hide();
    },
    fnDetail: function(m) {

        $("#receiver").val(m.receiver);
        $("#mailTitle").val(m.title);
        $("#emailId").val(m.emailId);

        var array = m.rasmlyIds.split(",");

        $("#areas option").each(function()
        {
            var str = $(this).val() + "";
            str = str.substr(0, 3);
            var str2 = array[0] + "";
            str2 = str2.substr(0, 3);
            if(str === str2) {
                $("#areas").val($(this).val());
                return;
            }
        });
        // $("#areas").val(array[0]);
        $("#areas2").val(array[0]);

        var tab0003 = $(".listTab03");
        var tab0001 = $(".listTab01");
        var tab0002 = $(".listTab02");
        $(tab0003).removeClass("active");
        $(tab0001).removeClass("active");
        $(tab0002).addClass("active");

        $(".mail_list").hide();
        $(".send_list").hide();
        $(".mail_set").show();
        $("#btn-mail-set-delete").show();
    },
    fnDateMonth_30: function() {
        commonClass.fnToday("datepicker", -30);
    },
    fnDateMonth_60: function () {
        commonClass.fnToday("datepicker", -90);
    },
    fnDateMonth_90: function() {
        commonClass.fnToday("datepicker", -180);
    },
    fnDateMonth2_30: function() {
        commonClass.fnToday2("datepicker", -30);
    },
    fnDateMonth2_60: function () {
        commonClass.fnToday2("datepicker", -90);
    },
    fnDateMonth2_90: function() {
        commonClass.fnToday2("datepicker", -180);
    },
    fnPopupSave: function() { // 저장 확인 팝업
        $("#insertPopup").show();
    },
    fnPopupDel: function() { // 삭제 확인 팝업
        $("#deletePopup").show();
    },
    fnSaveProc: function() { // DB 저장

        var url = "getMailSettingSaveProc.do";
        var areas1 = [];
        var areas2 = [];

        var emailId = $("#emailId").val() || '';
        var receiver = $("#receiver").val() || '';
        var title = $("#mailTitle").val()  || '';

        areas1.push($("#areas option:selected").val());
        areas2.push($("#areas2 option:selected").val());

        if(receiver == '') {
            alert("이메일은 필수 항목 입니다.");
            $("#receiver").focus();
            $("#insertPopup").hide();
            return;
        }
        if(title == '') {
            alert("제목은 필수 항목 입니다.");
            $("#mailTitle").focus();
            $("#insertPopup").hide();
            return;
        }
        if(areas1 == '' && areas2 == '' ) {
            alert("기초의회, 광역의회는 필수 항목 입니다.");
            $("#areas").focus();
            $("#insertPopup").hide();
            return;
        }
        if(areas1 != '' && areas2 != '' ) {
            alert("기초의회, 광역의회는 하나만 선택 가능 합니다.");
            $("#areas").focus();
            $("#insertPopup").hide();
            return;
        }

        if(areas1[0] == '') {
            areas1[0] = "Fail";
        }
        if(areas2[0] == '') {
            areas2[0] = "Fail";
        }

        var data = {
            emailId: emailId || 0, // 이메일시컨스
            receiver: receiver, // 받는사람
            title: title, // 제목
            areas1: areas1, // 광역
            areas2: areas2, // 기초
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            $("#insertPopup").hide();

            onCreateClass.fnList();
            onCreateClass.fnAjaxTableMailList(1);

        }, "post");
    },
    fnDelProc: function() { // 삭제 처리
        var url = "getMailSettingDelProc.do";
        var emailId = $("#emailId").val() || '';
        var data = {
            emailId: emailId || 0 // 이메일시컨스
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            $("#deletePopup").hide();
            onCreateClass.fnList();
            onCreateClass.fnAjaxTableMailList(1);
        }, "post");
    },
    fnCancel: function() { // 저장 취소
        $("#insertPopup").hide();
        $("#deletePopup").hide();
    }
}