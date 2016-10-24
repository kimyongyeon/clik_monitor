var onCreateClass = {
    init: function() {
        commonClass.init(); // 콤보박스 데이터 초기화
        commonClass.fnErrorLogListClose(); // 에러목록페이지 닫기
    },
    fnInsert: function() { // 등록 팝업
        $(".uploadPop").css("display", "block");
    },
    fnCancel: function() { // 취소
        location.href = "/range_setting_list.do";
    },
    fnInertProc: function() { // 등록 처리
        var url = "getRangeSettingRegProc.do";
        var rasmblyId = $("select[name=loasmCode] option:selected").val() || ''; // 지방의회
        var setInterval = $("#setInterval").val() || 0; // 응답시간
        var reqProcessingRatio = $("#reqProcessingRatio").val() || 0; // 서비스 요청 처리율
        var data = {
            rasmblyId: rasmblyId
            , setInterval:setInterval
            , reqProcessingRatio:reqProcessingRatio
        };
        //console.log(data);
        commonClass.fnAjaxCallback(url, data, function(data){
            //console.log(data);

            if(data === 201) {
                // 팝업 닫기
                onCreateClass.fnPopupClose();
                // UI 초기화
                onCreateClass.fnUiInit();
                var result = confirm("목록 화면으로 이동하겠습니까?");
                if(result) {
                    commonClass.page_go("range");
                }
            }

        }, "post");
    },
    fnPopupClose: function() {
        $(".uploadPop").css("display", "none");
    },
    fnUiInit: function() {
        $("select[name=loasmCode]").val('');
        $("#setInterval").val('');
        $("#reqProcessingRatio").val('');
    }
}