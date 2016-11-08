var onCreateClass = {
    init: function() {
        this.fnUiInit();
        commonClass.fnErrorLogListClose(); // 에러목록페이지 닫기
    },
    fnUiInit: function() {
    },
    fnEditShow: function() { // 수정
        $("#q-popup-layout-edit").css("display", "block");
    },
    fnDeleteShow: function() { // 삭제
        $("#q-popup-layout-del").css("display", "block");
    },
    fnCancel: function() { // 취소
        location.href = "/range_setting_list.do";
    },
    fnEditProc: function() {
        var url = "getRangeSettingEditProc.do";
        var rasmblyId = $("#rasmblyId").val() || ''; // 지방의회 
        var colgoverSetId = $("#colgoverSetId").val() || ''; // pk
        var setInterval = $("#setInterval").val() || 0; // 응답시간
        var reqProcessingRatio = $("#reqProcessingRatio").val() || 0; // 서비스 요청 처리율

        if(rasmblyId == '') {
            alert("의회는 필수 항목 입니다.");
            $("#rasmblyId").focus();
            $("#q-popup-layout-edit").hide();
            return;
        }
        if(colgoverSetId == '') {
            alert("기본키는 필수 항목 입니다.");
            $("#colgoverSetId").focus();
            $("#q-popup-layout-edit").hide();
            return;
        }
        if(setInterval == '') {
            alert("응답시간은 필수 항목 입니다.");
            $("#setInterval").focus();
            $("#q-popup-layout-edit").hide();
            return;
        }
        if(reqProcessingRatio == '') {
            alert("서비스요청처리율은 필수 항목 입니다.");
            $("#reqProcessingRatio").focus();
            $("#q-popup-layout-edit").hide();
            return;
        }
        
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
        $(".q-popup-layout").css("display", "none");
    },
    fnDelProc: function() {
        var url = "getRangeSettingDelProc.do";
        var rasmblyId = $("#rasmblyId").val() || '';// 지방의회 pk
        var colgoverSetId = $("#colgoverSetId").val() || ''; // pk

        if(rasmblyId == '') {
            alert("의회는 필수 항목 입니다.");
            $("#rasmblyId").focus();
            $("#q-popup-layout-del").hide();
            return;
        }
        if(colgoverSetId == '') {
            alert("기본키는 필수 항목 입니다.");
            $("#colgoverSetId").focus();
            $("#q-popup-layout-del").hide();
            return;
        }
        
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