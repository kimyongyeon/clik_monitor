<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

    <div id="container">

        <div id="subRightBox">
            <div class="titleArea">
                <h2><i class="fa fa-cog" aria-hidden="true"></i> 임계값 관리</h2>
                <div class="location">
                    <ul>
                        <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                        <li> > </li>
                        <li class="end"><a href="#">임계값관리</a></li>
                    </ul>
                </div>
            </div>
            <div class="topTable">
                <table class="table01">
                    <tr>
                        <th scope="row">지방의회</th>
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
                                <div class="select03" id="loasm_code_div">
                                    <select class="select03">
                                        <option value="">지방의회선택</option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div style="float: right; margin-right:0px; margin-top:7px;">
                                <button class="search-button" stlye="float: right;" onclick="onCreateClass.btnSearch()">검색</button>
                                <button class="insert-button" onclick="commonClass.page_go('range_setting_reg');">등록</button>
                                <button class="excel-button" onclick="onCreateClass.btnExcelSave();">엑셀저장</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="BottomTable">
                <div class="tab01Box">
                    <div id="myTable3"></div>
                    <div align="center"><nav aria-label="Page navigation"><ul class="pagination"></ul></nav></div>
                </div>
            </div>
        </div>
    </div>

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