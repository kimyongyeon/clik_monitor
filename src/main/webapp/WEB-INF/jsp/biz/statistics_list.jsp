<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/directive.jsp" %>
<tiles:insertDefinition name="header.layout">
    <tiles:putAttribute name="content">

        <!-- template engine start -->
        <script id="brtc_code-template" type="text/x-handlebars-template">
            <select name="brtc_code" class="select02" onchange="fn_ajax_loasm_code_list()">
                <option value="">지역선택</option>
                {{#commonList}}
                <option value="{{code}}">{{codenm}}</option>
                {{/commonList}}
            </select>
        </script>
        <script id="loasm_code-template" type="text/x-handlebars-template">
            <select name="loasm_code" class="select03">
                <option value="">지방의회선택</option>
                {{#commonList}}
                <option value="{{code}}">{{codenm}}</option>
                {{/commonList}}
            </select>
        </script>
        <!-- template engine end -->

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
                                        <select name="brtcCode" class="select01" onchange="fn_ajax_brtc_code_list()">
                                            <option value="">기관유형 선택</option>
                                            <option value="intsttcl_000023">광역의회</option>
                                            <option value="intsttcl_000024">기초의회</option>
                                        </select>
                                    </div>
                                    <div class="select02" id="brtc_code_div">
                                        <select name="insttClCode" class="select02">
                                            <option value="">지역선택</option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div class="select03" id="loasm_code_div">
                                        <select name="loasm_code" class="select03">
                                            <option value="">지방의회선택</option>
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
                                <th data-dynatable-sorts="Computer Year" scope="col">의회</th>
                                <th scope="col" style="width:250px;">지방의회</th>
                                <th style="display: none">rasmblyNmNo</th>
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

            // 의회별 전송 데이터
            fn_ajax_tab1_list();

            var $recordsTab02 = $('#json-records2'), myRecords2 = JSON.parse($recordsTab02.text());

            $('#myTable2').dynatable({
                dataset: {
                    records: myRecords2
                }
            });

        });

        // 의회별전송데이터
        function fn_ajax_tab1_list() {

            var url = "getTabList1.do";
            var brtcCode = $('select[name=brtcCode] option:selected').val();

            $.ajax({
                url: url,
                type: 'GET',
                dataTye: 'json',
                contentType:"application/json; charset=utf-8",
                data: {brtcCode:brtcCode},
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    var myRecords = [];
                    for(var i=0; i<data.length; i++) {
                        myRecords.push(
                                {
                                    "의회": data[i]['subRasmblyNm'],
                                    "지방의회": data[i]['rasmblyNm'],
                                    "대수": data[i]['numprCount'],
                                    "회기": data[i]['sesnCount'],
                                    "선거구": data[i]['estCount'],
                                    "회의명": data[i]['mtgnmCount'],
                                    "의원": data[i]['asembyCount'],
                                    "의원활동": data[i]['asembyactCount'],
                                    "의원직위": data[i]['ofcpsCount'],
                                    "회의록": data[i]['mintsCount'],
                                    "안건": data[i]['mtrCount'],
                                    "발언": data[i]['spkngCount'],
                                    "발언답변": data[i]['numprCount'],
                                    "부록": data[i]['apndxCount'],
                                    "의안정보": data[i]['asembyCount'],
                                    "발의의원": data[i]['itncasembyCount'],
                                    "의안파일": data[i]['bifileCount'],
                                    "의안회의록": data[i]['bimintsCount'],
                                    "rasmblyNmNo": data[i]['rasmblyNmNo']
                                }
                        );
                    }

                    $('#myTable').dynatable({
                        dataset: {
                            records: myRecords
                        },
                        features: {
                            paginate: true,
                            sort: true,
                            pushState: true,
                            search: false,
                            recordCount: false,
                            perPageSelect: true
                        },
                        inputs: {
                            page: null,
                            recordCountTarget: null,
                            recordCountPlacement: 'after',
                            paginationLinkTarget: null,
                            paginationLinkPlacement: 'after',
                            paginationPrev: '이전',
                            paginationNext: '다음',
                            paginationGap: [1,2,2,1],
                            searchTarget: null,
                            searchPlacement: 'before',
                            perPageTarget: null,
                            perPagePlacement: 'before',
                            perPageText: '한페이지당 개수: ',
                            recordCountText: '전체 ',
                            processingText: 'Processing...'
                        },
                    });
                    var dynatable = $('#myTable').data('dynatable');
                    dynatable.paginationPerPage.set(20); // Show 20 records per page
                    dynatable.paginationPage.set(1); // Go to page 5
                    dynatable.process();
                    dynatable.dom.update();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                },
                statusCode: {
                    404: function() {
                        alert("[url: " + url + "]  page not found");
                    }
                }
            });
        }

//        $('#myTable').bind('dynatable:init', function(e, dynatable) {
//
//            $('#myTable').click( function(e) {
//                // Clear any existing sorts
//                dynatable.sorts.clear();
//                dynatable.sorts.add('지방의회', 1) // 1=ASCENDING, -1=DESCENDING
//                dynatable.process();
//                e.preventDefault();
//            });
//
//            $('#myTable').click( function(e) {
//                dynatable.sorts.clear();
//                dynatable.process();
//                e.preventDefault()
//            });
//        });

        // 지역선택
        function fn_ajax_brtc_code_list() {

            var url = "getBrtcCodeDetailsList.do";
            var brtcCode = $('select[name=brtcCode] option:selected').val();
            $.ajax({
                url: url,
                type: 'GET',
                dataTye: 'json',
                contentType:"application/json; charset=utf-8",
                data: {brtcCode:brtcCode},
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    var commonList ={commonList:data};
                    var htmlText = getHtmlText("brtc_code-template",commonList);
                    $("#brtc_code_div").html(htmlText(commonList));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                },
                statusCode: {
                    404: function() {
                        alert("[url: " + url + "]  page not found");
                    }
                }
            });
        }

        // 의회명
        function fn_ajax_loasm_code_list() {

            var url = "getLoasmInfo.do";
            var brtcCode = $('select[name=brtcCode] option:selected').val();
            var insttClCode = $('select[name=insttClCode] option:selected').val();

            $.ajax({
                url: url,
                type: 'GET',
                dataTye: 'json',
                contentType:"application/json; charset=utf-8",
                data: {brtcCode:brtcCode, insttClCode:insttClCode},
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    var commonList ={commonList:data};
                    var htmlText = getHtmlText("loasm_code-template",commonList);
                    $("#loasm_code_div").html(htmlText(commonList));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                },
                statusCode: {
                    404: function() {
                        alert("[url: " + url + "]  page not found");
                    }
                }
            });
        }
    </script>

</tiles:putAttribute>

</tiles:insertDefinition>