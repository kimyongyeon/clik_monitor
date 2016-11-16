<%@ page language="java" pageEncoding="UTF-8"%>
<!-- 기관유형선택 / 지역선택 / 지방의회선택 -->
<%--<script id="brtc-code-template" type="text/x-handlebars-template">--%>
    <%--<select name="brtcCode" class="select01" onchange="commonClass.fnAjaxInsttClCodeList()">--%>
        <%--<option value="">기관유형 선택</option>--%>
        <%--{{#commonList}}--%>
        <%--<option value="{{code}}">{{codenm}}</option>--%>
        <%--{{/commonList}}--%>
    <%--</select>--%>
<%--</script>--%>
<%--<script id="instt-cl-code-template" type="text/x-handlebars-template">--%>
    <%--<select name="insttClCode" class="select02" onchange="commonClass.fnAjaxLoasmCodeList()">--%>
        <%--<option value="">지역선택</option>--%>
        <%--{{#commonList}}--%>
        <%--<option value="{{code}}">{{codenm}}</option>--%>
        <%--{{/commonList}}--%>
    <%--</select>--%>
<%--</script>--%>
<%--<script id="loasm_code-template" type="text/x-handlebars-template">--%>
    <%--<select name="loasmCode" class="select03">--%>
        <%--<option value="">지방의회선택</option>--%>
        <%--{{#commonList}}--%>
        <%--<option value="{{code}}">{{codenm}}</option>--%>
        <%--{{/commonList}}--%>
    <%--</select>--%>
<%--</script>--%>
<div id="tpl_commbo_list">
    <div class="selectBox" id="brtc_code_div">
        <select name="brtcCode" class="select01" onchange="commonClass.fnAjaxInsttClCodeList()" v-model="brtcCode">
            <option value="">기관유형 선택</option>
            <option selected="{{'intsttcl_000023' == item.code}}" v-for="item in commonList_1" v-bind:value="item.code">{{item.codenm}}</option>
        </select>
    </div>
    <div class="selectBox" id="instt_cl_code_div">
        <select name="insttClCode" class="select02" onchange="commonClass.fnAjaxLoasmCodeList()" v-model="insttClCode">
            <option value="">지역선택</option>
            <option v-for="item in commonList_2" v-bind:value="item.code">{{item.codenm}}</option>
        </select>
    </div>
    <div class="selectBox" id="loasm_code_div">
        <select name="loasmCode" class="select03" v-model="loasmCode">
            <option value="">지방의회선택</option>
            <option v-for="item in commonList_3" v-bind:value="item.code">{{item.codenm}}</option>
        </select>
    </div>
</div>