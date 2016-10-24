// function closeBtn() { // 에러창 닫기
//     var close = $("#rightBox > .errorPop > .closeBtn > a");
//     $(close).on("click", function () {
//         $(this).parent().parent().css("display", "none");
//     });
//
// function uploadBtn() {// 등록버튼 누를경우 경고창 활성화 (임계값 설정)
//     var btn = $("#subRightBox .topTable .settingBtn .uploadBtn a");
//     $(btn).on("click", function () {
//         $(".uploadPop").css("display", "block");
//     });
//
//     $(".uploadPop .btnSet a").on("click", function () {
//         $(".uploadPop").css("display", "none");
//     });
// }
//
// function eidtPop() {// 수정 누를경우 경고차 활성화 (임계값 수정)
//     var btn = $("#subRightBox .topTable .threebtn .editBtn a");
//     $(btn).on("click", function () {
//         $(".eidtPop").css("display", "block");
//     });
//
//     $(".eidtPop .btnSet a").on("click", function () {
//         $(".eidtPop").css("display", "none");
//     });
//
// }
//
// function deletePop() {// 수정 누를경우 경고차 활성화 (임계값 수정)
//     var btn = $("#subRightBox .topTable .threebtn .deletedBtn a");
//     $(btn).on("click", function () {
//         $(".deletePop").css("display", "block");
//     });
//
//     $(".deletePop .btnSet a").on("click", function () {
//         $(".deletePop").css("display", "none");
//     });
//
// }
//
// function uploadBtn() {// 수정 누를경우 경고차 활성화 (임계값 수정)
//     var btn = $("#subRightBox .topTable .threebtn .editBtn a");
//     $(btn).on("click", function () {
//         $(".eidtPop").css("display", "block");
//     });
//
//     $(".eidtPop .btnSet a").on("click", function () {
//         $(".eidtPop").css("display", "none");
//     });
//
// }
//
// function errorTitle() {// 에러창 제목 클릭시 로그데이터 팝업창 활성화
//     var title = $("#rightBox > .errorPop > .txtTitle > a");
//     $(title).on("click", function () {
//         $(".logData").css("display", "block");
//     });
//
//     $(".logData .top .closeBtn a").on("click", function () {
//         $(".logData").css("display", "none");
//     });
//
//     $(".logData .bottom span.btnSet a").on("click", function () {
//         $(".logData").css("display", "none");
//     });
//
// }
//
// function tong() {
//     /*통계관리 테이블*/
//     var tab001 = $("#subRightBox .topTable .adminTab01 ul li.listTab01 a");
//     var tab002 = $("#subRightBox .topTable .adminTab01 ul li.listTab02 a");
//
//     $(".BottomTable > .tab01Box").css("display", "block");
//     $(".BottomTable > .tab02Box").css("display", "none");
//     $(tab001).addClass("hover01");
//
//
//     $(tab001).on("click", function (e) {
//         e.preventDefault(e);
//         $(tab001).addClass("hover01");
//         $(tab002).removeClass("hover01");
//
//         $(".BottomTable > .tab01Box").css("display", "block");
//         $(".BottomTable > .tab02Box").css("display", "none");
//     });
//
//     $(tab002).on("click", function (e) {
//         e.preventDefault(e);
//         $(tab001).removeClass("hover01");
//         $(tab002).addClass("hover01");
//
//         $(".BottomTable > .tab01Box").css("display", "none");
//         $(".BottomTable > .tab02Box").css("display", "block");
//     });
// }
//
//
// function meiling() {
//     /*메일링 관리*/
//     var tab0001 = $("#subRightBox .topTable .adminTab02 ul li.listTab01 a");
//     var tab0002 = $("#subRightBox .topTable .adminTab02 ul li.listTab02 a");
//     $(".bottomTable > .tab04Box").css("display", "block");
//     $(".topTable > table.table04").css("display", "block");
//     $(".bottomTable > .tab05Box").css("display", "none");
//     $(tab0001).addClass("hover01");
//     $(tab0001).on("click", function (e) {
//         e.preventDefault();
//         $(tab0001).addClass("hover01");
//         $(tab0002).removeClass("hover01");
//
//         $(".bottomTable > .tab04Box").show();
//         $(".topTable > table.table03").show();
//         $(".topTable > .btnSearch01").show();
//         $(".bottomTable > .tab05Box").hide();
//         $(".bottomTable > .tab05Box").hide();
//     });
//
//     $(tab0002).on("click", function (e) {
//         e.preventDefault();
//         $(tab0001).removeClass("hover01");
//         $(tab0002).addClass("hover01");
//
//         $(".bottomTable > .tab04Box").hide();
//         $(".topTable > table.table03").hide();
//         $(".topTable > .btnSearch01").hide();
//         $(".bottomTable > .tab05Box").show();
//         $(".bottomTable > .tab05Box").show();
//     });
// }
//
// //Agent 서버정보 팝업
// var pop01 = function () {
//     var openPop = $("#rightBox .topBox ul.list li a");
//     $(openPop).on("click", function () {
//         $(".agentServerInfo").addClass("openPop");
//     });
//
//     //X 버튼
//     $(".closeBtn > a").on("click", function () {
//         $(".agentServerInfo").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
//
//     //확인 버튼
//     $(".agentServerInfo > .bottom > span.btnSet > a").on("click", function () {
//         $(".agentServerInfo").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
//
//     //파란색 + 클릭시 "Agent 서버정보 팝업" 안뜨게하기 위해 작성
//     var openPop2 = $("#rightBox > .topBox > ul.list > li.lastArea > a");
//     $(openPop2).on("click", function () {
//         $(".agentServerInfo").removeClass("openPop");
//     });
// }
//
//
// //로그 데이터 추가 팝업 (PPT 주간평균 응답시간)
// var pop03 = function () {
//     var openPop = $("#rightBox > .middleBox > .rightTopBox > .leftTopBox > a");
//     $(openPop).on("click", function () {
//         $(".logData").addClass("openPop");
//     });
//
//     //X 버튼
//     $(".closeBtn > a").on("click", function () {
//         $(".logData").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
//
//     //확인 버튼
//     $(".logData > .bottom > span.btnSet > a").on("click", function () {
//         $(".logData").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
// }
// //로그 데이터 추가 팝업 (PPT 금일 시간당 호출 건수)
// var pop04 = function () {
//     var openPop = $("#rightBox > .middleBox > .rightTopBox > .leftBottomBox > a");
//     $(openPop).on("click", function () {
//         $(".logData").addClass("openPop");
//     });
//
//     //X 버튼
//     $(".closeBtn > a").on("click", function () {
//         $(".logData").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
//
//     //확인 버튼
//     $(".logData > .bottom > span.btnSet > a").on("click", function () {
//         $(".logData").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
// }
//
// // Agent 서버 상태정보
// var pop05 = function () {
//     //X 버튼
//     $(".closeBtn > a").on("click", function () {
//         $(".agentServerStateInfoPop").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
//     //확인 버튼
//     $(".agentServerStateInfoPop .bottom a").on("click", function () {
//         $(".agentServerStateInfoPop").removeClass("openPop");
//         $(".screen").css("display", "none");
//     });
// }
