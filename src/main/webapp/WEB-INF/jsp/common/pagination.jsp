<%@ page language="java" pageEncoding="UTF-8" 
%><%@ include file="/WEB-INF/jsp/common/directive.jsp" 
%><%@page import="java.net.URI,
				  org.apache.commons.lang3.BooleanUtils,
				  org.apache.commons.lang3.StringUtils,
				  org.apache.commons.lang3.math.NumberUtils"%><%
				  
	String uri = StringUtils.defaultIfEmpty(request.getParameter("uri"), "");
	boolean includeParam = BooleanUtils.toBoolean(StringUtils.defaultIfEmpty(request.getParameter("includeParam"), "true"));

	double totalCount = Double.parseDouble(request.getParameter("total"));
	int pageSize = Integer.parseInt(request.getParameter("count"));
	int currentPage = NumberUtils.toInt(request.getParameter("page"), 1);
	int windowSize = NumberUtils.toInt(request.getParameter("windowSize"), 5);
	int lastPage = 1, startPage = 0, endPage = 0;

	if (windowSize % 2 > 0)
		windowSize -= 1;

	if (totalCount >= pageSize)
		lastPage = (int) Math.ceil(totalCount / pageSize);

	if (currentPage <= ((windowSize / 2) + 1)) {

		startPage = 1;
		//endPage = (currentPage + 1) + (windowSize - (currentPage - 1));
		endPage = startPage + windowSize;
		if (endPage > lastPage)
			endPage = lastPage;

	} else if (currentPage >= (lastPage - (windowSize / 2))) {

		startPage = currentPage - (windowSize - (lastPage - currentPage));
		if (startPage < 1)
			startPage = 1;
		endPage = lastPage;

	} else {

		startPage = currentPage - (windowSize / 2);
		endPage = startPage + windowSize;

	}

	if (StringUtils.isEmpty(uri))
		uri = "?";
	
	else {

		URI temp = URI.create(uri);

		if (StringUtils.isEmpty(temp.getQuery()))
			uri += "?";
		else
			uri += "&";

	}

	if (includeParam) {

		String queryString = request.getQueryString();

		if (StringUtils.isNotEmpty(queryString))
			uri += (queryString.replaceAll("(^page=[\\d]+&?|&page=[\\d]+)", "") + "&");

	}

	uri = uri.replaceAll("%", "%%") + "page=%d";

	pageContext.setAttribute("startPage", startPage);
	pageContext.setAttribute("endPage", endPage);
	pageContext.setAttribute("lastPage", lastPage);
	pageContext.setAttribute("currentPage", currentPage);
	pageContext.setAttribute("uri", uri);
%>

<nav class="text-center">

	<ul class="pagination">
		
		<c:if test="${ startPage > 1 }">
		<li><a href="<spring:eval expression="T(String).format(uri, 1)" htmlEscape="true"/>">1</a></li>
		<c:if test="${ startPage > 2 }">
		<li class="disabled"><span>......</span></li>
		</c:if>
		</c:if>
		
		<c:forEach var="pg" begin="${ startPage }" end="${ endPage }">
		<c:set var="pageCssClass" value="${ pg != currentPage ? '' : 'active' }"/>
		<li class="${ pageCssClass }"><a href="<spring:eval expression="T(String).format(uri, pg)" htmlEscape="true"/>">${ pg }</a></li>
		</c:forEach>
		
		<c:if test="${ endPage < lastPage }">
		<c:if test="${ endPage < lastPage - 1 }">
		<li class="disabled"><span>......</span></li>
		</c:if>
		<li><a href="<spring:eval expression="T(String).format(uri, lastPage)" htmlEscape="true"/>">${ lastPage }</a></li>
		</c:if>
	
	</ul>

</nav>