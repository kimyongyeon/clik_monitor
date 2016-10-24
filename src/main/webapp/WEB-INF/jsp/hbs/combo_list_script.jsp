<%@ page language="java" pageEncoding="UTF-8"%>
<!-- 기관유형선택 / 지역선택 / 지방의회선택 -->
<script id="brtc-code-template" type="text/x-handlebars-template">
    <select name="brtcCode" class="select01" onchange="commonClass.fnAjaxInsttClCodeList()">
        <option value="">기관유형 선택</option>
        {{#commonList}}
        <option value="{{code}}">{{codenm}}</option>
        {{/commonList}}
    </select>
</script>
<script id="instt-cl-code-template" type="text/x-handlebars-template">
    <select name="insttClCode" class="select02" onchange="commonClass.fnAjaxLoasmCodeList()">
        <option value="">지역선택</option>
        {{#commonList}}
        <option value="{{code}}">{{codenm}}</option>
        {{/commonList}}
    </select>
</script>
<script id="loasm_code-template" type="text/x-handlebars-template">
    <select name="loasmCode" class="select03">
        <option value="">지방의회선택</option>
        {{#commonList}}
        <option value="{{code}}">{{codenm}}</option>
        {{/commonList}}
    </select>
</script>