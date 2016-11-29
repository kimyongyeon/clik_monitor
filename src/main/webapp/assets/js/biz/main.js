var v_error_box = new Vue({
    el: '#errorBox',
    data: {
        list: []
    },
    methods: {
        fetchData: function () {
            var url = "getAgentErrorCheck.do";
            var data = {};
            commonClass.fnAjaxCallback(url, data, function (data) {
                var list = [];
                var item = {};
                $.each(data.list, function(i, d) {
                    item = {};
                    item.msg = "[" + d.frstRegistPnttm + "] " + d.requstInsttId + ", " + d.resultCode + ", " + d.serverIp;
                    item.selIdx = d.requstId;
                    item.isHide = true;
                    item.idx = i;
                    list.push(item);
                    // errorClass.errorBoxUUIDs.push(d.uid);
                    // for (var uid in errorClass.errorBoxUUIDs) {
                    //     if (d.uid != uid) {
                    //     }
                    // }
                });
                Vue.set(v_error_box, 'list', list);
                $("#errorBox").show();
            });
        },
        fnClose: function (idx, isHide) {

            this.list[idx].isHide = !isHide;
            Vue.set(v_error_box, 'list', this.list);

            var url = "getAgentErrorClose.do";
            var data = {
                requstId: this.list[idx].selIdx
            };
            commonClass.fnAjaxCallback(url, data, function (data) {
            });
        }
    }
});
// Agent 서버 상태정보 팝업
var v_agent_server_state_info_list = new Vue({
    el: '#tpl-agent-server-state-info-list',
    data: {
        items: []
    },
    methods: {
        fetchData: function (url, data) {
            commonClass.fnAjaxCallback(url, data, function (data) {
                Vue.set(v_agent_server_state_info_list, 'items', data.listAgentVO);
                document.body.style.overflow = 'hidden';
            }, 'post');
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        },
        dataFormat: function (strDate) {
            return commonClass.fnStringToDate(strDate);
        }
    }
});
// Agent 모니터 목록
var v_agent_server_info_list = new Vue({
    el: '#tpl-agent-server-info-list',
    data: {
        areas: [],
        areas2: []
    },
    methods: {
        fetchData: function (url, data) {
            commonClass.fnAjaxCallback(url, data, function (data) {
                var areas1 = data.areas;
                var areas2 = data.areas2;

                var areas3 = _.union(areas1, areas2);

                areas1 = [];
                areas2 = [];
                _.each(areas3, function (value, idx) {
                    if (idx < 17) {
                        areas1.push(value);
                    } else {
                        areas2.push(value);
                    }
                });

                Vue.set(v_agent_server_info_list, 'areas', areas1);
                Vue.set(v_agent_server_info_list, 'areas2', areas2);

                if (areas1.length == 0 && areas2.length == 0)
                    $(".topNemo").hide();
                else
                    $(".topNemo").show();

            }, 'post');
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        },
        dataFormat: function (strDate) {
            return commonClass.fnStringToDate(strDate);
        }
    }
});
// Agent 서버정보 팝업
var v_agent_server_info_detail = new Vue({
    el: '#tpl-agent-server-info-detail',
    data: {
        item: [],
        items: [],
        prev: false,
        firstPageNoOnPageList: 0,
        lastPageNoOnPageList: 0,
        next: false,
        page: 0,
        prevPage: 0,
        nextPage: 0
    },
    methods: {
        fnAgentComment: function (str) {
            if (str.indexOf('start') !== -1) {
                return "Agent가 시작 되었습니다.";
            }
            if (str.indexOf('stop') !== -1) {
                return "Agent가 정지 되었습니다.";
            }
            if (str.indexOf('update') !== -1) {
                return "Agent가 업데이트 되었습니다.";
            }
        },
        fetchData1: function (url, data, page) {
            commonClass.fnAjaxCallback(url, data, function (data) {

                if (data.status == '404') {
                    Vue.set(v_agent_server_info_detail, 'items', data.list);
                    return
                }

                var firstPageNoOnPageList = data.paginationInfo.firstPageNoOnPageList;
                var lastPageNoOnPageList = data.paginationInfo.lastPageNoOnPageList;
                var recordCountPerPage = data.paginationInfo.recordCountPerPage;
                var totalRecordCount = data.paginationInfo.totalRecordCount;

                var totalPageCount = data.paginationInfo.totalPageCount;

                if (totalPageCount <= lastPageNoOnPageList) {
                    lastPageNoOnPageList = totalPageCount;
                } else {
                    lastPageNoOnPageList = 10;
                }

                var prev = firstPageNoOnPageList === 1 ? false : true;
                var next = lastPageNoOnPageList * recordCountPerPage >= totalRecordCount ? false : true;
                Vue.set(v_agent_server_info_detail, 'items', data.list);
                Vue.set(v_agent_server_info_detail, 'firstPageNoOnPageList', firstPageNoOnPageList - 1);
                Vue.set(v_agent_server_info_detail, 'lastPageNoOnPageList', lastPageNoOnPageList);
                Vue.set(v_agent_server_info_detail, 'prev', prev);
                Vue.set(v_agent_server_info_detail, 'next', next);
                Vue.set(v_agent_server_info_detail, 'page', page);
                Vue.set(v_agent_server_info_detail, 'prevPage', firstPageNoOnPageList - 1);
                Vue.set(v_agent_server_info_detail, 'nextPage', lastPageNoOnPageList + 1);

                document.body.style.overflow = 'hidden';
            });
        },
        fetchData: function (url, data) {
            commonClass.fnAjaxCallback(url, data, function (data) {
                Vue.set(v_agent_server_info_detail, 'item', data);
                // 로그 버튼 숨김 / 보이기
                var url = "getLogDataButtonShowHideCheck.do";
                var subData = {
                    requstInsttId: data.rasmblyId
                }
                $("#log_button_flag").hide();
                commonClass.fnAjaxCallback(url, subData, function (data) {
                    // 에러가 있으면 버튼 나오도록 수정해야 함.
                    if (data.requstInsttId == undefined) {
                        $("#log_button_flag").hide();
                    } else {
                        $("#log_button_flag").show();
                    }
                });
                agentClass.fnAgentSetHisList(1);
            });
        },
        comma: function (numbers) {
            return commonClass.fnComma(numbers);
        },
        dataFormat: function (strDate) {
            var strDate = strDate || '';
            if (strDate == '') {
                return '';
            }
            var year = strDate.substring(0, 4);
            var mm = strDate.substring(4, 6);
            var dd = strDate.substring(6, 8);
            return year + "-" + mm + "-" + dd;
        }
    }
});

