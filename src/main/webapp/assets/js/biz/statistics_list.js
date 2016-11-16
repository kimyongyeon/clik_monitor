// 프로그레스 바
// $(document).ajaxStart(function () {
//     $.blockUI({
//         css: {
//             border: 'none',
//             padding: '15px',
//             '-webkit-border-radius': '10px',
//             '-moz-border-radius': '10px'
//         }
//     });
// });
//
// $(document).ajaxStop(function () {
//     $.unblockUI();
// });
// 프로그레스 바

// 의회별 전송 데이터
var v_table_list_1 = new Vue({
    el: '#tpl-table-list-1',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            $(".full_screen_loding").show();
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_table_list_1, 'items', data);
                $(".full_screen_loding").hide();
            },'post');
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        }
    }
});

// 항목별 최종전송 데이터
var v_table_list_2 = new Vue({
    el: '#tpl-table-list-2',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            $(".full_screen_loding").show();
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_table_list_2, 'items', data)
                $(".full_screen_loding").hide();
            },'post');
        },
        isNullCheck: function(str) {
            if (str == 'null') {
                console.log(str);
                return '';
            } else if (str == '-- ::') {
                console.log(str);
                return '';
            } else {
                console.log(str);
                return str;
            }
        }
    }
});

var onCreateClass = {
    
    init: function() {
        commonClass.init(); // 콤보박스 데이터 초기화

        //달력 소스(jQuery UI)
        this.fnDateWeek();
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());

        $(".tab-search-2").hide();
        $(".tab-search-1").show();

        this.fnTabInit();
        commonClass.fnMenuStyle("stat");

        // 광역의회 선택
        onCreateClass.currentTabIndex = 1;
        this.btnSearch();

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
    excelType: 1,
    btnTabSelect: function(s) {
        this.excelType = s;
    },
    btnExcelSave: function() {
        var data = this.fnSearchCodition();

        if(this.excelType === 1) {
            data = jQuery.param(data) + "&keyWordType=1";
        } else {
            data = jQuery.param(data) + "&keyWordType=5";
        }
        location.href = "/excelDownload.do?" + data; // 의회별
    },
    btnSearch: function() {
        if (onCreateClass.currentTabIndex==1){
            this.fnAjaxTab1List(); // 의회별 전소 데이터 호출
        } else {
            this.fnAjaxTab2List(); // 항목별 최종전송 데이터 호출
        }


    },
    currentTabIndex: 0,
    fnTabInit: function() {
        // /*통계관리 테이블*/
        var tab001 = $(".listTab01");
        var tab002 = $(".listTab02");

        tab001.addClass("active");
        tab002.removeClass("active");

        $("#myTable").show();
        $("#myTable2").hide();

        $(tab001).on("click", function (e) {

            tab001.addClass("active");
            tab002.removeClass("active");

            $("#myTable").show();
            $("#myTable2").hide();
            $(".tab-search-2").hide();
            $(".tab-search-1").show();

            onCreateClass.currentTabIndex = 1;
        });

        $(tab002).on("click", function (e) {

            tab002.addClass("active");
            tab001.removeClass("active");

            $("#myTable").hide();
            $("#myTable2").show();
            $(".tab-search-1").hide();
            $(".tab-search-2").show();

            onCreateClass.currentTabIndex = 2;

        });
    },
    fnSearchCodition: function() {
        var brtcCode = $('select[name=brtcCode] option:selected').val() || 'intsttcl_000023'; // 기관유형
        var insttClCode = $('select[name=insttClCode] option:selected').val() || ''; // 지역선택
        var loasmCode = $('select[name=loasmCode] option:selected').val() || ''; // 지방의회선택
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        if(startDate != '') {
            startDate = startDate.replace(/-/gi,'');
        }
        if(endDate != '') {
            endDate = endDate.replace(/-/gi,'');
        }

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
            brtcCode: brtcCode,
            insttClCode: insttClCode,
            loasmCode: loasmCode,
            keyWordSub: keyWordSub,
            startDate: startDate,
            endDate: endDate
        };
        return data;
    },
    fnAjaxTab2List: function() { // 항목별 최종전송 데이터
        var url = "getTabList2.do";
        var brtcCode = v_combo_data_list.brtcCode || ''; // 기관유형
        var insttClCode = v_combo_data_list.insttClCode || ''; // 지역선택
        if(brtcCode == "") {
            alert("기관유형을 선택하세요.");
            $('select[name=brtcCode]').focus();
            return;
        }
        // if(insttClCode == "") {
        //     alert("지역선택을 선택하세요.");
        //     $('select[name=insttClCode]').focus();
        //     return;
        // }
        var data = this.fnSearchCodition();
        v_table_list_2.fetchData(url, data);
    },
    fnAjaxTab1List: function() { // 의회별전송데이터
        var url = "getTabList1.do";
        var brtcCode = v_combo_data_list.brtcCode || ''; // 기관유형
        var insttClCode = v_combo_data_list.insttClCode || ''; // 지역선택

        if(brtcCode == "") {
            alert("기관유형을 선택하세요.");
            $('select[name=brtcCode]').focus();
            return;
        }
        // if(insttClCode == "") {
        //     alert("지역선택을 선택하세요.");
        //     $('select[name=insttClCode]').focus();
        //     return;
        // }
        var data = this.fnSearchCodition();
        v_table_list_1.fetchData(url, data);
    }
}