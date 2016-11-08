<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="popup" id="tpl-log-data-list">

    <div class="top">
        <h2>에러 정보 목록</h2>
        <nav aria-label="Page navigation" style="left: 300px; bottom: -12px; position: absolute;">
            <ul class="pagination">
                <li v-if="prev" @click="commonClass.fnLogDataList(prevPage);"><a href="#">&laquo;</a></li>

                <template v-for="item in lastPageNoOnPageList">
                    <li v-if="lastPageNoOnPageList > 1" @click="commonClass.fnLogDataList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                        <a href="#">{{firstPageNoOnPageList + item}}</a>
                    </li>
                </template>

                <li v-if="next" @click="commonClass.fnLogDataList(nextPage);"><a href="#">&raquo;</a></li>
            </ul>
        </nav>
        <div class="closeBtn"><a href="#" onclick="commonClass.fnErrorLogListClose();">X</a></div>
    </div>

    <div class="middle" style="height:220px;">
        <!-- 목록 -->
        <div class="logData_list_popup">
            <table>
                <tr>
                    <th height="5">의회명</th>
                    <th>요청일자</th>
                    <th>서버IP</th>
                    <th>결과코드</th>
                    <th>결과메세지</th>
                </tr>
                <tr class="log-row"  v-on:click="activeOn" @click="commonClass.fnLogDetailData(item.requstId); activeOn"  v-for="item in items">
                    <td>{{item.rasmblyNm}}</td>
                    <td class="dateFormat">{{item.requstRecptnTm}}</td>
                    <td>{{item.serverIp}}</td>
                    <td>{{item.codeNm}}</td>
                    <td><p class="ellipsis">{{item.resultMssage}}</p></td>
                </tr>
            </table>
        </div>
    </div>
</div>

<!-- 상세 -->
<div class="logData_popup">
    <div class="logData" id="tpl-log-data-detail">
        <div class="top">
            <h1>로그 데이터</h1>
            <div class="closeBtn"><a href="#" onclick="commonClass.fnLogDataClose();">X</a></div>
            <input type="hidden" name="requstInsttId" v-bind:value="item.requstInsttId">
        </div>
        <div class="middle">
            <div class="nemo01">
                <div class="box01">
                    <div class="listBox01">
                        <h2>의회명</h2>
                        <p style="display: inline; width: 189px;">{{item.rasmblyNm}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청코드</h2>
                        <p>{{item.provdInsttId}}</p>
                    </div>
                </div>
                <div class="box02">
                    <div class="listBox01">
                        <h2>의회코드</h2>
                        <p>{{item.requstInsttId}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청일자</h2>
                        <p>{{item.requstRecptnTm}}</p>
                    </div>
                </div>
                <div class="box03">
                    <div class="listBox01">
                        <h2>서버IP</h2>
                        <p>{{item.serverIp}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>결과코드</h2>
                        <p>{{item.resultCode}}</p>
                    </div>
                </div>
            </div>
            <div class="box05">
                <div class="listBox01">
                    <h2>결과메시지</h2>
                    <div class="resultMessege">
                        <p>
                            {{item.resultMssage}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom"><span class="btnSet"><a href="#" onclick="commonClass.fnLogDataClose();">확인</a></span></div>
    </div>
</div>

<%--<!-- 리스트 -->
<script id="logdata_list_popup-template" type="text/x-handlebars-template">
    <table>
        <tr>
            <th height="5">의회명</th>
            <th>요청일자</th>
            <th>서버IP</th>
            <th>결과코드</th>
            <th width="300px">결과메세지</th>
        </tr>
        {{#list}}
        <tr class="log-row" style="cursor: pointer" onclick="commonClass.fnLogDetailData('{{requstId}}');">
            <td height="5">{{rasmblyNm}}</td>
            <td class="dateFormat">{{requstRecptnTm}}</td>
            <td>{{serverIp}}</td>
            <td>{{codeNm}}</td>
            <td><p class="ellipsis" style="margin-left:5px;">{{resultMssage}}</p></td>
        </tr>
        {{/list}}
    </table>
</script>

<!-- 상세 -->
<script id="logData_popup-template" type="text/x-handlebars-template">
    <div class="logData">
        <div class="top">
            <h1>로그 데이터</h1>
            <div class="closeBtn"><a href="#" onclick="commonClass.fnLogDataClose();">X</a></div>
            <input type="hidden" name="requstInsttId" value="{{requstInsttId}}">
        </div>
        <div class="middle">
            <div class="nemo01">
                <div class="box01">
                    <div class="listBox01">
                        <h2>의회명</h2>
                        <p style="display: inline; width: 189px;">{{rasmblyNm}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청코드</h2>
                        <p>{{provdInsttId}}</p>
                    </div>
                </div>
                <div class="box02">
                    <div class="listBox01">
                        <h2>의회코드</h2>
                        <p>{{requstInsttId}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>요청일자</h2>
                        <p>{{requstRecptnTm}}</p>
                    </div>
                </div>
                <div class="box03">
                    <div class="listBox01">
                        <h2>서버IP</h2>
                        <p>{{serverIp}}</p>
                    </div>
                    <div class="listBox01">
                        <h2>결과코드</h2>
                        <p>{{resultCode}}</p>
                    </div>
                </div>
            </div>
            <div class="box05">
                <div class="listBox01">
                    <h2>결과메시지</h2>
                    <div class="resultMessege">
                        <p>
                            {{resultMssage}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom"><span class="btnSet"><a href="#" onclick="commonClass.fnLogDataClose();">확인</a></span></div>
    </div>
</script>--%>
<script type="text/javascript" src="<c:url value="/assets/js/biz/common.js"/>"></script>