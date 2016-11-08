<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <div id="container">
            <div id="subRightBox">
                <!-- 메뉴 로케이션 -->
                <div class="titleArea">
                    <h2><i class="fa fa-cog fa-spin" aria-hidden="true"></i> 통계 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                            <li>></li>
                            <li><a href="#">통계 관리</a></li>
                        </ul>
                    </div>
                </div>
                <!-- 탭 -->
                <div class="common-tab">
                    <ul class="common-tab-2">
                        <li class="listTab01"><a href="#" onclick="onCreateClass.btnTabSelect(1);">의회별 전송 데이터</a></li>
                        <li class="listTab02"><a href="#" onclick="onCreateClass.btnTabSelect(2);">항목별 최종전송 데이터</a></li>
                    </ul>
                </div>
                <!-- 검색조건 -->
                <table class="common-search-table">
                    <tr>
                        <th scope="row">지방의회</th>
                        <td>
                            <div class="lw-100 fl-mr-5">
                                <%@ include file="/WEB-INF/jsp/hbs/combo_list_script.jsp" %>
                                <div class="fr-mr-5">
                                    <button class="search-button" onclick="onCreateClass.btnSearch()"><i class="fa fa-search" aria-hidden="true"></i> 검색</button>
                                    <button class="excel-button" onclick="onCreateClass.btnExcelSave();">엑셀저장</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <!-- 결과 페이지  -->
                <div class="BottomTable">
                    <div class="tab01Box">
                        <div id="myTable" class="chart_loding overflow-auto">
                            <table class="table w-1700" id="tpl-table-list-1">
                                <tr>
                                    <th>지방의회</th>
                                    <th>대수</th>
                                    <th>회기</th>
                                    <th>선거구</th>
                                    <th>회의명</th>
                                    <th>의원</th>
                                    <th>의원활동</th>
                                    <th>의원직위</th>
                                    <th>회의록</th>
                                    <th>안건</th>
                                    <th>발언</th>
                                    <th>발언답변</th>
                                    <th>부록</th>
                                    <th>의안정보</th>
                                    <th>발의의원</th>
                                    <th>의안파일</th>
                                    <th>의안회의록</th>
                                </tr>
                                <tr v-for="item in items">
                                    <td>{{item.rasmblyNm}}</td>
                                    <td>{{comma(item.numprCount)}}</td>
                                    <td>{{comma(item.sesnCount)}}</td>
                                    <td>{{comma(item.estCount)}}</td>
                                    <td>{{comma(item.mtgnmCount)}}</td>
                                    <td>{{comma(item.asembyCount)}}</td>
                                    <td>{{comma(item.asembyactCount)}}</td>
                                    <td>{{comma(item.ofcpsCount)}}</td>
                                    <td>{{comma(item.mintsCount)}}</td>
                                    <td>{{comma(item.mtrCount)}}</td>
                                    <td>{{comma(item.spkngCount)}}</td>
                                    <td>{{comma(item.numprCount)}}</td>
                                    <td>{{comma(item.apndxCount)}}</td>
                                    <td>{{comma(item.asembyCount)}}</td>
                                    <td>{{comma(item.itncasembyCount)}}</td>
                                    <td>{{comma(item.bifileCount)}}</td>
                                    <td>{{comma(item.bimintsCount)}}</td>
                                </tr>
                            </table>
                            <img src="/img/loading.gif" alt="">
                        </div>
                    </div>
                    <div class="tab0Box">
                        <div id="myTable2" class="chart_loding overflow-auto">
                            <table class="table w-1700" id="tpl-table-list-2">
                                <tr>
                                    <th>지방의회</th>
                                    <th>회의록최종일자</th>
                                    <th>안건최종일자</th>
                                    <th>발언최종일자</th>
                                    <th>발언답변최종일자</th>
                                    <th>부록최종일자</th>
                                    <th>의안최종일자</th>
                                </tr>
                                <tr v-for="item in items">
                                    <td>{{item.rasmblyNm}}</td>
                                    <td>{{item.billMinutesFrstRegistDt}}</td>
                                    <td>{{item.itemFrstRegistDt}}</td>
                                    <td>{{item.minutesStatementFrstRegistDt}}</td>
                                    <td>{{item.minutesAnswerFrstRegistDt}}</td>
                                    <td>{{item.minutesAppendixFrstRegistDt}}</td>
                                    <td>{{item.billFrstRegistDt}}</td>
                                </tr>
                            </table>
                            <img src="/img/loading.gif" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="<c:url value="/assets/js/vue.min.js"/>"></script> <!-- vuejs -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script> <!-- 내가 만든 공통함수 -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/statistics_list.js"/>"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                onCreateClass.init();

            });
        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>