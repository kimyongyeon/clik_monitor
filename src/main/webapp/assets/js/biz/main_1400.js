/**
 * 화면 초기화 클래스
 **/
var onCreateClass = {
    /**
     * Function 초기화
     */
    init: function () {
        this.jQueryInit();  // jQuery 이벤트 및 애니메이션 초기화
        agentClass.init();  // Agent 정보 초기화
        jsTreeClass.init(); // 광역의회, 기초의회, 지역의회 트리구조 초기화
        errorClass.init();  // 에러 이벤트 초기화
        chartClass.init();  // 차트 초기화
        logClass.init();    // 로그데이터
        this.fnCheckboxSelected(); // 회의록, 부록, 의안, 의원 체크박스 선택
        $(".menu").css("color", "none");
        $(".menu_1").css("color", "#d84d2c");
    },
    fnCheckboxSelected: function () {
        $("#chk01").prop("checked", true); // 회의록
        $("#chk02").prop("checked", true); // 부록
        $("#chk03").prop("checked", true); // 의안
        $("#chk04").prop("checked", true); // 의원
        $("#chk05").prop("checked", true); // 회의록
        $("#chk06").prop("checked", true); // 부록
        $("#chk07").prop("checked", true); // 의안
        $("#chk08").prop("checked", true); // 의원
    }
    /**
     * jQuery 초기화
     */
    , jQueryInit: function () {
        $("#btnExpend").on("click", function () {
            if ($("#agent-open-close").attr("src") === "/img/agent_open.png") {

                $(this).closest("div.topBox").animate({"height": "324px", opacity: 1});
                $("#content").height("1645px");
                $("#agent-open-close").attr("src", "/img/agent_close.png");

            } else {

                $(this).closest("div.topBox").animate({"height": "111px", opacity: 1});
                $("#content").height("1480px");
                $("#agent-open-close").attr("src", "/img/agent_open.png");

            }
        });

        $(".chart-column-postion").animate({"top": "85%", opacity: 1});
        $(".chart-column-postion2").animate({"top": "89%", opacity: 1});
        $(".tran-legend").animate({"top": "85%", opacity: 1});

        $("#pipe-01").animate({"top": "0%", opacity: 1});
        $("#pipe-02").animate({"top": "0%", opacity: 1});
        $("#pipe-03").animate({"top": "0%", opacity: 1});
        // + / - 투명도 초기화
        $("#btnExpend").closest("div.topBox").animate({"height": "111px", opacity: 1});

        // $(".flotingBox").resizable();
        $(".flotingBox").draggable();

        // $(".agentServerStateInfoPop").resizable();
        //$(".agentServerStateInfoPop").draggable();

        // $(".agentServerInfo").resizable();
        //$(".agentServerInfo").draggable();

        // 레이어 팝업 가운데 정렬
        var $layerPopupObj = $('.agentServerStateInfoPop');
        var left = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
        var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj.height()) / 2 );
        $layerPopupObj.css({'left':left,'top':top, 'position':'absolute'});
        $('body').css('position','relative').append($layerPopupObj);

        // 레이어 팝업 가운데 정렬
        var $layerPopupObj = $('.agentServerInfo');
        var left = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
        var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj.height()) / 2 );
        $layerPopupObj.css({'left':left,'top':top, 'position':'absolute'});
        $('body').css('position','relative').append($layerPopupObj);
    }
}

/**
 * 로그 클래스
 */