/**
 * 화면 초기화 클래스
 **/
var onCreateClass = {
    /**
     * Function 초기화
     */
    init: function (rasmblyId) {
        this.jQueryInit();  // jQuery 이벤트 및 애니메이션 초기화
        agentClass.init();  // Agent 정보 초기화
        jsTreeClass.init(); // 광역의회, 기초의회, 지역의회 트리구조 초기화
        errorClass.init();  // 에러 이벤트 초기화
        chartClass.init();  // 차트 초기화
        logClass.init();    // 로그데이터
        this.fnCheckboxSelected(); // 회의록, 부록, 의안, 의원 체크박스 선택
        commonClass.fnMenuStyle("main");

        commonClass.fnErrorListCloseFlag = true;

        // 네트워크 상태를 5초 주기로 감시한다. 만약 끊기면 파이프 모양이 사라진다.
        setInterval(this.fnNetworkStateCheck, 5000);

        // 지방의회 코드가 존재시 Agent 서버 정보 팝업을 on 한다.
        if (rasmblyId != "") {
            agentClass.fnAgentDetailPopup(rasmblyId);
        }

        // 메인화면 화살표 이동
        var leftMove = 650;
        setInterval(function () {
            leftMove = leftMove + 20;
            if (leftMove == 950) {
                leftMove = 650;
            }
            $("#pipe-01").css({
                opacity: 0.25,
                position: 'absolute',
                left: leftMove + 'px'
            });
        }, 1000);
        setInterval(function () {
            leftMove = leftMove + 20;
            if (leftMove == 950) {
                leftMove = 650;
            }
            $("#pipe-02").css({
                position: 'absolute',
                left: leftMove + 'px'
            });
        }, 1000);
        setInterval(function () {
            leftMove = leftMove + 20;
            if (leftMove == 950) {
                leftMove = 650;
            }
            $("#pipe-03").css({
                position: 'absolute',
                left: leftMove + 'px'
            });
        }, 1000);
    },
    currentState: 0, // 총알 현재상태 변수 값이 최초 0일때만 gif를 그리고 1이상일때는 그리지 않는다.
    fnNetworkStateCheck: function () { // 통신 상태 체크 총알
        $.ajax({
            url: "/getNetworkState.do",
            type: "get",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                if (onCreateClass.currentState == 0) {
                    $("#network-img").attr("src", "/img/network_on.gif");
                    onCreateClass.currentState++;
                }
            },
            error: function (request, status, error) {
                if (request.status == 0) {
                    $("#network-img").attr("src", "");
                    onCreateClass.currentState = 0;
                } else if (request.status == 200) {
                    $("#network-img").attr("src", "/img/network_on.gif");
                    onCreateClass.currentState++;
                }
            }
        });
    },
    fnAgentTab1: function () { // 이력정보
        $(".tab-box-1").show();
        $(".tab-box-1").css("background", "#383838");
        $("#agent_server_info_popup .tab").css("background", "#383838");
        // 활성화
        $(".tab ul li:nth-child(1) button").css("background", "#383838");
        $(".tab ul li:nth-child(1) button").css("color", "#fff");
        $(".tab ul li:nth-child(1) button").css("border", "none");
        $(".tab #tab-under-left").addClass("menu-tab-left");

        // 비활성화
        $(".tab ul li:nth-child(2) button").css("color", "#888");
        $(".tab ul li:nth-child(2) button").css("background", "#383838");
        $(".tab #tab-under-right").removeClass("menu-tab-right");
        $(".tab-box-2").hide();
    },
    fnAgentTab2: function () { // 전송건수
        $(".tab-box-2").show();
        $(".tab-box-2").css("background", "#383838");
        $("#agent_server_info_popup .tab").css("background", "#383838");
        // 활성화
        $(".tab ul li:nth-child(2) button").css("background", "#383838");
        $(".tab ul li:nth-child(2) button").css("color", "#fff");
        $(".tab ul li:nth-child(2) button").css("border", "none");
        $(".tab #tab-under-right").addClass("menu-tab-right");

        // 비활성화
        $(".tab ul li:nth-child(1) button").css("border", "none");
        $(".tab ul li:nth-child(1) button").css("color", "#888");
        $(".tab #tab-under-left").removeClass("menu-tab-left");
        $(".tab-box-1").hide();
    },
    fnCheckboxSelected: function () { // 검색조건 (회의록, 부록, 의안 탭1,2에 따라서 다르게 지정함)
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
    , jQueryInit: function () { // 화면 그리는 부분 초기화

        $("#btnExpend").on("click", function () {  // 상단에 화살표 아래를 눌렀을때 내려오는 버튼 이벤트

            if ($("#agent-open-close").attr("src") === "/img/agent_open.png") { // 닫을때...

                if ($(window).width() < 1900) { // 폭이 1900 이하일때는 높이 을 재조정함. (반응형 때문에...)
                    $(this).closest("div.topBox").animate({"height": "400px", opacity: 1});
                } else {
                    $(this).closest("div.topBox").animate({"height": "234px", opacity: 1});
                }
                // $(this).closest("div.topBox").animate({"height": "234px", opacity: 1});
                $("#content").height("1545px");
                $("#agent-open-close").attr("src", "/img/agent_close.png");

            } else { // 열렸을때...

                $(this).closest("div.topBox").animate({"height": "111px", opacity: 1});
                $("#content").height("1480px");
                $("#agent-open-close").attr("src", "/img/agent_open.png");
            }
        });

        $(".chart-column-postion").animate({"top": "85%", opacity: 1});  // 지방 의회별 데이터 전송 건수 광역의회 시의회
        $(".chart-column-postion2").animate({"top": "89%", opacity: 1}); // 데이터 수집 현황 광역의회 / 시의회
        $(".tran-legend").animate({"top": "85%", opacity: 1}); // 월별 데이터 항목별 수집 현황 레전드

        $("#pipe-01").animate({"top": "0%", opacity: 1}); // 파이프 화살표
        $("#pipe-02").animate({"top": "0%", opacity: 1});
        $("#pipe-03").animate({"top": "0%", opacity: 1});

        // + / - 투명도 초기화
        $("#btnExpend").closest("div.topBox").animate({"height": "111px", opacity: 1});
        $(".popup").draggable(); // 에러목록팝업 드래그앤드롭 가능하도록 설정
        $(".popup").hide(); // 에러목록팝업 숨김

        // Agent 서버 상태 정보 팝업 가운데 정렬
        commonClass.fnMiddleAlignSet('.agentServerStateInfoPop');
        // Agent 서버정보 팝업 가운데 정렬
        commonClass.fnMiddleAlignSet('.agentServerInfo');
        // 로그 데이터 팝업 가운데 정렬
        commonClass.fnMiddleAlignSet('.logData');
    }
}

