<%@ page session="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp"%>
<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		
		<title><tiles:insertAttribute name="title"/></title>

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
		<tiles:insertAttribute name="javascript.header"/>

		<tiles:insertAttribute name="stylesheet"/>
		
		<script>
			$(document).ready(function () {
			});
		</script>

	</head>

	<body>

        <!--Main area-->
        <div id="container">

            <div id="login"><a href="#">Logout</a></div>
            <div id="topBox">
                <div id="title"><h1><a href="index.html">지방의회 표준연계<br />API모니터링 시스템</a></h1></div>
                <div id="menu">
                    <ul>
                        <li><a href="통계관리.html">통계관리</a></li>
                        <li><a href="임계값%20설정.html">임계값설정</a></li>
                        <li><a href="메일링관리.html">메일링관리</a></li>
                        <li><a href="#">메타데이터관리</a></li>
                    </ul>
                </div>
            </div>
            <div id="sideBar">
                <div class="sideBar_tabMenu">
                    <ul>
                        <li class="list01"><a href="#">의회별</a></li>
                        <li class="list02"><a href="#">지역별</a></li>
                    </ul>
                </div>
                <div class="tab01">
                    <div class="sideBar_radioBox">
                        <ul>
                            <li><span><input type="radio" id="radio1" name="radioBox01" /><label for="radio1">광역의회</label></span></li>
                            <li><span><input type="radio" id="radio2" name="radioBox01" /><label for="radio2">기초의회</label></span></li>
                        </ul>
                    </div>
                    <div class="sideBar_radioBox4">
                        <ul>
                            <li><span><input type="radio" id="radio3" name="radioBox02" /><label for="radio3">회의록</label></span></li>
                            <li><span><input type="radio" id="radio4" name="radioBox02" /><label for="radio4">부록</label></span></li>
                            <li><span><input type="radio" id="radio5" name="radioBox02" /><label for="radio5">의안</label></span></li>
                            <li><span><input type="radio" id="radio6" name="radioBox02" /><label for="radio6">의원</label></span></li>
                        </ul>
                    </div>
                    <div class="treeBox">
                        트리메뉴
                    </div>
                </div>
                <div class="tab02">
                    <div class="sideBar_radioBox4">
                        <ul>
                            <li><span><input type="radio" id="radio9" name="radioBox02" /><label for="radio3">회의록</label></span></li>
                            <li><span><input type="radio" id="radio10" name="radioBox02" /><label for="radio4">부록</label></span></li>
                            <li><span><input type="radio" id="radio11" name="radioBox02" /><label for="radio5">의안</label></span></li>
                            <li><span><input type="radio" id="radio12" name="radioBox02" /><label for="radio6">의원</label></span></li>
                        </ul>
                    </div>
                    <div class="treeBox">
                        트리메뉴
                    </div>
                </div>

            </div>

            <!--content area-->
            <tiles:insertAttribute name="content"/>
            <!--//content area-->
        </div>
        <!--//Main area-->

        <!--footer area-->
        <%--<div id="footer">
            footer
        </div>--%>
        <!--//footer area-->

	<tiles:insertAttribute name="javascript.footer"/>
	
	</body>

</html>