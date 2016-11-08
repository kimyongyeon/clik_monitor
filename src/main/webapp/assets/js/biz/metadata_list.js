// 환경설정
var v_table_list = new Vue({
    el: '#tpl-table-list',
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
                Vue.set(v_table_list, 'items', data.list);
                Vue.set(v_table_list, 'firstPageNoOnPageList', firstPageNoOnPageList - 1);
                Vue.set(v_table_list, 'lastPageNoOnPageList', lastPageNoOnPageList);
                Vue.set(v_table_list, 'prev', prev);
                Vue.set(v_table_list, 'next', next);
                Vue.set(v_table_list, 'page', page);
                Vue.set(v_table_list, 'prevPage', firstPageNoOnPageList - 1);
                Vue.set(v_table_list, 'nextPage', lastPageNoOnPageList + 1);
                $("#myTable4 img").hide();
            });
        }
    }
});

var onCreateClass = {
    init: function () {

        commonClass.init();

        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());

        this.fnDateMonth();
        this.fnSearch(1);

        commonClass.fnMenuStyle("meta");

        // 검색어 입력후 엔터
        $("input").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.fnSearch();
            }
        });
        
        $("#loasm_code_div").hide();

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
    fnSearch: function(page) {
        this.fnAjaxTableList(page);
    },
    fnAjaxTableList: function(page) {

        page = page || 1;

        var url = "getMetaDataList.do";
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var region = $("#instt_cl_code_div option:selected").val(); // 지역명
        var siteNm = $("#site-title").val(); // 사이트명
        startDate = startDate.replace('-','');
        endDate = endDate.replace('-','');
        var data = {
            startDate: startDate,
            endDate: endDate,
            region: region,
            siteNm: siteNm,
            "pageIndex": page,
            "firstIndex":page
        };
        v_table_list.fetchData(url, data, page);
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