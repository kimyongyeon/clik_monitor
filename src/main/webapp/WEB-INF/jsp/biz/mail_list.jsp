<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <div id="container">
            <div id="subRightBox">
                <div class="titleArea">
                    <h2><i class="fa fa-cog  fa-spin" aria-hidden="true"></i> 메일 링 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                            <li>></li>
                            <li><a href="#">메일링 관리</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="common-tab">
                        <ul class="common-tab-3">
                            <li class="listTab03"><a href="#mail_list">메일목록</a></li>
                            <li class="listTab02"><a href="#mail_set">메일설정</a></li>
                            <li class="listTab01"><a href="#send_list">발송내역</a></li>
                        </ul>
                    </div>
                </div>

                <!-- 메일목록 -->
                <div class="mail_list" id="mail_list">
                    <table class="common-search-table">
                        <tr>
                            <th scope="row">등록일자</th>
                            <td>
                                <span class="calendar01"><input type="text" id="datepicker21"/></span>
                                <span class="pado">~</span>
                                <span class="calendar01"><input type="text" id="datepicker22"/></span>
                                <span class="calendarBtn">
                                    <button class="edit-button" type="button" value="당일" name="dateToday" id="dateToday2" onclick="onCreateClass.fnDateToday2()">당일</button>
                                    <button class="edit-button" type="button" value="1주일" name="dateWeek" id="dateWeek2" onclick="onCreateClass.fnDateWeek2()">1주일</button>
                                    <button class="edit-button" type="button" value="1개월" name="dateMonth" id="dateMonth2" onclick="onCreateClass.fnDateMonth2()">1개월</button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">검색항목</th>
                            <td>
                                <span class="select01">
                                    <select name="keyWordType2" id="keyWordType2" class="select01">
                                        <option value="">선택</option>
                                        <option value="1">제목</option>
                                        <option value="2">받는사람</option>
                                    </select>
                                </span>
                                <span class="select02"><input type="text" id="keyWordText2" name="keyWordText2"/></span>
                                <div class="fr-mr-5">
                                    <button class="search-button" onclick="onCreateClass.btnMailListSearch()"><i class="fa fa-search" aria-hidden="true"></i> 검색  </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="BottomTable">
                        <div class="tab01Box" id="sendList" >
                            <div id="myTable5" class="chart_loding">
                                <table class="table" id="tpl-mail-list">
                                    <tr>
                                        <th>번호</th>
                                        <th>받는사람</th>
                                        <th>제목</th>
                                        <th>지방의회</th>
                                        <th>등록일</th>
                                    </tr>
                                    <tr v-for="item in items" @click="onCreateClass.fnDetail(item);">
                                        <td>{{item.no}}</td>
                                        <td>{{item.receiver}}</td>
                                        <td><a href='#'>{{item.title}}</a></td>
                                        <td>{{item.rasmlyNm}}</td>
                                        <td>{{item.insertDate}}</td>
                                    </tr>
                                </table>
                                <img src="/img/loading.gif" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 발송내역 -->
                <div class="send_list" id="send_list" style="display: none;">
                    <table class="common-search-table">
                        <tr>
                            <th scope="row">발송일자</th>
                            <td>
                                <span class="calendar01"><input type="text" id="datepicker1"/></span>
                                <span class="pado">~</span>
                                <span class="calendar01"><input type="text" id="datepicker2"/></span>
                                <span class="calendarBtn">
                                    <button class="edit-button" type="button" value="당일" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateToday()">당일</button>
                                    <button class="edit-button" type="button" value="1주일" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateWeek()">1주일</button>
                                    <button class="edit-button" type="button" value="1개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth()">1개월</button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">검색항목</th>
                            <td>
                                <span class="select01">
                                    <select name="keyWordType" id="keyWordType" class="select01">
                                        <option value="">선택</option>
                                        <option value="1">제목</option>
                                        <option value="2">받는사람</option>
                                    </select>
                                </span>
                                <span class="select02"><input type="text" id="keyWordText" name="keyWordText"/></span>
                                <div class="fr-mr-5">
                                    <button class="search-button" onclick="onCreateClass.btnSearch()"> <i class="fa fa-search" aria-hidden="true"></i> 검색 </button>
                                    <button class="excel-button" onclick="onCreateClass.btnExcelSave();">엑셀저장 </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="BottomTable">
                        <div class="tab01Box">
                            <div id="myTable4" class="chart_loding">
                                <table class="table" id="tpl-send-list">
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>발송일자</th>
                                    </tr>
                                    <tr v-for="item in items">
                                        <td>{{item.no}}</td>
                                        <td>{{item.title}}</td>
                                        <td>{{item.sendDate}}</td>
                                    </tr>
                                </table>
                                <img src="/img/loading.gif" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 메일설정 -->
                <div class="mail_set" id="mail_set" style="display: none;">
                    <table class="common-table-h">
                        <tr>
                            <th scope="row">받는사람</th>
                            <td>
                                <span class="txtInput">
                                    <input id="receiver" name="receiver" type="text" placeholder="test@gmail.com"/>
                                </span>
                                <span class="txt">예) test@go.com </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">제목</th>
                            <td>
                                <input id="emailId" name="emailId" type="hidden" value=""> <!-- emailId -->
                                <span class="txtInput">
                                    <input type="text" value="오류가 발생하였습니다" id="mailTitle" name="mailTitle"/>
                                </span>
                                <span class="txt">예)2016.05.10 11:11:10 서울특별시의회</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">지방의회</th>
                            <td>
                                <select name="areas" id="areas" >
                                    <option value="">광역시도의회</option>
                                    <option v-for="item in wide" v-bind:value="item.code">{{item.codenm}}</option>
                                </select>

                                <select name="areas2" id="areas2" >
                                    <option value="">기초의회</option>
                                    <option v-for="item in basic" v-bind:value="item.code">{{item.codenm}}</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <div class="BottomTable">
                        <div class="tab01Box">
                            <div class="fr">
                                <button class="edit-button" onclick="onCreateClass.fnList();">목록 </button>
                                <button class="edit-button" onclick="onCreateClass.fnPopupSave();">저장 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="q-popup-layout">
            <p>저장하시겠습니까?</p>
            <div class="btnSet">
                <a href="#" class="edit-button" onclick="onCreateClass.fnSave();">예</a>
                <a href="#" class="edit-button" onclick="onCreateClass.fnCancel();">아니오</a>
            </div>
        </div>

        <script type="text/javascript" src="<c:url value="/assets/js/vue.min.js"/>"></script> <!-- vuejs -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script> <!-- 내가 만든 공통함수 -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/mail_list.js"/>"></script>

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            onCreateClass.init();
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>