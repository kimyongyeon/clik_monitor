/*
 * Monthly Report 페이지(report.jsp)에서 쓰이는 js
*/

/* ********************************************************
 * 월 변경 검색
 ******************************************************** */
function searchMainStatistics(){
	$('#main-form').submit();
}

$(document).ready(function() {
	makeTitlePanel($("#title"), '', '');
	
	// Top10앱, 급상승앱, 플래닛앱vs경쟁앱 의 탭 기능
	$("#top10GameTab  a:first").tab('show');
	$("#jumpGameTab  a:first").tab('show');
	$("#top10AppTab  a:first").tab('show');
	$("#jumpAppTab  a:first").tab('show');	
	$("#top10AppDiv").hide();
	$("#jumpAppDiv").hide();
	$("#compareAppTab  a:first").tab('show');
	
	// 월 달력
	$("#calendar").datepicker({
		dateFormat: 'yy년 mm월',
	    changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
	    maxDate: '-1m',
	    minDate: new Date(2013, 10, 1),
	    closeText : "선택",
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showMonthAfterYear: true,
	    showOtherMonths: true,
	    selectOtherMonths: true, 
	    onClose: function(dateText, inst){
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
			$(this).datepicker('setDate', new Date(year, month, 1));
			var strd_ym = d3.time.format('%Y%m')(new Date(year, month, 1));
			$('#searchYM').val(strd_ym);
			searchMainStatistics();
		}
	});
});

/* ********************************************************
 * 카테고리탭을 클릭했을때의 액션
 ******************************************************** */
function clickCategoryTab(stat_type, strd_ym, ctg_cd, lcl_ctg_cd) {
//	setNewKeyEvent();
    $.ajax({
        url: "/searchMonthUserCount.do",
        type: "POST",
        dataType: "json",
        data: {"stat_type":stat_type, "strd_ym":strd_ym, "ctg_cd":ctg_cd, "lcl_ctg_cd":lcl_ctg_cd},
        success: function (data) {
        	if (stat_type == 'TOP10') {
            	int_prod_id_Top10.length = 0;
            	int_prod_nm_Top10.length = 0;
            	xValue_Top10.length = 0;
            	yValue_Top10.length = 0;
            	if (lcl_ctg_cd == 'DP01') $("#AddTop10Game tr").remove(); 
            	else $("#AddTop10App tr").remove();
            	
                $.map(data.statistics, function (item) {
                	if (strd_ym == item.strd_ym) {
                		var name = item.int_prod_nm;
                		var ctg_nm = item.ctg_nm;
                		var user_cnt = item.user_cnt_cur;
                        var contents = '';
                        contents += '<tr  style="cursor:pointer;" onclick="javascript:clickRow(\'' + stat_type + '\', \'' + strd_ym + '\',\'' + item.int_prod_id  + '\'); return false;">';
                        contents +=     '<td>'+ name + '</td>';
                        contents +=     '<td>'+ ctg_nm + '</td>';
    					contents +=     '<td style="text-align: right">' + addComma(user_cnt) + '</td>';
    					contents += '</tr>';
    					
                    	if (lcl_ctg_cd == 'DP01') {
    	                	$("#AddTop10Game").append(contents);
                    	} else {
    	                	$("#AddTop10App").append(contents);
                    	}
                    	
                	}
                	
                	int_prod_id_Top10.push(item.int_prod_id);
                	int_prod_nm_Top10.push(limitCharacters(item.int_prod_nm,8));
                	xValue_Top10.push(item.strd_ym);
                	yValue_Top10.push(item.user_cnt_cur);
                });
            	if (lcl_ctg_cd == 'DP01') {
            		$("#top10GameDiv").show();
            		$("#top10AppDiv").hide();            		
            	} else {
            		$("#top10GameDiv").hide();
            		$("#top10AppDiv").show();            		
            	}
            	
                redrawTop10Chart();
        	} else {
            	int_prod_id_Jump.length = 0;
            	int_prod_nm_Jump.length = 0;
            	xValue_Jump.length = 0;
            	yValue_Jump.length = 0;
            	if (lcl_ctg_cd == 'DP01') $("#AddJumpGame tr").remove(); 
            	else $("#AddJumpApp tr").remove(); 
            	var name = 'JUMP';
                $.map(data.statistics, function (item) {
                	if (name != item.int_prod_id) {
                		name = item.int_prod_id;
                		var ctg_nm = item.ctg_nm;
                		var slope_value = item.slope_value;                		
	                    var contents = '';
	                    contents += '<tr style="cursor:pointer;" onclick="javascript:clickRow(\'' + stat_type + '\', \'' + strd_ym + '\',\'' + item.int_prod_id  + '\'); return false;">';
                        contents +=     '<td>'+ item.int_prod_nm + '</td>';
                        contents +=     '<td>'+ ctg_nm + '</td>';
    					contents +=     '<td style="text-align: right">' + addComma(slope_value) + '</td>';
						contents += '</tr>';
						
	                	if (lcl_ctg_cd == 'DP01') $("#AddJumpGame").append(contents);
	                	else $("#AddJumpApp").append(contents);            		
                	}
                	int_prod_id_Jump.push(item.int_prod_id);
                	int_prod_nm_Jump.push(limitCharacters(item.int_prod_nm,8));
                	xValue_Jump.push(item.strd_dt);
                	yValue_Jump.push(item.user_cnt);
                });
            	if (lcl_ctg_cd == 'DP01') {
            		$("#jumpGameDiv").show();
            		$("#jumpAppDiv").hide();            		
            	} else {
            		$("#jumpGameDiv").hide();
            		$("#jumpAppDiv").show();      		
            	}                
                
                redrawJumpChart();
        	}
//        	setOldKeyEvent();
        	
//            alert('[ajax]=========' + data.statistics.length);
/* 			alert('[ajax]=========' + JSON.stringify(int_prod_id_Top10));
            alert('[ajax]=========' + JSON.stringify(xValue_Top10));
            alert('[ajax]=========' + JSON.stringify(yValue_Top10));
*/           
        }
    });
}

