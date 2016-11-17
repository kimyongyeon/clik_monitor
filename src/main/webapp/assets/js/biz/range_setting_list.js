// 환경설정
var v_table_list = new Vue({
    el: '#tpl-table-list',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_table_list, 'items', data.list);
                $("#myTable3 img").hide();
            },'post');
        }
    }
});

$(window).resize(function() {
    // 로그 데이터 팝업 가운데 정렬
    commonClass.fnMiddleAlignSet('.logData');
});


var onCreateClass = {
    init: function() {
        
        commonClass.init(); // 공통함수 초기화
        commonClass.fnLogDataList(1);

        commonClass.fnErrorListCloseFlag = false;

        this.btnSearch();
        //  상세화면
        $('#myTable3').delegate('.toggle', 'click' ,function(){
            $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').find('td').toggle();
            return false;
        });
        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());
        this.fnDateToday();
        
        commonClass.fnMenuStyle("range");

        // 로그 데이터 팝업 가운데 정렬
        commonClass.fnMiddleAlignSet('.logData');
    },
    fnDetail: function(rasmblyId) {
        location.href = "/range_setting_edit.do?rasmblyId=" + rasmblyId;
    },
    btnExcelSave: function() {
        var data = this.fnSearchCodition();
        data = jQuery.param(data) + "&keyWordType=2";
        location.href = "/excelDownload.do?" + data;
    },
    btnSearch: function() {
        this.fnAjaxTableList();
    },
    btnEvent: function() {
        commonClass.fnLogDataList(1);
        $(".popup").show();
    },
    fnDateToday: function() {
        commonClass.fnToday("datepicker", 0);
    },
    fnDateWeek: function () {
        commonClass.fnToday("datepicker", -7);
    },
    fnDateMonth: function() {
        commonClass.fnToday("datepicker", -30);
    },
    fnPopupSave: function() { // 저장 확인 팝업
        $(".savePop").show();
    },
    fnSearchCodition: function() {
        var brtcCode = v_combo_data_list.brtcCode || ''; // 기관유형
        var insttClCode = v_combo_data_list.insttClCode || ''; // 지역선택
        var loasmCode = $('select[name=loasmCode] option:selected').val() || ''; // 지방의회선택
        var keyWordSub = "1";

        if (brtcCode !== "") { // 기관유형
            keyWordSub = '1';
        }
        if (insttClCode !== "") { // 지역 선택시
            keyWordSub = '2';
        }
        if (loasmCode !== "") { // 지방의회
            keyWordSub = '3';
        }

        var data = {
            brtcCode: brtcCode || 'intsttcl_000024',
            insttClCode: insttClCode,
            loasmCode: loasmCode,
            keyWordSub: keyWordSub
        };
        return data;
    },
    fnAjaxTableList: function() {
        var url = "getRangeSettingList.do";
        //var brtcCode = $('select[name=brtcCode] option:selected').val(); //
        var sdata = this.fnSearchCodition();
        v_table_list.fetchData(url, sdata);
    },
    btnOn: function() {
        $(".error-button > .on").removeClass('btn-disabled');
        $(".error-button > .on").addClass('btn-enabled');

        $(".error-button > .off").removeClass('btn-enabled');
        $(".error-button > .off").addClass('btn-disabled');

        commonClass.setCookieExdays("popup_check", true, 365);
    },
    btnOff: function() {
        $(".error-button > .off").removeClass('btn-disabled');
        $(".error-button > .off").addClass('btn-enabled');

        $(".error-button > .on").removeClass('btn-enabled');
        $(".error-button > .on").addClass('btn-disabled');

        commonClass.setCookieExdays("popup_check", false, 365);
    }
};