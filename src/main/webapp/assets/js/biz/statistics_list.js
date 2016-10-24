var onCreateClass = {
    
    init: function() {
        commonClass.init(); // 콤보박스 데이터 초기화
        this.fnAjaxTab1List(); // 의회별 전소 데이터 호출
        this.fnAjaxTab2List(); // 항목별 최종전송 데이터 호출 : 처음 시작할때만!
        this.fnTabInit();
        $(".menu").css("color", "none");
        $(".menu_2").css("color", "#d84d2c");
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
        /*통계관리 테이블*/
        var tab001 = $("#subRightBox .topTable .adminTab01 ul li.listTab01 a");
        var tab002 = $("#subRightBox .topTable .adminTab01 ul li.listTab02 a");

        $("#myTable").css("display", "block");
        $("#myTable2").css("display", "none");
        $(tab001).addClass("hover01");

        $(tab001).on("click", function (e) {
            e.preventDefault(e);
            $(tab001).addClass("hover01");
            $(tab002).removeClass("hover01");
            // $(".table02").show(); // 검색조건

            $("#myTable").css("display", "block");
            $("#myTable2").css("display", "none");
        });

        $(tab002).on("click", function (e) {
            e.preventDefault(e);
            $(tab001).removeClass("hover01");
            $(tab002).addClass("hover01");
            // $(".table02").hide(); // 검색조건

            $("#myTable").css("display", "none");
            $("#myTable2").css("display", "block");
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
        var selector = 'myTable2';

        commonClass.fnAjaxCallback(url, data, function(data){
            var myRecords = [];
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        "지방의회": data[i]['rasmblyNm'] || '',
                        "회의록최종일자": data[i]['billMinutesFrstRegistDt'],
                        "안건최종일자": data[i]['itemFrstRegistDt'],
                        "발언최종일자": data[i]['minutesStatementFrstRegistDt'],
                        "발언답변최종일자": data[i]['minutesAnswerFrstRegistDt'],
                        "부록최종일자": data[i]['minutesAppendixFrstRegistDt'],
                        "의안최종일자": data[i]['billFrstRegistDt'],
                        "rasmblyNmNo": data[i]['rasmblyNmNo']
                    }
                );
            }
            // header 설정
            var fields =  [
                {name: "지방의회", type: "text", width: 255, align: "center"},
                {name: "회의록최종일자", type: "text", width: 255, align: "center"},
                {name: "안건최종일자", type: "text", width: 255, align: "center"},
                {name: "발언최종일자", type: "text", width: 255, align: "center"},
                {name: "발언답변최종일자", type: "text", width: 255, align: "center"},
                {name: "부록최종일자", type: "text", width: 255, align: "center"},
                {name: "의안최종일자", type: "text", width: 255, align: "center"},
                {name: "rasmblyNmNo", type: "text", width: 255, align: "center", visible: false},
            ];

            // commonClass.jsGridInit(selector, myRecords, fields);

            $("#" + selector).jsGrid({
                width: "100%"
                // , filtering: true
                , controller: {
                    loadData: function(filter) {
                        return $.grep(myRecords, function(d) {
                            return (!filter.지방의회 || d.지방의회.indexOf(filter.지방의회) > -1);
                        });
                    }
                }
                , height: "auto"
                , sorting: true
                , data: myRecords
                , fields: fields

            });
            
        },'post');
    },
    fnAjaxTab1List: function() { // 의회별전송데이터
        var url = "getTabList1.do";
        var sdata = this.fnSearchCodition();
        var selector = 'myTable';

        commonClass.fnAjaxCallback(url, sdata, function(data){
            var myRecords = [];
            for(var i=0; i<data.length; i++) {
                myRecords.push(
                    {
                        // "의회": $('select[name=brtcCode] option:selected').text(),
                        "지방의회": data[i]['rasmblyNm'] || '',
                        "대수": data[i]['numprCount'],
                        "회기": data[i]['sesnCount'],
                        "선거구": data[i]['estCount'],
                        "회의명": data[i]['mtgnmCount'],
                        "의원": data[i]['asembyCount'],
                        "의원활동": data[i]['asembyactCount'],
                        "의원직위": data[i]['ofcpsCount'],
                        "회의록": data[i]['mintsCount'],
                        "안건": data[i]['mtrCount'],
                        "발언": data[i]['spkngCount'],
                        "발언답변": data[i]['numprCount'],
                        "부록": data[i]['apndxCount'],
                        "의안정보": data[i]['asembyCount'],
                        "발의의원": data[i]['itncasembyCount'],
                        "의안파일": data[i]['bifileCount'],
                        "의안회의록": data[i]['bimintsCount'],
                        "rasmblyNmNo": data[i]['rasmblyNmNo'] || 'null'
                    }
                );
            }

            // header 설정
            var fields =  [
                // {name: "의회", type: "text", width: 150, align: "center"},
                {name: "지방의회", type: "text", width: 150, align: "center"},
                {name: "대수", type: "text", width: 150, align: "center"},
                {name: "회기", type: "text", width: 150, align: "center"},
                {name: "선거구", type: "text", width: 150, align: "center"},
                {name: "회의명", type: "text", width: 150, align: "center"},
                {name: "의원", type: "text", width: 150, align: "center"},
                {name: "의원활동", type: "text", width: 150, align: "center"},
                {name: "의원직위", type: "text", width: 150, align: "center"},
                {name: "회의록", type: "text", width: 150, align: "center"},
                {name: "안건", type: "text", width: 150, align: "center"},
                {name: "발언", type: "text", width: 150, align: "center"},
                {name: "발언답변", type: "text", width: 150, align: "center"},
                {name: "부록", type: "text", width: 150, align: "center"},
                {name: "의안정보", type: "text", width: 150, align: "center"},
                {name: "발의의원", type: "text", width: 150, align: "center"},
                {name: "의안파일", type: "text", width: 150, align: "center"},
                {name: "의안회의록", type: "text", width: 150, align: "center"},
                {name: "rasmblyNmNo", type: "text", width: 223, align: "center", visible: false},
            ];

            // commonClass.jsGridInit(selector, myRecords, fields);

            $("#" + selector).jsGrid({
                width: "100%"
                // , filtering: true
                , controller: {
                    loadData: function(filter) {
                        return $.grep(myRecords, function(d) {
                            return (!filter.지방의회 || d.지방의회.indexOf(filter.지방의회) > -1);
                        });
                    }
                }
                , height: "auto"
                , sorting: true
                , data: myRecords
                , fields: fields

            });

        },'post');
    }
}