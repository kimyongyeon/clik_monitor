<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">
<div id="container">

    <div id="subRightBox">
        <div class="titleArea">
            <h2>임계값 설정</h2>
            <div class="location">
                <ul>
                    <li><a href="#">home</a></li>
                    <li> > </li>
                    <li class="end"><a href="#">임계값 설정</a></li>
                </ul>
            </div>
        </div>
        <div class="locationTitle">
            ■ 임계값 등록
        </div>
        <div class="topTable">
            <table class="table01">
                <tr>
                    <th scope="row">지방의회</th>
                    <td>
                        <div class="selectBox">
                            <div class="select01">
                                <select name="select01" class="select01">
                                    <option value="">의회선택</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="select02">
                                <select name="select02" class="select02">
                                    <option value="">지역선택</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="select03">
                                <select name="select03" class="select03">
                                    <option value="">지방의회선택</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">응답시간</th>
                    <td>
                        <span class="inputTxt01"><input type="text" title="응답시간" /></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">서비스 요청 처리율</th>
                    <td>
                        <span class="inputTxt01"><input type="text" title="서비스 요청 처리율" /></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">알람설정</th>
                    <td>
                        <span class="chk01"><input type="checkbox" id="chk01" /><label for="chk01">이메일</label></span>
                    </td>
                </tr>
            </table>
            <div class="btnArea">
                <div class="settingBtn">
                    <span class="uploadBtn"><a href="#">등록</a></span><a href="menu02_setting.html">취소</a>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="uploadPop">
    <p>등록하시겠습니까?</p>
    <div class="btnSet">
        <a href="#">예</a><a href="#">아니오</a>
    </div>
</div>

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            $(document).ready(function () {
            });
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>
