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
                onCreateClass.btnSearch();
            }
        });

        $(".menu").css("color", "none");
        $(".menu_5").css("color", "#d84d2c");
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
            var areas1 = {
                areas1: data.wide
            };
            var areas2 = {
                areas2: data.basic
            };
            var htmlText = commonClass.getHtmlText("areas1-template");
            $("#areas1_div").html(htmlText(areas1)); // 광역
            var htmlText = commonClass.getHtmlText("areas2-template");
            $("#areas2_div").html(htmlText(areas2)); // 기초
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
        var selector = 'myTable4';

        commonClass.fnAjaxCallback(url, data, function(data){
            var myRecords = [];
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        "번호": data[i]['no'],
                        "제목": data[i]['title'], 
                        "발송일자": data[i]['sendDate'],
                    }
                );
            }
            // header 설정
            var fields =  [
                {name: "번호", type: "text", width: 255, align: "center"},
                {name: "제목", type: "text", width: 255, align: "center"},
                {name: "발송일자", type: "text", width: 255, align: "center"},
            ];
            commonClass.jsGridInit(selector, myRecords, fields);
        });
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
        var selector = 'myTable5';

        commonClass.fnAjaxCallback(url, data, function(data){

            var myRecords = [];
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        "번호": data[i]['no'] || '',
                        "받는사람": data[i]['receiver'] || '',
                        "제목": "<a href='#' onclick='onCreateClass.fnDetail("+JSON.stringify(data[i])+")'>" + data[i]['title']+ "</a>",
                        "지방의회": data[i]['rasmlyIds'] || '',
                        "등록일": data[i]['insertDate'] || '',
                    }
                );
            }
            // header 설정
            var fields =  [
                {name: "번호", type: "text", width: 255, align: "center"},
                {name: "받는사람", type: "text", width: 255, align: "center"},
                {name: "제목", type: "text", width: 255, align: "center"},
                {name: "지방의회", type: "text", width: 255, align: "center"},
                {name: "등록일", type: "text", width: 255, align: "center"},
            ];
            commonClass.jsGridInit(selector, myRecords, fields);
        });
    },
    fnDetail: function(m) {

        var tab0001 = $("#subRightBox .topTable .adminTab02 ul li.listTab01 a");
        var tab0002 = $("#subRightBox .topTable .adminTab02 ul li.listTab02 a");
        var tab0003 = $("#subRightBox .topTable .adminTab02 ul li.listTab03 a");

        $(tab0002).addClass("hover01");
        $(tab0001).removeClass("hover01");
        $(tab0003).removeClass("hover01");

        // $(".bottomTable > .tab04Box").hide();
        // $(".topTable > table.table03").hide();
        $(".topTable > .btnSearch01").hide();
        $(".mail_list").hide();
        // $(".bottomTable > .tab05Box").show();
        // $(".bottomTable > .tab05Box").show();

        $("#receiver").val(m.receiver);
        $("#mailTitle").val(m.title);
        $("#emailId").val(m.emailId);

        var array = m.rasmlyIds.split(",");

        $("#areas").val(array[0]);
        $("#areas2").val(array[0]);
        // $("input:checkbox").prop("checked", false);
        //
        // for (var i=0; i<array.length; i++) {
        //     $("#" + array[i]).prop("checked", true);
        // }

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
        $(".savePop").show();
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

        // 받는사람 이메일
        // $(".listTable02").find("tbody > tr").find(":checkbox").filter("[id^=chk0]").each(function(){
        //     onCreateClass.fnAjaxCheckboxDataCreate($(this), recvs);
        // });
        // // 광역의회
        // $("#areas1_div").find(":checkbox").each(function(){
        //     onCreateClass.fnAjaxCheckboxDataCreate($(this), areas1);
        // });
        // // 기초의회
        // $("#areas2_div").find(":checkbox").each(function(){
        //     onCreateClass.fnAjaxCheckboxDataCreate($(this), areas2);
        // });
        
        var emailId = $("#emailId").val();
        var receiver = $("#receiver").val();

        areas1.push($("#areas option:selected").val());
        areas2.push($("#areas2 option:selected").val());

        var data = {
            emailId: emailId || '', // 이메일아이디
            receiver: receiver, // 받는사람
            title: $("#mailTitle").val(), // 제목
            areas1: areas1, // 광역
            areas2: areas2, // 기초
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            $(".savePop").hide();
        }, "post");
    },
    fnCancel: function() { // 저장 취소
        $(".savePop").hide();
    }
}