<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <div id="container">
            <div id="subRightBox">
                <div class="titleArea">
                    <h2><i class="fa fa-cog" aria-hidden="true"></i> 메일링 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                            <li>></li>
                            <li><a href="#">메일링 관리</a></li>
                        </ul>
                    </div>
                </div>
                <div class="topTable">
                    <div class="adminTab02">
                        <ul>
                            <li class="listTab03"><a href="#">메일목록</a></li>
                            <li class="listTab02"><a href="#">메일설정</a></li>
                            <li class="listTab01"><a href="#">발송내역</a></li>
                        </ul>
                    </div>
                </div>

                <!-- 메일목록 -->
                <div class="mail_list">
                    <div class="topTable"><table class="table01">
                            <tr>
                                <th scope="row">등록일자</th>
                                <td>
                                    <span class="calendar01"><input type="text" id="datepicker21"/></span>
                                    <span class="pado">~</span>
                                    <span class="calendar01"><input type="text" id="datepicker22"/></span>
                                    <span class="calendarBtn">
                                        <button class="default-button" type="button" value="당일" name="dateToday" id="dateToday2" onclick="onCreateClass.fnDateToday2()">당일</button>
                                        <button class="default-button" type="button" value="1주일" name="dateWeek" id="dateWeek2" onclick="onCreateClass.fnDateWeek2()">1주일</button>
                                        <button class="default-button" type="button" value="1개월" name="dateMonth" id="dateMonth2" onclick="onCreateClass.fnDateMonth2()">1개월</button>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">검색항목</th>
                                <td>
                                    <span class="select01">
                                        <select name="keyWordType" id="keyWordType2" class="select01">
                                            <option value="">전체</option>
                                            <option value="1">제목</option>
                                            <option value="2">받는사람</option>
                                        </select>
                                    </span>
                                    <span class="select02"><input style="width:159%;" type="text" id="keyWordText2" name="keyWordText2"/></span>
                                    <div style="float: right; margin-right: 10px">
                                        <button class="default-button" onclick="onCreateClass.btnMailListSearch()">검색  </button>
                                    </div>
                                </td>
                            </tr>
                        </table></div>
                    <div class="BottomTable">
                        <div class="tab01Box" id="sendList" >
                            <div id="myTable5"></div>
                        </div>
                    </div>
                </div>

                <!-- 발송내역 -->
                <div class="send_list" style="display: none;">
                    <div class="topTable">
                        <table class="table01">
                            <tr>
                                <th scope="row">발송일자</th>
                                <td>
                                    <span class="calendar01"><input type="text" id="datepicker1"/></span>
                                    <span class="pado">~</span>
                                    <span class="calendar01"><input type="text" id="datepicker2"/></span>
                                    <span class="calendarBtn">
                                        <button class="default-button" type="button" value="당일" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateToday()">당일</button>
                                        <button class="default-button" type="button" value="1주일" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateWeek()">1주일</button>
                                        <button class="default-button" type="button" value="1개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth()">1개월</button>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">검색항목</th>
                                <td>
                                    <span class="select01">
                                        <select name="keyWordType" id="keyWordType" class="select01">
                                            <option value="">전체</option>
                                            <option value="1">제목</option>
                                            <option value="2">발송일자</option>
                                        </select>
                                    </span>
                                    <span class="select02"><input style="width:159%;" type="text" id="keyWordText" name="keyWordText"/></span>
                                    <div style="float: right; margin-right: 10px">
                                        <button class="default-button" onclick="onCreateClass.btnSearch()">검색 </button>
                                        <button class="default-button" onclick="onCreateClass.btnExcelSave();">엑셀저장 </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="BottomTable">
                        <div class="tab01Box">
                            <div id="myTable4"></div>
                        </div>
                    </div>
                </div>

                <!-- 메일설정 -->
                <div class="mail_set" style="display: none;">
                    <div class="topTable">
                        <table class="table01">
                            <tr>
                                <th scope="row">받는사람</th>
                                <td>
                                    <span class="txtInput">
                                        <input id="receiver" name="receiver" type="text" placeholder="test@gmail.com"/>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td>
                                    <input id="emailId" name="emailId" type="hidden" value=""> <!-- emailId -->
                                    <span class="txtInput">
                                        <input type="text" value="오류가 발생하였습니다" id="mailTitle" name="mailTitle"/>
                                    </span>
                                    <span class="txt">예)2016.05.10 11:11:10 서울특별시의회
                                        <span class="txtRed">오류가 발생하였습니다</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">지방의회</th>
                                <td>
                                    <div class="box01">
                                        <h3>광역시도의회</h3>
                                        <div id="areas1_div"></div>
                                    </div>
                                    <div class="box01">
                                        <h3>기초의회</h3>
                                        <div id="areas2_div"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="BottomTable">
                        <div class="tab01Box">
                            <div class="fr">
                                <button class="default-button" onclick="onCreateClass.fnPopupSave();">저장 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="savePop">
            <p>변경된 내용으로<br/>저장하시겠습니까?</p>
            <div class="btnSet">
                <a href="#" onclick="onCreateClass.fnSave();">예</a><a href="#" onclick="onCreateClass.fnCancel();">아니오</a>
            </div>
        </div>

        <script id="areas1-template" type="text/x-handlebars-template">
            <select name="areas" id="areas">
                <option value="">선택안함</option>
                {{#areas1}}
                <option value="{{code}}">{{codenm}}</option>
                {{/areas1}}
            </select>
        </script>

        <script id="areas2-template" type="text/x-handlebars-template">
            <select name="areas2" id="areas2">
                <option value="">선택안함</option>
                {{#areas2}}
                <option value="{{code}}">{{codenm}}</option>
                {{/areas2}}
            </select>
        </script>

        <script type="text/javascript" src="<c:url value="/assets/js/biz/mail_list.js"/>"></script>

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            onCreateClass.init();
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>