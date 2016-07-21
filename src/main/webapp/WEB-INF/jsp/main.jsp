<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">

    <tiles:putAttribute name="content">

        <!-- template engine start -->
        <script id="agent_server_info_list1-template" type="text/x-handlebars-template">
            <ul class="list">
                {{#areas1}}
                <li>
                    <a href="#" onclick="fnAreaPopup({{code}})"><span class="listBox"><img src="img/img/img_img0{{state}}.png" alt="" /></span><span class="listTxt">{{name}}({{upDate}})</span></a>
                </li>
                {{/areas1}}
            </ul>
        </script>

        <script id="agent_server_info_list2-template" type="text/x-handlebars-template">
            <ul class="list">
                {{#areas2}}
                <li>
                    <a href="#" onclick="fnAreaPopup({{code}})"><span class="listBox"><img src="img/img/img_img0{{state}}.png" alt="" /></span><span class="listTxt">{{name}}({{upDate}})</span></a>
                </li>
                {{/areas2}}
            </ul>
        </script>

        <script id="agent_server_info_popup-template" type="text/x-handlebars-template">
            <div class="middle">
                <div class="nemo01">
                    <div class="box01">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p id="rasmblyNm">{{rasmblyNm}}</p>
                        </div>
                        <div class="listBox01">
                            <h2>서버IP</h2>
                            <p id="serverIp">{{serverIp}}</p>
                        </div>
                        <div class="listBox01">
                            <h2>CPU</h2>
                            <p id="cpu">{{cpu}}</p>
                        </div>
                    </div>
                    <div class="box02">
                        <div class="listBox01">
                            <h2>설치년도</h2>
                            <p id="installYear">{{installYear}}년</p>
                        </div>
                        <div class="listBox01">
                            <h2>OS</h2>
                            <p id="os">{{os}}</p>
                        </div>
                        <div class="listBox01">
                            <h2>RAM</h2>
                            <p id="ram">{{ram}}</p>
                        </div>
                    </div>
                    <div class="box03">
                        <div class="listBox01">
                            <h2>서버명</h2>
                            <p id="serverNm">{{serverNm}}</p>
                        </div>
                        <div class="listBox01">
                            <h2>WAS</h2>
                            <p id="was">{{was}}</p>
                        </div>
                        <div class="listBox01">
                            <h2>최종수집일</h2>
                            <p id="lastDate">{{lastDate}}</p>
                        </div>
                    </div>
                </div>
                <div class="box04">
                    <div class="listBox01">
                        <h2>모듈설치경로</h2>
                        <p id="modulePath">{{modulePath}}</p>
                    </div>
                </div>
                <div class="box05">
                    <div class="listBox01">
                        <h2>비고</h2>
                        <p id="memo">{{memo}}</p>
                    </div>
                </div>
                <div class="nemo02">
                    <ul>
                        <li><button>수집API 구동 </button></li>
                        <li><button>수집API 종료 </button></li>
                        <li class="end"><button>업데이트 요청 </button></li>
                    </ul>
                </div>
                <div class="box06">
                    그래프
                </div>
            </div>
        </script>

        <script id="agent_server_state_info_popup-template" type="text/x-handlebars-template">
            <div class="middle">
                <table>
                    <tr>
                        <th>지방의회</th>
                        <th>서버 IP</th>
                        <th>CPU</th>
                        <th>응답 시간</th>
                        <th class="end">최종수집일</th>
                    </tr>
                    {{#listAgentVO}}
                    <tr>
                        <td>{{rasmblyNm}}</td>
                        <td>{{serverIp}}</td>
                        <td>{{cpu}}</td>
                        <td>{{reqProcessingRatio}}</td>
                        <td class="end">{{lastDate}}</td>
                    </tr>
                    {{/listAgentVO}}
                </table>
            </div>
        </script>
        <!-- template engine end -->

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
                            <li><span><input type="checkbox" id="chk01" name="radioBox01" /><label for="chk01">회의록</label></span></li>
                            <li><span><input type="checkbox" id="chk02" name="radioBox01" /><label for="chk02">부록</label></span></li>
                            <li><span><input type="checkbox" id="chk03" name="radioBox01" /><label for="chk03">의안</label></span></li>
                            <li><span><input type="checkbox" id="chk04" name="radioBox01" /><label for="chk04">의원</label></span></li>
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
                            <li><span><input type="checkbox" id="chk05" name="radioBox02" /><label for="chk05">회의록</label></span></li>
                            <li><span><input type="checkbox" id="chk06" name="radioBox02" /><label for="chk06">부록</label></span></li>
                            <li><span><input type="checkbox" id="chk07" name="radioBox02" /><label for="chk07">의안</label></span></li>
                            <li><span><input type="checkbox" id="chk08" name="radioBox02" /><label for="chk08">의원</label></span></li>
                        </ul>
                    </div>
                    <div class="treeBox">
                        <div id="aTreeBox">
                        </div>
                    </div>
                </div>

            </div>

            <div id="rightBox">

                <div id="errorBox"></div>
                <div class="topBox">

                    <!-- Agent 서버정보 팝업 start -->
                    <div class="topNemo">
                        <div id="agent_server_info_list1"></div>
                    </div>
                    <div class="bottomNemo">
                        <div id="agent_server_info_list2"></div>
                    </div>
                </div>
                <div class="middleBox">
                    <div class="fullBox">
                        <div class="fullSub">

                            <div class="well clearfix mt20" style="height:46px; position:relative; background-color: #000 ;">
                                <div class="loading">
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                    <div class="loading__ball" style="background:red"></div>
                                    <div class="loading__ball"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="rightTopBox">
                        <div class="leftTopBox">
                            <div id="chart_bar" style="width:100%; height: auto"></div>
                        </div>
                        <div class="leftBottomBox">
                            <div id="chart_cloumn" style="width:100%; height: auto"></div>
                        </div>
                    </div>
                    <div class="rightBottomBox">
                        <div class="leftTopBox">
                            <div id="chart_spline" style="width:100%; height: auto;"></div>
                        </div>
                        <div class="leftBottomBox">
                            <div id="chart_scatter" style="width:100%; height: auto;"></div>
                        </div>

                    </div>
                </div>
                <div class="bottomBox">
                    <div id="chart_cloumn2" style="width:100%; height: auto;"></div>
                </div>
            </div>
        </div>
        </div>

        <!-- Agent 서버정보 팝업 start -->
        <div class="agentServerInfo">
            <div class="top">
                <h1>Agent 서버정보</h1>
                <div class="btn"><a href="#" onclick="fnLogData()">로그데이터 확인</a></div>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div id="agent_server_info_popup"></div>
            <div class="bottom"><span class="btnSet"><a href="#">닫기</a></span></div>
        </div>

        <!-- Agent 서버정보 팝업 end -->


        <!-- Agent 서버정보 추가 팝업 start -->
        <div class="agentServerInfoInsert">
            <div class="top">
                <h1>Agent 서버정보 추가</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div class="middle">
                <table class="table03">
                    <tr>
                        <th scope="row">기관유형</th>
                        <td colspan="5"><select name="select" class="select01">
                            <option value="">기관선택</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                            <select name="select2" class="select02">
                                <option value="">기관유형선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select name="select2" class="select03">
                                <option value="">지역선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select name="select2" class="select04">
                                <option value="">소속선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select></td>
                    </tr>
                    <tr>
                        <th scope="row">비밀번호</th>
                        <td colspan="3"><input type="password" title="비밀번호" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트URL</th>
                        <td colspan="3"><input type="text" title="사이트URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내회의록URL</th>
                        <td colspan="3"><input type="text" title="사이트내회의록URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내의안URL</th>
                        <td colspan="3"><input type="text" title="사이트내의안URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내의원URL</th>
                        <td colspan="3"><input type="text" title="사이트내의원URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">OPENAPI 정보정공여부</th>
                        <td colspan="3"><select name="select3" class="select05">
                            <option value="">회의록</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">서버IP</th>
                        <td colspan="3"><input type="text" title="서버IP" /></td>
                    </tr>
                    <tr>
                        <th scope="row">게시여부</th>
                        <td colspan="3"><select name="select4" class="select06">
                            <option value="">게시</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">지방의회상태</th>
                        <td colspan="3"><select name="select5" class="select07">
                            <option value="">운영</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">설치년도</th>
                        <td><select name="select6" class="select08">
                            <option value="">2016</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                        <th>서버명</th>
                        <td colspan="3"><input type="text" title="서버명" /></td>

                    </tr>
                    <tr>
                        <th scope="row">OS</th>
                        <td><input type="text" title="OS" /></td>
                        <th>WAS</th>
                        <td colspan="3"><input type="text" title="WAS" /></td>

                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td><input type="text" title="CPU" /></td>
                        <th>RAM</th>
                        <td colspan="3"><input type="text" title="RAM" /></td>

                    </tr>
                    <tr>
                        <th scope="row">모듈설치경로</th>
                        <td colspan="3"><input type="text" title="모듈설치경로" /></td>
                    </tr>
                    <tr>
                        <th scope="row">비고</th>
                        <td colspan="3"><input type="text" title="비고" /></td>
                    </tr>
                </table>

            </div>

            <div class="bottom"><span class="btnSet"><span class="leftBtn"><a href="#">등록</a></span><a href="#">취소</a></span></div>
        </div>
        <!-- Agent 서버정보 추가 팝업 end -->


        <!-- 로그 데이터 팝업 start -->
        <div class="logData">
            <div class="top">
                <h1>로그 데이터</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div class="middle">
                <div class="nemo01">
                    <div class="box01">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p>서울특별시의회</p>
                        </div>
                        <div class="listBox01">
                            <h2>요청코드</h2>
                            <p>REQ301</p>
                        </div>
                    </div>
                    <div class="box02">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p>서울의회</p>
                        </div>
                        <div class="listBox01">
                            <h2>요청일자</h2>
                            <p>2016.05.10</p>
                        </div>
                    </div>
                    <div class="box03">
                        <div class="listBox01">
                            <h2>서버IP</h2>
                            <p>210.178.102.3</p>
                        </div>
                        <div class="listBox01">
                            <h2>결과코드</h2>
                            <p>104</p>
                        </div>
                    </div>
                </div>
                <div class="box05">
                    <div class="listBox01">
                        <h2>결과메시지</h2>
                        <div class="resultMessege">
                            <p>
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom"><span class="btnSet"><a href="#">확인</a></span></div>
        </div>
        <!-- 로그 데이터 팝업 end -->

        <!-- Agent 서버 상태정보 팝업 start -->
        <div class="agentServerStateInfoPop">
            <div class="top">
                <h1>Agent 서버 상태정보</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div id="agent_server_state_info_popup"></div>
            <div class="bottom"><a href="#">닫기</a></div>
        </div>
        <!-- Agent 서버 상태정보 팝업 end -->


        <!-- 트리뷰 -->
        <link href="<c:url value="/assets/jstree/dist/themes/default/style.min.css"/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value="/assets/jstree/dist/jstree.min.js"/>"></script>
        <!-- highchart -->
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/highcharts.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/modules/exporting.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/Highcharts-4.2.5/js/themes/dark-unica.js"/>"></script>

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">

            // 로그데이터
            function fnLogData() {
                $(".agentServerInfo").removeClass("openPop");
                $(".logData").addClass("openPop");
            }
            // Agent 서버정보 팝업 이벤트
            function fnAreaPopup(code) {
                $(".agentServerInfo").addClass("openPop");
                screenPop();
                fnAjaxAreaDetail(code);
            }
            // Agent 서버 상태정보 Ajax
            function fnAjaxAgentServerStateInfoList() {

                var url = "getAreaStateInfoList.do";

                $.ajax({
                    url: url,
                    type: 'GET',
                    dataTye: 'json',
                    contentType:"application/json; charset=utf-8",
                    data: {},
                    success: function(data, textStatus, jqXHR) {
                        console.log(data);
                        var htmlText = getHtmlText("agent_server_state_info_popup-template",data);
                        $("#agent_server_state_info_popup").html(htmlText(data));
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    },
                    statusCode: {
                        404: function() {
                            alert("[url: " + url + "]  page not found");
                        }
                    }
                });
            }
            // Agent 서버정보 Ajax
            function fnAjaxAreaDetail(code) {

                var url = "getAreaDeatail.do";

                $.ajax({
                    url: url,
                    type: 'GET',
                    dataTye: 'json',
                    contentType:"application/json; charset=utf-8",
                    data: {code:code || ''},
                    success: function(data, textStatus, jqXHR) {
                        var htmlText = getHtmlText("agent_server_info_popup-template",data);
                        $("#agent_server_info_popup").html(htmlText(data));

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    },
                    statusCode: {
                        404: function() {
                            alert("[url: " + url + "]  page not found");
                        }
                    }
                });
            }
            // 메인화면 Agent 상태 목록 Ajax
            function fnAjaxMainAreaData() {

                var url = "getAreas.do";

                $.ajax({
                    url: url,
                    type: 'GET',
                    dataTye: 'json',
                    contentType:"application/json; charset=utf-8",
                    data: {},
                    success: function(data, textStatus, jqXHR) {
                        console.log(data);

                        var htmlText = getHtmlText("agent_server_info_list1-template",data);
                        $("#agent_server_info_list1").html(htmlText(data));
                        var htmlText = getHtmlText("agent_server_info_list2-template",data);
                        $("#agent_server_info_list2").html(htmlText(data));

//                        var areas = data.areas;
//                        console.log(areas[0]["name"])
//                        var liHtml = "";
//                        var liHtml2 = "";
//                        for(var i=0; i<areas.length; i++) {
//                            if(areas[i]["gubun"] === "1") {
//                                liHtml += '<li><a href="#" onclick="fnAreaPopup('+areas[i]["code"]+');"><span class="listBox"><img src="img/img/img_img0'+areas[i]["state"]+'.png" alt="" /></span><span class="listTxt">';
//                                liHtml += areas[i]["name"];
//                                liHtml += '(';
//                                liHtml += areas[i]["upDate"];
//                                liHtml += ')';
//                                liHtml += '</span></a></li>';
//                            } else {
//                                liHtml2 += '<li><a href="#" onclick="fnAreaPopup('+areas[i]["code"]+');"><span class="listBox"><img src="img/img/img_img0'+areas[i]["state"]+'.png" alt="" /></span><span class="listTxt">';
//                                liHtml2 += areas[i]["name"];
//                                liHtml2 += '(';
//                                liHtml2 += areas[i]["upDate"];
//                                liHtml2 += ')';
//                                liHtml2 += '</span></a></li>';
//                            }
//
//                        }
//                        $(".topNemo .list").append(liHtml);
//                        $(".bottomNemo .list").append(liHtml2);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    },
                    statusCode: {
                        404: function() {
                            alert("[url: " + url + "]  page not found");
                        }
                    }
                });
            }

            // Ajax TEST
//            function fnAjaxUiData(page) {
//
//                var url = "test.do/한글";
//
//                if(page === undefined) {
//                    page = 1;
//                }
//
//                var arrayData = [];
//                for(i=0; i<10; i++) {
//                    arrayData.push({
//                        name: "charse, " + i,
//                        number: "num, " + i
//                    });
//                }
//
//                var params = {
//                    page: page,
//                    data: "data1",
//                    param: "한글테스트",
//                    name: "rasmblyNm_1",
//                    number: "systemSttusCode_1",
//                    channel: "1,2,kim",
//                    arrayData : JSON.stringify(arrayData)
//
//                }
//
//                $.ajax({
//                    url: url,
//                    type: 'GET',
//                    dataTye: 'json',
//                    contentType:"application/json; charset=utf-8",
//                    data: params,
//                    success: function(data, textStatus, jqXHR) {
//                        console.log(data);
//                    },
//                    error: function(jqXHR, textStatus, errorThrown) {
//                    },
//                    statusCode: {
//                        404: function() {
//                            alert("[url: " + url + "]  page not found");
//                        }
//                    }
//                });
//            }

            $(document).ready(function () {

                // test
//                fnAjaxUiData();

                // 지방의회, 기초의회 상태 아이콘 출력
                fnAjaxMainAreaData();
                // Agent 서버 상태정보
                fnAjaxAgentServerStateInfoList();

                // 의회별
                $('#rTreeBox').jstree({
                    "plugins" : ["checkbox"],
                    'core' : {
                        'data' : [
                            { "text" : "광역의회",
                                "state" : {
                                    "opened" : true
                                },
                                "children" : [
                                { "text" : "서울특별시의회" },
                                { "text" : "부산광역시의회" },
                                { "text" : "대구광역시의회" },
                                { "text" : "인천광역시의회" },
                                { "text" : "광주광역시의회" },
                                { "text" : "대전광역시의회" },
                                { "text" : "울산광역시의회" },
                                { "text" : "세종특별자치시의회" },
                                { "text" : "경기도의회" },
                                { "text" : "강원도의회" },
                                { "text" : "충청북도의회" },
                                { "text" : "충청남도의회" },
                                { "text" : "전라북도의회" },
                                { "text" : "전라남도의회" },
                                { "text" : "경상북도의회" },
                                { "text" : "경상남도의회" },
                                { "text" : "제주특별자치의회" },
                            ]
                            },
                            { "text" : "기초의회",
                                "state" : {
                                    "opened" : true
                                },
                                "children" : [
                                { "text" : "경기도 부천시의회" },
                                { "text" : "경기도 하남시의회" },
                                { "text" : "강원도 강릉시의회" },
                                { "text" : "충청북도 청주시의회" },
                                { "text" : "충청남도 서산시의회" },
                                { "text" : "전라북도 정읍시의회" },
                                { "text" : "전라남도 순천시의회" },
                                { "text" : "경상북도 상주시의회" },
                                { "text" : "경상남도 거제시의회" },
                                { "text" : "경상남도 김해시의회" },
                            ]
                            }
                        ]
                    }
                 });
                // 지역별
                $('#aTreeBox').jstree({
                    "plugins" : ["checkbox"],

                    'core' : {
                        'data' : [
                            { "text" : "전체",
                                "state" : {"opened" : true },
                                "children" : [
                                { "text" : "서울특별시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "서울특별시의회"}]
                                },
                                { "text" : "부산광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "부산광역시의회"}]
                                },
                                { "text" : "대구광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "대구광역시의회"}]
                                },
                                { "text" : "인천광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "인천광역시의회"}]
                                },
                                { "text" : "광주광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "광주광역시의회"}]
                                },
                                { "text" : "대전광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "대전광역시의회"}]
                                },
                                { "text" : "울산광역시",
                                    "state" : {"opened" : true },
                                    "children" : [{"text" : "울산광역시의회"}]
                                },
                                { "text" : "경기도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "경기도의회"},
                                        {"text" : "경기도 부천시의회"},
                                        {"text" : "경기도 하남시의회"}
                                    ]
                                },
                                { "text" : "강원도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "강원도의회"},
                                        {"text" : "강원도 강릉시의회"},
                                    ]
                                },
                                { "text" : "충청북도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "충청북도의회"},
                                        {"text" : "충청북도 청주시의회"},
                                    ]
                                },
                                { "text" : "충청남도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "충청남도의회"},
                                        {"text" : "충청남도 서산시의회"},
                                    ]
                                },
                                { "text" : "전라북도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "전라북도의회"},
                                        {"text" : "전라북도 정읍시의회"},
                                    ]
                                },
                                { "text" : "전라남도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "전라남도의회"},
                                        {"text" : "전라남도 순천시의회"},
                                    ]
                                },
                                { "text" : "경상북도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "경상북도의회"},
                                        {"text" : "경상북도 상주시의회"},
                                    ]
                                },
                                { "text" : "경상남도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "경상남도의회"},
                                        {"text" : "경상남도 거제시의회"},
                                        {"text" : "경상남도 김해시의회"},
                                    ]
                                },
                                { "text" : "제주특별자치도",
                                    "state" : {"opened" : true },
                                    "children" : [
                                        {"text" : "제주특별자치도의회"},
                                    ]
                                },

                            ]
                            }
                        ]
                    }
                 });

                $('#rTreeBox').on("changed.jstree", function (e, data) {
                    console.log(data.instance.get_selected(true)[0].text);
                    console.log(data.instance.get_node(data.selected[0]).text);
                });

                $('#aTreeBox').on("changed.jstree", function (e, data) {
                    console.log(data.instance.get_selected(true)[0].text);
                    console.log(data.instance.get_node(data.selected[0]).text);
                });

                // hichart 시작
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                var chart;
                chart_spline('spline', '#chart_spline');
                chart_cloumn();
                chart_cloumn2();
                chart_scatter();
                chart_bar();

                function chart_spline(chart, chartid) {
                    $(function () {
                        Highcharts.setOptions({
                            global: {
                                useUTC: false
                            }
                        });

                        $('#chart_spline').highcharts({
                            chart: {
                                type: 'spline',
                                animation: Highcharts.svg, // don't animate in old IE
                                marginRight: 10,
                                events: {
                                    load: function () {

                                        // set up the updating of the chart each second
                                        var series = this.series[0];
                                        setInterval(function () {
                                            var x = (new Date()).getTime(), // current time
                                                    y = Math.random();
                                            series.addPoint([x, y], true, true);
                                        }, 1000);
                                    }
                                }
                            },
                            title: {
                                text: 'CPU 점유율'
                            },
                            xAxis: {
                                type: 'datetime',
                                tickPixelInterval: 150
                            },
                            yAxis: {
                                title: {
                                    text: 'CPU',
                                    rotation: '360'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.series.name + '</b><br/>' +
                                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                            Highcharts.numberFormat(this.y, 2);
                                }
                            },
                            // legend: {
                            //     enabled: false
                            // },
                            exporting: {
                                enabled: false
                            },
                            series: [{
                                name: '메모리',
                                data: (function () {
                                    // generate an array of random data
                                    var data = [],
                                            time = (new Date()).getTime(),
                                            i;

                                    for (i = -19; i <= 0; i += 1) {
                                        data.push({
                                            x: time + i * 1000,
                                            y: Math.random()
                                        });
                                    }
                                    return data;
                                }())
                            }]
                        });
                    });
                }

                function chart_cloumn() {
                    $(function() {
                        $('#chart_cloumn').highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: '전체 평균 요청건수'
                            },
                            subtitle: {
                                text: '어제/오늘/주간/전체'
                            },
                            xAxis: {
                                categories: [
                                    '서울',
                                    '부산',
                                    '대구',
                                    '인천',
                                    '광주',
                                    '대전',
                                    '울산',
                                    '세종',
                                    '경기도',
                                    '전라북도',
                                    '전라남도',
                                    '제주'
                                ],
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '건수',
                                    rotation: 360,
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: '어제',
                                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                            }, {
                                name: '오늘',
                                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                            }, {
                                name: '주간',
                                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                            }, {
                                name: '전체',
                                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

                            }]
                        });
                    });
                }

                function chart_cloumn2() {
                    $(function() {
                        $('#chart_cloumn2').highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: '데이터 수집 현황'
                            },
                            subtitle: {
                                text: '(단위:개)'
                            },
                            xAxis: {
                                categories: [
                                    '서울(2016.05.20)',
                                    '부산(2016.05.19)',
                                    '대구(2016.05.17)',
                                    '인천(2014.03.02)',
                                    '광주(2013.04.02)',
                                    '대전(2016.05.22)',
                                    '울산(2016.04.02)',
                                    '세종(2016.03.22)',
                                    '경기도(2016.01.22)',
                                    '전라북도(2016.02.03)',
                                    '전라남도(2016.07.02)',
                                    '제주(2016.02.02)'
                                ],
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '건수',
                                    rotation: 360,
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: '건수',
                                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                            }]
                        });
                    });
                }

                function chart_scatter() {
                    $(function() {
                        $('#chart_scatter').highcharts({
                            chart: {
                                type: 'scatter',
                                zoomType: 'xy'
                            },
                            title: {
                                text: '트랜잭션 뷰'
                            },
                            subtitle: {
                                text: '의회별 요청건수'
                            },
                            xAxis: {
                                crosshair: true,
                                title: {
                                    enabled: true,
                                    text: 'time'
                                },
                                startOnTick: true,
                                endOnTick: true,
                                showLastLabel: true
                            },
                            yAxis: {
                                title: {
                                    text: '요청건수',
                                    rotation: 360
                                }
                            },
                            // legend: {
                            // 	verticalAlign: 'top',
                            // 	x: 150,
                            // 	y: 0,
                            //   // layout: 'vertical',
                            //   // align: 'left',
                            //   verticalAlign: 'top',
                            //   // x: 100,
                            //   // y: 70,
                            //   floating: true,
                            //   backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                            //   borderWidth: 1
                            // },
                            plotOptions: {
                                scatter: {
                                    marker: {
                                        radius: 5,
                                        states: {
                                            hover: {
                                                enabled: true,
                                                lineColor: 'rgb(100,100,100)'
                                            }
                                        }
                                    },
                                    states: {
                                        hover: {
                                            marker: {
                                                enabled: false
                                            }
                                        }
                                    },
                                    tooltip: {
                                        headerFormat: '<b>{series.name}</b><br>',
                                        pointFormat: '{point.x} cm, {point.y} kg'
                                    }
                                }
                            },
                            series: [{
                                name: '서울',
                                color: 'rgba(223, 83, 83, .5)',
                                data: [
                                    [161.2, 51.6],
                                    [167.5, 59.0],
                                    [159.5, 49.2],
                                    [157.0, 63.0],
                                    [155.8, 53.6],
                                    [170.0, 59.0],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [159.1, 47.6],
                                    [166.0, 69.8]
                                ]

                            }, {
                                name: '부산',
                                color: 'rgba(119, 152, 191, .5)',
                                data: [
                                    [174.0, 65.6],
                                    [175.3, 71.8],
                                    [193.5, 80.7],
                                    [186.5, 72.6],
                                    [187.2, 78.8]
                                ]
                            }, {
                                name: '광주',
                                color: 'green',
                                data: [
                                    [174.0, 65.7],
                                    [175.3, 91.8],
                                    [193.5, 80.7],
                                    [186.5, 72.6],
                                    [187.2, 78.8]
                                ]
                            }

                            ]
                        });
                    });
                }

                function chart_bar() {
                    $(function() {
                        $('#chart_bar').highcharts({
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: '연계파일 저장용량 모니터링'
                            },
                            subtitle: {
                                text: '총사용량/사용량/남은용량'
                            },
                            xAxis: {
                                categories: ['/clik-cols', '/clik-data', '/clikapi-file/clik001'],
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'MB',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                valueSuffix: ' millions'
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            // legend: {
                            // 	verticalAlign: 'top',
                            // 	x: 120,
                            // 	y: 100,
                            //   //layout: 'vertical',
                            //   //align: 'right',
                            //   //verticalAlign: 'top',
                            //   //x: -40,
                            //   //y: 80,
                            //   floating: true,
                            //   borderWidth: 1,
                            //   backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            //   shadow: true
                            // },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                name: '총용량',
                                data: [107, 31, 635]
                            }, {
                                name: '사용용량',
                                data: [133, 156, 947]
                            }, {
                                name: '남은 용량',
                                data: [1052, 954, 4250]
                            }]
                        });
                    });
                }

            });

            var currentIndex = 0; // 현재 위치
            var errorStartClear, errorEndClear;

            var errorStart = function() {
                errorStartClear = setInterval(
                    function (){
                        currentIndex++;
                        errorBox('서울특별시의회 Agent 문제 발생 ' + currentIndex, currentIndex);
                    }, 1000);

            };

            var errorEnd = function(){
                errorEndClear = setInterval(
                    function fnClose() {
                        $(".errorPop").fadeOut('slow');
                    }
                    , 5000);

            };

            errorBox('서울특별시의회 Agent 문제 발생', 0);
            setTimeout("fnErrorBoxClose()", 5000);

            function fnErrorBoxClose() {
                $("#errorBox").fadeOut('slow');
            }

            // errorBox Close
            function fnClose(selIdx) {
                var id = $("#errorBox_" + selIdx).attr("data-id");
                console.log(id, selIdx);
                if( id == selIdx) {
//                    $("#errorBox_" + selIdx).css("display", "none");
                    $("#errorBox_" + selIdx).fadeOut('slow');
                }
            }

            function errorBox(msg, selIdx) {
                var htmlTag = "";
                htmlTag += '<div id="errorBox_'+selIdx+'" class="errorPop" data-id="'+selIdx+'">';
                htmlTag += '  <div class="txtTitle">';
                htmlTag += '     <a href="#">'+msg+'</a>';
                htmlTag += '  </div>';
                htmlTag += '  <div class="closeBtn"><a href="#" onclick="fnClose('+selIdx+');">X</a></div>';
                htmlTag += '</div>';
                $('#errorBox').append(htmlTag);
            }

            $("#btnErrorBox1").on("click", function() {
                currentIndex++;
                errorBox('서울특별시의회 Agent 문제 발생 ' + currentIndex, currentIndex);
                $("#errorBox").show().fadeIn('slow');
            });

            $("#btnErrorBox2").on("click", function() {
                errorStart();
                errorEnd();
                $("#errorBox").show().fadeIn('slow');
            });
            $("#btnErrorBox3").on("click", function() {
                clearInterval(errorStartClear);
                clearInterval(errorEndClear);

            });

            setTimeout("fnLoadingStart()", 500);

            function fnLoadingStart() {
                $(".loading").show();
            }

            function fnLoadingStop() {
                $(".loading").hide();
            }

            $("#btnErrorBox4").on("click",function(){
                fnAnimationStart();
            });

            $("#btnErrorBox5").on("click",function(){
                fnAnimationStop();
            });


            function fnAnimationStart() {
                $(".loading__ball:nth-child(odd)").css("-webkit-animation", "up 1s infinite ease-in-out");
                $(".loading__ball:nth-child(odd)").css("-moz-animation", "up 1s infinite ease-in-out");
                $(".loading__ball:nth-child(odd)").css("animation", "up 1s infinite ease-in-out");

                $(".loading__ball:nth-child(even)").css("-webkit-animation", "down 1s infinite ease-in-out");
                $(".loading__ball:nth-child(even)").css("-moz-animation", "down 1s infinite ease-in-out");
                $(".loading__ball:nth-child(even)").css("animation", "down 1s infinite ease-in-out");
            }

            function fnAnimationStop() {
                setTimeout(function() {
                    $(".loading__ball:nth-child(odd)").css("-webkit-animation", "paused");
                    $(".loading__ball:nth-child(odd)").css("-moz-animation", "paused");
                    $(".loading__ball:nth-child(odd)").css("animation", "paused");
                }, 1000);
                setTimeout(function() {
                    $(".loading__ball:nth-child(even)").css("-webkit-animation", "paused");
                    $(".loading__ball:nth-child(even)").css("-moz-animation", "paused");
                    $(".loading__ball:nth-child(even)").css("animation", "paused");
                }, 1000);
            }

        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>