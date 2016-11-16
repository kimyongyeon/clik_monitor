<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="popup" id="tpl-log-data-list">

    <div class="top">
        <h2>에러 정보 목록</h2>
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li v-if="prev" @click="commonClass.fnLogDataList(prevPage);"><a href="#">&laquo;</a></li>

                <template v-for="item in lastPageNoOnPageList">
                    <li v-if="lastPageNoOnPageList > 1" @click="commonClass.fnLogDataList(firstPageNoOnPageList + item);" :class="{active: page == firstPageNoOnPageList + item}">
                        <a href="#" v-if="lastPageNoOnPageList >= firstPageNoOnPageList + item">{{firstPageNoOnPageList + item}}</a>
                    </li>
                </template>

                <li v-if="next" @click="commonClass.fnLogDataList(nextPage);"><a href="#">&raquo;</a></li>
            </ul>
        </nav>
        <div class="closeBtn"><a href="#" onclick="commonClass.fnErrorLogListClose();">X</a></div>
    </div>

    <div class="middle">
        <!-- 목록 -->
        <div class="logData_list_popup">
            <table>
                <tr>
                    <th height="5">의회명</th>
                    <th>요청일시</th>
                    <th>서버IP</th>
                    <th>결과코드</th>
                    <th>결과메세지</th>
                </tr>
                <tr class="log-row"  v-on:click="activeOn" @click="commonClass.fnLogDetailData(item.requstId); activeOn"  v-for="item in items">
                    <td>{{item.rasmblyNm}}</td>
                    <td class="dateFormat">{{dateFormat(item.requstRecptnTm)}}</td>
                    <td>{{item.serverIp}}</td>
                    <td>{{item.codeNm}}</td>
                    <td><p class="ellipsis">{{item.resultMssage}}</p></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="bottom">
        <div class="closeBtn"><label for="idSaveChk"><input type="checkbox" id="idSaveChk" name="idSaveChk"> 그만보기</label></div>
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
                        <p>{{dateFormat(item.requstRecptnTm)}}</p>
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
