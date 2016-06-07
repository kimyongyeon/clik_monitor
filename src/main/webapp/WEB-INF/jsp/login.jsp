<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>지방의회 표준연계 API모니터링 시스템</title>
    <link href="<c:url value="/css/style.css"/>" rel="stylesheet">

    <script type="text/javascript" src="<c:url value="/assets/js/jquery-1.11.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.tablesorter.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/jquery-ui-1.11.1/jquery-ui.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.qtip.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.ellipsis.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery_blockUI.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.fileupload.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.form.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/application.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/underscore-min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/treeselectjs/jquery.treeselect.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/babypaunch.libparts.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/common.js"/>"></script>
    <%--<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->--%>
</head>
<body>
<div class="loginWrap">
    <h1 class="loginTitle">지방의회 표준연계 API 모니터링 시스템 개발 - 로그인 </h1>
    <div class="loginArea">
        <table width="100%">
            <tr>
                <td>&nbsp;</td>
                <td colspan="2" class="idSave">
                    <span><input id="idTxt" type="checkbox" /><label for="idTxt">아이디 저장</label></span></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td class="labelId">
                    <label for="id">아이디</label><input id="id" type="text" /></td>
                <td rowspan="2" class="btn">
                    <input type="button" value="로그인" id="btnLogin"/></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td class="labelPw">
                    <label for="pw">패스워드</label><input id="pw" type="text" /></td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
</div>
<script>
    $(document).ready(function () {
        $("#btnLogin").on("click",function(){
            alert("로그인 성공");
            page_go("main");
        });
    });
</script>
</body>
</html>