$(window).resize(function () {
    // Agent 서버 상태 정보 팝업 가운데 정렬
    commonClass.fnMiddleAlignSet('.agentServerStateInfoPop');
    // Agent 서버정보 팝업 가운데 정렬
    commonClass.fnMiddleAlignSet('.agentServerInfo');
    // 로그 데이터 팝업 가운데 정렬
    commonClass.fnMiddleAlignSet('.logData');
});

/**
 * 로그 클래스
 */
var logClass = {
    init: function () {
        commonClass.fnLogDataList(1);
        $(".popup").show();
    }
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
            $.each(data.parent_areas, function (index, value) { // 지역
                areas[index] = {
                    "text": value.rasmblynm,
                    "id": value.code.substring(0, 3),
                    "state": {"opened": false},
                    "children": []
                }
            });

            $.each(areas, function (index, value) {

                var childrens = [];

                $.each(data.areas, function (i, v) {
                    if (value.id == v.code.substring(0, 3)) {
                        childrens.push({
                            "text": v.codenm,
                            "id": v.code,
                            "state": {"opened": v.state},
                        });
                    }
                });
                areas[index].children = childrens;
            });

            // 광역/기초 트리 메뉴
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
            // 지역별 트리 메뉴
            $('#aTreeBox').jstree({
                "plugins": ["checkbox"],
                'core': {
                    'data': [
                        {
                            "text": "전체",
                            "state": {"opened": false, "selected": true},
                            "children": areas
                        }
                    ]
                }
            });
        });
        // 의회별 트리 메뉴 체인지 이벤트 : id 지역번호
        $('#rTreeBox').on("changed.jstree", function (e, data) {

            jsTreeClass.arraySelectedData = [];
            jsTreeClass.arraySelectWide = [];
            jsTreeClass.arraySelectBasic = [];

            if (data == undefined)
                return;

            $.each(data.selected, function (i, d) {
                if (!isNaN(parseInt(d))) { // 전체 체크박스 제외
                    jsTreeClass.arraySelectedData.push(d);
                    // 광역, 기초 버튼은 arraySelect 값에 따라 달라진다.
                    _.each(jsTreeClass.arrayWide, function (dd) {
                        if (dd == d) { // 광역 
                            jsTreeClass.wideFlag = true;
                            jsTreeClass.arraySelectWide.push(d);
                        }
                    });
                    _.each(jsTreeClass.arrayBasic, function (dd) {
                        if (dd == d) { // 기초
                            jsTreeClass.basicFlag = true;
                            jsTreeClass.arraySelectBasic.push(d);
                        }
                    });
                }
            });
            // agentClass.fnAjaxMainAreaData();
        });

        // 지역별 트리 메뉴 체인지 이벤트 : id 지역번호
        $('#aTreeBox').on("changed.jstree", function (e, data) {
            jsTreeClass.arraySelectedData = [];
            jsTreeClass.arraySelectWide = [];
            jsTreeClass.arraySelectBasic = [];

            if (data == undefined)
                return;

            $.each(data.selected, function (i, d) {
                if (!isNaN(parseInt(d))) { // 전체 체크박스 제외
                    if (d.length != 3)
                        jsTreeClass.arraySelectedData.push(d);

                    _.each(jsTreeClass.arrayWide, function (dd) {
                        if (dd == d) { // 광역
                            jsTreeClass.wideFlag = true;
                            jsTreeClass.arraySelectWide.push(d);
                        }
                    });
                    _.each(jsTreeClass.arrayBasic, function (dd) {
                        if (dd == d) { // 기초
                            jsTreeClass.basicFlag = true;
                            jsTreeClass.arraySelectBasic.push(d);
                        }
                    });
                }
            });
            // agentClass.fnAjaxMainAreaData();
        });

        $.jstree.defaults.core.expand_selected_onload = true;
        // 최초 한번만 광역시 설정
        jsTreeClass.arraySelectWide = ["002001", "051001", "053001", "032001", "062001", "042001", "052001", "044001", "031001", "033001", "043001", "041001", "063001", "061001", "054001", "055001", "064001"];
        jsTreeClass.arraySelectedData = ['002001', '051001', '053001', '032001', '062001', '042001', '052001', '044001', '031001', '033001',
            '043001', '041001', '063001', '061001', '054001', '055001', '064001', '031012', '031031', '033002',
            '043012', '041900', '041009', '063014', '061012', '054010', '055002', '055005'];
    },
    arraySelectedData: [],
    arrayWide: [],
    arrayBasic: [],
    arraySelectWide: [],
    arraySelectBasic: [],
    wideFlag: false,
    basicFlag: false,
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
        this.fnAjaxAgentErrorCheck();
    }
    , fnErrorBoxClose: function () {
        $("#errorBox").fadeOut('slow');
    }
    /**
     * 서버에 Agent상태를 체크하여 에러 있을시 에러박스를 호출한다.
     * 10초 간격으로 체크 한다.
     */
    , fnAjaxAgentErrorCheck: function () {
        v_error_box.fetchData();
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
        // Agent 서버 상태정보 ajax
        // this.fnAjaxAgentServerStateInfoList();
    },
    /**
     * Agent 지방의회 팝업 이벤트
     * @param code : 지방의회 코드
     */
    fnAgentDetailPopup: function (rasmblyId) {
        $(".agentServerInfo").addClass("openPop");
        commonClass.screenPop(); // block 스크린 팝업
        this.fnAjaxAgentInfoDetail(rasmblyId); // ajax 지방의회 서버 데이터 대입
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
        var data = {
            ramblyList: jsTreeClass.arraySelectedData
        };
        v_agent_server_state_info_list.fetchData(url, data);
    },
    fnLogData: function (rasmblyId) {
        $(".agentServerInfo").removeClass("openPop");

        var url = "getLogDataButtonShowHideCheck.do";
        var data = {
            requstInsttId: rasmblyId
        };
        v_log_data_detail.fetchData(url, data);
    }
    /**
     * Agent 지방의회 서버 상세
     * @param code : 지방의회 코드
     */
    , fnAjaxAgentInfoDetail: function (rasmblyId) {
        var url = "getAgentInfoDetail.do";
        var data = {
            rasmblyId: rasmblyId
        };
        v_agent_server_info_detail.fetchData(url, data);
    },
    fnAgentSetHisList: function (page) {

        page = page || 1;
        var url = "getAgentSetHisList.do";
        var data = {
            "rasmblyId": v_agent_server_info_detail.item.rasmblyId,
            "pageIndex": page
        };
        v_agent_server_info_detail.fetchData1(url, data, page);
    }
    /**
     * Agent 서버 상태 정보 목록(광역,기초) : 메인화면 Ajax
     */
    , fnAjaxMainAreaData: function () {
        var url = "getAreas.do";

        if (jsTreeClass.arraySelectedData.length == 0) {
            $("#rasmblyId_empty").show();
            $("#rasmblyId_empty").addClass('blink_me');
            Vue.set(v_agent_server_info_list, 'areas', {});
            Vue.set(v_agent_server_info_list, 'areas2', {});
            $(".topNemo").hide();
            $("#btnExpend").hide();
            return;
        } else {
            $("#rasmblyId_empty").hide();
            if (jsTreeClass.arraySelectedData.length > 17) {
                $("#btnExpend").show();
                $("#agent-open-close").attr("src", "/img/agent_open.png");
            } else {
                $("#btnExpend").hide();
                $("div.topBox").animate({"height": "115px", opacity: 1});
                $("#content").height("1545px");
            }
            $(".topNemo").show();
        }

        var data = {
            ramblyList: jsTreeClass.arraySelectedData, // 의회(기초,광역,지역)
        };
        v_agent_server_info_list.fetchData(url, data);
    },
    fnAgentClose: function () {
        $(".agentServerInfo").removeClass("openPop");
        $(".agentServerStateInfoPop").removeClass("openPop");
        $(".screen").css("display", "none");
        document.body.style.overflow = 'auto';
    }
}