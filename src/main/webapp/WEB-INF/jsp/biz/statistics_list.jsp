<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="json-records">
            [
            {
            "의회": "광역의회",
            "지방의회": "서울특별시",
            "대수": "10",
            "회기": "234",
            "선거구": "1,000",
            "회의명": "2,000",
            "의원": "10",
            "의원활동": "10",
            "의원직위": "10",
            "회의록": "10",
            "안건": "10",
            "발언": "10",
            "발언답변": "10",
            "부록": "10",
            "의안정보": "10",
            "발의의원": "10",
            "의안파일": "10",
            "의안회의록": "10"
            },
            {
            "의회": "뉴욕의회",
            "지방의회": "뉴욕",
            "대수": "10",
            "회기": "111",
            "선거구": "1,000",
            "회의명": "2,000",
            "의원": "10",
            "의원활동": "10",
            "의원직위": "10",
            "회의록": "10",
            "안건": "10",
            "발언": "10",
            "발언답변": "10",
            "부록": "10",
            "의안정보": "10",
            "발의의원": "10",
            "의안파일": "10",
            "의안회의록": "10"
            }

            ]
        </div>
        <div id="json-records2">
            [
            {
            "의회": "광역의회",
            "지방의회": "서울특별시",
            "회의록 최종일자": "2016.05.10",
            "안건 최종일자": "2016.05.10",
            "발언 최종일자": "2016.05.10",
            "발언답변 최종일자": "2016.05.10",
            "부록 최종일자": "2016.05.10",
            "의안 최종일자": "2016.05.10"
            },
            {
            "의회": "뉴욕의회",
            "지방의회": "뉴욕",
            "회의록 최종일자": "2015.05.10",
            "안건 최종일자": "2015.05.10",
            "발언 최종일자": "2015.05.10",
            "발언답변 최종일자": "2015.05.10",
            "부록 최종일자": "2015.05.10",
            "의안 최종일자": "2015.05.10"
            }
            ]
        </div>

        <div id="container">

            <div id="subRightBox">
                <div class="titleArea">
                    <h2>통계 관리</h2>
                    <div class="location">
                        <ul>
                            <li><a href="#">home</a></li>
                            <li>></li>
                            <li><a href="#">통계 관리</a></li>
                            <li>></li>
                            <li class="end"><a href="#">의회별 전송 데이터</a></li>
                        </ul>
                    </div>
                </div>
                <div class="topTable">
                    <div class="adminTab01">
                        <ul>
                            <li class="listTab01"><a href="#">의회별 전송 데이터</a></li>
                            <li class="listTab02"><a href="#">항목별 최종전송 데이터</a></li>
                        </ul>
                    </div>
                    <table class="table02">
                        <tr>
                            <th scope="row">지방의회</th>
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
                        </tr>
                    </table>
                    <div class="btnSearch">
                        <a href="#">검색</a>
                    </div>
                </div>
                <div class="BottomTable">
                    <div class="tab01Box">
                        <div class="btnExcelSave"><a href="#">엑셀 저장</a></div>
                        <table id="myTable" class="listTable01">
                            <thead>
                            <tr>
                                <th scope="col">의회</th>
                                <th scope="col">지방의회</th>
                                <th scope="col">대수</th>
                                <th scope="col">회기</th>
                                <th scope="col">선거구</th>
                                <th scope="col">회의명</th>
                                <th scope="col">의원</th>
                                <th scope="col">의원활동</th>
                                <th scope="col">의원직위</th>
                                <th scope="col">회의록</th>
                                <th scope="col">안건</th>
                                <th scope="col">발언</th>
                                <th scope="col">발언답변</th>
                                <th scope="col">부록</th>
                                <th scope="col">의안정보</th>
                                <th scope="col">발의의원</th>
                                <th scope="col">의안파일</th>
                                <th scope="col">의안회의록</th>
                            </tr>
                            </thead>
                            <tr>
                                <td class="tableTxtAlign"></td>
                                <td class="tableTxtAlign"></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                                <td><span class="count"></span></td>
                            </tr>
                        </table>
                    </div>
                    <div class="tab02Box">
                        <div class="btnExcelSave"><a href="#">엑셀 저장</a></div>
                        <table id="myTable2" class="listTable01">
                            <thead>
                            <tr>
                                <th scope="col">의회</th>
                                <th scope="col">지방의회</th>
                                <th scope="col">회의록 최종일자</th>
                                <th scope="col">안건 최종일자</th>
                                <th scope="col">발언 최종일자</th>
                                <th scope="col">발언답변 최종일자</th>
                                <th scope="col">부록 최종일자</th>
                                <th scope="col">의안 최종일자</th>
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
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </tiles:putAttribute>
<tiles:putAttribute name="javascript.footer">

    <script type="text/javascript">
        $(document).ready(function () {

            var $records = $('#json-records'),
                    myRecords = JSON.parse($records.text());

            $('#myTable').dynatable({
                dataset: {
                    records: myRecords
                }
            });


            var $recordsTab02 = $('#json-records2'),
                    myRecords2 = JSON.parse($recordsTab02.text());

            $('#myTable2').dynatable({
                dataset: {
                    records: myRecords2
                }
            });
        });
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>