/* ********************************************************
 * Top10 앱, 급상승 앱의 테이블 Row를 클릭했을 때 액션
 ******************************************************** */
function clickRow(stat_type, strd_ym, search_id) {
/*	
    $.ajax({
        url: "/searchMonthProdUserCount.do",
        type: "POST",
        dataType: "json",
        data: {"stat_type":stat_type, "strd_ym":strd_ym, "int_prod_id":search_id},
        success: function (data) {
        	if (stat_type == 'TOP10') {
            	int_prod_id_Top10.length = 0;
            	xValue_Top10.length = 0;
            	yValue_Top10.length = 0;
            	int_prod_nm_Top10.length = 0;
                $.map(data.statistics, function (item) {
                	int_prod_id_Top10.push(item.int_prod_id);
                	int_prod_nm_Top10.push(item.int_prod_nm);
                	xValue_Top10.push(item.strd_ym);
                	yValue_Top10.push(item.user_cnt_cur);
                });
                redrawTop10Chart();
        	} else {
            	int_prod_id_Jump.length = 0;
            	int_prod_nm_Jump.length = 0;
            	xValue_Jump.length = 0;
            	yValue_Jump.length = 0;
                $.map(data.statistics, function (item) {
                	int_prod_id_Jump.push(item.int_prod_id);
                	int_prod_nm_Jump.push(item.int_prod_nm);
                	xValue_Jump.push(item.strd_dt);
                	yValue_Jump.push(item.user_cnt);
                });
                redrawJumpChart();
        	}          
        }
    });
*/
	location.href="/detail.do?searchProdId="+ search_id;
}

var topK = 10
	,key_category_id = []
	,key_category_nm = []
	,key_lcl_ctg_cd=[]
	,key_category_user_cnt = []
	,xValue_category = []
	,yValue_category = []
	,int_prod_id_Top10 = []
	,int_prod_nm_Top10 = []
	,xValue_Top10 = []
	,yValue_Top10 = []
	,yValueMax_Top10 = 0
	,int_prod_id_Jump = []
	,int_prod_nm_Jump = []
	,xValue_Jump = []
	,yValue_Jump = []
    ,yValueMax_Jump = 0;

/* ********************************************************
 * 조회 년월 리턴
 ******************************************************** */
function getStrd_ym () {
	return $('#strd_ym').attr('value');
}

