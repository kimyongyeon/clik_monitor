<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="json-records">
            [
            {
            "번호": "233",
            "제목": "니가가라하와이",
            "발송일시": "10"
            },
            {
            "번호": "122",
            "제목": "내가갈꼐하와이",
            "발송일시": "10"
            }
            ]
        </div>

        <div id="container">

            <div id="subRightBox">
                <div class="titleArea">
                    <h2>메일링 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="#">home</a></li>
                            <li>></li>
                            <li><a href="#">메일링 관리</a></li>
                            <li>></li>
                            <li class="end"><a href="#">발송내역</a></li>
                        </ul>
                    </div>
                </div>
                <div class="topTable">
                    <div class="adminTab02">
                        <ul>
                            <li class="listTab01"><a href="#">발송내역</a></li>
                            <li class="listTab02"><a href="#">메일설정</a></li>
                        </ul>
                    </div>


                    <table class="table03">
                        <tr>
                            <th scope="row">발송일자</th>
                            <td>
                                <span class="calendar01"><input type="text" id="datepicker1" /></span><span class="pado">~</span>
                                <span class="calendar01"><input type="text" id="datepicker2" /></span>

                                <span class="calendarBtn"><input type="button" value="당일" /><input type="button" value="1주일" /><input type="button" value="1개월" /></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">검색항목</th>
                            <td>
                        <span class="select01">
                            <select name="select01" class="select01">
                                <option value="">전체</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </span>
                                <span class="select02"><input type="text" /></span>
                            </td>
                        </tr>
                    </table>
                    <div class="btnSearch01">
                        <a href="#">검색</a>
                    </div>
                </div>
                <div class="bottomTable">
                    <div class="tab04Box">
                        <div class="inputCount">
                            <div class="selectBox">
                                <div class="btnExcelSave"><a href="#">엑셀 저장</a></div>
                            </div>
                        </div>
                        <table id="myTable4" class="listTable01">
                            <thead>
                            <tr>
                                <th scope="col" class="th01">번호</th>
                                <th scope="col" class="th02">제목</th>
                                <th scope="col" class="th03">발송일시</th>
                            </tr>
                            </thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div class="tab05Box">




                        <table class="listTable02">
                            <tr>
                                <th scope="row">받는사람</th>
                                <td>
                                    <span class="chk01"><input type="checkbox" id="chk01" /><label for="chk01">test1.naver.com</label></span>
                                    <span class="chk01"><input type="checkbox" id="chk02" /><label for="chk02">test2.naver.com</label></span>
                                    <span class="chk01"><input type="checkbox" id="chk03" /><label for="chk03">test3.naver.com</label></span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td><span class="txtInput"><input type="text" value="오류가 발생하였습니다" /></span><span class="txt">예)2016.05.10 11:11:10 서울특별시의회 <span class="txtRed">오류가 발생하였습니다</span></span></td>
                            </tr>
                            <tr>
                                <th scope="row">지방의회</th>
                                <td>
                                    <div class="box01">
                                        <h3>광역시도의회</h3>
                                        <span class="chk01"><input type="checkbox" id="chk04" /><label for="chk04">전체</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk05" /><label for="chk05">서울특별시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk06" /><label for="chk06">부산광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk07" /><label for="chk07">대구광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk08" /><label for="chk08">인천광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk09" /><label for="chk09">광주광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk10" /><label for="chk10">대전광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk11" /><label for="chk11">울산광역시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk12" /><label for="chk12">세종특별시자치시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk13" /><label for="chk13">경기도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk14" /><label for="chk14">강원도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk15" /><label for="chk15">충청북도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk16" /><label for="chk16">충청남도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk17" /><label for="chk17">전라남도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk18" /><label for="chk18">경상북도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk19" /><label for="chk19">경산마도의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk20" /><label for="chk20">제주특별자치도의회</label></span>
                                    </div>
                                    <div class="box01">
                                        <h3>광역시도의회</h3>
                                        <span class="chk01"><input type="checkbox" id="chk21" /><label for="chk21">전체</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk22" /><label for="chk22">경기도 부천시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk23" /><label for="chk23">경기도 하남시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk24" /><label for="chk24">강원도 강릉시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk25" /><label for="chk25">충청북도 청주시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk26" /><label for="chk26">충청남도 서산시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk27" /><label for="chk27">전라북도 정읍시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk28" /><label for="chk28">전라남도 순천시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk29" /><label for="chk29">경상북도 상주시의회</label></span>
                                        <span class="chk01"><input type="checkbox" id="chk30" /><label for="chk30">경상남도 거제시의회</label></span>
            <span class="chk01"><input type="checkbox" id="chk31" /><label for="chk31">경상남도 김해시의회
</label></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">&nbsp;</th>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                        <div class="btn">
                            <a href="#">저장</a>
                        </div>



                    </div>
                </div>
            </div>
        </div>


        <div class="savePop">
            <p>변경된 내용으로<br />저장하시겠습니까?</p>
            <div class="btnSet">
                <a href="#">예</a><a href="#">아니오</a>
            </div>
        </div>


    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            //달력 소스(jQuery UI)
            $(function () {
                $("#datepicker1, #datepicker2").datepicker({
                    //달력 아이콘
                    showOn: "button",
                    buttonImage: "img/btn/calendar.gif",
                    buttonImageOnly: true,
                    buttonText: "Select date",

                    //한글버전
                    dateFormat: 'yy-mm-dd',
                    prevText: '이전 달',
                    nextText: '다음 달',
                    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    showMonthAfterYear: true,
                    yearSuffix: '년'
                });

                var $records = $('#json-records'),
                        myRecords = JSON.parse($records.text());

                $('#myTable4').dynatable({
                    dataset: {
                        records: myRecords
                    }
                });


            });
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>