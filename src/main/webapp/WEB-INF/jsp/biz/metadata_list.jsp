<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

    <div id="container">
        <div class="full_screen_loding" >
            <img src="/img/loading.gif" alt="">
        </div>
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
                    <td colspan="3">
                        <div class="selectBox" id="tpl_commbo_list">
                            <select name="insttClCode" id="insttClCode" class="select02" onchange="onCreateClass.fnOnchage();" v-model="insttClCode">
                                <option value="">지역선택</option>
                                <option v-for="item in commonList_2" v-bind:value="codeGenerate(item.code)">{{item.codenm}}</option>
                            </select>
                            <select name="siteId" id="siteId" class="select02" onchange="" v-model="siteId">
                                <option value="">사이트선택</option>
                                <option v-for="item in commonList_4" v-bind:value="item.siteid">{{item.sitenm}}</option>
                            </select>
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
                                <button class="edit-button" type="button" value="1개월" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateMonth1()">1개월</button>
                                <button class="edit-button" type="button" value="3개월" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateMonth3()">3개월</button>
                                <button class="edit-button" type="button" value="6개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth6()">6개월</button>
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
                    <div id="myTable4" >
                        <table class="table" >
                            <colgroup>
                                <col style="width:5%">
                                <col style="width:5%">
                                <col style="width:10%">
                                <col style="width:15%">
                                <col style="width:5%">
                                <col style="width:5%">
                                <col style="width:5%">
                                <col style="width:37%">
                            </colgroup>
                            <tr>
                                <th>번호</th>
                                <th>지역</th>
                                <th>사이트명</th>
                                <th>게시판명</th>
                                <th @click="fnOrdr(orderby)">최종등록일자 <i v-if="orderby == 'desc'" class="fa fa-sort-desc" aria-hidden="true"></i><i v-if="orderby == 'asc'" class="fa fa-sort-asc" aria-hidden="true"></i></th>
                                <th>자료유형</th>
                                <th>사이트ID</th>
                                <th>사이트 URL</th>
                            </tr>
                            <tr v-for="item in items">
                                <td>{{item.rnum}}</td>
                                <td>{{isNulltoString(item.area)}}</td>
                                <td>{{item.sitenm}}</td>
                                <td>{{item.seednm}}</td>
                                <td>{{item.regdate}}</td>
                                <td>{{item.doctypeName}}</td>
                                <td>{{item.seedid}}</td>
                                <td class="ellipsis">{{item.seedurl}}</td>
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
                                <a href="#" v-if="lastPageNoOnPageList >= firstPageNoOnPageList + item">{{firstPageNoOnPageList + item}}</a>
                            </li>
                        </template>

                        <li v-if="next" @click="onCreateClass.fnAjaxTableList(nextPage);"><a href="#">&raquo;</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="<c:url value="/assets/js/vue.min.js"/>"></script> <!-- vuejs -->
    <script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script> <!-- 내가 만든 공통함수 -->
    <script type="text/javascript" src="<c:url value="/assets/js/biz/metadata_list.js"/>"></script>

</tiles:putAttribute>

<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        onCreateClass.init();
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>