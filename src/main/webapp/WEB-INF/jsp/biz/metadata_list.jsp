<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="json-records">
            [
            {
            "의회": "광역의회",
            "지역": "서울특별시",
            "사이트ID": "10",
            "사이트명": "234",
            "사이트URL": "1000",
            "자료유형": "출장보고서",
            "게시판ID": "765",
            "게시판명": "한국게시판",
            "게시판 URL":"http://www.naver.com",
            "최종등록일":"2016"

            },
            {
            "의회": "광역의회",
            "지역": "뉴욕",
            "사이트ID": "2000",
            "사이트명": "56465",
            "사이트URL": "506540",
            "자료유형": "출장보고서",
            "게시판ID": "12",
            "게시판명": "뉴욕게시판",
            "게시판 URL":"http://www.naver.com",
            "최종등록일":"2016"
            }
            ]
        </div>

        <div id="container">

            <div id="subRightBox">
                <div class="titleArea">
                    <h2>메타데이터 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="#">home</a></li>
                            <li> > </li>
                            <li class="end"><a href="#">메타데이터 관리</a></li>
                        </ul>
                    </div>
                </div>
                <div class="topTable">
                    <table class="table04">
                        <colgroup>
                            <col style="width:10%;" />
                            <col style="width:50%;" />
                            <col style="width:10%;" />
                            <col style="width:30%;" />
                        </colgroup>
                        <tr>
                            <th scope="row">게시판명</th>
                            <td>
                                <div class="selectBox">
                                    <div class="select01">
                                        <select name="select01" class="select01">
                                            <option value="">전체</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div class="select02">
                                        <select name="select02" class="select02">
                                            <option value="">지역선택</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div class="select03">
                                        <select name="select03" class="select03">
                                            <option value="">지방의회선택</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <th scope="row">자료유형</th>
                            <td>
                                <div class="selectBox">
                                    <div class="select04">
                                        <select name="select01" class="select01">
                                            <option value="">전체</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">최종 등록일</th>
                            <td colspan="3">
                                <span class="calendar01"><input type="text" id="datepicker1" /></span><span class="pado">~</span>
                                <span class="calendar01"><input type="text" id="datepicker2" /></span>

                                <span class="calendarBtn"><input type="button" value="당일" /><input type="button" value="1주일" /><input type="button" value="1개월" /></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">검색항목</th>
                            <td colspan="3">
                                <div class="selectBox">
                                    <div class="select05">
                                        <select name="select01" class="select01">
                                            <option value="">전체</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div class="inputTxt"><input type="text" id="Text1" title="검색항목 입력" /></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="btn">
                        <a href="#">검색</a>
                    </div>
                </div>
                <div class="bottomTable">
                    <div class="tab06Box">
                        <div class="inputCount">
                            <div class="selectBox">
                                <div class="btnExcelSave"><a href="#">엑셀 저장</a></div>
                            </div>
                        </div>
                        <table class="listTable01" id="myTable4">
                            <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">지역</th>
                                <th scope="col">사이트ID</th>
                                <th scope="col">사이트명</th>
                                <th scope="col">사이트URL</th>
                                <th scope="col">자료유형</th>
                                <th scope="col">게시판 ID</th>
                                <th scope="col">게시판명</th>
                                <th scope="col">게시판 URL</th>
                                <th scope="col">최종 등록일</th>
                            </tr>
                            </thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <div class="writeBtn"><a href="#">등록</a></div>
                    </div>
                </div>
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