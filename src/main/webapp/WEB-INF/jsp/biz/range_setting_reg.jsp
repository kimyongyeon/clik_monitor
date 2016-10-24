<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
<tiles:putAttribute name="content">

    <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

    <div id="container">

        <div id="subRightBox">
            <div class="titleArea">
                <h2><i class="fa fa-cog" aria-hidden="true"></i>  임계값 관리</h2>
                <div class="location">
                    <ul>
                        <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                        <li> > </li>
                        <li class="end"><a href="#">임계값 설정</a></li>
                    </ul>
                </div>
            </div>
            <div class="locationTitle">
                임계값 등록
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
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">응답시간</th>
                        <td>
                            <span class="inputTxt01" style="color:white;"><input type="text" id="setInterval" name="setInterval" title="응답시간" style="width:100px;"/> 예) 0 ~ 600 </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">서비스 요청 처리율</th>
                        <td>
                            <span class="inputTxt01" style="color:white;"><input type="text" id="reqProcessingRatio" name="reqProcessingRatio" title="서비스 요청 처리율" style="width:100px;"/> 예) 0 ~ 600 </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">알람설정</th>
                        <td>
                            <span class="chk01"><input type="checkbox" id="chk01" checked disabled/><label for="chk01">이메일</label></span>
                        </td>
                    </tr>
                </table>
                <div class="btnArea">
                    <div class="settingBtn">
                        <span class="uploadBtn">
                            <a href="#" onclick="onCreateClass.fnInsert();">등록</a>
                            <a href="#" onclick="onCreateClass.fnCancel();">취소</a>
                            <%--<a href="/range_setting_edit.do">임시수정화면이동</a>--%>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="uploadPop">
        <p>등록하시겠습니까?</p>
        <div class="btnSet">
            <a href="#" onclick="onCreateClass.fnInertProc();">예</a><a href="#" onclick="onCreateClass.fnPopupClose();">아니오</a>
        </div>
    </div>

    <script type="text/javascript" src="<c:url value="/assets/js/biz/range_setting_reg.js"/>"></script>

</tiles:putAttribute>
<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        $(document).ready(function () {
            onCreateClass.init();
        });
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>
