<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">

    <tiles:putAttribute name="content">

        <h1>야하하하</h1>
        <table id="example-1" class="table">
            <tr>
                <th>번호</th>
            </tr>
            <tr v-for="item in items">
                <td>{{item.message}} </td>
            </tr>
        </table>

    </tiles:putAttribute>

    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            var example1 = new Vue({
                el: '#example-1',
                data: {
                    items: [
                        { message: 'Foo' },
                        { message: 'Bar' }
                    ]
                }
            })
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>