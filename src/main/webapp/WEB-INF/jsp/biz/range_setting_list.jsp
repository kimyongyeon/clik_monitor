<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <div id="container">
        <div id="subRightBox">
            <!-- 메뉴 로케이션 -->
            <div class="titleArea">
                <h2><i class="fa fa-cog fa-spin" aria-hidden="true"></i> 환경설정</h2>
                <div class="location">
                    <ul>
                        <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                        <li> > </li>
                        <li class="end"><a href="#">환경설정</a></li>
                    </ul>
                </div>
            </div>
            <!-- 검색조건 -->
            <table class="common-search-table">
                <tr>
                    <th scope="row">지방의회</th>
                    <td>
                        <%@ include file="/WEB-INF/jsp/hbs/combo_list_script.jsp" %>
                        <div class="lw-100 fl-mr-5">
                            <div class="selectBox" id="brtc_code_div">
                                <select class="select01">
                                    <option value="">기관유형 선택</option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="selectBox" id="instt_cl_code_div">
                                <select class="select02">
                                    <option value="">지역선택</option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="selectBox" id="loasm_code_div">
                                <select class="select03">
                                    <option value="">지방의회선택</option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="fr-mr-5">
                                <button class="search-button" onclick="onCreateClass.btnSearch()"><i class="fa fa-search" aria-hidden="true"></i> 검색</button>
                                <button class="insert-button" onclick="commonClass.page_go('range_setting_reg');">등록</button>
                                <button class="excel-button" onclick="onCreateClass.btnExcelSave();">엑셀저장</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <!-- 결과 페이지  -->
            <div class="BottomTable">
                <div class="tab01Box">
                    <div id="myTable3" class="chart_loding">
                        <table class="table" id="tpl-table-list">
                            <tr>
                                <th>지방의회</th>
                                <th>지방응답시간</th>
                                <th>요청처리율</th>
                                <th>최종수정일</th>
                            </tr>
                            <tr v-for="item in items">
                                <td>{{item.rasmblyNm}}</td>
                                <td>{{item.setInterval}}</td>
                                <td>{{item.reqProcessingRatio}}</td>
                                <td>{{item.lastCntcDt}}</td>
                            </tr>
                        </table>
                        <img src="/img/loading.gif" alt="">
                    </div>
                    <div align="center">
                        <nav aria-label="Page navigation">
                            <ul class="pagination"></ul>
                        </nav>
                    </div>
                    <div style="text-align: left;">
                        <button class="edit-button" onclick="onCreateClass.btnEvent();">이벤트보기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>
    <script type="text/javascript" src="<c:url value="/assets/js/biz/range_setting_list.js"/>"></script>


</tiles:putAttribute>
<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        //달력 소스(jQuery UI)
        $(document).ready(function () {
            onCreateClass.init();
        });
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>