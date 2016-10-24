var onCreateClass = {
    init: function () {

        commonClass.init();

        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());

        this.fnDateToday();
        this.fnSearch();

        $(".menu").css("color", "none");
        $(".menu_4").css("color", "#d84d2c");
    },
    fnExcel: function() {
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var region = $("#instt_cl_code_div option:selected").val(); // 지역명
        var siteNm = $("#site-title").val(); // 사이트명

        var params = "?startDate=" + startDate;
        params += "&endDate=" + endDate;
        params += "&region=" + region;
        params += "&siteNm=" + siteNm;
        params += "&keyWordType=4";
        
        location.href = "/excelDownload.do" + params;
    },
    fnSearch: function() {
        this.fnAjaxTableList();
    },
    fnAjaxTableList: function() {

        var url = "getMetaDataList.do";
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var region = $("#instt_cl_code_div option:selected").val(); // 지역명
        var siteNm = $("#site-title").val(); // 사이트명
        startDate = "2015-01-01";
        var data = {
            startDate: startDate,
            endDate: endDate,
            region: region,
            siteNm: siteNm,
        };
        var selector = 'myTable4';
        commonClass.fnAjaxCallback(url, data, function(data){
            var myRecords = [];
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        "번호": data[i]['num'],
                        "지역": data[i]['area'],
                        "사이트명": data[i]['seednm'],
                        "사이트ID": data[i]['seedid'],
                        "사이트URL": data[i]['seedurl'],
                        "자료유형": data[i]['doctypeName'],
                        "게시판명": data[i]['sitenm'],
                        "게시판URL": data[i]['url'],
                        "최종등록일": data[i]['regdate'],
                    }
                );
            }
            // header 설정
            var fields =  [
                {name: "번호", type: "text", width: 50, align: "center"},
                {name: "지역", type: "text", width: 100, align: "center"},
                {name: "사이트명", type: "text", width: 255, align: "center"},
                {name: "사이트ID", type: "text", width: 50, align: "center"},
                {name: "사이트URL", type: "text", width: 300, align: "left"},
                {name: "자료유형", type: "text", width: 100, align: "center"},
                {name: "게시판명", type: "text", width: 100, align: "center"},
                {name: "게시판URL", type: "text", width: 400, align: "left"},
                {name: "최종등록일", type: "text", width: 100, align: "center"},
            ];
            commonClass.jsGridInit(selector, myRecords, fields);
        });
    },
    fnDateToday: function() {
        commonClass.fnToday("datepicker", 0);
    },
    fnDateWeek: function () {
        commonClass.fnToday("datepicker", -7);
    },
    fnDateMonth: function() {
        commonClass.fnToday("datepicker", -14);
    }
}