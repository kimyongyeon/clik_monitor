<%@ page language="java" pageEncoding="UTF-8"%>
<!-- template engine start -->
<script id="agent_server_info_list1-template" type="text/x-handlebars-template">
    <ul class="list">
        {{#areas}}
        <li id="li_{{code}}">
            <a href="#" onclick="agentClass.fnAreaPopup('{{code}}')"><span class="listBox"><img class="areas_img" src="img/img/img_img0{{state}}.{{ext}}" alt="" /></span><span class="listTxt">{{name}} <br /> ({{upDate}})</span></a>
        </li>
        {{/areas}}
    </ul>
</script>

<script id="agent_server_info_list2-template" type="text/x-handlebars-template">
    <ul class="list">
        {{#areas2}}
        <li id="li_{{code}}">
            <a href="#" onclick="agentClass.fnAreaPopup('{{code}}')"><span class="listBox"><img class="areas_img" src="img/img/img_img0{{state}}.{{ext}}" alt="" /></span><span class="listTxt">{{name}} <br /> ({{upDate}})</span></a>
        </li>
        {{/areas2}}
    </ul>
</script>

<!-- Agent 서버 에러로그 팝업  -->
<script id="agent_server_info_popup-logdata_click-template" type="text/x-handlebars-template">
    <div class="btn"><a href="#" onclick="logClass.fnLogData('{{rasmblyId}}');">로그데이터 확인</a></div>
</script>

<!-- Agent 서버정보 -->
<script id="agent_server_info_popup-template" type="text/x-handlebars-template">
    <div class="middle">
        <input id="rasmblyId" type="hidden" value="{{rasmblyId}}">
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
                        <table class="none-line-table">
                            <tr>
                                <td colspan="2">
                                    <textarea class="fl mr-5" name="memo" id="memo" cols="60" rows="5">{{note}}</textarea>
                                    <button class="default-button s-btn-sz" onclick="commonClass.fnMemoReg();">등록</button>
                                </td>
                            </tr>
                        </table>
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
        <div class="box06">
            <!-- 회의록, 부록, 의안, 의원 -->
            <div id="chart_bar2"></div>
        </div>
    </div>
</script>

<!-- Agent 서버 상태정보 -->
<script id="agent_server_state_info_popup-template" type="text/x-handlebars-template">
    <div class="middle">
        <table class="table">
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
            {{#listAgentVO}}
            <tr>
                <td>{{rasmblyNm}}</td>
                <td>{{serverIp}}</td>
                <td>{{installYear}}</td>
                <td>{{server}}</td>
                <td>{{os}}</td>
                <td>{{was}}</td>
                <td>{{cpu}}</td>
                <td>{{ram}}</td>
                <td>{{moduleInstallPath}}</td>
                <td>{{systemSttusCode}}</td>
                <td>{{note}}</td>
                <td class="end">{{lastUpdtDt}}</td>
            </tr>
            {{/listAgentVO}}
        </table>
    </div>
</script>

<script id="logdata_list_popup-template" type="text/x-handlebars-template">
    <table>
        <tr>
            <th height="5">의회명</th>
            <th>요청일자</th>
            <th>서버IP</th>
            <th>결과코드</th>
            <th width="300px">결과메세지</th>
        </tr>
        {{#list}}
        <tr class="log-row" style="cursor: pointer" onclick="logClass.fnDetail('{{requstId}}');">
            <td height="5">{{rasmblyNm}}</td>
            <td class="dateFormat">{{requstRecptnTm}}</td>
            <td>{{serverIp}}</td>
            <td>{{codeNm}}</td>
            <td><p class="ellipsis" style="margin-left:5px;">{{resultMssage}}</p></td>
        </tr>
        {{/list}}
    </table>
</script>

<script id="logData_popup-template" type="text/x-handlebars-template">
    <div class="logData">
        <div class="top">
            <h1>로그 데이터</h1>
            <div class="closeBtn"><a href="#" onclick="commonClass.fnLogDataClose();">X</a></div>
            <input type="hidden" name="requstInsttId" value="{{requstInsttId}}">
        </div>
        <div class="middle">
            <div class="nemo01">
                <div class="box01">
                    <div class="listBox01">
                        <h2>의회명</h2>
                        <p style="display: inline; width: 189px;">{{rasmblyNm}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청코드</h2>
                        <p>{{provdInsttId}}</p>
                    </div>
                </div>
                <div class="box02">
                    <div class="listBox01">
                        <h2>의회코드</h2>
                        <p>{{requstInsttId}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청일자</h2>
                        <p>{{requstRecptnTm}}</p>
                    </div>
                </div>
                <div class="box03">
                    <div class="listBox01">
                        <h2>서버IP</h2>
                        <p>{{serverIp}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>결과코드</h2>
                        <p>{{resultCode}}</p>
                    </div>
                </div>
            </div>
            <div class="box05">
                <div class="listBox01">
                    <h2>결과메시지</h2>
                    <div class="resultMessege">
                        <p>
                            {{resultMssage}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom"><span class="btnSet"><a href="#" onclick="logClass.fnLogDataClose();">확인</a></span></div>
    </div>
</script>

<script id="errorBox-template" type="text/x-handlebars-template">
    <div id="errorBox_{{selIdx}}" class="errorPop" data-id="{{selIdx}}">
      <div class="txtTitle">
             <a href="#">{{msg}}</a>
          </div>
      <div class="closeBtn"><a href="#" onclick="fnClose({{selIdx}});">X</a></div>
    </div>
</script>
<!-- template engine end -->