var logClass = {
    init: function () {
        $(".flotingBox ").hide();  // 시연시 숨김 에러정보목록 최초 한번!
        commonClass.fnLogDataList(1);
        //$(".flotingBox").show();
    },
    fnDetail: function (requstId) {
        logClass.fnLogDetailData(requstId);
    },
    fnLogDetailData: function (requstId) {
        $(".agentServerInfo").removeClass("openPop");

        var url = "getLogDataInfo.do";
        var data = {
            requstId: requstId || ''
        };
        commonClass.fnAjaxCallback(url, data, function (data) {
            var htmlText = commonClass.getHtmlText("logData_popup-template");
            $(".logData_popup").html(htmlText(data));
            $(".logData").addClass("openPop");
        });
    },
    /**
     * 로그데이터 팝업 이벤트
     */
    fnLogData: function (rasmblyId) {
        $(".agentServerInfo").removeClass("openPop");

        var url = "getLogDataInfo.do";
        var data = {
            requstInsttId: rasmblyId || '',
            requstId: rasmblyId || ''
        };
        commonClass.fnAjaxCallback(url, data, function (data) {
            var htmlText = commonClass.getHtmlText("logData_popup-template");
            $(".logData_popup").html(htmlText(data));
            $(".logData").addClass("openPop");
        });
    },
    // /**
    //  * 로그데이터 팝업 닫기
    //  */
    // fnLogDataClose: function () {
    //     $(".logData").removeClass("openPop");
    //     $(".screen").css("display", "none");
    // },
    // fnErrorLogListClose: function () {
    //     $(".flotingBox").hide();
    // },
    // /**
    //  * 에러정보목록
    //  * @param currentPage
    //  */
    // fnLogDataList: function (page) {
    //     $(".flotingBox").show();
    //     page = page || 1;
    //     var url = "getLogDataList.do?currentPage=" + page;
    //     var data = {};
    //     commonClass.fnAjaxCallback(url, data, function (data) {
    //
    //         // 페이지 시작
    //         var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
    //         var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
    //         var recordCountPerPage = data.paginationInfo.recordCountPerPage;
    //         var totalRecordCount = data.paginationInfo.totalRecordCount;
    //         var prev = firstPageNoOnPageList === 1 ? false : true;
    //         var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;
    //
    //         var pageHtml = "";
    //         if (prev) {
    //             var currentPage = firstPageNoOnPageList - 1;
    //             pageHtml += "<li><a href='#' onclick='logClass.fnLogDataList(" + currentPage + ")'>&laquo;</a><li>";
    //         }
    //
    //         for (var i = firstPageNoOnPageList; i < lastPageNoOnPageList; i++) {
    //             var currentPage = i;
    //             if (page === i) {
    //                 pageHtml += "<li class='active'><a href='#' onclick='logClass.fnLogDataList(" + currentPage + ")'>" + i + "</a><li>";
    //             } else {
    //                 pageHtml += "<li><a href='#' onclick='logClass.fnLogDataList(" + currentPage + ")'>" + i + "</a><li>";
    //             }
    //
    //         }
    //
    //         if (next) {
    //             var currentPage = lastPageNoOnPageList + 1;
    //             pageHtml += "<li><a href='#' onclick='logClass.fnLogDataList(" + currentPage + ")'>&raquo;</a><li>";
    //         }
    //
    //         $(".pagination").empty();
    //         $(".pagination").html(pageHtml);
    //         // 페이지 종료
    //
    //
    //         var htmlText = commonClass.getHtmlText("logdata_list_popup-template");
    //
    //         $(".logData_list_popup").html(htmlText(data));
    //         $(".logData_list_popup table tr td.dateFormat").each(function (index) {
    //             var temp = $(this).text();
    //             $(this).text(commonClass.fnStringToDate(temp));
    //         });
    //
    //         $(".log-row").on("click", function () {
    //             $(".log-row").css("background", "");
    //             $(this).css("background", "beige");
    //         });
    //     });
    // }
}

/**
 * 트리 클래스
 **/
var jsTreeClass = {
    init: function () {
        var url = "/getJstree.do"
        var data = {};
        commonClass.fnAjaxCallback(url, data, function (data) {
            // 광역, 기초, 지역 트리구조 배열 초기화
            var basic = [], wide = [], areas = [];
            $.each(data.wide, function (index, value) { // 광역
                wide[index] = {
                    text: value.codenm,
                    id: value.code
                }
                jsTreeClass.arrayWide.push(value.code);
            });
            $.each(data.basic, function (index, value) { // 기초
                basic[index] = {
                    text: value.codenm,
                    id: value.code
                }
                jsTreeClass.arrayBasic.push(value.code);
            });
            $.each(data.areas, function (index, value) { // 지역
                var childrens = [];
                $.each(value.childrens, function (index, value) {
                    childrens[index] = {
                        text: value.codenm,
                        id: value.code
                    }
                });

                areas[index] = {
                    "text": value.codenm,
                    "id": value.code,
                    "state": {"opened": value.state},
                    "children": childrens
                }

            });


            // left 광역/기초 트리 메뉴
            $('#rTreeBox').jstree({
                "plugins": ["checkbox"],
                'core': {
                    'data': [
                        {
                            "text": "광역의회",
                            "state": {
                                "opened": true,
                                "selected": true
                            },
                            "children": wide
                        },
                        {
                            "text": "기초의회",
                            "state": {
                                "opened": true,
                                "selected": true
                            },
                            "children": basic
                        }
                    ]
                }
            });
            // left 지역별 트리 메뉴
            $('#aTreeBox').jstree({
                "plugins": ["checkbox"],
                'core': {
                    'data': [
                        {
                            "text": "전체",
                            "state": {"opened": true, "selected": true},
                            "children": areas
                        }
                    ]
                }
            });
        });

        // 의회별 트리 메뉴 체인지 이벤트 : id 지역번호
        $('#rTreeBox').on("changed.jstree", function (e, data) {
            jsTreeClass.arraySelectedData = [];
            $.each(data.selected, function (i, d) {
                if (!isNaN(parseInt(d))) { // 전체 체크박스 제외
                    jsTreeClass.arraySelectedData.push(d);
                }
            });
            // chartClass.btnChartSearch();
        });
        // 지역별 트리 메뉴 체인지 이벤트 : id 지역번호 
        $('#aTreeBox').on("changed.jstree", function (e, data) {
            jsTreeClass.arraySelectedData = [];
            $.each(data.selected, function (i, d) {
                if (!isNaN(parseInt(d))) { // 전체 체크박스 제외
                    jsTreeClass.arraySelectedData.push(d);
                }
            });
            // chartClass.btnChartSearch();
        });

        $.jstree.defaults.core.expand_selected_onload = true;
        chartClass.btnChartSearch();
    },
    arraySelectedData: [],
    arrayWide: [],
    arrayBasic: []
}

