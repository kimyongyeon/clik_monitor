<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">


        <div id="rightBox">
                <div class="topBox">
                    <ul class="menuList">
                        <li class="list01"><a href="#">광역의회</a></li>
                        <li class="list02"><a href="#">기초의회</a></li>
                    </ul>
                    <ul class="list">
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">서울특별시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">부산광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">대구광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">인천광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">광주광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">대전광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">울산광역시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">세종특별자치시의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">경기도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">강원도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">충청북도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">충청남도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">전라북도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">전라남도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">경상북도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">경상남도의회</span></a></li>
                        <li><a href="#"><span class="listBox"></span><span class="listTxt">제주특별자치도의회</span></a></li>
                        <li class="lastArea"><a href="#"><span class="listBox">+</span></a></li>
                    </ul>
                </div>
                <div class="middleBox">
                    <div class="rightTopBox">
                        <div class="leftTopBox">
                            <a href="#">주간평균 응답시간</a>

                        </div>
                        <div class="leftBottomBox">
                            <a href="#">금일 시간당 호출 건수</a>
                        </div>
                    </div>
                    <div class="rightBottomBox">
                        <div class="leftTopBox">
                            연계파일 저장용량 모니터링
                        </div>
                        <div class="leftBottomBox">
                            트랜잭션 뷰
                        </div>
                    </div>
                </div>
                <div class="bottomBox">
                    업데이트 현황
                </div>
            </div>

        <!-- Agent 서버정보 팝업 start -->
        <div class="agentServerInfo">
            <div class="top">
                <h1>Agent 서버정보</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div class="middle">
                <div class="nemo01">
                    <div class="box01">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p>서울특별시의회</p>
                        </div>
                        <div class="listBox01">
                            <h2>서버IP</h2>
                            <p>152.99.2.212</p>
                        </div>
                        <div class="listBox01">
                            <h2>CPU</h2>
                            <p>Xeon E6-2630</p>
                        </div>
                    </div>
                    <div class="box02">
                        <div class="listBox01">
                            <h2>설치년도</h2>
                            <p>2014년</p>
                        </div>
                        <div class="listBox01">
                            <h2>OS</h2>
                            <p>Linux</p>
                        </div>
                        <div class="listBox01">
                            <h2>RAM</h2>
                            <p>16GB</p>
                        </div>
                    </div>
                    <div class="box03">
                        <div class="listBox01">
                            <h2>서버명</h2>
                            <p>회의록서버</p>
                        </div>
                        <div class="listBox01">
                            <h2>WAS</h2>
                            <p>Tomcat</p>
                        </div>
                        <div class="listBox01">
                            <h2>최종수집일</h2>
                            <p>2016.05.10</p>
                        </div>
                    </div>
                </div>
                <div class="box04">
                    <div class="listBox01">
                        <h2>모듈설치경로</h2>
                        <p>/usr/local/councilOpenApi/usr/local/councilOpenApi/usr/local/councilOpenApi</p>
                    </div>
                </div>
                <div class="box05">
                    <div class="listBox01">
                        <h2>비고</h2>
                        <p>없음</p>
                    </div>
                </div>
                <div class="nemo02">
                    <ul>
                        <li>수집API<br />구동</li>
                        <li class="middle">수집API<br />종료</li>
                        <li>업데이트<br />요청</li>
                    </ul>
                </div>
            </div>
            <div class="bottom"><span class="btnSet"><span class="leftBtn"><a href="#">수정</a></span><a href="#">확인</a></span></div>
        </div>
        <!-- Agent 서버정보 팝업 end -->


        <!-- Agent 서버정보 추가 팝업 start -->
        <div class="agentServerInfoInsert">
            <div class="top">
                <h1>Agent 서버정보 추가</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>


            <div class="middle">
                <table class="table03">
                    <tr>
                        <th scope="row">기관유형</th>
                        <td colspan="5"><select name="select" class="select01">
                            <option value="">기관선택</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                            <select name="select2" class="select02">
                                <option value="">기관유형선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select name="select2" class="select03">
                                <option value="">지역선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select name="select2" class="select04">
                                <option value="">소속선택</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select></td>
                    </tr>
                    <tr>
                        <th scope="row">비밀번호</th>
                        <td colspan="3"><input type="password" title="비밀번호" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트URL</th>
                        <td colspan="3"><input type="text" title="사이트URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내회의록URL</th>
                        <td colspan="3"><input type="text" title="사이트내회의록URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내의안URL</th>
                        <td colspan="3"><input type="text" title="사이트내의안URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">사이트내의원URL</th>
                        <td colspan="3"><input type="text" title="사이트내의원URL" /></td>
                    </tr>
                    <tr>
                        <th scope="row">OPENAPI 정보정공여부</th>
                        <td colspan="3"><select name="select3" class="select05">
                            <option value="">회의록</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">서버IP</th>
                        <td colspan="3"><input type="text" title="서버IP" /></td>
                    </tr>
                    <tr>
                        <th scope="row">게시여부</th>
                        <td colspan="3"><select name="select4" class="select06">
                            <option value="">게시</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">지방의회상태</th>
                        <td colspan="3"><select name="select5" class="select07">
                            <option value="">운영</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                    </tr>
                    <tr>
                        <th scope="row">설치년도</th>
                        <td><select name="select6" class="select08">
                            <option value="">2016</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select></td>
                        <th>서버명</th>
                        <td colspan="3"><input type="text" title="서버명" /></td>

                    </tr>
                    <tr>
                        <th scope="row">OS</th>
                        <td><input type="text" title="OS" /></td>
                        <th>WAS</th>
                        <td colspan="3"><input type="text" title="WAS" /></td>

                    </tr>
                    <tr>
                        <th scope="row">CPU</th>
                        <td><input type="text" title="CPU" /></td>
                        <th>RAM</th>
                        <td colspan="3"><input type="text" title="RAM" /></td>

                    </tr>
                    <tr>
                        <th scope="row">모듈설치경로</th>
                        <td colspan="3"><input type="text" title="모듈설치경로" /></td>
                    </tr>
                    <tr>
                        <th scope="row">비고</th>
                        <td colspan="3"><input type="text" title="비고" /></td>
                    </tr>
                </table>

            </div>

            <div class="bottom"><span class="btnSet"><span class="leftBtn"><a href="#">등록</a></span><a href="#">취소</a></span></div>
        </div>
        <!-- Agent 서버정보 추가 팝업 end -->


        <!-- 로그 데이터 팝업 start -->
        <div class="logData">
            <div class="top">
                <h1>로그 데이터</h1>
                <div class="closeBtn"><a href="#">X</a></div>
            </div>
            <div class="middle">
                <div class="nemo01">
                    <div class="box01">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p>서울특별시의회</p>
                        </div>
                        <div class="listBox01">
                            <h2>요청코드</h2>
                            <p>REQ301</p>
                        </div>
                    </div>
                    <div class="box02">
                        <div class="listBox01">
                            <h2>의회명</h2>
                            <p>서울의회</p>
                        </div>
                        <div class="listBox01">
                            <h2>요청일자</h2>
                            <p>2016.05.10</p>
                        </div>
                    </div>
                    <div class="box03">
                        <div class="listBox01">
                            <h2>서버IP</h2>
                            <p>210.178.102.3</p>
                        </div>
                        <div class="listBox01">
                            <h2>결과코드</h2>
                            <p>104</p>
                        </div>
                    </div>
                </div>
                <div class="box05">
                    <div class="listBox01">
                        <h2>결과메시지</h2>
                        <div class="resultMessege">
                            <p>
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                                27112220150314002REQ301RES3050410012015031401273620150314012736104전송 데이터 에러. DATA_TYPE :'E'2014-10-24 :21:10.00410011q2w3e210.95.181.199fdc0f0128688c189f7143d0e1ea667f1318ec4784c38337257ac3d40bded3ca@DataType:Clob:5AAAA8TAALAAADkSAAA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom"><span class="btnSet"><a href="#">확인</a></span></div>
        </div>
        <!-- 로그 데이터 팝업 end -->

    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>