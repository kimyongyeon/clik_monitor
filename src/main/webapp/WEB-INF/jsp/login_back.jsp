<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>지방의회 모니터링 시스템</title>
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
    <form action="/j_spring_security_check" method="post">
        <h1 class="loginTitle">지방의회 모니터링 시스템 - 로그인 </h1>
        <div class="loginArea">

            <table width="100%">
                <tr>
                    <td>&nbsp;</td>
                    <td colspan="2" class="idSave">
                        <span><input id="idSaveChk" name="idSaveChk" tabindex="3" type="checkbox"
                                     <c:if test="${fn:length(userid) > 0}">checked="checked"</c:if> /><label
                                for="idSaveChk">아이디 저장</label></span></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td class="labelId">
                        <label for="j_username">아이디</label><input tabindex="1" id="j_username" name="j_username"
                                                                  value="${userid}" type="text" style="width: 300px"/>
                    </td>
                    <td rowspan="2" class="btn">
                        <input type="submit" value="로그인" style="cursor: pointer" id="btnLogin"/></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td class="labelPw">
                        <label for="j_password">패스워드</label><input tabindex="2" id="j_password" name="j_password"
                                                                   type="password" style="width: 300px"/></td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    </form>
</div>

<script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script>

<script>
    $(document).ready(function () {

        $("#j_username").val(getCookie('userid'));

        if ($("#j_username").val()) {
            $("#idSaveChk").prop('checked', true);
        } else {
            $("#idSaveChk").prop('checked', false);
        }

        // 로그인
        $("#btnLogin").on("click", function () {
            var id = $("#j_username").val() || "";
            var password = $("#j_password").val() || "";

            if (id === "") {
                alert("아이디를 입력하세요.");
                $("#j_username").focus();
                return;
            }
            if (password === "") {
                alert("비밀번호를 입력하세요.");
                $("#j_password").focus();
                return;
            }
        });

        // 아이디 저장
        $("#idSaveChk").on("click", function () {
            var id = $("#j_username").val() || "";
            if ($(this).filter(":checked").length > 0) {
                setCookieExdays("userid", id, 365);
            } else {
                setCookieExdays("userid", '', 365);
            }
        });
    });

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    function setCookieExdays(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";path=/; " + expires;
    }

    function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue+ ";path=/; ";
    }

    /**
     * 로그인 아이디 저장 처리
     * @param callback
     */
    function saveProc(flag, callback) {
        var url = "/idSaveProc.do?id=";
        var id = $("#j_username").val();
        var data = {
            id: !flag ? id : ''
        };
        commonClass.fnAjaxCallback(url + id, data, function (data) {
            callback(data)
        });
    }

</script>
</body>
</html>
3