/* ********************************************************
 * 중카테고리별 사용행태 JSON 데이터
 ******************************************************** */
function categoryData() {
	var dataSet=[],
		shapes = ['circle'/*, 'cross', 'triangle-up', 'triangle-down', 'diamond'*/, 'square'];
 	for (var i = 0; i < key_category_id.length; i++) {
 		var xvalue = parseFloat(xValue_category[i]);
 		var yvalue = parseFloat(yValue_category[i]);
 		if (key_lcl_ctg_cd[i] == 'DP01') var categoryShape = shapes[0];
 		else categoryShape = shapes[1];
		var data = [{
			x: xvalue,
			y: yvalue,
			ctg_cd: key_category_id[i],
			lcl_ctg_cd: key_lcl_ctg_cd[i],
			user_cnt: key_category_user_cnt[i],
			size: key_category_user_cnt[i]/2,//Math.pow(xvalue,10),
			shape: categoryShape
//			shape: shapes[i % 6]
		}];		
		dataSet.push({
	    	key: key_category_nm[i],
	      	values: data
	    });
	}	

	return dataSet;
}

/* ********************************************************
 * Top10 앱 JSON 데이터
 ******************************************************** */
function top10Data() {
/*	alert(JSON.stringify(int_prod_id_Top10));
    alert(JSON.stringify(xValue_Top10));
    alert(JSON.stringify(yValue_Top10));
*/	
//	yValueMax_Top10 = parseInt(Math.max.apply(Math,yValue_Top10));
	
	var dataSet=[],
    	dataArray = [],
    	nameArray = [];

    for (var c = 0; c < topK; c++) {
    	dataArray[c] =  new Array();
    }
	var cnt=-1;
    var name = '';
 	for (var i = 0; i < int_prod_id_Top10.length; i++) {
 		var dateformatXValue = new Date(parseInt(xValue_Top10[i].substring(0,4)),parseInt(xValue_Top10[i].substring(4,6))-1,1);
 		var intformatYValue = parseInt(yValue_Top10[i]);
		if (name != int_prod_id_Top10[i]) {
			cnt++;
			name = int_prod_id_Top10[i];
			nameArray.push(int_prod_nm_Top10[i]);
		}
 		dataArray[cnt].push({
			x: dateformatXValue,
			y: intformatYValue
		});		
 	}
 	for (var i = 0; i < nameArray.length; i++) {
	 	dataSet.push({
		    key: nameArray[i],
		    values: dataArray[i]
		});
 	}
// 	alert(JSON.stringify(dataSet));
	return dataSet;
}

/* ********************************************************
 * 급상승 앱 Max
 ******************************************************** */
function jumpMaxValue() {
	return Math.max.apply(Math,yValue_Top10);
}

/* ********************************************************
 * 급상승 앱 JSON 데이터
 ******************************************************** */
function jumpData() {
/*	alert(JSON.stringify(int_prod_id_Jump));
    alert(JSON.stringify(xValue_Jump));
    alert(JSON.stringify(yValue_Jump));
*/	
//	yValueMax_Jump = parseInt(Math.max.apply(Math,yValue_Jump));
	
	var dataSet=[],
    	dataArray = [],
    	nameArray = [];

    for (var c = 0; c < topK; c++) {
    	dataArray[c] =  new Array();
    }
	var cnt=-1;
    var name = '';
 	for (var i = 0; i < int_prod_id_Jump.length; i++) {
 		var dateformatXValue = new Date(parseInt(xValue_Jump[i].substring(0,4)),parseInt(xValue_Jump[i].substring(4,6))-1,parseInt(xValue_Jump[i].substring(6,8)));
 		var intformatYValue = parseInt(yValue_Jump[i]);
		if (name != int_prod_id_Jump[i]) {
			cnt++;
			name = int_prod_id_Jump[i];
			nameArray.push(int_prod_nm_Jump[i]);
		}
 		dataArray[cnt].push({
			x: dateformatXValue,
			y: intformatYValue
		});
 	}
 	for (var i = 0; i < nameArray.length; i++) {
	 	dataSet.push({
		    key: nameArray[i],
		    values: dataArray[i]
		});
 	}
	return dataSet;
}

