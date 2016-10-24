var onCreateClass = {
    init: function() {
        this.fnUiInit();
        commonClass.fnErrorLogListClose(); // 에러목록페이지 닫기
    },
    fnUiInit: function() {
    },
    fnEdit: function() { // 수정
        $("#editPop").css("display", "block");
    },
    fnDelete: function() { // 삭제
        $("#delPop").css("display", "block");
    },
    fnCancel: function() { // 취소
        location.href = "/range_setting_list.do";
    },
    fnEditProc: function() {
        var url = "getRangeSettingEditProc.do";
        var rasmblyId = $("#rasmblyId").val() // 지방의회 pk
        var colgoverSetId = $("#colgoverSetId").val(); // pk
        var setInterval = $("#setInterval").val(); // 응답시간
        var reqProcessingRatio = $("#reqProcessingRatio").val(); // 서비스 요청 처리율
        var data = {
            rasmblyId: rasmblyId
            , colgoverSetId: colgoverSetId
            , setInterval:setInterval
            , reqProcessingRatio:reqProcessingRatio
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            onCreateClass.fnPopupClose(); // 팝업 닫기
            location.href = "/range_setting_list.do";
            //console.log(data);
        }, "put");
    },
    fnPopupClose: function() {
        $(".uploadPop").css("display", "none");
    },
    fnDelProc: function() {
        var url = "getRangeSettingDelProc.do";
        var rasmblyId = $("#rasmblyId").val() // 지방의회 pk
        var colgoverSetId = $("#colgoverSetId").val(); // pk
        var data = {
            rasmblyId: rasmblyId
            , colgoverSetId:colgoverSetId
        };
        commonClass.fnAjaxCallback(url, data, function(data){
            onCreateClass.fnPopupClose(); // 팝업 닫기
            //console.log(data);
        }, "delete");
    }
}