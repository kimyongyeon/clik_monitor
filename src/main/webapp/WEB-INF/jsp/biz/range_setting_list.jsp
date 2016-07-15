<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <div id="json-records">
            [
            {
            "의회": "광역의회",
            "지방의회": "&lta href=/range_setting_edit&gt서울특별시&lt/&gt",
            "응답시간": "10",
            "요청 처리율": "234",
            "최종 수정일": "1000"
            },
            {
            "의회": "뉴욕의회",
            "지방의회": "뉴욕",
            "응답시간": "10",
            "요청 처리율": "234",
            "최종 수정일": "1000"
            }
            ]
        </div>

        <div id="container">

            <div id="subRightBox">
                <div class="titleArea">
                    <h2>임계값 설정</h2>
                    <div class="location">
                        <ul>
                            <li><a href="#">home</a></li>
                            <li> > </li>
                            <li class="end"><a href="#">임계값 설정</a></li>
                        </ul>
                    </div>
                </div>
                <div class="topTable">
                    <table class="table01">
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
                        <tr>
                            <th scope="row">최종 수정일</th>
                            <td>
                                <span class="calendar01"><input type="text" id="datepicker1" /></span><span class="pado">~</span>
                                <span class="calendar01"><input type="text" id="datepicker2" /></span>

                                <span class="calendarBtn"><input type="button" value="당일" /><input type="button" value="1주일" /><input type="button" value="1개월" /></span>
                            </td>
                        </tr>
                    </table>
                    <div class="btn">
                        <a href="#">검색</a>
                    </div>
                </div>
                <div class="bottomTable">
                    <div class="tab03Box">
                        <div class="inputCount">
                            <div class="selectBox">
                                <div class="btnExcelSave"><a href="#">엑셀 저장</a></div>
                            </div>
                        </div>
                        <table id="myTable3" class="listTable01">
                            <thead>
                            <tr>
                                <th scope="col">의회</th>
                                <th scope="col">지방의회</th>
                                <th scope="col">응답시간</th>
                                <th scope="col">요청 처리율</th>
                                <th scope="col">최종 수정일</th>
                            </tr>
                            </thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <div class="writeBtn"><a href="#" onclick="page_go('range_setting_reg');">등록</a></div>
                    </div>
                </div>
            </div>
        </div>


    </tiles:putAttribute>
    <tiles:putAttribute name="javascript.footer">

        <script type="text/javascript">
            //달력 소스(jQuery UI)
            $(document).ready(function () {
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

                $('#myTable3').dynatable({
                    dataset:
                    {
                        records: myRecords,
                    }
                });

                // Toggle child row content (td), not hiding the row since we are using rowspan
                // Using delegate because the pager plugin rebuilds the table after each page change
                // "delegate" works in jQuery 1.4.2+; use "live" back to v1.3; for older jQuery - SOL
                $('#myTable3').delegate('.toggle', 'click' ,function(){
                    alert("1");
                    // use "nextUntil" to toggle multiple child rows
                    // toggle table cells instead of the row
                    $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').find('td').toggle();
                    // in v2.5.12, the parent row now has the class tablesorter-hasChildRow
                    // so you can use this code as well
                    // $(this).closest('tr').nextUntil('tr.tablesorter-hasChildRow').find('td').toggle();

                    return false;
                });

            });
        </script>

    </tiles:putAttribute>

</tiles:insertDefinition>