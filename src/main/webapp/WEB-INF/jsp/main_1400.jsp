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
                            <li><span><input type="checkbox" id="chk01" name="radioBox01" value="1"/><label for="chk01">회의록</label></span>
                            </li>
                            <%--<li><span><input type="checkbox" id="chk02" name="radioBox01" value="2"/><label for="chk02">부록</label></span>--%>
                            </li>
                            <li><span><input type="checkbox" id="chk03" name="radioBox01" value="3"/><label for="chk03">의안</label></span>
                            </li>
                            <li><span><input type="checkbox" id="chk04" name="radioBox01" value="4"/><label for="chk04">의원</label></span>
                            </li>
                            <li>
                                <button class="default-button" type="button" id="btnChartSearch" name="btnChartSearch"
                                        onclick="chartClass.btnChartSearch();"
                                        style="width: 192px; height: 28px;">
                                    검색
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div class="treeBox">
                        <div id="rTreeBox">
                        </div>
                    </div>
                </div>
                <div class="tab02">
                    <div class="sideBar_radioBox4">
                        <ul>
                            <li><span><input type="checkbox" id="chk05" name="radioBox02" value="1"/><label for="chk05">회의록</label></span></li>
                            <%--<li><span><input type="checkbox" id="chk06" name="radioBox02" value="2"/><label for="chk06">부록</label></span></li>--%>
                            <li><span><input type="checkbox" id="chk07" name="radioBox02" value="3"/><label for="chk07">의안</label></span></li>
                            <li><span><input type="checkbox" id="chk08" name="radioBox02" value="4"/><label for="chk08">의원</label></span></li>
                            <li>
                                <button class="default-button" type="button" id="btnChartSearch2" name="btnChartSearch"
                                        onclick="chartClass.btnChartSearch();"
                                        style="width: 192px; height: 28px; ">
                                    검색
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div class="treeBox">
                        <div id="aTreeBox">
                        </div>
                    </div>
                </div>

            </div>

            <div id="rightBox">
                <div class="inner_box">
                    <div id="errorBox"></div>
                    <div class="topBox" style="height:324px; position: relative;">
                        <h1 id="btnExpend"
                            style="color:white; position: absolute;top: 37px;right: 25px; cursor: pointer;"><img
                                id="agent-open-close" style="width:30px; height:30px" src="/img/agent_open.png"
                                alt="열기"></h1>
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
                                <img src="/img/network_on_1400.gif" style="width: 1122px;"/>
                                <img id="pipe-01" src="/img/pipe_01.png" style="top: 133px;" />
                                <img id="pipe-02" src="/img/pipe_02.png" style="top: 133px;" />
                                <img id="pipe-03" src="/img/pipe_03.png" style="top: 133px;" />
                                <script>
                                    var leftMove = 450;
                                    setInterval(function () {
                                        leftMove = leftMove + 20;
                                        if (leftMove == 750) {
                                            leftMove = 450;
                                        }
                                        $("#pipe-01").css({
                                            opacity: 0.25,
                                            position: 'absolute',
                                            left: leftMove + 'px'
                                        });
                                    }, 1000);
                                    setInterval(function () {
                                        leftMove = leftMove + 20;
                                        if (leftMove == 750) {
                                            leftMove = 450;
                                        }
                                        $("#pipe-02").css({
                                            position: 'absolute',
                                            left: leftMove + 'px'
                                        });
                                    }, 1000);
                                    setInterval(function () {
                                        leftMove = leftMove + 20;
                                        if (leftMove == 750) {
                                            leftMove = 450;
                                        }
                                        $("#pipe-03").css({
                                            position: 'absolute',
                                            left: leftMove + 'px'
                                        });
                                    }, 1000);
                                </script>
                            </div>
                        </div>
                        <div class="rightTopBox">
                            <div class="leftTopBox" style="position: relative;">
                                <!-- 트랜잭션 -->
                                <div id="chart_scatter" style="width:90%; height: 300px;"></div>
                                <div class="tran-legend" style="position: absolute; border: 1px solid gray; width: 185px; top:85%; height: 38px; left:34%; background: black;">
                                    <ul>
                                        <li style="float:left; color:white; margin-left: 9px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #2b908f; background-color: #2b908f;"></i> 회의록</li>
                                        <li style="float:left; color:white; margin-left: 25px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #90ee7e; background-color: #90ee7e;"></i> 의안</li>
                                        <li style="float:left; color:white; margin-left: 25px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #f45b5b; background-color: #f45b5b;"></i> 의원</li>
                                    </ul>
                                </div>
                                <%--<span class="chart-column-postion button-chart-menu button-position-absolute " style="top:453px; left:177px; background: #f45b5b;"><div style="margin-top:15px;">의원</div></span>--%>
                                <%--<span class="chart-column-postion button-chart-menu button-position-absolute " style="top:453px; left:311px; background: #90ee7e;"><div style="margin-top:15px;">의안</div></span>--%>
                                <%--<span class="chart-column-postion button-chart-menu button-position-absolute " style="top:453px; left:445px; background: #2b908f;"><div style="margin-top:15px;">회의록</div></span>--%>
                            </div>
                            <div class="leftBottomBox">
                                <!-- 서버 자원 사용현황 -->
                                <div id="chart_spline" style="width:90%; height: 300px;"></div>
                            </div>
                        </div>
                        <div class="rightBottomBox">
                            <div class="leftTopBox" style="position: relative;">
                                <!-- 전체요청 평균 건수-->
                                <div id="chart_cloumn" style="width:90%; height: 300px;"></div>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                                <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                            </div>
                            <div class="leftBottomBox">
                                <!-- 연계파일 저장용량 모니터링 -->
                                <div id="chart_bar" style="width:90%; height: 300px;"></div>
                            </div>

                        </div>
                    </div>
                    <div class="bottomBox" style="position: relative;">
                        <!-- 데이터 수집 현황 -->
                        <%--<img id="btn-prev" src="/img/icon_prev.png" onclick="chartClass.btnLeftClick();" style="cursor: pointer; position: absolute; left: 600px;color: red;font-size: 52px;z-index: 2; top: 1200px;"></img>--%>
                        <div id="chart_cloumn2"></div>
                        <%--<img id="btn-next" src="/img/icon_next.png" onclick="chartClass.btnRightClick();" style="cursor: pointer; position: absolute;right: 600px;color: red;font-size: 52px;z-index: 2;top: 1200px;"></img>--%>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                        <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Agent 서버정보 팝업 start -->
        <div class="agentServerInfo" style="height:870px">
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
        <div class="agentServerStateInfoPop popup">
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
        <script type="text/javascript" src="<c:url value="/assets/js/biz/main_1400.js"/>"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                onCreateClass.init();
            });
        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>