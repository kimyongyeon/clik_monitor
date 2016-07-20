<%@ page session="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp"%>
<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, user-scalable=no">

		<title><tiles:insertAttribute name="title"/></title>

		<link href="<c:url value="/css/jquery-ui.css"/>" rel="stylesheet">
		<link href="<c:url value="/css/tableSort.css"/>" rel="stylesheet">
		<link href="<c:url value="/css/json/jquery.dynatable.css"/>" rel="stylesheet">
        <link href="<c:url value="/css/style.css"/>" rel="stylesheet">

		<script type="text/javascript" src="<c:url value="/assets/jquery/dist/jquery.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/jquery.tablesorter.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/json/jquery.dynatable.js"/>"></script>

		<script type="text/javascript" src="<c:url value="/assets/jquery-ui-1.11.1/jquery-ui.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jquery.qtip.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jquery.ellipsis.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jquery_blockUI.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jquery.fileupload.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jquery.form.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/underscore-min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/babypaunch.libparts.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/assets/js/handlebars-v4.0.5.js"/>"></script>
		<%--<script type="text/javascript" src="<c:url value="/assets/js/es5-shim.min.js"/>"></script>--%>
		<%--<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->--%>
		<tiles:insertAttribute name="javascript.header" />
		<tiles:insertAttribute name="stylesheet" />

		<style>
			/* From http://lea.verou.me/css3patterns/ */
			/* Playing with CSS */
			body
			{
				background:
						linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
						linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
						linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
						linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
						linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
						linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
				background-color: #131313;
				background-size: 20px 20px;
			}
		</style>

	</head>

	<body>
		<div class="screen"></div>
        <!--Main area-->
        <div id="containerMain">
            <div id="topBox">
                <div id="title"><h1><a href="#" onclick="page_go('main');">지방의회 표준연계<br />API모니터링 시스템</a></h1></div>
                <div id="menu">
                    <ul class="parent">
                        <li><a href="#" onclick="page_go('stat');">통계관리</a></li>
                        <li><a href="#" onclick="page_go('range');">임계값설정</a></li>
                        <li><a href="#" onclick="page_go('mail');">메일링관리</a></li>
						<li><a href="#" onclick="page_go('meta');">메타데이터관리</a></li>
						<li id="subMenu1">
							<a href="#">UI테스트 관리	</a>
							<div class="subMenu">
								<ul class="subUl">
									<li id="btnErrorBox1"><a href="#">에러박스생성</a></li>
									<li id="btnErrorBox2"><a href="#">에러박스주기시작</a></li>
									<li id="btnErrorBox3"><a href="#">에러박스주기정지</a></li>
									<li id="btnErrorBox4"><a href="#">네트워크상태시작</a></li>
									<li id="btnErrorBox5"><a href="#">네트워크상태정지</a></li>
								</ul>
							</div>
						</li>
                    </ul>
                </div>
                <div id="login"><a href="#">Logout</a></div>
            </div>

            <!--content area-->
            <tiles:insertAttribute name="content"/>
            <!--//content area-->
        </div>

		<script type="text/javascript">

			$(".subMenu").css("display","none");

			$("#subMenu1").on("mouseover", function(){
				$(".subMenu").css("display","block");

			});

			$("#subMenu1").on("mouseout", function(){
				$(".subMenu").css("display","none");

			});

		</script>

        <!--//Main area-->

        <!--footer area-->
        <%--<div id="footer">
            footer
        </div>--%>
        <!--//footer area-->

	<tiles:insertAttribute name="javascript.footer"/>
	
	</body>

</html>