/**
 * 에러 클래스
 **/
var errorClass = {
    errorStartClear: null
    , errorEndClear: null
    , currentIndex: null
    , errorBoxUUIDs: []
    , init: function () {
        // //최초 에러 박스 생성
        // this.errorBox('서울특별시의회 Agent 문제 발생', 0);
        // //최초 에러 박스 삭제
        // setTimeout(this.fnErrorBoxClose, 5000);

        // 테스트용 에러박스 생성 버튼
        $("#btnErrorBox1").on("click", function () {
            errorClass.currentIndex++;
            errorClass.errorBox('서울특별시의회 Agent 문제 발생 ' + errorClass.currentIndex, errorClass.currentIndex);
            $("#errorBox").show().fadeIn('slow');
        });

        // 테스트용 에러박스 주기시작 이벤트
        $("#btnErrorBox2").on("click", function () {
            errorClass.errorStart();
            errorClass.errorEnd();
            $("#errorBox").show().fadeIn('slow');
        });

        // 테스트용 에러박스 주기종료 이벤트
        $("#btnErrorBox3").on("click", function () {
            clearInterval(errorClass.errorStartClear); // errorStartClear Interval 삭제
            clearInterval(errorClass.errorEndClear); // errorEndClear Interval 삭제
        });
    }
    , errorStart: function () {
        this.errorStartClear = setInterval(
            function () {
                this.currentIndex++;
                errorClass.errorBox('서울특별시의회 Agent 문제 발생 ' + errorClass.currentIndex, errorClass.currentIndex);
                errorClass.errorBoxUUIDs.push(errorClass.currentIndex);
            }, 1000);
    }
    , errorEnd: function () {
        this.errorEndClear = setInterval(
            function fnClose() {
                $(".errorPop").fadeOut('slow');
            }
            , 5000);
    }
    , fnErrorBoxClose: function () {
        $("#errorBox").fadeOut('slow');
    }
    , fnClose: function (selIdx) {
        var id = $("#errorBox_" + selIdx).attr("data-id");
        if (id == selIdx) {
            // uid 삭제
            var i = 0;
            for (var uid in this.errorBoxUUIDs) {
                if (uid == selIdx) {
                    this.errorBoxUUIDs.splice(i, 1);
                }
                i++;
            }
            // 해당 에러박스 삭제
            $("#errorBox_" + selIdx).fadeOut('slow');
        }
    }
    , errorBox: function (msg, selIdx) {
        var data = {
            msg: msg,
            selIdx: selIdx
        };
        var htmlText = commonClass.getHtmlText("errorBox-template");
        $("#errorBox").append(htmlText(data));
    }
    /**
     * 서버에 Agent상태를 체크하여 에러 있을시 에러박스를 호출한다.
     * 10초 간격으로 체크 한다.
     */
    , fnAjaxAgentErrorCheck: function () {
        var url = "getAgentErrorCheck.do";
        var data = {};
        commonClass.fnAjaxCallback(url, data, function (data) {
            if (data.code = "-1") {
                this.errorBoxUUIDs.push(data.uid);
                for (var uid in this.errorBoxUUIDs) {
                    if (data.uid != uid) {
                        this.errorBox(data.msg, data.uid);
                    }
                }
            } else {
                this.fnAjaxAgentErrorCheck();
            }
        });
    }
}
/**
 * 애니메이션 클래스
 */
