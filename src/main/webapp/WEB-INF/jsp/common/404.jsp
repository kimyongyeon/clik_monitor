<%@ page language="java" pageEncoding="UTF-8" session="false"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp" 
%><%
%><tiles:insertDefinition name="error.layout">

<tiles:putAttribute name="content">

            <p class="txt">404 PAGE NOT FOUND</p>
            <p class="txtKo">요청하신 페이지를 찾을 수 없습니다.</p>

</tiles:putAttribute>

</tiles:insertDefinition>