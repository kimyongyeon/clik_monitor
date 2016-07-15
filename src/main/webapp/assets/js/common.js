$(document).ready(function () {
    tabs(); // 탭
    pop01();//Agent 서버정보 팝업
    pop03();//로그 데이터 팝업
    pop04();//금일 시간당 호출 건수 팝업
    tong(); //통계관리 테이블
    meiling(); // 메일링 관리
    closeBtn(); // 에러창 닫기
    errorTitle(); // 에러창 제목 클릭시 로그데이터 팝업창 활성화
    uploadBtn(); // 등록버튼 누를경우 경고창 활성화 (임계값 설정)
    eidtPop();// 수정 누를경우 경고창 활성화 (임계값 수정)
    deletePop(); // 삭제 누를경우 경고창 활성화 (임계값 수정)
    saveBtn(); // 저장버튼 누를 경우 경고창 활성화 (메일링관리)
});

function closeBtn() { // 에러창 닫기
    var close = $("#rightBox > .errorPop > .closeBtn > a");
    $(close).on("click", function () {
        $(this).parent().parent().css("display", "none");
    });
}

function saveBtn() {// 저장 누를경우 경고창 활성화 (메일링 관리)
    var btn = $(".tab05Box .btn a");
    $(btn).on("click", function () {
        $(".savePop").css("display", "block");
    });

    $(".savePop .btnSet a").on("click", function () {
        $(".savePop").css("display", "none");
    });

}

function uploadBtn() {// 등록버튼 누를경우 경고창 활성화 (임계값 설정)
    var btn = $("#subRightBox .topTable .settingBtn .uploadBtn a");
    $(btn).on("click", function () {
        $(".uploadPop").css("display", "block");
    });

    $(".uploadPop .btnSet a").on("click", function () {
        $(".uploadPop").css("display", "none");
    });

}

function eidtPop() {// 수정 누를경우 경고차 활성화 (임계값 수정)
    var btn = $("#subRightBox .topTable .threebtn .editBtn a");
    $(btn).on("click", function () {
        $(".eidtPop").css("display", "block");
    });

    $(".eidtPop .btnSet a").on("click", function () {
        $(".eidtPop").css("display", "none");
    });

}

function deletePop() {// 수정 누를경우 경고차 활성화 (임계값 수정)
    var btn = $("#subRightBox .topTable .threebtn .deletedBtn a");
    $(btn).on("click", function () {
        $(".deletePop").css("display", "block");
    });

    $(".deletePop .btnSet a").on("click", function () {
        $(".deletePop").css("display", "none");
    });

}

function uploadBtn() {// 수정 누를경우 경고차 활성화 (임계값 수정)
    var btn = $("#subRightBox .topTable .threebtn .editBtn a");
    $(btn).on("click", function () {
        $(".eidtPop").css("display", "block");
    });

    $(".eidtPop .btnSet a").on("click", function () {
        $(".eidtPop").css("display", "none");
    });

}

function errorTitle() {// 에러창 제목 클릭시 로그데이터 팝업창 활성화
    var title = $("#rightBox > .errorPop > .txtTitle > a");
    $(title).on("click", function () {
        $(".logData").css("display", "block");
    });

    $(".logData .top .closeBtn a").on("click", function () {
        $(".logData").css("display", "none");
    });

    $(".logData .bottom span.btnSet a").on("click", function () {
        $(".logData").css("display", "none");
    });

}

function tabs() {// 탭
    var tab01 = $("#sideBar > .sideBar_tabMenu > ul > li.list01 > a");
    var tab02 = $("#sideBar > .sideBar_tabMenu > ul > li.list02 > a");

    $("#sideBar > .tab01").css("display", "block");
    $("#sideBar > .tab02").css("display", "none");
    $(tab01).addClass("hover");


    // jquery 1.7 ->
    $(tab01).on("click", function (e) {
        e.preventDefault(e);
        $(tab01).addClass("hover");
        $(tab02).removeClass("hover");

        $("#sideBar > .tab01").css("display", "block");
        $("#sideBar > .tab02").css("display", "none");
    });

    $(tab02).on("click", function (e) {
        e.preventDefault(e);
        $(tab01).removeClass("hover");
        $(tab02).addClass("hover");

        $("#sideBar > .tab01").css("display", "none");
        $("#sideBar > .tab02").css("display", "block");
    });
}


