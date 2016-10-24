<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

    <div id="container">

        <div id="subRightBox">
            <div class="titleArea">
                <h2><i class="fa fa-cog" aria-hidden="true"></i> 지방정책정보</h2>
                <div class="location">
                    <ul>
                        <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                        <li> > </li>
                        <li class="end"><a href="#">지방정책정보</a></li>
                    </ul>
                </div>
            </div>
            <div class="topTable">
                <table class="table01">
                    <colgroup>
                        <col style="width:10%;" />
                        <col style="width:50%;" />
                        <col style="width:10%;" />
                        <col style="width:30%;" />
                    </colgroup>
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
                            <div style="margin-left: 5px;">
                                <input type="text" id="site-title" name="site-title" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">최종 등록일</th>
                        <td colspan="3">
                            <span class="calendar01"><input type="text" id="datepicker1" /></span>
                            <span class="pado" style="color:white;">~</span>
                            <span class="calendar01"><input type="text" id="datepicker2" /></span>
                            <span class="calendarBtn">
                                <button class="default-button" type="button" value="당일" name="dateToday" id="dateToday" onclick="onCreateClass.fnDateToday()">당일</button>
                                <button class="default-button" type="button" value="1주일" name="dateWeek" id="dateWeek" onclick="onCreateClass.fnDateWeek()">1주일</button>
                                <button class="default-button" type="button" value="1개월" name="dateMonth" id="dateMonth" onclick="onCreateClass.fnDateMonth()">1개월</button>
                            </span>
                            <div style="float: right; margin-left: 0px">
                                <button class="search-button" onclick="onCreateClass.fnSearch();">검색</button>
                                <button class="excel-button" onclick="onCreateClass.fnExcel();">엑셀저장</button>
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
    </div>

    <script type="text/javascript" src="<c:url value="/assets/js/biz/metadata_list.js"/>"></script>

</tiles:putAttribute>

<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        onCreateClass.init();
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>