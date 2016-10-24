var onCreateClass = {
    init: function() {
        
        commonClass.init(); // 공통함수 초기화 
        
        this.btnSearch();
        //  상세화면
        $('#myTable3').delegate('.toggle', 'click' ,function(){
            $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').find('td').toggle();
            return false;
        });
        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());
        this.fnDateToday();
        $(".menu").css("color", "none");
        $(".menu_3").css("color", "#d84d2c");
    },
    btnExcelSave: function() {
        location.href = "/excelDownload.do?keyWordType=2";
    },
    btnSearch: function() {
        this.fnAjaxTableList();
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
    fnPopupSave: function() { // 저장 확인 팝업
        $(".savePop").show();
    },
    fnSearchCodition: function() {
        var brtcCode = $('select[name=brtcCode] option:selected').val() || ''; // 기관유형
        var insttClCode = $('select[name=insttClCode] option:selected').val() || ''; // 지역선택
        var loasmCode = $('select[name=loasmCode] option:selected').val() || ''; // 지방의회선택
        var keyWordType = "1";

        if (brtcCode !== "") { // 기관유형
            keyWordType = '1';
        }
        if (insttClCode !== "") { // 지역 선택시
            keyWordType = '2';
        }
        if (loasmCode !== "") { // 지방의회
            keyWordType = '3';
        }

        var data = {
            brtcCode: brtcCode || 'intsttcl_000024',
            insttClCode: insttClCode,
            loasmCode: loasmCode,
            keyWordType: keyWordType
        };
        return data;
    },
    fnAjaxTableList: function() {
        var url = "getRangeSettingList.do";
        var brtcCode = $('select[name=brtcCode] option:selected').val(); // 
        var sdata = this.fnSearchCodition();
        // sdata.startDate = $("#datepicker1").val();
        // sdata.endDate = $("#datepicker2").val();
        commonClass.fnAjaxCallback(url, sdata, function(data){
            var myRecords = [];
            var selector = 'myTable3';
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        //"의회": data[i]['subRasmblyNm'],
                        "지방의회": "<a href=/range_setting_edit.do?rasmblyId="+data[i]['rasmblyId']+">" + data[i]['rasmblyNm'] + "</a>", // "&lta href=/range_setting_edit.do&gt서울특별시&lt/&gt"
                        "응답시간": data[i]['setInterval'],
                        "요청처리율": data[i]['reqProcessingRatio'],
                        "최종수정일": commonClass.fnStringToDate(data[i]['lastCntcDt']),
                    }
                );
            }
            // header 설정
            var fields =  [
                //{name: "의회", type: "text", width: 255, align: "center"},
                {name: "지방의회", type: "text", width: 100, align: "center"},
                {name: "응답시간", type: "text", width: 100, align: "center"},
                {name: "요청처리율", type: "text", width: 100, align: "center"},
                {name: "최종수정일", type: "text", width: 100, align: "center"},
            ];

            commonClass.jsGridInit(selector, myRecords, fields);
        },'post');
    }
};