function tong() {
    /*통계관리 테이블*/
    var tab001 = $("#subRightBox .topTable .adminTab01 ul li.listTab01 a");
    var tab002 = $("#subRightBox .topTable .adminTab01 ul li.listTab02 a");

    $(".BottomTable > .tab01Box").css("display", "block");
    $(".BottomTable > .tab02Box").css("display", "none");
    $(tab001).addClass("hover01");


    $(tab001).on("click", function (e) {
        e.preventDefault(e);
        $(tab001).addClass("hover01");
        $(tab002).removeClass("hover01");

        $(".BottomTable > .tab01Box").css("display", "block");
        $(".BottomTable > .tab02Box").css("display", "none");
    });

    $(tab002).on("click", function (e) {
        e.preventDefault(e);
        $(tab001).removeClass("hover01");
        $(tab002).addClass("hover01");

        $(".BottomTable > .tab01Box").css("display", "none");
        $(".BottomTable > .tab02Box").css("display", "block");
    });
}


function meiling() {
    /*메일링 관리*/

    var tab0001 = $("#subRightBox .topTable .adminTab02 ul li.listTab01 a");
    var tab0002 = $("#subRightBox .topTable .adminTab02 ul li.listTab02 a");

    $(".bottomTable > .tab04Box").css("display", "block");
    $(".topTable > table.table04").css("display", "block");
    $(".bottomTable > .tab05Box").css("display", "none");

    $(tab0001).addClass("hover01");


    $(tab0001).on("click", function (e) {
        e.preventDefault(e);
        $(tab0001).addClass("hover01");
        $(tab0002).removeClass("hover01");

        $(".bottomTable > .tab04Box").css("display", "block");
        $(".topTable > table.table03").css("display", "block");
        $(".topTable > .btnSearch01").css("display", "block");
        $(".bottomTable > .tab05Box").css("display", "none");
        $(".bottomTable > .tab05Box").css("display", "none");
    });

    $(tab0002).on("click", function (e) {
        e.preventDefault(e);
        $(tab0001).removeClass("hover01");
        $(tab0002).addClass("hover01");

        $(".bottomTable > .tab04Box").css("display", "none");
        $(".topTable > table.table03").css("display", "none");
        $(".topTable > .btnSearch01").css("display", "none");
        $(".bottomTable > .tab05Box").css("display", "block");
        $(".bottomTable > .tab05Box").css("display", "block");
    });

}

//Agent 서버정보 팝업
var pop01 = function () {
    var openPop = $("#rightBox > .topBox ul.list > li > a");
    $(openPop).on("click", function () {
        $(".agentServerInfo").addClass("openPop");
    });

    //X 버튼
    $(".closeBtn > a").on("click", function () {
        $(".agentServerInfo").removeClass("openPop");
    });

    //확인 버튼
    $(".agentServerInfo > .bottom > span.btnSet > a").on("click", function () {
        $(".agentServerInfo").removeClass("openPop");
    });

    //파란색 + 클릭시 "Agent 서버정보 팝업" 안뜨게하기 위해 작성
    var openPop2 = $("#rightBox > .topBox > ul.list > li.lastArea > a");
    $(openPop2).on("click", function () {
        $(".agentServerInfo").removeClass("openPop");
    });
}


//로그 데이터 추가 팝업 (PPT 주간평균 응답시간)
var pop03 = function () {
    var openPop = $("#rightBox > .middleBox > .rightTopBox > .leftTopBox > a");
    $(openPop).on("click", function () {
        $(".logData").addClass("openPop");
    });

    //X 버튼
    $(".closeBtn > a").on("click", function () {
        $(".logData").removeClass("openPop");
    });

    //확인 버튼
    $(".logData > .bottom > span.btnSet > a").on("click", function () {
        $(".logData").removeClass("openPop");
    });
}
//로그 데이터 추가 팝업 (PPT 금일 시간당 호출 건수)
var pop04 = function () {
    var openPop = $("#rightBox > .middleBox > .rightTopBox > .leftBottomBox > a");
    $(openPop).on("click", function () {
        $(".logData").addClass("openPop");
    });

    //X 버튼
    $(".closeBtn > a").on("click", function () {
        $(".logData").removeClass("openPop");
    });

    //확인 버튼
    $(".logData > .bottom > span.btnSet > a").on("click", function () {
        $(".logData").removeClass("openPop");
    });
}


function page_go(sel) {
    if(sel === "main") {
        location.href = "/main.do";
        return;
    } else if (sel === 'stat') {
        location.href = "/statistics_list.do";
        return;
    } else if (sel === 'range') {
        location.href = "/range_setting_list.do";
        return;
    } else if (sel === 'mail') {
        location.href = "/mail_list.do";
        return;
    } else if (sel === 'meta') {
        location.href = "/metadata_list.do";
        return;
    } else if (sel === 'range_setting_reg') {
        location.href = "/range_setting_reg.do";
        return;
    } 
    
    else {
        location.href = "/main.do";
    }
}

