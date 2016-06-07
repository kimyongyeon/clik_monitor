$(document).ready(function () {
    
    var tab01 = $("#sideBar > .sideBar_tabMenu > ul > li.list01 > a");
    var tab02 = $("#sideBar > .sideBar_tabMenu > ul > li.list02 > a");

    $("#sideBar > .tab01").css("display", "block");
    $("#sideBar > .tab02").css("display", "none");
    $(tab01).addClass("hover");


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


    //Agent 서버정보 팝업
    pop01();
    //Agent 서버정보 추가 팝업
    pop02();
    //로그 데이터 팝업
    pop03();
    //금일 시간당 호출 건수 팝업
    pop04();




    /*통계관리 테이블*/
    var tab001 = $("#rightBox .topTable .adminTab01 ul li.listTab01 a");
    var tab002 = $("#rightBox .topTable .adminTab01 ul li.listTab02 a");

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





    /*메일링 관리*/
    var tab0001 = $("#rightBox .topTable .adminTab02 ul li.listTab01 a");
    var tab0002 = $("#rightBox .topTable .adminTab02 ul li.listTab02 a");

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



});



//Agent 서버정보 팝업
var pop01 = function () {
    var openPop = $("#rightBox > .topBox > ul.list > li > a");
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

//Agent 서버정보 추가 팝업
var pop02 = function () {
    var openPop = $("#rightBox > .topBox > ul.list > li.lastArea > a");
    $(openPop).on("click", function () {
        $(".agentServerInfoInsert").addClass("openPop");
    });

    //X 버튼
    $(".closeBtn > a").on("click", function () {
        $(".agentServerInfoInsert").removeClass("openPop");
    });

    //확인 버튼
    $(".agentServerInfoInsert > .bottom > span.btnSet > a").on("click", function () {
        $(".agentServerInfoInsert").removeClass("openPop");
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