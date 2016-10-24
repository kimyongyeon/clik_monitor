<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="content">
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
                            <li><button class="default-button main-search-button" type="button" id="btnChartSearch" name="btnChartSearch" onclick="chartClass.btnChartSearch();">검색</button></li>
                        </ul>
                    </div>
                    <div id="rTreeBox"></div> <!-- 의회별 -->
                    <div id="aTreeBox"></div> <!-- 지역별 -->
                </div>
            </div>

            <div id="rightBox">
                <div class="inner_box">
                    <div id="errorBox"></div>
                    <div class="topBox">
                        <h1 id="btnExpend"><img id="agent-open-close" src="/img/agent_open.png" alt="열기"></h1>
                        <div class="topNemo">
                            <!-- Agent 서버정보 광역의회 목록 -->
                            <div id="agent_server_info_list1"></div>
                        </div>
                        <div class="bottomNemo">
                            <!-- Agent 서버정보 기초의회 목록 -->
                            <div id="agent_server_info_list2"></div>
                        </div>
                    </div>
                    <div class="middleBox">
                        <div class="fullBox">
                            <div class="fullSub" onclick="agentClass.fnAgentServerStateInfoPopup();">
                                <img id="network-img" src="/img/network_on.gif"></img>
                                <img id="network-img-1400" src="/img/network_on_1400.gif"></img>
                                <img id="pipe-01" src="/img/pipe_01.png"></img>
                                <img id="pipe-02" src="/img/pipe_02.png"></img>
                                <img id="pipe-03" src="/img/pipe_03.png"></img>
                            </div>
                        </div>
                        <div class="rightTopBox">
                            <div class="leftTopBox">
                                <!-- 트랜잭션 -->
                                <div id="chart_scatter"></div>
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
                                <div id="chart_spline"></div>
                            </div>
                        </div>
                        <div class="rightBottomBox">
                            <div class="leftTopBox">
                                <!-- 전체요청 평균 건수-->
                                <div id="chart_cloumn"></div>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                            </div>
                            <div class="leftBottomBox">
                                <!-- 연계파일 저장용량 모니터링 -->
                                <div id="chart_bar"></div>
                            </div>

                        </div>
                    </div>
                    <div class="bottomBox">
                        <!-- 데이터 수집 현황 -->
                        <div id="chart_cloumn2"></div>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Agent 서버정보 팝업 start -->
        <div class="layer-pop-1280-760 agentServerInfo">
            <div class="top">
                <h1>Agent 서버정보</h1>
                <div id="agent_server_info_popup_logdata_click"></div>
                <div class="closeBtn"><a href="#" onclick="agentClass.fnAgentClose();">X</a></div>
            </div>
            <div id="agent_server_info_popup"></div>
        </div>
        <!-- Agent 서버정보 팝업 end -->

        <!-- 로그 데이터 팝업 start -->
        <div class="logData_popup"></div>
        <!-- 로그 데이터 팝업 end -->

        <!-- Agent 서버 상태정보 팝업 start -->
        <div class="layer-pop-1280-760 agentServerStateInfoPop">
            <div class="top">
                <h2>Agent 서버 상태정보</h2>
                <div class="closeBtn"><a href="#" onclick="agentClass.fnAgentClose();">X</a></div>
            </div>
            <div id="agent_server_state_info_popup"></div>
        </div>
        <!-- Agent 서버 상태정보 팝업 end -->

        <!-- 오류 팝업-->
        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <link href="<c:url value="/assets/jstree/dist/themes/default/style.min.css"/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value="/assets/jstree/dist/jstree.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/highcharts.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/modules/exporting.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/themes/dark-unica.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/biz/chart.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/biz/main.js"/>"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                onCreateClass.init();
            });
        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>