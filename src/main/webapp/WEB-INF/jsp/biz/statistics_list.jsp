<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <div id="container">
            <div id="subRightBox">

                <div class="titleArea">
                    <h2><i class="fa fa-cog" aria-hidden="true"></i> 통계 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                            <li>></li>
                            <li><a href="#">통계 관리</a></li>
                        </ul>
                    </div>
                </div>

                <div class="topTable">
                    <div class="adminTab01">
                        <ul>
                            <li class="listTab01"><a href="#" onclick="onCreateClass.btnTabSelect(1);">의회별 전송 데이터</a></li>
                            <li class="listTab02"><a href="#" onclick="onCreateClass.btnTabSelect(2);">항목별 최종전송 데이터</a></li>
                        </ul>
                    </div>
                    <table class="table01">
                        <tr>
                            <th scope="row">지방의회</th>
                            <td>
                                <%@ include file="/WEB-INF/jsp/hbs/combo_list_script.jsp" %>
                                <div style="margin-left: 5px;">
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
                                    <div class="select03" id="loasm_code_div">
                                        <select class="select03">
                                            <option value="">지방의회선택</option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div style="float: right; margin-right: 0px">
                                        <button class="search-button" onclick="onCreateClass.btnSearch()">검색</button>
                                        <button class="excel-button" onclick="onCreateClass.btnExcelSave();">엑셀저장</button>
                                    </div>
                                    <%--<div class="btnSearch">--%>
                                        <%--<a href="#" onclick="onCreateClass.btnSearch()">검색</a>--%>
                                        <%--<div class="btnExcelSave"><a href="#" style="margin-right:5px;" onclick="onCreateClass.btnExcelSave();">엑셀 저장</a></div>--%>
                                    <%--</div>--%>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="BottomTable">
                    <div class="tab01Box">
                        <div id="myTable"></div>
                    </div>
                    <div class="tab01Box">
                        <div id="myTable2"></div>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="<c:url value="/assets/js/biz/statistics_list.js"/>"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                onCreateClass.init();

            });
        </script>

    </tiles:putAttribute>
</tiles:insertDefinition>