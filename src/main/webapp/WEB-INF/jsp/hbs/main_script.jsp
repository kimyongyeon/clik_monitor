<%@ page language="java" pageEncoding="UTF-8"%>
<!-- template engine start -->
<%--<script id="agent_server_info_list1-template" type="text/x-handlebars-template">--%>
    <%--<ul class="list">--%>
        <%--{{#areas}}--%>
        <%--<li id="li_{{code}}">--%>
            <%--<a href="#" onclick="agentClass.fnAgentDetailPopup('{{code}}')"><span class="listBox"><img class="areas_img" src="img/img/img_img0{{state}}.{{ext}}" alt="" /></span><span class="listTxt">{{name}} <br /> ({{upDate}})</span></a>--%>
        <%--</li>--%>
        <%--{{/areas}}--%>
    <%--</ul>--%>
<%--</script>--%>

<%--<script id="agent_server_info_list2-template" type="text/x-handlebars-template">--%>
    <%--<ul class="list">--%>
        <%--{{#areas2}}--%>
        <%--<li id="li_{{code}}">--%>
            <%--<a href="#" onclick="agentClass.fnAgentDetailPopup('{{code}}')"><span class="listBox"><img class="areas_img" src="img/img/img_img0{{state}}.{{ext}}" alt="" /></span><span class="listTxt">{{name}} <br /> ({{upDate}})</span></a>--%>
        <%--</li>--%>
        <%--{{/areas2}}--%>
    <%--</ul>--%>
<%--</script>--%>

<!-- Agent 서버 에러로그 팝업  -->
<%--<script id="agent_server_info_popup-logdata_click-template" type="text/x-handlebars-template">
    <button class="edit-button" onclick="agentClass.fnLogData('{{rasmblyId}}');">로그데이터 확인</button>
</script>--%>

<!-- Agent 서버정보 -->
<%--<script id="agent_server_info_popup-template" type="text/x-handlebars-template">
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
                    <td>{{rasmblyNm}}</td>
                    <th>최종수집일</th>
                    <td>{{lastCntcDt}}</td>
                </tr>
                <tr>
                    <th>Agent 버전</th>
                    <td>1.0</td>
                    <th>Agent업데이트 일자 </th>
                    <td>{{updateDt}}</td>
                </tr>
                <tr>
                    <th>현재상태</th>
                    <td colspan="3">{{systemSttusCode}}</td>
                </tr>
                <tr>
                    <th>Memo</th>
                    <td colspan="3">
                        <div class="agent-server-info-memo">
                            <div class="left">
                                <textarea class="fl mr-5" name="note" id="note" cols="102" rows="5">{{note}}</textarea>
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
                    <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentStart();">Agent 구동 </button></td>
                    <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentEnd();">Agent 종료 </button></td>
                    <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentUpdate();">Agent 업그레이드 </button></td>
                    <td><button class="default-button d-btn-sz" onclick="commonClass.fnAgentRollback();">Agent 롤백 </button></td>
                </tr>
            </table>
        </div>
        <div class="tab">
            <ul class="tab_menu">
                <li><button onclick="onCreateClass.fnAgentTab1();">이력</button></li>
                <li><button onclick="onCreateClass.fnAgentTab2();">전송건수</button></li>
            </ul>
            <div class="tab-box-1">
                <div class="line"></div>
                <input id="rasmblyId" type="hidden" value="{{rasmblyId}}">
                <div id="agent_state_set_table_list">
                </div>
            </div>
            <div class="tab-box-2">
                <div class="line"></div>
                <div id="chart_bar2"></div>
            </div>
        </div>

    </div>
</script>--%>

<%--<script id="agent_server_state_set_popup-template" type="text/x-handlebars-template">--%>
    <%--<table class="table">--%>
        <%--<tr>--%>
            <%--<th>상태</th>--%>
            <%--<th>명령어시작</th>--%>
            <%--<th>명령어종료</th>--%>
            <%--<th>등록일자</th>--%>
        <%--</tr>--%>
        <%--{{#list}}--%>
        <%--<tr>--%>
            <%--<td>{{cmmndNm}}</td>--%>
            <%--<td>{{cmmndTrnsmisDt}}</td>--%>
            <%--<td>{{cmmndExcDt}}</td>--%>
            <%--<td>{{frstRegistDt}}</td>--%>
        <%--</tr>--%>
        <%--{{/list}}--%>
    <%--</table>--%>
    <%--<nav aria-label="Page navigation">--%>
        <%--<ul class="pagination agent_server_state_set_page_ul"></ul>--%>
    <%--</nav>--%>
<%--</script>--%>

<!-- Agent 서버 상태정보 -->
<%--<script id="agent_server_state_info_popup-template" type="text/x-handlebars-template">--%>
    <%--<div class="middle">--%>
        <%--<table class="table">--%>
            <%--<tr>--%>
                <%--<th>지방의회</th>--%>
                <%--<th>서버 IP</th>--%>
                <%--<th>설치년도</th>--%>
                <%--<th>서버명</th>--%>
                <%--<th>OS</th>--%>
                <%--<th>WAS</th>--%>
                <%--<th>CPU</th>--%>
                <%--<th>RAM</th>--%>
                <%--<th>모듈설치경로</th>--%>
                <%--<th>상태정보</th>--%>
                <%--<th>비고</th>--%>
                <%--<th class="end">최종수집일</th>--%>
            <%--</tr>--%>
            <%--{{#listAgentVO}}--%>
            <%--<tr>--%>
                <%--<td>{{rasmblyNm}}</td>--%>
                <%--<td>{{serverIp}}</td>--%>
                <%--<td>{{installYear}}</td>--%>
                <%--<td>{{server}}</td>--%>
                <%--<td>{{os}}</td>--%>
                <%--<td>{{was}}</td>--%>
                <%--<td>{{cpu}}</td>--%>
                <%--<td>{{ram}}</td>--%>
                <%--<td>{{moduleInstallPath}}</td>--%>
                <%--<td>{{systemSttusCode}}</td>--%>
                <%--<td>{{note}}</td>--%>
                <%--<td class="end">{{lastUpdtDt}}</td>--%>
            <%--</tr>--%>
            <%--{{/listAgentVO}}--%>
        <%--</table>--%>
    <%--</div>--%>
<%--</script>--%>

<%--<script id="errorBox-template" type="text/x-handlebars-template">
    <div id="errorBox_{{selIdx}}" class="errorPop" data-id="{{selIdx}}">
      <div class="txtTitle">
             <a href="#">{{msg}}</a>
          </div>
      <div class="closeBtn"><a href="#" onclick="fnClose({{selIdx}});">X</a></div>
    </div>
</script>--%>
<!-- template engine end -->