var animationClass = {
    init: function () {
        $("#btnErrorBox4").on("click", function () {
            animationClass.fnAnimationStart();
        });

        // 테스트용 애니메이션 중지 이벤트
        $("#btnErrorBox5").on("click", function () {
            animationClass.fnAnimationStop();
        });

        // 최초 애니메이션 시작
        setTimeout(animationClass.fnLoadingStartShow, 500);
    }
    // 밴드사 array
    // webkit : 사파리
    // moz : 파이어폭스
    , bandCorps: ['-webkit-animation', '-moz-animation', 'animation']
    , fnLoadingStartShow: function () {
        $(".loading").show();
    }
    , fnLoadingStopHide: function () {
        $(".loading").hide();
    }
    , fnAnimationStart: function () {
        // 홀수의 공을 움직인다. 1초 간격
        $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[0], "up 1s infinite ease-in-out");
        $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[1], "up 1s infinite ease-in-out");
        $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[2], "up 1s infinite ease-in-out");
        // 짝수의 공을 움직인다. 1초 간격
        $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[0], "down 1s infinite ease-in-out");
        $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[1], "down 1s infinite ease-in-out");
        $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[2], "down 1s infinite ease-in-out");
    }
    , fnAnimationStop: function () {
        setTimeout(function () {
            $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[0], "paused");
            $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[1], "paused");
            $(".loading__ball:nth-child(odd)").css(animationClass.bandCorps[2], "paused");
        }, 1000); // 홀수의 공을 1초 후 종료 한다.
        setTimeout(function () {
            $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[0], "paused");
            $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[1], "paused");
            $(".loading__ball:nth-child(even)").css(animationClass.bandCorps[2], "paused");
        }, 1000); // 짝수의 공을 1초 후 종료 한다.
    }
}

/**
 * Agent 클래스
 **/
var agentClass = {
    init: function () {
        // 지방의회, 기초의회 상태 아이콘 출력 ajax
        this.fnAjaxMainAreaData();
        // Agent 서버 상태정보 ajax
        // this.fnAjaxAgentServerStateInfoList();
    },
    /**
     * Agent 지방의회 팝업 이벤트
     * @param code : 지방의회 코드
     */
    fnAreaPopup: function (rasmblyId) {
        $(".agentServerInfo").addClass("openPop");
        commonClass.screenPop(); // block 스크린 팝업
        this.fnAjaxAreaDetail(rasmblyId); // ajax 지방의회 서버 데이터 대입
        chart_bar2(rasmblyId); // Agent 차트
    }
    /**
     * Agent 서버 상태정보 팝업 이벤트
     */
    , fnAgentServerStateInfoPopup: function () {
        $(".agentServerStateInfoPop").addClass("openPop");
        commonClass.screenPop();
        this.fnAjaxAgentServerStateInfoList();
    }
    /**
     * Agent 서버 상태정보 테이블 목록
     */
    , fnAjaxAgentServerStateInfoList: function () {

        var url = "getAreaStateInfoList.do";
        var data = {};
        commonClass.fnAjaxCallback(url, data, function (data) {
            var htmlText = commonClass.getHtmlText("agent_server_state_info_popup-template");

            $("#agent_server_state_info_popup").html(htmlText(data));
            document.body.style.overflow = 'hidden';
        });
    }
    /**
     * Agent 지방의회 서버 상세
     * @param code : 지방의회 코드
     */
    , fnAjaxAreaDetail: function (rasmblyId) {
        var url = "getAreaDetail.do";
        var data = {
            rasmblyId: rasmblyId
        };
        commonClass.fnAjaxCallback(url, data, function (data) {

            var htmlText = commonClass.getHtmlText("agent_server_info_popup-template");

            console.log(data);

            $("#agent_server_info_popup").html(htmlText(data));

            var url = "getLogDataInfo.do";
            var subData = {
                rasmblyId: data.rasmblyId,
                requstId: data.rasmblyId
            }
            commonClass.fnAjaxCallback(url, subData, function (data) {
                $("#agent_server_info_popup_logdata_click").hide();
                // 에러가 있으면 버튼 나오도록 수정해야 함.
                // if (data.status === 404) {
                //     $("#agent_server_info_popup_logdata_click").hide();
                // } else {
                //     var htmlText = commonClass.getHtmlText("agent_server_info_popup-logdata_click-template");
                //     $("#agent_server_info_popup_logdata_click").html(htmlText(data));
                // }
            });


        });
    }
    /**
     * Agent 서버 상태 정보 목록(광역,기초) : 메인화면 Ajax
     */
    , fnAjaxMainAreaData: function () {
        var url = "getAreas.do";
        var data = {};
        commonClass.fnAjaxCallback(url, data, function (data) {
            var htmlText = commonClass.getHtmlText("agent_server_info_list1-template");
            $("#agent_server_info_list1").html(htmlText(data));
            var htmlText = commonClass.getHtmlText("agent_server_info_list2-template");
            $("#agent_server_info_list2").html(htmlText(data));
        });
    },
    fnAgentClose: function () {
        $(".agentServerInfo").removeClass("openPop");
        $(".agentServerStateInfoPop").removeClass("openPop");
        $(".screen").css("display", "none");
        document.body.style.overflow = 'auto';
    }
}