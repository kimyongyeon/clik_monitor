// 메일목록
var v_mail_list = new Vue({
    el: '#tpl-mail-list',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_mail_list, 'items', data);
                $("#myTable5 img").hide();
            });
        }
    }
});

// 발송내역
var v_send_list = new Vue({
    el: '#tpl-send-list',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_send_list, 'items', data)
                $("#myTable4 img").hide();
            });
        }
    }
});

var onCreateClass = {
    init: function () {

        commonClass.fnErrorLogListClose(); // 에러목록페이지 닫기
        
        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());
        $("#datepicker21, #datepicker22").datepicker(commonClass.fnDatePickerUiInit());

        this.fnDateMonth();
        this.fnDateMonth2();

        // 검색
        this.btnSearch();
        this.btnMailListSearch();
        // 의회 목록
        this.fnAjaxAreaList();
        // 검색어 입력후 엔터
        $("#keyWordText").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.btnSearch();
            }
        });
        $("#keyWordText2").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.btnMailListSearch();
            }
        });
        $("input").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
            }
        });
        commonClass.fnMenuStyle("mail");

        this.mailInit(); // 메일링관리 탭 초기화

    },
    btnSearch: function() {
        this.fnAjaxTableList();
    },
    btnMailListSearch: function() {
        this.fnAjaxTableMailList();
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
        location.href = "/excelDownload.do?keyWordType=3";
    },
    fnAjaxTableList: function() {

        var url = "getMailList.do";
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var keyWordType = $("select[name=keyWordType] option:selected").val(); // 검색항목
        var keyWordText = $("#keyWordText").val(); // 검색명
        var data = {
            startDate: startDate,
            endDate: endDate,
            keyWordText: keyWordText,
            keyWordType: keyWordType
        };
        v_send_list.fetchData(url, data);
    },
    fnAjaxTableMailList: function() {

        var url = "getMailSetList.do";
        var startDate = $("#datepicker21").val();
        var endDate = $("#datepicker22").val();
        var keyWordType = $("select[name=keyWordType2] option:selected").val(); // 검색항목
        var keyWordText = $("#keyWordText2").val(); // 검색명
        var data = {
            startDate: startDate,
            endDate: endDate,
            keyWordText: keyWordText,
            keyWordType: keyWordType
        };
        v_mail_list.fetchData(url, data);
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

        $(tab0001).on("click", function (e) {
            e.preventDefault();
            $(tab0001).addClass("active");
            $(tab0002).removeClass("active");
            $(tab0003).removeClass("active");

            $(".mail_list").hide();
            $(".send_list").show();
            $(".mail_set").hide();
        });

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
        });

        $(tab0003).on("click", function (e) {
            e.preventDefault();
            $(tab0003).addClass("active");
            $(tab0001).removeClass("active");
            $(tab0002).removeClass("active");
            $(".mail_list").show();
            $(".send_list").hide();
            $(".mail_set").hide();
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
    },
    fnDateToday: function() {
        commonClass.fnToday("datepicker", 0);
    },
    fnDateWeek: function () {
        commonClass.fnToday("datepicker", -7);
    },
    fnDateMonth: function() {
        commonClass.fnToday("datepicker", -14);    
    },
    fnDateToday2: function() {
        commonClass.fnToday2("datepicker", 0);
    },
    fnDateWeek2: function () {
        commonClass.fnToday2("datepicker", -7);
    },
    fnDateMonth2: function() {
        commonClass.fnToday2("datepicker", -14);
    },
    fnPopupSave: function() { // 저장 확인 팝업
        $(".q-popup-layout").show();
    },
    fnAjaxCheckboxDataCreate: function(t, o) {
        if(t.filter(":checked").val()) { // 체크 된거
            o.push(
                {
                    name: t.filter(":checked").val(),
                    checked: true
                }
            );
        } else { // 체크 안되거
            o.push(
                {
                    name: t.val(),
                    checked: false
                }
            );
        }
    },
    fnSave: function() { // DB 저장

        var url = "getMailSettingSaveProc.do";
        var areas1 = [];
        var areas2 = [];

        var emailId = $("#receiver").val() || '';
        var title = $("#mailTitle").val()  || '';

        areas1.push($("#areas option:selected").val());
        areas2.push($("#areas2 option:selected").val());

        if(emailId == '') {
            alert("이메일은 필수 항목 입니다.");
            $("#receiver").focus();
            $(".q-popup-layout").hide();
            return;
        }
        if(title == '') {
            alert("제목은 필수 항목 입니다.");
            $("#mailTitle").focus();
            $(".q-popup-layout").hide();
            return;
        }
        if(areas1 == '' && areas2 == '' ) {
            alert("기초의회, 광역의회는 필수 항목 입니다.");
            $("#areas").focus();
            $(".q-popup-layout").hide();
            return;
        }

        var data = {
            emailId: emailId || '', // 이메일아이디
            receiver: emailId, // 받는사람
            title: title, // 제목
            areas1: areas1, // 광역
            areas2: areas2, // 기초
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            $(".q-popup-layout").hide();

            onCreateClass.fnList();

        }, "post");
    },
    fnCancel: function() { // 저장 취소
        $(".q-popup-layout").hide();
    }
}