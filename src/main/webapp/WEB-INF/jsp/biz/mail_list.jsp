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

                                    <button class="edit-button" type="button" value="1개월" name="dateToday" id="dateToday2" onclick="onCreateClass.fnDateMonth2_30()">1개월</button>
                                    <button class="edit-button" type="button" value="3개월" name="dateWeek" id="dateWeek2" onclick="onCreateClass.fnDateMonth2_60()">3개월</button>
                                    <button class="edit-button" type="button" value="6개월" name="dateMonth" id="dateMonth2" onclick="onCreateClass.fnDateMonth2_90()">6개월</button>
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
                        <div class="tab01Box" id="tpl-mail-list">
                            <div id="myTable5" class="chart_loding">
                                <table class="table">
                                    <colgroup>
                                        <col style="width:3%">
                                        <col style="width:20%">
                                        <col style="width:20%">
                                        <col style="width:20%">
                                        <col style="width:20%">
                                    </colgroup>
                                    <tr>
                                        <th>번호</th>
                                        <th>받는사람</th>
                                        <th>제목</th>
                                        <th>지방의회</th>
                                        <th>등록일</th>
                                    </tr>
                                    <tr v-for="item in items" @click="onCreateClass.fnDetail(item);">
                                        <td>{{item.rnum}}</td>
                                        <td>{{item.receiver}}</td>
                                        <td><a href='#'>{{item.title}}</a></td>
                                        <td>{{item.rasmlyNm}}</td>
                                        <td>{{item.insertDate}}</td>
                                    </tr>
                                </table>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination">
                                        <li v-if="prev" @click="onCreateClass.fnAjaxTableMailList(prevPage);"><a href="#">&laquo;</a></li>

                                        <template v-for="item in lastPageNoOnPageList">
                                            <li v-if="lastPageNoOnPageList > 1" @click="onCreateClass.fnAjaxTableMailList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                                                <a href="#" v-if="lastPageNoOnPageList >= firstPageNoOnPageList + item">{{firstPageNoOnPageList + item}}</a>
                                            </li>
                                        </template>

                                        <li v-if="next" @click="onCreateClass.fnAjaxTableMailList(nextPage);"><a href="#">&raquo;</a></li>
                                    </ul>
                                </nav>
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
                                    <button class="edit-button" type="button" value="1개월" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateMonth_30()">1개월</button>
                                    <button class="edit-button" type="button" value="3개월" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateMonth_60()">3개월</button>
                                    <button class="edit-button" type="button" value="6개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth_90()">6개월</button>
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
                        <div class="tab01Box" id="tpl-send-list">
                            <div id="myTable4" class="chart_loding">
                                <table class="table" summary="발송내역에 대한 테이블 입니다. 번호,제목,발송일자로 구성">
                                    <colgroup>
                                        <col style="width:5%">
                                        <col style="width:85%">
                                        <col style="width:5%">
                                    </colgroup>
                                    <tr>
                                        <th scope="col">번호</th>
                                        <th scope="col">제목</th>
                                        <th scope="col">발송일자</th>
                                    </tr>
                                    <tr v-for="item in items">
                                        <td>{{item.rnum}}</td>
                                        <td>{{item.title}}</td>
                                        <td>{{dataFormat(item.sendDate)}}</td>
                                    </tr>
                                </table>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination">
                                        <li v-if="prev" @click="onCreateClass.fnAjaxTableList(prevPage);"><a href="#">&laquo;</a></li>

                                        <template v-for="item in lastPageNoOnPageList">
                                            <li v-if="lastPageNoOnPageList > 1" @click="onCreateClass.fnAjaxTableList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                                                <a href="#" v-if="lastPageNoOnPageList >= firstPageNoOnPageList + item">{{firstPageNoOnPageList + item}}</a>
                                            </li>
                                        </template>

                                        <li v-if="next" @click="onCreateClass.fnAjaxTableList(nextPage);"><a href="#">&raquo;</a></li>
                                    </ul>
                                </nav>
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
                                <button id="btn-mail-set-delete" class="edit-button" onclick="onCreateClass.fnPopupDel();">삭제 </button>
                                <button class="edit-button" onclick="onCreateClass.fnPopupSave();">저장 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="q-popup-layout" id="insertPopup">
            <p>저장 하시겠습니까?</p>
            <div class="btnSet">
                <a href="#" class="edit-button" onclick="onCreateClass.fnSaveProc();">예</a>
                <a href="#" class="edit-button" onclick="onCreateClass.fnCancel();">아니오</a>
            </div>
        </div>
        <div class="q-popup-layout" id="deletePopup">
            <p>삭제 하시겠습니까?</p>
            <div class="btnSet">
                <a href="#" class="edit-button" onclick="onCreateClass.fnDelProc();">예</a>
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