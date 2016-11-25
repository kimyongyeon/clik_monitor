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
        nextPage : 0,
        orderby : 'desc',
    },
    methods: {
        fetchData: function(url, data, page){
            $(".full_screen_loding").show();
            commonClass.fnAjaxCallback(url, data, function(data){
                $(".full_screen_loding").hide();
                if(data.status == '404') {
                    Vue.set(v_table_list, 'items', data.list);
                    Vue.set(v_table_list, 'orderby', orderby);

                    $("#myTable4 img").hide();
                    return
                }

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
        },
        isNulltoString: function(str) {
            str = str || '';
            if(str == '') {
                return '정부부처';
            }else {
                return str;
            }
            
        },
        fnOrdr: function(str) {
            this.orderby = this.orderby == "asc" ? "desc" : "asc";
            onCreateClass.fnAjaxTableList(onCreateClass.currentPage);
        }
    }
});

var onCreateClass = {
    init: function () {

        commonClass.init();

        commonClass.fnMenuStyle("meta");

        // 검색어 입력후 엔터
        $("input").keydown(function(e){
            if(e.which === 13) {
                e.preventDefault();
                onCreateClass.fnSearch();
            }
        });
        commonClass.fnAjaxInsttClCodeList();
        commonClass.fnAjaxSiteCodeList();

        //달력 소스(jQuery UI)
        $("#datepicker1, #datepicker2").datepicker(commonClass.fnDatePickerUiInit());

        this.fnDateMonth1();
        this.fnSearch(1);
    },
    fnOnchage : function() {
        commonClass.fnAjaxSiteCodeList();
    },
    fnExcel: function() {
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var region = v_combo_data_list.insttClCode || ''; // 지역선택
        var siteId = $("#siteId option:selected").val(); // 사이트명
        if(startDate != '') {
            startDate = startDate.replace(/-/gi,'');
        }
        if(endDate != '') {
            endDate = endDate.replace(/-/gi,'');
        }

        // if(region == '') {
        //     alert("지역명을 선택하세요.");
        //     $("#insttClCode").focus();
        //     return;
        // }
        // if(siteId == '') {
        //     alert("사이트명을 선택하세요.");
        //     $("#siteId").focus();
        //     return;
        // }

        var params = "?startDate=" + startDate;
        params += "&endDate=" + endDate;
        params += "&region=" + region;
        params += "&siteId=" + siteId;
        params += "&pageIndex=" + this.currentPage;
        params += "&pageUnit=" + 20;
        params += "&keyWordType=4";
        
        location.href = "/excelDownload.do" + params;
    },
    fnSearch: function(page) {
        this.fnAjaxTableList(page);
    },
    currentPage: 0,
    fnAjaxTableList: function(page) {

        page = page || 1;
        this.currentPage = page;
        
        var url = "getMetaDataList.do";
        var startDate = $("#datepicker1").val();
        var endDate = $("#datepicker2").val();
        var region = v_combo_data_list.insttClCode || ''; // 지역선택
        var siteId = $("#siteId option:selected").val(); // 사이트명

        if(startDate != '') {
            startDate = startDate.replace(/-/gi,'');
        }
        if(endDate != '') {
            endDate = endDate.replace(/-/gi,'');
        }

        if(startDate == endDate) {
            endDate = parseInt(endDate) + 1;
        }

        var data = {
            startDate: startDate,
            endDate: endDate,
            region: region,
            siteId: siteId,
            "pageIndex": page,
            "pageUnit":20,
            orderby: v_table_list.orderby
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
        commonClass.fnToday("datepicker", -30);
    },
    fnDateMonth1: function() {
        commonClass.fnToday("datepicker", -30);
    },
    fnDateMonth3: function() {
        commonClass.fnToday("datepicker", -90);
    },
    fnDateMonth6: function() {
        commonClass.fnToday("datepicker", -180);
    }
}