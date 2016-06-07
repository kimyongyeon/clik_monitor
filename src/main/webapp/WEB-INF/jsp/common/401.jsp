<%@ page language="java" pageEncoding="UTF-8" session="false"
%><%@ include file="/WEB-INF/jsp/common/directive.jsp" 
%><%

%><tiles:insertDefinition name="error.layout">

<tiles:putAttribute name="content">

            <p class="txt">401 UNAUTHORIZED</p>
            <p class="txtKo">요청하신 페이지에 대한 권한이 없습니다.</p>

</tiles:putAttribute>

</tiles:insertDefinition>