<%@ page session="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/directive.jsp"%>
<!DOCTYPE HTML>
<html lang="koc">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		<meta name="viewport" content="width=device-width, user-scalable=no">

		<title><tiles:insertAttribute name="title"/></title>
        <!-- css -->
        <%--<link href="<c:url value="/css/jquery-ui.css"/>" rel="stylesheet">--%>
        <link href="<c:url value="/css/w3.css"/>" rel="stylesheet"> <!-- 공통 style.css -->
        <%--<link href="<c:url value="/assets/jsgrid-1.5.1/jsgrid.min.css"/>" rel="stylesheet"> <!-- 그리드 테이블 css -->--%>
        <%--<link href="<c:url value="/assets/jsgrid-1.5.1/jsgrid-theme.min.css"/>" rel="stylesheet"> <!-- 그리드 테마 -->--%>
        <link href="<c:url value="/assets/font-awesome-4.6.3/css/font-awesome.min.css"/>" rel="stylesheet"> <!-- awesome -->
        <!-- javascript -->
		<script type="text/javascript" src="<c:url value="/assets/jquery/dist/jquery.min.js"/>"></script> <!-- jquery -->
		<%--<script type="text/javascript" src="<c:url value="/assets/js/jquery.min.js"/>"></script> <!-- jquery -->--%>
        <script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script> <!-- 내가 만든 공통함수 -->
        <script type="text/javascript" src="<c:url value="/assets/js/biz/main.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/jquery-ui-1.11.1/jquery-ui.js"/>"></script> <!-- 달력 -->
        <script type="text/javascript" src="<c:url value="/assets/jsgrid-1.5.1/jsgrid.min.js"/>"></script> <!-- 그리드 -->
        <script type="text/javascript" src="<c:url value="/assets/js/jquery_blockUI.js"/>"></script> <!-- 프로그레스바 -->
		<script type="text/javascript" src="<c:url value="/assets/js/underscore-min.js"/>"></script> <!-- 언더스코어 라이브러리 콜렉션 관리 -->
        <script type="text/javascript" src="<c:url value="/assets/js/handlebars-v4.0.5.js"/>"></script> <!-- 핸들바 -->
		<%--<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->--%>
		<tiles:insertAttribute name="javascript.header" />
		<tiles:insertAttribute name="stylesheet" />
	</head>

	<body>
		<div class="screen"></div>

        <!--Main area-->
        <div class="w3-container w3-black">
            <div class="w3-row">
                <div class="w3-left">
                    <a href="#" onclick="commonClass.page_go('main');"><img id="title" src="/img/logo.jpg" alt="로고" /></a>
                </div>

                <div class="w3-left">
                    <ul class="w3-navbar w3-black">
                        <li><a class="w3-red menu menu_1" href="#" onclick="commonClass.page_go('main');">대쉬보드</a></li>
                        <li><a class="w3-red menu menu_2" href="#" onclick="commonClass.page_go('stat');">통계관리</a></li>
                        <li><a class="w3-red menu menu_3" href="#" onclick="commonClass.page_go('range');">임계값관리</a></li>
                        <li><a class="w3-red menu menu_4" href="#" onclick="commonClass.page_go('meta');">지방정책정보</a></li>
                        <li><a class="w3-red menu menu_5" href="#" onclick="commonClass.page_go('mail');">메일링관리</a></li>
                    </ul>
                </div>
                <div class="w3-right">
                    <h1>접속ID : ${sessionScope.username}</h1>
                </div>
            </div>
        </div>

        <div class="w3-container w3-black">

            <%@ include file="/WEB-INF/jsp/hbs/main_script.jsp" %>
            <!--content area-->
            <tiles:insertAttribute name="content"/>
            <!--//content area-->
        </div>

        <div class="w3-container w3-black">
            <p>Copyright&copy;지방의회 모니터링 시스템 All rights reserved.</p>
        </div>

		<script type="text/javascript">
            commonClass.mainInit();
		</script>

	<tiles:insertAttribute name="javascript.footer"/>
        <%--<footer style="position: relative; background: #000; height: 60px;">--%>
            <%--<p color="#fff" style="position: absolute; bottom: 26px; left: 45%">Copyright&copy;지방의회 모니터링 시스템 All rights reserved.</p>--%>
            <%--&lt;%&ndash;<ul class="parent" style="margin-top:16px;">&ndash;%&gt;--%>
            <%--&lt;%&ndash;<li id="errorInfoListMenu"><a href="#" onclick="commonClass.fnLogDataList(1);">에러정보목록</a></li>&ndash;%&gt;--%>
            <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
        <%--</footer>--%>

	</body>

</html>