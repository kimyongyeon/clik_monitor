// 의회별 전송 데이터
var v_table_list_1 = new Vue({
    el: '#tpl-table-list-1',
    data: {
        items: []
    },
    methods: {
        fetchData: function(url, data){
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_table_list_1, 'items', data);
                $("#myTable img").hide();
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
            commonClass.fnAjaxCallback(url, data, function(data){
                Vue.set(v_table_list_2, 'items', data)
                $("#myTable2 img").hide();
            },'post');
        }
    }
});

var onCreateClass = {
    
    init: function() {
        commonClass.init(); // 콤보박스 데이터 초기화
        this.fnAjaxTab1List(); // 의회별 전소 데이터 호출
        this.fnAjaxTab2List(); // 항목별 최종전송 데이터 호출 : 처음 시작할때만!
        this.fnTabInit();
        commonClass.fnMenuStyle("stat");
    }
    ,
    excelType: 1,
    btnTabSelect: function(s) {
        this.excelType = s;
    },
    btnExcelSave: function() {
        if(this.excelType === 1) {
            location.href = "/excelDownload.do?keyWordType=1"; // 의회별
        } else {
            location.href = "/excelDownload.do?keyWordType=5"; // 항목별
        }
    },
    btnSearch: function() {
        this.fnAjaxTab1List(); // 의회별 전소 데이터 호출
    //    this.fnAjaxTab2List(); // 항목별 최종전송 데이터 호출
    },
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
        });

        $(tab002).on("click", function (e) {

            tab002.addClass("active");
            tab001.removeClass("active");

            $("#myTable").hide();
            $("#myTable2").show();
        });
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
            brtcCode: brtcCode,
            insttClCode: insttClCode,
            loasmCode: loasmCode,
            keyWordType: keyWordType
        };
        return data;
    },
    fnAjaxTab2List: function() { // 항목별 최종전송 데이터
        var url = "getTabList2.do";
        var data = this.fnSearchCodition();
        v_table_list_2.fetchData(url, data);
    },
    fnAjaxTab1List: function() { // 의회별전송데이터
        var url = "getTabList1.do";
        var data = this.fnSearchCodition();
        v_table_list_1.fetchData(url, data);
    }
}