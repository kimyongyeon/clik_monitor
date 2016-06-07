<%@ page language="java" pageEncoding="UTF-8" session="false"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>  ````````````````
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	
	<title><tiles:insertAttribute name="title"/> (${ pageContext.response.status })</title>
	
	<script type="text/javascript">
	var contextPath = "${ pageContext.request.contextPath }/";
	</script>

    <link href="<c:url value="/assets/bootstrap/css/bootstrap.css?"/>" rel="stylesheet">
    <link href="<c:url value="/assets/bootstrap/css/docs.css?"/>" rel="stylesheet">
    <script type="text/javascript" src="<c:url value="/assets/js/jquery-1.11.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/jquery-ui-1.11.1/jquery-ui.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.qtip.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.ellipsis.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery_blockUI.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.fileupload.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/jquery.form.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/lightslider.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/bootstrap/js/bootstrap.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/bootstrap/js/holder.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/application.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/assets/js/underscore-min.js"/>"></script>
    
    
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	
	<tiles:insertAttribute name="javascript.header"/>
	
	<tiles:insertAttribute name="stylesheet"/>
	
</head>

<body class="Error">

	<div class="ErrorPG">
	
    	<div class="pageError">
            <p class="error"><i class="fa icon-warning-sign"></i></p>
            <tiles:insertAttribute name="content"/>
		</div>
        
	</div>
	
    <p class="btn_goPg ">
    	<button type="button" id="btnBack">이전 페이지로 이동</button>
    	<button type="button" id="btnHome">HOME</button>
    	<c:if test="${ pageContext.response.status == 401 && !account.isGuest() }">
    	<button type="button" id="btnLogout">LOGOUT</button>
    	</c:if>
    </p>
    

    <script type="text/javascript">
    
	$('#btnBack').click(function() {
		window.history.back();
	});
	
	$('#btnHome').click(function() {
		location.href = contextPath;
	});
	
	$('#btnLogout').click(function() {
		location.href = "<c:url value="/logout.do"/>";
	});
    
	</script>

	<tiles:insertAttribute name="javascript.footer"/>

</body>


</html>
