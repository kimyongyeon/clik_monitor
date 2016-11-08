<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <%@ include file="/WEB-INF/jsp/common/error_info_list_popup.jsp" %>

        <div id="container">

            <div id="subRightBox">
                <div class="titleArea">
                    <h2><i class="fa fa-cog fa-spin" aria-hidden="true"></i>  환경설정</h2>
                    <div class="location">
                        <ul>
                            <li><a href="/main.do"><i class="fa fa-home" aria-hidden="true"></i> HOME</a></li>
                            <li> > </li>
                            <li class="end"><a href="#">환경설정</a></li>
                        </ul>
                    </div>
                </div>
                <div class="locationTitle">
                    임계값 수정
                </div>
                <div class="topTable">
                    <table class="common-table-h">
                        <tr>
                            <th scope="row">지방의회</th>
                            <td>
                                <input type="hidden" id="colgoverSetId" name="colgoverSetId" value="${colgoverSetId}" disabled>
                                <input type="hidden" id="rasmblyId" name="rasmblyId" value="${rasmblyId}" disabled>
                                <span class="inputTxt01"><input type="text" id="rasmblyNm" name="rasmblyNm" value="${rasmblyNm}" disabled></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">응답시간</th>
                            <td>
                                <span class="inputTxt01"><input type="text" id="setInterval" name="setInterval" title="응답시간" value="${setInterval}" /> 예) 0 ~ 600 </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">서비스 요청 처리율</th>
                            <td>
                                <span class="inputTxt01" ><input type="text" id="reqProcessingRatio" name="reqProcessingRatio" title="서비스 요청 처리율" value="${reqProcessingRatio}" /> 예) 0 ~ 600 </span>
                            </td>
                        </tr>
                        <%--<tr>
                            <th scope="row">알람설정</th>
                            <td>
                                <span class="chk01"><input type="checkbox" id="chk01" /><label for="chk01">이메일</label></span>
                            </td>
                        </tr>--%>
                    </table>

                    <div class="BottomTable">
                        <div class="tab01Box">
                            <div class="fr">
                                <button class="edit-button" onclick="onCreateClass.fnEditShow();">수정</button>
                                <button class="edit-button" onclick="onCreateClass.fnDeleteShow();">삭제</button>
                                <button class="edit-button" onclick="onCreateClass.fnCancel();">취소</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="q-popup-layout-edit" class="q-popup-layout">
            <p>수정하시겠습니까?</p>
            <div class="btnSet">
                <a class="edit-button" href="#" onclick="onCreateClass.fnEditProc();">예</a>
                <a class="edit-button" href="#" onclick="onCreateClass.fnPopupClose();">아니오</a>
            </div>
        </div>

        <div id="q-popup-layout-del" class="q-popup-layout">
            <p>삭제하시겠습니까?</p>
            <div class="btnSet">
                <a class="edit-button" href="#" onclick="onCreateClass.fnDelProc();">예</a>
                <a class="edit-button" href="#" onclick="onCreateClass.fnPopupClose();">아니오</a>
            </div>
        </div>

        <script type="text/javascript" src="<c:url value="/assets/js/biz/range_setting_edit.js"/>"></script>

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            onCreateClass.init();
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>