<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp"%>
<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		
		<title><tiles:insertAttribute name="title"/></title>
		
		<script type="text/javascript">
		var contextPath = "${ pageContext.request.contextPath }/";
		</script>
	
			
		<link href="<c:url value="/resources/jquery-ui-themes-1.11.1/themes/redmond/jquery-ui.css?${ BROWSER_CACHE_TIME_FLAG }"/>" rel="stylesheet">
		<link href="<c:url value="/resources/bootstrap/css/bootstrap.css?${ BROWSER_CACHE_TIME_FLAG }"/>" rel="stylesheet">
		<link href="<c:url value="/resources/css/dotStyle.css?${ BROWSER_CACHE_TIME_FLAG }"/>" rel="stylesheet">
        <link href="<c:url value="/resources/css/jquery.qtip.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/resources/css/magic.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/resources/css/admin.css"/>" rel="stylesheet">

		<script type="text/javascript" src="<c:url value="/resources/js/jquery-1.11.1.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/jquery-ui-1.11.1/jquery-ui.js"/>"></script>

        <script type="text/javascript" src="<c:url value="/resources/js/moment.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/fullcalendar.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/jquery.qtip.min.js"/>"></script>

        <script type="text/javascript" src="<c:url value="/resources/js/jquery.ellipsis.js"/>"></script>

        <script type="text/javascript" src="<c:url value="/resources/js/unitip.js"/>"></script>

		<script type="text/javascript" src="<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/bootstrap/js/holder.js"/>"></script>
		
		<script type="text/javascript" src="<c:url value="/resources/js/application.js?${ BROWSER_CACHE_TIME_FLAG }"/>"></script>
		
		<script type="text/javascript" src="<c:url value="/resources/js/plugins/modernizr.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/plugins/template.js"/>"></script>
		<%--
		<script type="text/javascript" src="<c:url value="/resources/js/parsley.min.js"/>"></script>
		--%>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery.selectBox.js"/>"></script>

        <script type="text/javascript" src="<c:url value="/resources/js/jquery_blockUI.js"/>"></script>

		<script type="text/javascript" src="<c:url value="/resources/js/underscore-min.js "/>"></script>

		<script src="<c:url value="/resources/geo/queue.v1.min.js "/>"></script>
		<script src="<c:url value="/resources/geo/topojson.v1.min.js "/>"></script>
		
		<script type="text/javascript" src="<c:url value="/resources/echart/echarts-all.js"/>"></script>

        <script type="text/javascript" src="<c:url value="/resources/js/d3.js"/>"></script>

		<%--<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->--%>
		
		<script type="text/javascript">
		
		var GV_CHART_THEME = 'macarons';	// EChart Theme (업종별현황)

		$(document).ready(function () {
			
			$('SELECT').selectBox();	// select box css
			
		});
		
		if($.fn.button.noConflict) {
			$.fn.btn = $.fn.button.noConflict();
		}
			
		</script>
		
		<tiles:insertAttribute name="javascript.header"/>
		
		<style type="text/css">
		.ui-datepicker-title > select { font:initial; color:initial; }
		</style>
		
		<tiles:insertAttribute name="stylesheet"/>
		
	</head>
	
	
	
	<body>
	
	<!-- scrollToTop -->
	<div class="scrollToTop"><span>top</span></div>
    
	<!-- page wrapper-->
	<div class="page-wrapper">

        <!-- header-->
        <header class="AmHeader">
            <div class="containerAm posiR ">
                <div class="AmheaderLF ">
                    <a href="<c:url value="/home.do"/>"><p class="logo"><span>Dig Out Treasure</span></p></a>
                </div>
                <div class="AmheaderRg main-navigation animated">
                    <!-- navbar-->
                    <nav class="AmNav" role="navigation">
                        <ul class=" navbar-nav">
                            <li><a href="/admin/batch/adminCal.do">배치현황조회</a></li>
							<li class="dropdown"><a href="<c:url value="/admin/account/user/index.do"/>" class="dropdown-toggle" data-toggle="dropdown">사용자권한관리 <span class="fa fa-angle-down"></span></a>
								<ul class="dropdown-menu">
									<p><img src="<c:url value="/resources/images/icon-dropdownMenu.png"/>"></p>
									<li class="admDep"><a href="<c:url value="/admin/account/user/index.do"/>">사용자관리</a></li>
									<li class="admDep"><a href="<c:url value="/admin/account/role/index.do"/>">권한관리</a></li>
									<li class="admDep"><a href="<c:url value="/admin/account/history/index.do"/>">로그인/아웃 이력</a></li>
									<li class="admDep"><a href="<c:url value="/admin/account/stats/index.do"/>">접속현황</a></li>
								</ul>
							</li>
						</ul>
                    </nav>
                    <!--// navbar-->
                </div>
            </div>
        </header>
        <!-- //header-->

        <div class="conts">
		
			<main>
			<tiles:insertAttribute name="content"/>
			</main>
			
			<!--footer-->
			<footer>
	        	<div class="container posiR">
					<p class="copyR">(463-400) 경기도 성남시 분당구 판교로 264(삼평동) The Planet SK플래닛 주식회사 대표이사 서진우<br>
					Copyright © 2015 SK Planet.  ALL RIGHTS RESERVED</p>
					<p class="wording">Commerce Data PF Team</p>
	            </div>
			</footer> 
			<!-- //footer -->
		
		</div>
		
	</div>
		
	<tiles:insertAttribute name="javascript.footer"/>
	
	</body>

</html>