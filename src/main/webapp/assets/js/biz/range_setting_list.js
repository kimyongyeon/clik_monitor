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
        
        commonClass.fnMenuStyle("range");
    },
    btnExcelSave: function() {
        location.href = "/excelDownload.do?keyWordType=2";
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
        v_table_list.fetchData(url, sdata);
    }
};