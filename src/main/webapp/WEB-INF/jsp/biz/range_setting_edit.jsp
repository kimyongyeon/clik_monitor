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
                    임계값 수정
                </div>
                <div class="topTable">
                    <table class="table01">
                        <tr>
                            <th scope="row">지방의회</th>
                            <td>
                                <input style="background: yellow; color:red; width: 100px;" type="hidden" id="colgoverSetId" name="colgoverSetId" value="${colgoverSetId}" disabled>
                                <input style="background: yellow; color:red; width: 100px;" type="hidden" id="rasmblyId" name="rasmblyId" value="${rasmblyId}" disabled>
                                <span class="inputTxt01"><input style="background: yellow; color:red; width: 150px;" type="text" id="rasmblyNm" name="rasmblyNm" value="${rasmblyNm}" disabled></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">응답시간</th>
                            <td>
                                <span class="inputTxt01" style="color:white;"><input type="text" id="setInterval" name="setInterval" title="응답시간" value="${setInterval}" style="width:100px;"/> 예) 0 ~ 600 </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">서비스 요청 처리율</th>
                            <td>
                                <span class="inputTxt01" style="color:white;"><input type="text" id="reqProcessingRatio" name="reqProcessingRatio" title="서비스 요청 처리율" value="${reqProcessingRatio}" style="width:100px;"/> 예) 0 ~ 600 </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">알람설정</th>
                            <td>
                                <span class="chk01"><input type="checkbox" id="chk01" /><label for="chk01">이메일</label></span>
                            </td>
                        </tr>
                    </table>
                    <div class="threebtn">
                        <span class="editBtn">
                            <a href="#" onclick="onCreateClass.fnEdit();">수정</a>
                        </span>
                        <span class="deletedBtn">
                            <a href="#" onclick="onCreateClass.fnDelete();">삭제</a>
                        </span>
                        <a href="#" onclick="onCreateClass.fnCancel();">취소</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="uploadPop" id="editPop">
            <p>변경된 내용으로<br />수정하시곘습니까?</p>
            <div class="btnSet">
                <a href="#" onclick="onCreateClass.fnEditProc();">예</a><a href="#" onclick="onCreateClass.fnPopupClose();">아니오</a>
            </div>
        </div>

        <div class="uploadPop" id="delPop">
            <p>삭제하시곘습니까?</p>
            <div class="btnSet">
                <a href="#" onclick="onCreateClass.fnDelProc();">예</a><a href="#" onclick="onCreateClass.fnPopupClose();">아니오</a>
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