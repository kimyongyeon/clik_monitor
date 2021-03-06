<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="content">
            <!-- 사이드 메뉴 -->
            <div id="sideBar">
                <div class="sideBar_tabMenu">
                    <ul>
                        <li class="list01"><a href="#">의회별</a></li>
                        <li class="list02"><a href="#">지역별</a></li>
                    </ul>
                </div>
                <div class="tab01">
                    <div class="sideBar_radioBox">
                        <ul>
                            <li><span><input type="checkbox" id="chk01" name="radioBox01" value="1"/><label for="chk01">회의록</label></span></li>
                            <li><span><input type="checkbox" id="chk03" name="radioBox01" value="3"/><label for="chk03">의안</label></span></li>
                            <li><span><input type="checkbox" id="chk04" name="radioBox01" value="4"/><label for="chk04">의원</label></span></li>
                            <li><button class="main-search-button" type="button" id="btnChartSearch" name="btnChartSearch" onclick="chartClass.btnChartSearch();"><i class="fa fa-search" aria-hidden="true"></i> 검색</button></li>
                        </ul>
                    </div>
                    <div id="rTreeBox"></div> <!-- 의회별 -->
                    <div id="aTreeBox"></div> <!-- 지역별 -->
                </div>
            </div>
            <!-- 차트 및 모니터 -->
            <div id="rightBox">
                <div class="inner_box">
                    <div id="errorBox">
                        <template v-for="item in list">
                            <div v-bind:id="'errorBox_' + item.selIdx" v-model="item.selIdx"  v-show="item.isHide" class="errorPop">
                                <div class="txtTitle">
                                    <a href="#" @click="commonClass.fnLogDetailData(item.selIdx);">{{item.msg}}</a>
                                </div>
                                <div class="closeBtn"><a href="#" @click="fnClose(item.idx, item.isHide);">X</a></div>
                            </div>
                        </template>
                    </div>
                    <div class="topBox" id="tpl-agent-server-info-list">
                        <div id="rasmblyId_empty"><h1>선택된 의회가 없습니다.</h1></div>
                        <h1 id="btnExpend"><img id="agent-open-close" src="/img/agent_open.png" alt="열기"></h1>
                        <div class="topNemo">
                            <!-- Agent 서버정보 광역의회 목록 -->
                            <div id="agent_server_info_list1">
                                <ul class="list">
                                    <li v-bind:id="'li_'+item.code" v-for="item in areas">
                                        <a href="#" @click="agentClass.fnAgentDetailPopup(item.code)">
                                            <span class="listBox">
                                                <img class="areas_img" v-bind:src="'img/img/img_img0'+item.state+'.'+item.ext" alt="" />
                                            </span>
                                            <span class="listTxt">{{item.name}} <br /> ({{item.upDate}})</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="bottomNemo">
                            <!-- Agent 서버정보 기초의회 목록 -->
                            <div id="agent_server_info_list2">
                                <ul class="list">
                                    <li v-bind:id="'li_'+item.code" v-for="item in areas2">
                                        <a href="#" @click="agentClass.fnAgentDetailPopup(item.code)">
                                            <span class="listBox">
                                                <img class="areas_img" v-bind:src="'img/img/img_img0'+item.state+'.'+item.ext" alt="" /></span>
                                            <span class="listTxt">{{item.name}} <br /> ({{item.upDate}})</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="middleBox">
                        <div class="fullBox">
                            <div class="fullSub" onclick="agentClass.fnAgentServerStateInfoPopup();">
                                <img id="network-img" src="/img/network_on.gif" />
                                <img id="pipe-01" src="/img/pipe_01.png" />
                                <img id="pipe-02" src="/img/pipe_02.png" />
                                <img id="pipe-03" src="/img/pipe_03.png" />
                            </div>
                        </div>
                        <div class="rightTopBox">
                            <div class="leftTopBox">
                                <!-- 월별 데이터 항목별 수집 현황 -->
                                <div id="chart_scatter" class="chart_loding"><img src="/img/loading.gif" alt=""></div>
                                <div class="tran-legend">
                                    <ul>
                                        <li><i class="fa fa-square-o" aria-hidden="true" ></i> 회의록</li>
                                        <li><i class="fa fa-square-o" aria-hidden="true" ></i> 의안</li>
                                        <li><i class="fa fa-square-o" aria-hidden="true" ></i> 의원</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="leftBottomBox">
                                <!-- 서버 자원 사용현황 -->
                                <div id="chart_spline" class="chart_loding"><img src="/img/loading.gif" alt=""></div>
                            </div>
                        </div>
                        <div class="rightBottomBox">
                            <div class="leftTopBox">
                                <!-- 지방 의회별 데이터 전송건수 -->
                                <div id="chart_column_title"><h1>(1개월)</h1></div>
                                <div id="chart_column" class="chart_loding"><img src="/img/loading.gif" alt=""></div>
                                <div id="chart_column_1" class="chart_loding"><img src="/img/loading.gif" alt=""></div>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-column-top-left" onclick="chartClass.btnLeftClick();">광역의회</button>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-column-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                                <button class="button-chart-menu button-position-absolute btn-month-6 btn-month" onclick="chartClass.btnMonthClick(6);">6개월</button>
                                <button class="button-chart-menu button-position-absolute btn-month-3 btn-month" onclick="chartClass.btnMonthClick(3);">3개월</button>
                                <button class="button-chart-menu button-position-absolute btn-month-1 btn-month" onclick="chartClass.btnMonthClick(1);">1개월</button>
                                <img src="/img/next.png" alt="" class="fa fa-arrow-circle-right fa-2x button-chart-default button-position-absolute right" onclick="chartClass.btnColumnNext();">
                                <img src="/img/prev.png" alt="" class="fa fa-arrow-circle-left fa-2x button-chart-default button-position-absolute left" onclick="chartClass.btnColumnPrev();">
                                <%--<i onclick="chartClass.btnColumnNext();" class="fa fa-arrow-circle-right fa-2x button-chart-default button-position-absolute right" aria-hidden="true"></i>--%>
                                <%--<i onclick="chartClass.btnColumnPrev();" class="fa fa-arrow-circle-left fa-2x button-chart-default button-position-absolute left" aria-hidden="true"></i>--%>
                            </div>
                            <div class="leftBottomBox">
                                <!-- 연계파일 저장용량 모니터링 -->
                                <div id="chart_bar" class="chart_loding"><img src="/img/loading.gif" alt=""></div>
                            </div>

                        </div>
                    </div>
                    <div class="bottomBox">
                        <!-- 데이터 수집 현황 -->
                        <div id="chart_column2" ></div>
                        <div class="chart_column2_screen">
                            <div class="chart_column2_loding"><img src="/img/loading.gif" alt=""></div>
                        </div>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-column2-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-column2-top-left" onclick="chartClass.btnLeftClick();">광역의회</button>
                        <%--<i onclick="chartClass.btnNext();" class="fa fa-arrow-circle-right fa-2x button-chart-default button-position-absolute right" aria-hidden="true"></i>--%>
                        <%--<i onclick="chartClass.btnPrev();" class="fa fa-arrow-circle-left fa-2x button-chart-default button-position-absolute left" aria-hidden="true"></i>--%>
                        <img src="/img/next.png" alt="" class="button-position-absolute right" onclick="chartClass.btnNext();">
                        <img src="/img/prev.png" alt="" class="button-position-absolute left" onclick="chartClass.btnPrev();">
                    </div>
                </div>
            </div>
        </div>

        <!-- Agent 서버정보 팝업 start -->
        <div class="layer-pop-1280-760 agentServerInfo" id="tpl-agent-server-info-detail">
            <div class="top">
                <h1>Agent 서버정보</h1>
                <div id="log_button_flag">
                    <button class="edit-button" @click="agentClass.fnLogData(item.rasmblyId);">로그확인</button>
                </div>
                <div class="closeBtn"><a href="#" onclick="agentClass.fnAgentClose();">X</a></div>
            </div>
            <div id="agent_server_info_popup" >
                <div class="middle">
                    <div class="nemo01">
                        <table class="table">
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tr>
                                <th>의회</th>
                                <td>{{item.rasmblyNm}} ({{item.rasmblyId}})</td>
                                <th>최종수집일자</th>
                                <td>{{dataFormat(item.occrrncDe)}}</td>
                            </tr>
                            <tr>
                                <th>Agent 버전</th>
                                <td>1.0</td>
                                <th>Agent업데이트일시 </th>
                                <td>{{item.updateDate}}</td>
                            </tr>
                            <tr>
                                <th>현재상태</th>
                                <td>{{item.systemSttusCode}}</td>
                                <th>상태확인일시</th>
                                <td>{{item.lastCntcDt}}</td>
                            </tr>
                            <tr>
                                <th>Memo</th>
                                <td colspan="3">
                                    <div class="agent-server-info-memo">
                                        <div class="left">
                                            <textarea class="fl mr-5" name="note" id="note" cols="102" rows="5">{{item.note}}</textarea>
                                        </div>
                                        <div class="right">
                                            <button class="default-button s-btn-sz" onclick="commonClass.fnMemoReg();">등록</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="nemo02">
                        <table class="none-line-table">
                            <tr>
                                <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentStart();"><i class="fa fa-play-circle-o" aria-hidden="true"></i>&nbsp;Agent 구동 </button></td>
                                <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentEnd();"><i class="fa fa-stop-circle-o" aria-hidden="true"></i>&nbsp;Agent 종료 </button></td>
                                <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentUpdate();"><i class="fa fa-level-up" aria-hidden="true"></i>&nbsp;Agent 업그레이드 </button></td>
                                <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentRollback();"><i class="fa fa-undo" aria-hidden="true"></i>&nbsp;Agent 롤백 </button></td>
                            </tr>
                        </table>
                    </div>
                    <hr>
                    <div class="tab">
                        <ul class="tab_menu" style="position: relative;">
                            <li><button onclick="onCreateClass.fnAgentTab1();">이력정보</button></li>
                            <%--<li><button onclick="onCreateClass.fnAgentTab2();">전송건수</button></li>--%>
                            <div class="menu-tab-left" id="tab-under-left"></div>
                            <div id="tab-under-right"></div>
                        </ul>
                        <div class="tab-box-1">
                            <div class="line"></div>
                            <input id="rasmblyId" type="hidden" v-bind:value="item.rasmblyId">
                            <div>
                                <table class="table">
                                    <colgroup>
                                        <col style="width:50%">
                                        <col style="width:50%">
                                    </colgroup>
                                    <tr>
                                        <th>상태</th>
                                        <%--<th>명령어시작</th>
                                        <th>명령어종료</th>--%>
                                        <th>등록일자</th>
                                    </tr>
                                    <tr v-for="item in items">
                                        <td>{{fnAgentComment(item.cmmndNm)}}</td>
                                        <%--<td>{{item.cmmndTrnsmisDt}}</td>
                                        <td>{{item.cmmndExcDt}}</td>--%>
                                        <td>{{item.frstRegistDt}}</td>
                                    </tr>
                                </table>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination">
                                        <li v-if="prev" @click="agentClass.fnAgentSetHisList(prevPage);"><a href="#">&laquo;</a></li>

                                        <template v-for="item in lastPageNoOnPageList">
                                            <li v-if="lastPageNoOnPageList > 1" @click="agentClass.fnAgentSetHisList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                                                <a href="#" v-if="lastPageNoOnPageList >= firstPageNoOnPageList + item">{{firstPageNoOnPageList + item}}</a>
                                            </li>
                                        </template>

                                        <li v-if="next" @click="agentClass.fnAgentSetHisList(nextPage);"><a href="#">&raquo;</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <%--<div class="tab-box-2">
                            <div class="line"></div>
                            <div id="chart_bar2"></div>
                        </div>--%>
                    </div>

                </div>
            </div>



            <!-- Agent 업그레이드 레이어 팝업 -->
            <div class="agent-update-layer-popup">
                <div class="header">
                    <span class="close-button" onclick="commonClass.fnAgentSetClose();"></span>
                </div>
                <form action="/insertCouncilSystemControl.do" enctype="multipart/form-data" id="apiServerUpdateForm" method="post">
                    <div class="content outer">
                        <div class="inner">
                            <h1>연계API서버 업데이트</h1>
                            <hr>
                            <input type="hidden" value="REQ003" id="cmmndCode" name="cmmndCode">
                            <input type="hidden" id="rasmblyCode" name="rasmblyCode">
                            <input type="hidden" id="memo" name="memo">
                            <div><span>배포파일</span><span><input id="files" name="files" type="file" onchange="onCreateClass.getRealPathAndSize(this);" /></span></div>
                            <div><span>배포경로</span><span><input id="trgetFilePath" type="text" /></span></div>
                            <div><span>파일크기</span><span><input id="trgetFileSize" type="text" /></span></div>

                            <div>
                                <span>
                                    <button class="default-button" onclick="commonClass.fnAgentSetProc();">요청</button>
                                    <button class="default-button" onclick="commonClass.fnAgentSetClose();return false;">취소</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Agent 서버정보 팝업 end -->

        <!-- Agent 서버 상태정보 팝업 start -->
        <div class="layer-pop-1280-760 agentServerStateInfoPop">
            <div class="top">
                <h2>Agent 서버 상태정보</h2>
                <div class="closeBtn"><a href="#" onclick="agentClass.fnAgentClose();">X</a></div>
            </div>
            <div id="tpl-agent-server-state-info-list">
                <div class="middle">
                    <table class="table">
                        <colgroup>
                            <col style="width:12.3%">
                            <col style="width:12.3%">
                            <col style="width:6.3%">
                            <col style="width:8.3%">
                            <col style="width:9.3%">
                            <col style="width:7.3%">
                            <col style="width:11.3%">
                            <col style="width:6.3%">
                            <col style="width:15.3%">
                            <col style="width:7.3%">
                            <col style="width:20.3%">
                            <col style="width:15.3%">
                        </colgroup>
                        <tr>
                            <th>지방의회</th>
                            <th>서버 IP</th>
                            <th>설치년도</th>
                            <th>서버명</th>
                            <th>OS</th>
                            <th>WAS</th>
                            <th>CPU</th>
                            <th>RAM</th>
                            <th>모듈설치경로</th>
                            <th>상태정보</th>
                            <th>비고</th>
                            <th class="end">최종수집일</th>
                        </tr>
                        <tr v-for="item in items">
                            <td>{{item.rasmblyNm}}</td>
                            <td>{{item.serverIp}}</td>
                            <td>{{item.installYear}}</td>
                            <td>{{item.server}}</td>
                            <td>{{item.os}}</td>
                            <td>{{item.was}}</td>
                            <td>{{item.cpu}}</td>
                            <td>{{item.ram}}</td>
                            <td>{{item.moduleInstallPath}}</td>
                            <td>{{item.systemSttusCode}}</td>
                            <td>{{item.note}}</td>
                            <td class="end">{{item.lastUpdtDt}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- Agent 서버 상태정보 팝업 end -->

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <link href="<c:url value="/assets/jstree/dist/themes/default/style.min.css"/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value="/assets/jstree/dist/jstree.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/highcharts.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/modules/exporting.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/themes/dark-unica.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/biz/chart.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/vue.min.js"/>"></script> <!-- vuejs -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script> <!-- 내가 만든 공통함수 -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/main.js"/>"></script>

        <script type="text/javascript">
            $(document).ready(function () {

                var rasmblyId = "${param.rasmblyId}";

                onCreateClass.init(rasmblyId);

                // 에러 정복 목록 그만보기 상태
                var popcheck = commonClass.getCookie('popup_check');
                if (popcheck == "true") {
                    $("#tpl-log-data-list").hide();
                    $("#idSaveChk").prop('checked', true);
                } else {
                    $("#tpl-log-data-list").show();
                    $("#idSaveChk").prop('checked', false);
                }

            });

            // 에러 정복 목록 그만보기
            $("#idSaveChk").on("click", function () {
                if ($(this).filter(":checked").length > 0) {
                    commonClass.setCookieExdays("popup_check", true, 365);
                } else {
                    commonClass.setCookieExdays("popup_check", false, 365);
                }
            });

        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>