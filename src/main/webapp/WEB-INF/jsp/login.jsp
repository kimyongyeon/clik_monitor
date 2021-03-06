<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>지방의회 모니터링 시스템</title>

    <script type="text/javascript" src="<c:url value="/assets/js/jquery-1.11.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/vue.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/common.js"/>"></script>
    <%--<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->--%>
    <style>

        body {
            background-image: url("/img/pattern.jpg");
            background-repeat: repeat;
            font-family: dotum;
        }

        .content {
            position: relative;
            width: 100%;
            height: auto;
        }

        .login {
            width: 360px;
            border-radius: 5px;
            height: 410px;
            float: left;
            margin-left: 40%;
            margin-top: 280px;
            background: white;

        }

        .site-title {
            position: absolute;
            top: 222px;
            left: 41%;
        }

        .site-title label {
            font-size: 23pt;
            color: #fff;
        }

        .site-title label {
            color: white;
        }

        .user-title {
            margin-top: 10%;
        }

        .user-title label {
            font-size: 35pt;
            color: #383838;
            margin-left: 30%;

        }

        .user-id {
            margin-top: 10%;
            margin-left: 15%;
        }

        .user-id input {
            width: 236px;
            height: 40px;
            border: 1px solid #ccc;
            font-size: 15pt;
            color: #383838;
            padding-left: 5px;
        }

        .user-pw {
            margin-top: 2%;
            margin-left: 15%;
        }

        .user-pw input {
            width: 236px;
            height: 40px;
            border: 1px solid #ccc;
            font-size: 15pt;
            color: #dfdfdf;
            padding-left: 5px
        }

        .id-saved {
            margin-top: 10px;
            margin-left: 15%;
        }

        .btn-login {
            margin-top: 10%;
            margin-left: 15%;
        }

        .btn-login button {
            width: 236px;
            height: 40px;
            background-color: #ff6445;
            border: 1px solid #e13614;
            font-size: 15pt;
            color: #fff;
        }

    </style>
</head>
<body>
    <form action="/j_spring_security_check" method="post">

        <div class="content">
            <div class="site-title">
                <label>지방의회모니터링시스템</label>
            </div>
            <div class="login">
                <div class="user-title">
                    <label>LOGIN</label>
                </div>
                <!-- id -->
                <div class="user-id">
                    <input id="j_username" name="j_username" type="text" onfocus="foc(this)"  onblur="clr(this)" /> </div>
                <!-- pw -->
                <div class="user-pw">
                    <input id="j_password" name="j_password" type="password" onfocus="foc(this)"  onblur="clr(this)" />
                </div>
                <!-- check -->
                <div class="id-saved">
                    <input type="checkbox" id="idSaveChk" name="idSaveChk"> <label for="idSaveChk">아이디 저장</label>
                </div>
                <div class="btn-login">
                    <button type="submit" id="btnLogin">로그인</button>
                </div>
            </div>
        </div>
    </form>

<script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script>

<script>
    $(document).ready(function () {

        $("#j_username").val(commonClass.getCookie('userid'));

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
                commonClass.setCookieExdays("userid", id, 365);
            } else {
                commonClass.setCookieExdays("userid", '', 365);
            }
        });
    });

    function foc(obj){
        $(obj).css("border","2px solid #e13614");
        $(obj).css("color","black");
    }

    function clr(obj){
        $(obj).css("border","1px solid #ccc");
    }

</script>
</body>
</html>
3