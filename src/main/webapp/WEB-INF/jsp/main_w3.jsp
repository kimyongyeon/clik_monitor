<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div class="w3-row">
            <div class="w3-quarter w3-container w3-black">
                <ul class="w3-navbar">
                    <li class="w3-light-grey"><a href="javascript:void(0)" onclick="openCity('London')">의회별 전송 데이터 </a></li>
                    <li><a href="javascript:void(0)" onclick="openCity('Paris')">항목별 최종전송 데이터</a></li>
                </ul>
                <ul class="w3-ul w3-hoverable">
                    <li><span><input class="w3-check" type="checkbox" id="chk01" name="radioBox01" value="1"/><label class="w3-label" for="chk01">회의록</label></span></li>
                    <li><span><input class="w3-check" type="checkbox" id="chk03" name="radioBox01" value="3"/><label class="w3-label" for="chk03">의안</label></span></li>
                    <li><span><input class="w3-check" type="checkbox" id="chk04" name="radioBox01" value="4"/><label class="w3-label" for="chk04">의원</label></span></li>
                    <li>
                        <button class="w3-btn w3-white" type="button" onclick="chartClass.btnChartSearch();"> 검색 </button>
                    </li>
                </ul>
                <div id="London" class="city">
                    <div id="rTreeBox">
                    </div>
                </div>

                <div id="Paris" class="city">
                    <div id="aTreeBox">
                    </div>
                </div>
            </div>
            <div class="w3-rest w3-container">
                <div class="w3-col w3-black" style="width:100%; height:50px;">
                    <div class="topBox" style="height:111px;">
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
                </div>
                <div class="w3-col w3-black" style="width:100%;">
                    <div class="middleBox">
                        <div class="fullBox">
                            <div class="fullSub" onclick="agentClass.fnAgentServerStateInfoPopup();">
                                <img src="/img/network_on.gif" />
                                <img id="pipe-01" src="/img/pipe_01.png" />
                                <img id="pipe-02" src="/img/pipe_02.png" />
                                <img id="pipe-03" src="/img/pipe_03.png" />
                                <script>
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
                                </script>
                            </div>
                        </div>
                </div>
                <div class="w3-row">
                    <div class="w3-col" style="width:50%">
                        <div id="chart_scatter" style="width:100%; height: 300px;"></div>
                        <div class="tran-legend" style="position: absolute; border: 1px solid gray; width: 185px; top:85%; height: 38px; left:40%; background: black;">
                            <ul>
                                <li style="float:left; color:white; margin-left: 9px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #2b908f; background-color: #2b908f;"></i> 회의록</li>
                                <li style="float:left; color:white; margin-left: 25px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #90ee7e; background-color: #90ee7e;"></i> 의안</li>
                                <li style="float:left; color:white; margin-left: 25px; margin-top:15px;"><i class="fa fa-square-o" aria-hidden="true" style="color: #f45b5b; background-color: #f45b5b;"></i> 의원</li>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-col" style="width:50%">
                        <div id="chart_spline" style="width:100%; height: 300px;"></div>
                    </div>
                </div>
                <div class="w3-row">
                    <div class="w3-col" style="width:50%">
                        <div id="chart_cloumn" style="width:100%; height: 300px;"></div>
                        <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                        <button class="chart-column-postion button-chart-menu button-position-absolute button-chart-cloumn-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                    </div>
                    <div class="w3-col" style="width:50%">
                        <div id="chart_bar" style="width:100%; height: 300px;"></div>
                    </div>
                </div>
                <div class="w3-row">
                    <div id="chart_cloumn2"></div>
                    <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-left" onclick="chartClass.btnLeftClick();">광역시의회</button>
                    <button class="chart-column-postion2 button-chart-menu button-position-absolute button-chart-cloumn2-top-right" onclick="chartClass.btnRightClick();">시의회</button>
                </div>

            </div>
        </div>
        </div>
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

            function openCity(cityName) {
                var i;
                var x = document.getElementsByClassName("city");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                document.getElementById(cityName).style.display = "block";
            }

            $(document).ready(function () {
                openCity("London");
                onCreateClass.init();
            });
        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>