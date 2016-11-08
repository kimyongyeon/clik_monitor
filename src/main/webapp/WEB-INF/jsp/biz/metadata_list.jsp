<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

    <div id="container">
        <div id="subRightBox">
            <!-- 메뉴 로케이션 -->
            <div class="titleArea">
                <h2><i class="fa fa-cog  fa-spin"  aria-hidden="true"></i> 지방정책정보</h2>
                <div class="location">
                    <ul>
                        <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                        <li> > </li>
                        <li class="end"><a href="#">지방정책정보</a></li>
                    </ul>
                </div>
            </div>
            <!-- 검색조건 -->
            <table class="common-search-table">
                <tr>
                    <th scope="row">지역명</th>
                    <td>
                        <%@ include file="/WEB-INF/jsp/hbs/combo_list_script.jsp" %>
                        <div class="selectBox">
                            <div class="select01" id="brtc_code_div">
                                <select class="select01">
                                    <option value="">기관유형 선택</option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="select02" id="instt_cl_code_div">
                                <select class="select02">
                                    <option value="">지역선택</option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </td>
                    <th scope="row">사이트명</th>
                    <td>
                        <div>
                            <input type="text" id="site-title" name="site-title" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">최종 등록일</th>
                    <td colspan="3">
                        <div class="lw-100 fl-mr-5">
                            <span class="calendar01"><input type="text" id="datepicker1" /></span>
                            <span class="pado">~</span>
                            <span class="calendar01"><input type="text" id="datepicker2" /></span>
                            <span class="calendarBtn">
                                <button class="edit-button" type="button" value="당일" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateToday()">당일</button>
                                <button class="edit-button" type="button" value="1주일" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateWeek()">1주일</button>
                                <button class="edit-button" type="button" value="1개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth()">1개월</button>
                            </span>
                            <div class="fr-mr-5">
                                <div>
                                    <button class="search-button" onclick="onCreateClass.fnSearch();"> <i class="fa fa-search" aria-hidden="true"></i> 검색</button>
                                    <button class="excel-button" onclick="onCreateClass.fnExcel();">엑셀저장</button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <!-- 결과 페이지  -->
            <div class="BottomTable" id="tpl-table-list">
                <div class="tab01Box">
                    <div id="myTable4" class="chart_loding" >
                        <table class="table w-1700" >
                            <colgroup>
                                <col width="50px">
                                <col width="100px">
                                <col width="150px">
                                <col width="80px">
                                <col width="500px">
                                <col width="100px">
                                <col width="200px">
                                <col width="1000px">
                                <col width="100px">
                            </colgroup>
                            <tr>
                                <th>번호</th>
                                <th>지역</th>
                                <th>게시판명</th>
                                <th>사이트ID</th>
                                <th>사이트 URL</th>
                                <th>자료유형</th>
                                <th>사이트명</th>
                                <th>게시판 URL</th>
                                <th>최종등록일</th>
                            </tr>
                            <tr v-for="item in items">
                                <td>{{item.num}}</td>
                                <td>{{item.area}}</td>
                                <td>{{item.seednm}}</td>
                                <td>{{item.seedid}}</td>
                                <td>{{item.seedurl}}</td>
                                <td>{{item.doctypeName}}</td>
                                <td>{{item.sitenm}}</td>
                                <td>{{item.url}}</td>
                                <td>{{item.regdate}}</td>
                            </tr>
                        </table>
                        <img src="/img/loading.gif" alt="">
                    </div>
                </div>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li v-if="prev" @click="onCreateClass.fnAjaxTableList(prevPage);"><a href="#">&laquo;</a></li>

                        <template v-for="item in lastPageNoOnPageList">
                            <li v-if="lastPageNoOnPageList > 1" @click="onCreateClass.fnAjaxTableList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                                <a href="#">{{firstPageNoOnPageList + item}}</a>
                            </li>
                        </template>

                        <li v-if="next" @click="onCreateClass.fnAjaxTableList(nextPage);"><a href="#">&raquo;</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="<c:url value="/assets/js/biz/metadata_list.js"/>"></script>

</tiles:putAttribute>

<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        onCreateClass.init();
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>