var skpCompetitionCnt = 1,
	app_id_Compare = [],
	app_nm_Compare = [],
	xValue_Compare = [],
	yValue_Compare = [],
	yValue_Compare_max = 0;

/* ********************************************************
 * 플래닛 앱 vs 경쟁 앱 JSON 데이터
 ******************************************************** */
function compareData() {
/*	alert(JSON.stringify(app_id_Compare));
    alert(JSON.stringify(app_nm_Compare));
    alert(JSON.stringify(xValue_Compare));
    alert(JSON.stringify(yValue_Compare));
*/	
	if (yValue_Compare.length > 0) yValue_Compare_max = parseInt(Math.max.apply(Math,yValue_Compare));

	var dataSet=[],
    	dataArray = [],
    	nameArray = [];

    for (var c = 0; c < skpCompetitionCnt; c++) {
    	dataArray[c] =  new Array();
    }
	var cnt=-1;
    var name = '';
 	for (var i = 0; i < app_id_Compare.length; i++) {
 		var dateformatXValue = new Date(parseInt(xValue_Compare[i].substring(0,4)),parseInt(xValue_Compare[i].substring(4,6))-1,parseInt(xValue_Compare[i].substring(6,8)));
 		var intformatYValue = parseInt(yValue_Compare[i]);
		if (name != app_id_Compare[i]) {
			cnt++;
			name = app_id_Compare[i];
			nameArray.push(app_nm_Compare[i]);
		}
 		dataArray[cnt].push({
			x: dateformatXValue,
			y: intformatYValue
		});
 	}
 	for (var i = 0; i < nameArray.length; i++) {
	 	dataSet.push({
		    key: nameArray[i],
		    values: dataArray[i]
		});
 	}
	return dataSet;
}

/* ********************************************************
 * 중카테고리별 사용행태
 ******************************************************** */
function searchCategoryUse(strd_ym, skp_bm_cd) {
    $.ajax({
        url: "/searchCategoryUse.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym},
        success: function (data) {    	
            key_category_id.length = 0;
            key_category_nm.length = 0;
            key_lcl_ctg_cd.length = 0;
            key_category_user_cnt.length = 0;
            xValue_category.length = 0;
            yValue_category.length = 0;
            
            $.map(data.statistics, function (item) {
            	key_category_id.push(item.ctg_cd);
            	key_category_nm.push(item.ctg_nm);
            	key_lcl_ctg_cd.push(item.lcl_ctg_cd);
            	key_category_user_cnt.push(item.user_cnt_cur);
                var app_exec_cnt_avg = item.app_exec_cnt_avg;
                var app_exec_tm_avg = item.app_exec_tm_avg;
            	xValue_category.push(Math.log(parseFloat(app_exec_cnt_avg)));
            	yValue_category.push(Math.log(parseFloat(app_exec_tm_avg)));	
            });
            redrawCategoryChart();
/*            alert('[ajax]=========' + JSON.stringify(xValue_category));
            alert('[ajax]=========' + JSON.stringify(yValue_category));*/
        }
    });
}

/* ********************************************************
 * 플래닛 앱 vs 경쟁 앱 에서 탭 클릭 액션
 ******************************************************** */
function clickCompareTab(strd_ym, skp_bm_cd) {
    $.ajax({
        url: "/searchSkpCompetitionUserCount.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "skp_bm_cd":skp_bm_cd},
        success: function (data) {
        		app_id_Compare.length = 0;
        		app_nm_Compare.length = 0;
        		xValue_Compare.length = 0;
        		yValue_Compare.length = 0;
        		skpCompetitionCnt = data.skpCompetitionCnt;
                $.map(data.skpCompetitionStat, function (item) {
                	app_id_Compare.push(item.int_prod_id);
                	app_nm_Compare.push(limitCharacters(item.prod_nm,12));
                	xValue_Compare.push(item.strd_dt);
                	yValue_Compare.push(item.user_cnt);
                });
                redrawCompareChart();
//          alert('[ajax]=========' + data.statistics.length);
/* 			alert('[ajax]=========' + JSON.stringify(app_nm_Compare));
            alert('[ajax]=========' + JSON.stringify(xValue_Compare));
            alert('[ajax]=========' + JSON.stringify(yValue_Compare));
*/           
        }
    });
}
