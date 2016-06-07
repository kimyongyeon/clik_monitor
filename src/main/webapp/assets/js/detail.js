/*
 * 앱상세 페이지(detail.jsp)에서 쓰이는 js
*/

$(document).ready(function() {
	// 앱 이용현황에서 디폴트 기준을 일로
	$(':input:checked').parent('.btn').addClass('active');
		
	// 앱 이용현황에서 기준이 일 일때 From 달력
	$("#from").datepicker({
		dateFormat: 'yy-mm-dd',
	    defaultDate: "-90d",
	    maxDate: '+0m +0w',
	    changeMonth: true,
	    numberOfMonths: 3,
	    onClose: function( selectedDate ) {
	    	//90일 제한
//	    	if (selectedDate != "") $("#to").datepicker("option", "minDate", selectedDate).datepicker("option", "maxDate", afterDays(selectedDate));
	    	if (selectedDate != "") $("#to").datepicker("option", "minDate", selectedDate);
	    }
	});
	
	// 앱 이용현황에서 기준이 일 일때 To 달력
	$("#to").datepicker({
		dateFormat: 'yy-mm-dd',
	 	defaultDate: "-90d",
	 	maxDate: '+0m +0w',
	/*     	showOn: 'button',
			buttonImage: 'images/calendar.gif',
		buttonImageOnly: true, */
	    numberOfMonths: 3,
	    onClose: function( selectedDate ) {
	    	//90일 제한
//	    	if (selectedDate != "") $("#from").datepicker("option", "maxDate", selectedDate).datepicker("option", "minDate", beforeDays(selectedDate));
	    	if (selectedDate != "") $("#from").datepicker("option", "maxDate", selectedDate);
	    }
	});
	
	// 앱 이용현황에서 기준이 월 일때 From 달력
	$("#from_ym").datepicker({
		dateFormat: 'yy-mm',
	    changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
	    currentText: "이번달",
	    closeText : "선택",
	    maxDate: '+0m +0w',
	    defaultDate: "-6m",
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showMonthAfterYear: true,
	    showOtherMonths: true,
	    selectOtherMonths: true, 
	    onClose: function(dateText, inst){
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
			$(this).datepicker('setDate', new Date(year, month, 1));
		}
	});
	
	// 앱 이용현황에서 기준이 월 일때 To 달력
	$("#to_ym").datepicker({
		dateFormat: 'yy-mm',
	    changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
	    currentText: "이번달",
	    closeText : "선택",
	    maxDate: '+0m +0w',
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showMonthAfterYear: true,
	    showOtherMonths: true,
	    selectOtherMonths: true, 
	    onClose: function(dateText, inst){
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
			$(this).datepicker('setDate', new Date(year, month, 1));
		}
	});	    	

	// 앱 이용현황에서 일, 월 선택시 달력 기능
	$( "input[name='date_type']" ).change(function() {
		use_prod_date_type = $(this).val();
	    clickPeriod();
	    
	    if (use_prod_date_type == 'MONTHLY') {
	    	$('#priod_ym').show();
	    	$('#priod_dt').hide();
	    	$('.ui-datepicker-calendar').css('display','none');
	    } else {
	    	$('#priod_dt').show();
	    	$('#priod_ym').hide();
	    	$('.ui-datepicker-calendar').css('display','');
	    }
	});

	// 유사한 앱에서 유사도 지수 컨트롤 바 기능
	var select = $( "#max_dtw_distance" );
	var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({
		min: 0,
		max: 8,
		range: "min",
		value: select[ 0 ].selectedIndex,
		slide: function( event, ui ) {
			select[ 0 ].selectedIndex = ui.value;
		}
	});
	$( "#max_dtw_distance" ).change(function() {
		slider.slider( "value", this.selectedIndex);
		callSimilarity($("#strd_ym").val(), $("#searchItem").val(),$("#max_dtw_distance").val());
	});
    $("#slider").on("slidestop", function(event, ui) {
        callSimilarity($("#strd_ym").val(), $("#searchItem").val(),parseInt(ui.value)/10);
    });
    
    
    // 앱 상세 페이지에서 마켓 더보기 접어두기 기능 부분
	$('#toggle_pkg_nm_tstore').click(function() {
		if($('#plus_pkg_nm_tstore').css('display')=='none'){
			$('#plus_pkg_nm_tstore').show();
			$('#toggle_pkg_nm_tstore').val('접어두기');
		}else{
			$('#plus_pkg_nm_tstore').hide();
			$('#toggle_pkg_nm_tstore').val('더보기');
		}
	});
	
	$('#toggle_pkg_nm_google').click(function() {
		if($('#plus_pkg_nm_google').css('display')=='none'){
			$('#plus_pkg_nm_google').show();
			$('#toggle_pkg_nm_google').text('접어두기');
		}else{
			$('#plus_pkg_nm_google').hide();
			$('#toggle_pkg_nm_google').text('더보기');
		}
	}); 
	
	$('#toggle_pkg_nm_naver').click(function() {
		if($('#plus_pkg_nm_naver').css('display')=='none'){
			$('#plus_pkg_nm_naver').show();
			$('#toggle_pkg_nm_naver').text('접어두기');
		}else{
			$('#plus_pkg_nm_naver').hide();
			$('#toggle_pkg_nm_naver').text('더보기');
		}
	}); 	
});

/* ********************************************************
 * 엑셀 다운로드
 ******************************************************** */
function excelDownload(){
	var frm = document.getElementById("excel-form");
    frm.action="/excelDownload.do";
    frm.submit();
}

/* ********************************************************
 * 대카테고리내 랭킹
 ******************************************************** */
function searchLargeCategoryRanking(strd_ym, int_prod_id) {
    $.ajax({
        url: "/searchLargeCategoryRanking.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "int_prod_id":int_prod_id},
        success: function (data) {
        	var largeCtgRank = 0,
        	    largeCtgRankTotal = 0;
            $.map(data.statistics, function (item) {
                if (item.rank_cl_cd == 'P') largeCtgRank = parseInt(item.rank);
                else largeCtgRankTotal = parseInt(item.rank);
            });
            drawLargeRankChart(largeCtgRank, largeCtgRankTotal);
        }
    });
}

/* ********************************************************
 * 중카테고리내 랭킹
 ******************************************************** */
function searchCategoryRanking(strd_ym, int_prod_id) {
    $.ajax({
        url: "/searchCategoryRanking.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "int_prod_id":int_prod_id},
        success: function (data) {
        	var subCtgRank = 0,
        	subCtgRankTotal = 0;
            $.map(data.statistics, function (item) {
                if (item.rank_cl_cd == 'P') subCtgRank = parseInt(item.rank);
                else subCtgRankTotal = parseInt(item.rank);
            });
            drawRankChart(subCtgRank, subCtgRankTotal);
        }
    });
}

/* ********************************************************
 * 대카테고리내 랭킹 D3 차트
 ******************************************************** */
function drawLargeRankChart(largeCtgRank, largeCtgRankTotal) {
     radialProgress('#largeCtgPie')
	               .label("")
	              .diameter(200)
	               .minValue(0)
	               .maxValue(largeCtgRankTotal)
	               .value(largeCtgRank)
	               .render();
}

/* ********************************************************
 * 중카테고리내 랭킹 D3 차트
 ******************************************************** */
function drawRankChart(subCtgRank, subCtgRankTotal) {
     radialProgress2('#subCtgPie')
                   .label("")
                   .diameter(200)
                   .minValue(0)
                   .maxValue(subCtgRankTotal)
                   .value(subCtgRank)
                   .render();
}

var user_cnt_man,
user_cnt_woman,
user_cnt_etc,
user_cnt_0013,
user_cnt_1419,
user_cnt_2024,
user_cnt_2529,
user_cnt_3034,
user_cnt_3539,
user_cnt_4044,
user_cnt_4549,
user_cnt_5054,
user_cnt_5559,
user_cnt_6099,
user_cnt_T,
user_cnt_G,
user_cnt_N,
user_cnt_T_G,
user_cnt_G_N,
user_cnt_T_N,
user_cnt_TGN;


/* ********************************************************
 * 성연령 그래프 액션
 ******************************************************** */
function searchSexAgeMarket(strd_ym, int_prod_id) {
    $.ajax({
        url: "/searchSexAgeMarket.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "int_prod_id":int_prod_id},
        success: function (data) {
        	var man_per = parseInt(data.man_per),
        	woman_per = parseInt(data.woman_per);

        	setSexStatistics (man_per, woman_per);

        	user_cnt_0013=data.sexAgeMarket.user_cnt_0013;
        	user_cnt_1419=data.sexAgeMarket.user_cnt_1419;
        	user_cnt_2024=data.sexAgeMarket.user_cnt_2024;
        	user_cnt_2529=data.sexAgeMarket.user_cnt_2529;
        	user_cnt_3034=data.sexAgeMarket.user_cnt_3034;
        	user_cnt_3539=data.sexAgeMarket.user_cnt_3539;
        	user_cnt_4044=data.sexAgeMarket.user_cnt_4044;
        	user_cnt_4549=data.sexAgeMarket.user_cnt_4549;
        	user_cnt_5054=data.sexAgeMarket.user_cnt_5054;
        	user_cnt_5559=data.sexAgeMarket.user_cnt_5559;

        	
        	redrawAgeBarChart();
        }
    });
}

/* ********************************************************
 * 성 통계
 ******************************************************** */
function setSexStatistics (man_per, woman_per) {
	if (man_per > woman_per) {
	    $( ".resizeman" ).aeImageResize({ height: 250, width: 150 });
	    $( ".resizewoman" ).aeImageResize({ height: 150, width: 250 });
	    $("#manDiv").css('margin-top','0px');
	    $("#womanDiv").css('margin-top','100px');
	 } else if (man_per < woman_per) {
	    $( ".resizeman" ).aeImageResize({ height: 150, width: 150 });
	    $( ".resizewoman" ).aeImageResize({ height: 250, width: 150 });
	    $("#manDiv").css('margin-top','100px');
	    $("#womanDiv").css('margin-top','0px');   
	 } else {
	    $( ".resizeman" ).aeImageResize({ height: 250, width: 150 });
	    $( ".resizewoman" ).aeImageResize({ height: 250, width: 150 });
	    $("#manDiv").css('margin-top','0px');
	    $("#womanDiv").css('margin-top','0px');   
	 }
	$("#man_percent").text(man_per);
	$("#woman_percent").text(woman_per);
}

/* ********************************************************
 * DTW Distance Min 값 설정 시 액션
 ******************************************************** */
function callSimilarity(strd_ym, searchItem, max_dtw_distance) {
    $.ajax({
        url: "/searchSimilarity.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "searchItem":searchItem, "dtw_distance":max_dtw_distance},
        success: function (data) {	
        	similar_int_prod_id.length = 0;
        	similar_int_prod_nm.length = 0;
        	similar_weekday_nm.length = 0;
        	similar_seasonal_ind.length = 0;
        	
            $.map(data.statistics, function (item) {
            	similar_int_prod_id.push(item.int_prod_id);
            	similar_int_prod_nm.push(limitCharacters(item.prod_nm,20));
            	similar_weekday_nm.push(item.weekday_nm);
            	similar_seasonal_ind.push(item.seasonal_ind);
            });
            redrawSimilarChart();
            
/*            alert('[ajax]=========' + data.statistics.length);
 			alert('[ajax]=========' + JSON.stringify(similar_int_prod_id));
            alert('[ajax]=========' + JSON.stringify(similar_int_prod_nm));
            alert('[ajax]=========' + JSON.stringify(similar_weekday_nm));
            alert('[ajax]=========' + JSON.stringify(similar_seasonal_ind));*/
        }
    });
}

/* ********************************************************
 * DTW Distance Min 값 설정 시 액션
 ******************************************************** */
function startCallSimilarity(strd_ym, searchItem, max_dtw_distance) {
    $.ajax({
        url: "/searchSimilarity.do",
        type: "POST",
        dataType: "json",
        data: {"strd_ym":strd_ym, "searchItem":searchItem, "dtw_distance":max_dtw_distance},
        success: function (data) {	
        	similar_int_prod_id.length = 0;
        	similar_int_prod_nm.length = 0;
        	similar_weekday_nm.length = 0;
        	similar_seasonal_ind.length = 0;
        	
            $.map(data.statistics, function (item) {
            	similar_int_prod_id.push(item.int_prod_id);
            	similar_int_prod_nm.push(limitCharacters(item.prod_nm,20));
            	similar_weekday_nm.push(item.weekday_nm);
            	similar_seasonal_ind.push(item.seasonal_ind);
            });
            redrawSimilarChart();
            
        	if (similar_int_prod_id.length > 7) $('#similarityDiv').show();
        	else $('#similarityDiv').hide();
            
/*            alert('[ajax]=========' + data.statistics.length);
 			alert('[ajax]=========' + JSON.stringify(similar_int_prod_id));
            alert('[ajax]=========' + JSON.stringify(similar_int_prod_nm));
            alert('[ajax]=========' + JSON.stringify(similar_weekday_nm));
            alert('[ajax]=========' + JSON.stringify(similar_seasonal_ind));*/
        }
    });
}

/* ********************************************************
 * Decomposition 그래프 액션
 ******************************************************** */
function searchDecomposition(int_prod_id) {
    $.ajax({
        url: "/searchDecomposition.do",
        type: "POST",
        dataType: "json",
        data: {"int_prod_id":int_prod_id},
        success: function (data) {	
        	decomp_strd_dt.length = 0;
        	decomp_user_cnt.length = 0;
        	decomp_trend_ind.length = 0;
        	decomp_seasonal_ind.length = 0;
        	decomp_random_ind.length = 0;
//        	alert('[ajax]=========' + data.statistics.length);
            $.map(data.statistics, function (item) {
            	decomp_strd_dt.push(item.app_exec_dt);
            	decomp_user_cnt.push(item.user_cnt);
            	decomp_trend_ind.push(item.trend_ind);
            	decomp_seasonal_ind.push(item.seasonal_ind);
            	decomp_random_ind.push(item.random_ind);
            });

/*            
 			alert('[ajax]=========' + JSON.stringify(decomp_strd_dt));
            alert('[ajax]=========' + JSON.stringify(decomp_user_cnt));
            alert('[ajax]=========' + JSON.stringify(decomp_trend_ind));
            alert('[ajax]=========' + JSON.stringify(decomp_seasonal_ind));
*/
            
            redrawTrendLineChart();
            redrawSeasonalLineChart();

            if (decomp_strd_dt.length > 0) {
        		$('#decompositionDiv1').show();
        		$('#decompositionDiv2').show();
        		$('#decomAndSimilarTitleDiv').show();
        	} else {
        		$('#decompositionDiv1').hide();
        		$('#decompositionDiv2').hide();
        		$('#decomAndSimilarTitleDiv').hide();
        	}
           
        }
    });
}

/* ********************************************************
 * 기간설정 시 액션
 ******************************************************** */
function clickPeriod() {
	var start_dt = $("#from").val().replace(/-/gi, '');
	var end_dt = $("#to").val().replace(/-/gi, '');
	if (use_prod_date_type == 'MONTHLY') {
		var start_dt = $("#from_ym").val().replace(/-/gi, '');
		var end_dt = $("#to_ym").val().replace(/-/gi, '');	
/*		if (monthDiff(start_dt,end_dt) > 5 || monthDiff(start_dt,end_dt) == 0) {
			alert('6개월간 조회가 가능합니다.');
			return false;
		}*/
		if (monthDiff(start_dt,end_dt) < 1) {
			alert('시작날짜를 종료날짜보다 작게 설정해야 합니다.');
			return false;
		}
	}
    $.ajax({
        url: "/searchUseProd.do",
        type: "POST",
        dataType: "json",
        data: {"date_type":use_prod_date_type, "int_prod_id":$("#searchItem").val(), "start_dt":start_dt, "end_dt":end_dt},
        success: function (data) {
        	multi_strd_dt.length = 0;
        	multi_user_cnt.length = 0;
        	multi_app_exec_cnt_avg.length = 0;
        	multi_app_exec_tm_avg.length = 0;     	

            $.map(data.statistics, function (item) {
            	if (use_prod_date_type == 'DAILY') multi_strd_dt.push(item.strd_dt);
            	else multi_strd_dt.push(item.strd_ym);
            	multi_user_cnt.push(item.user_cnt);
            	multi_app_exec_cnt_avg.push(item.app_exec_cnt_avg);
            	multi_app_exec_tm_avg.push(item.app_exec_tm_avg);
            });           
            redrawUserCntChart();
            redrawUseMultiChart();
/*
            alert('[ajax]=========' + data.statistics.length);
 			alert('[ajax]=========' + JSON.stringify(multi_strd_dt));
            alert('[ajax]=========' + JSON.stringify(multi_user_cnt));
            alert('[ajax]=========' + JSON.stringify(multi_app_exec_cnt_avg));
            alert('[ajax]=========' + JSON.stringify(multi_app_exec_tm_avg));
*/           
        }
    });
}

var dateRange=90,
    monthRange=6;
/* ********************************************************
 * 며칠 전 날짜 구하기
 ******************************************************** */
function beforeDays (selectedDate) {
	var dt = new Date(selectedDate);
	dt.setDate(dt.getDate() - dateRange); 
	return dt.getFullYear() + '-'+ (dt.getMonth() + 1) + '-'+ dt.getDate();
}

/* ********************************************************
 * 며칠 후 날짜 구하기 (Max값은 Today)
 ******************************************************** */
function afterDays (selectedDate) {
	var today = new Date();
	var dt = new Date(selectedDate);
	dt.setDate(dt.getDate() + dateRange);
	var diffday = (today.getTime() - dt.getTime()) / (1000*60*60*24);
	return diffday < 0 ? today.getFullYear() + '-'+ (today.getMonth() + 1) + '-'+ today.getDate() : dt.getFullYear() + '-'+ (dt.getMonth() + 1) + '-'+ dt.getDate();
}

/* ********************************************************
 * 몇달 전 구하기
 ******************************************************** */
function beforeMonth (selectedDate) {
	selectedDate.setMonth(selectedDate.getMonth() - monthRange);
	return selectedDate;
}

/* ********************************************************
 * 몇달 후 구하기
 ******************************************************** */
function afterMonth (selectedDate) {
	selectedDate.setMonth(selectedDate.getMonth() + monthRange);
	var today = new Date();
	var diffday = (today.getTime() - selectedDate.getTime()) / (1000*60*60*24);
	return diffday < 0 ? today : selectedDate;
}

/* ********************************************************
 * 두 달의 차이 구하기
 ******************************************************** */
function monthDiff(d1, d2) {
    var months;
    var dt1 = new Date(parseInt(d1.substring(0,4)), parseInt(d1.substring(4,6)), 1);
    var dt2 = new Date(parseInt(d2.substring(0,4)), parseInt(d2.substring(4,6)), 1);
    months = (dt2.getFullYear() - dt1.getFullYear()) * 12;
    months -= dt1.getMonth() + 1;
    months += dt2.getMonth();
    return months <= 0 ? 0 : months;
}

/* ********************************************************
 * 두 날짜의 차이 구하기
 ******************************************************** */
function DateDiff(date1, date2) {
    date1.setHours(0);
    date1.setMinutes(0, 0, 0);
    date2.setHours(0);
    date2.setMinutes(0, 0, 0);
    var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference 
    return parseInt(datediff / (24 * 60 * 60 * 1000), 10); //Convert values days and return value      
}

/* ********************************************************
 * 마켓별 사용자수 JSON 데이터
 ******************************************************** */
function marketData() {
	return  [
		{ 
			"label": "T store",
			"value" : user_cnt_T
		}, 
		{ 
			"label": "Google",
			"value" : user_cnt_G
		}, 
		{ 
			"label": "N Store",
			"value" : user_cnt_N
		},
		{ 
			"label": "T,G store",
			"value" : user_cnt_T_G
		}, 
		{ 
			"label": "G,N store",
			"value" : user_cnt_G_N
		}, 
		{ 
			"label": "T,N store",
			"value" : user_cnt_T_N
		}, 
		{ 
			"label": "T,G,N store",
			"value" : user_cnt_TGN
		}    
	];
}

/* ********************************************************
 * 마켓별 사용자수 JSON 데이터 - venn diagram
 ******************************************************** */
function marketSets() {
	var sets =  [
		{ 
			"label": "T store",
			"size" : parseInt(user_cnt_T)
		}, 
		{ 
			"label": "Google",
			"size" : parseInt(user_cnt_G)
		}, 
		{ 
			"label": "N Store",
			"size" : parseInt(user_cnt_N)
		}/*,
		{ 
			"label": "T,G store",
			"size" : parseInt(user_cnt_T_G)
		}, 
		{ 
			"label": "G,N store",
			"size" : parseInt(user_cnt_G_N)
		}, 
		{ 
			"label": "T,N store",
			"size" : parseInt(user_cnt_T_N)
		}, 
		{ 
			"label": "T,G,N store",
			"size" : parseInt(user_cnt_TGN)
		}*/   
	];
	return sets;
	
}

/* ********************************************************
 * Venn diagram 에서 교집합 부분
 ******************************************************** */
function marketAreas() {
	var overlaps = [
		{"sets": [0, 1], "size": 1000},
		{"sets": [0, 2], "size": 1000},
		{"sets": [1, 2], "size": 1000}          
	                
/*        {"sets": [0, 1], "size": 4832},
        {"sets": [0, 2], "size": 2602},
        {"sets": [0, 3], "size": 6141},
        {"sets": [0, 4], "size": 2723},
        {"sets": [0, 5], "size": 3177},
        {"sets": [0, 6], "size": 5384},
        {"sets": [1, 2], "size": 162},
        {"sets": [1, 3], "size": 396},
        {"sets": [1, 4], "size": 133},
        {"sets": [1, 5], "size": 135},
        {"sets": [1, 6], "size": 511},
        {"sets": [2, 3], "size": 406},
        {"sets": [2, 4], "size": 350},
        {"sets": [2, 5], "size": 1335},
        {"sets": [2, 6], "size": 145},
        {"sets": [3, 4], "size": 5465},
        {"sets": [3, 5], "size": 849},
        {"sets": [3, 6], "size": 724},
        {"sets": [4, 5], "size": 977},
        {"sets": [4, 6], "size": 232},
        {"sets": [5, 6], "size": 196},
        {"sets": [0, 1, 2], "size": 480},
        {"sets": [0, 1, 3], "size": 152},
        {"sets": [0, 2, 3], "size": 112},
        {"sets": [0, 3, 4], "size": 715},
        {"sets": [0, 3, 5], "size": 822},
        {"sets": [0, 4, 5], "size": 160},
        {"sets": [0, 5, 6], "size": 292}*/]
	;
	
	return overlaps;
}

/* ********************************************************
 * 성별 사용자수 JSON 데이터
 ******************************************************** */
function sexData() {
	return  [
		{ 
			"label": "여성",
			"value" : user_cnt_woman
		} , 
		{ 
			"label": "남성",
			"value" : user_cnt_man
		},
		{ 
			"label": "기타",
			"value" : user_cnt_etc
		}		
	];
}

/* ********************************************************
 * 연령별 사용자수 JSON 데이터
 ******************************************************** */
function ageData() {
	var age13 = parseInt(user_cnt_0013)
		,age1419 = parseInt(user_cnt_1419)
		,age2029 = parseInt(user_cnt_2024) + parseInt(user_cnt_2529) 
		,age3039 = parseInt(user_cnt_3034) + parseInt(user_cnt_3539) 
		,age4049 = parseInt(user_cnt_4044) + parseInt(user_cnt_4549)
		,age5059 = parseInt(user_cnt_5054) + parseInt(user_cnt_5559);
	
	var sum_age = age13 + age1419 + age2029 + age3039 + age4049 + age5059;
	
	var avg_age13 = parseFloat(((age13)/sum_age).toFixed(3))
		,avg_age1419 = parseFloat(((age1419)/sum_age).toFixed(3))
		,avg_age2029 = parseFloat(((age2029)/sum_age).toFixed(3))
		,avg_age3039 = parseFloat(((age3039)/sum_age).toFixed(3))
		,avg_age4049 = parseFloat(((age4049)/sum_age).toFixed(3));
	
	var avg_age5059 = parseFloat((1-avg_age13-avg_age1419-avg_age2029-avg_age3039-avg_age4049).toFixed(3));
//	alert(avg_age13 + ' , ' + avg_age1419 + ' , ' + avg_age2029 + ' , ' + avg_age3039 + ' , ' + avg_age4049 + ' , ' + avg_age5059)
		
	return  [
		{
			key: "연령별 사용자수",
			values: [
				{
					"label" : "14세미만" ,
					"value" : avg_age13,
					"user_cnt" : age13
				},
				{
					"label" : "14세이상" ,
					"value" : avg_age1419,
					"user_cnt" : age1419
				},
				{
					"label" : "20~29세" ,
					"value" :  avg_age2029,
					"user_cnt" : age2029
				},
				{
					"label" : "30~39세" ,
					"value" : avg_age3039,
					"user_cnt" : age3039
				},
				{
					"label" : "40~49세" ,
					"value" : avg_age4049,
					"user_cnt" : age4049
				},
				{
					"label" : "50세이상" ,
					"value" : avg_age5059,
					"user_cnt" : age5059
				}
/*				{
					"label" : "14세미만" ,
					"value" : age13
				},
				{
					"label" : "14세이상" ,
					"value" : age1419
				},
				{
					"label" : "20~29세" ,
					"value" :  age2029
				},
				{
					"label" : "30~39세" ,
					"value" : age3039
				},
				{
					"label" : "40~49세" ,
					"value" : age4049
				},
				{
					"label" : "50세이상" ,
					"value" : age5059
				}	*/			
			]
		}
	]
}


var decomp_strd_dt=[],
	decomp_user_cnt=[],
	decomp_trend_ind=[],
	decomp_seasonal_ind=[],
	decomp_random_ind=[],
	decomp_user_cnt_max=0,
	decomp_trend_ind_max=0,
	decomp_seasonal_ind_max=0,
	decomp_random_ind_max=0,
	decomp_trend_ind_min=0,
	decomp_seasonal_ind_min=0;

/* ********************************************************
 * Decomposition JSON 데이터
 ******************************************************** */
function decompositionData(type) {
	var dataSet=[],
		dataArray=[];
//	alert(type);
	var	data = getDecompositionType(type);
	
 	for (var i = 0; i < decomp_strd_dt.length; i++) {
 		dataArray.push({
			x: new Date(parseInt(decomp_strd_dt[i].substring(0,4)),parseInt(decomp_strd_dt[i].substring(4,6))-1,parseInt(decomp_strd_dt[i].substring(6,8))),
			y: parseFloat(data[i])
		});
 	}

 	dataSet.push({
	    key: type,
	    values: sortByKey(dataArray, 'x')
	});
// 	alert(JSON.stringify(dataSet));
	return dataSet;
}

/* ********************************************************
 * 날짜 포맷으로 바꾸기
 ******************************************************** */
function getDateFormatByWeekDay(name) {
	var dateFormatData = '';
/*	if (name == 'SUN') dateFormatData = new Date(2014, 9, 19);
	else if (name == 'MON') dateFormatData = new Date(2014, 9, 20);
	else if (name == 'TUE') dateFormatData = new Date(2014, 9, 21);
	else if (name == 'WED') dateFormatData = new Date(2014, 9, 22);
	else if (name == 'THU') dateFormatData = new Date(2014, 9, 23);
	else if (name == 'FRI') dateFormatData = new Date(2014, 9, 24);
	else if (name == 'SAT') dateFormatData = new Date(2014, 9, 25);*/
	
	if (name == '1') dateFormatData = new Date(2014, 9, 19);
	else if (name == '2') dateFormatData = new Date(2014, 9, 20);
	else if (name == '3') dateFormatData = new Date(2014, 9, 21);
	else if (name == '4') dateFormatData = new Date(2014, 9, 22);
	else if (name == '5') dateFormatData = new Date(2014, 9, 23);
	else if (name == '6') dateFormatData = new Date(2014, 9, 24);
	else if (name == '7') dateFormatData = new Date(2014, 9, 25);	
	
	return dateFormatData;
}

/* ********************************************************
 * Decomposition 타입별 Yvalue 값 리턴
 ******************************************************** */
function getDecompositionType(type) {
	if (type == '이용자수') {
//		decomp_user_cnt_max = parseInt(Math.max.apply(Math,decomp_user_cnt));
		return decomp_user_cnt;
	} else if (type == 'Trend') {
//		decomp_trend_ind_max = parseFloat(Math.max.apply(Math,decomp_trend_ind));
//		decomp_trend_ind_min = parseFloat(Math.min.apply(Math,decomp_trend_ind));
		return decomp_trend_ind;
	} else if (type == 'Seasonal') {
//		decomp_seasonal_ind_max = parseFloat(Math.max.apply(Math,decomp_seasonal_ind));
//		decomp_seasonal_ind_min = parseFloat(Math.min.apply(Math,decomp_seasonal_ind));
		return decomp_seasonal_ind;
	} else if (type == 'Random') {
//		decomp_random_ind_max = parseInt(Math.max.apply(Math,decomp_random_ind));
		return decomp_random_ind;
	}
}

var	similar_int_prod_id=[],
	similar_int_prod_nm=[],
	similar_weekday_nm=[],
	similar_seasonal_ind=[],
	similar_seasonal_ind_max=0
	similar_seasonal_ind_min=0,
	similar_topK = 10;

/* ********************************************************
 * 유사한 seasonal 패턴을 보이는 앱 JSON 데이터
 ******************************************************** */
function similarityData() {
/*	alert(JSON.stringify(similar_int_prod_id));
    alert(JSON.stringify(similar_int_prod_nm));
    alert(JSON.stringify(similar_weekday_nm));
    alert(JSON.stringify(similar_seasonal_ind));*/

//	similar_seasonal_ind_max = parseFloat(Math.max.apply(Math,similar_seasonal_ind));
//	similar_seasonal_ind_min = parseFloat(Math.min.apply(Math,similar_seasonal_ind));
	
	var dataSet=[],
    	dataArray = [],
    	nameArray = [];

    for (var c = 0; c < similar_topK; c++) {
    	dataArray[c] =  new Array();
    }
    
	var cnt=-1;
    var name = '';
 	for (var i = 0; i < similar_int_prod_id.length; i++) {
 		var dateformatXValue = getDateFormatByWeekDay(similar_weekday_nm[i]);
 		var intformatYValue = parseFloat(similar_seasonal_ind[i]);
		if (name != similar_int_prod_id[i]) {
			cnt++;
			name = similar_int_prod_id[i];
			nameArray.push(similar_int_prod_nm[i]);
		}
 		dataArray[cnt].push({
			x: dateformatXValue,
			y: intformatYValue
		});
 	}
 	
 	for (var i = 0; i < nameArray.length; i++) {
/*	 	dataSet.push({
		    key: nameArray[i],
		    values: sortByKey(dataArray[i], 'x')
		});*/
 		dataSet.push({
		    key: nameArray[i],
		    values: dataArray[i]
		}); 		
 	}
//	alert(JSON.stringify(dataSet));
	return dataSet;
}

var use_prod_date_type = 'DAILY',
	multi_strd_dt=[],
	multi_user_cnt=[],
	multi_app_exec_cnt_avg=[],
	multi_app_exec_tm_avg=[],
	multi_user_cnt_max = 0,
	multi_app_exec_cnt_avg_max = 0,
	multi_app_exec_tm_avg_max = 0
	;

/* ********************************************************
 * 기간별 사용자수 JSON 데이터
 ******************************************************** */
function userCntData() {
//	multi_user_cnt_max = parseInt(Math.max.apply(Math,multi_user_cnt));
	
	var dataSet=[],
		dataArray=[];
	
 	for (var i = 0; i < multi_strd_dt.length; i++) {
 		var dateformatXValue;
 		if (use_prod_date_type == 'DAILY') dateformatXValue = new Date(parseInt(multi_strd_dt[i].substring(0,4)),parseInt(multi_strd_dt[i].substring(4,6))-1,parseInt(multi_strd_dt[i].substring(6,8)));
 		else dateformatXValue = new Date(parseInt(multi_strd_dt[i].substring(0,4)),parseInt(multi_strd_dt[i].substring(4,6))-1,1);
 		dataArray.push({
			x: dateformatXValue,
			y: parseInt(multi_user_cnt[i])
		});
 	}
 	
 	dataSet.push({
	    key: '이용자수',
	    values: dataArray
	});

// 	alert(JSON.stringify(dataSet));
	return dataSet;
}

var useMultiDataDisabled=[false, false];
/* ********************************************************
 * 기간별 이용건수, 이용시간 JSON 데이터
 ******************************************************** */
function useMultiData() {
/*	alert(JSON.stringify(multi_strd_dt));
    alert(JSON.stringify(multi_app_exec_cnt_avg));
    alert(JSON.stringify(multi_app_exec_tm_avg));
*/	
//	multi_app_exec_cnt_avg_max = parseInt(Math.max.apply(Math,multi_app_exec_cnt_avg));
//	multi_app_exec_tm_avg_max = parseInt(Math.max.apply(Math,multi_app_exec_tm_avg));
	var dataSet=[],
    	dataArray1 = [],
    	dataArray2 = [];

 	for (var i = 0; i < multi_strd_dt.length; i++) {
 		var dateformatXValue;
 		if (use_prod_date_type == 'DAILY') dateformatXValue = new Date(parseInt(multi_strd_dt[i].substring(0,4)),parseInt(multi_strd_dt[i].substring(4,6))-1,parseInt(multi_strd_dt[i].substring(6,8)));
 		else dateformatXValue = new Date(parseInt(multi_strd_dt[i].substring(0,4)),parseInt(multi_strd_dt[i].substring(4,6))-1,1); 		
 		var intformatY1Value = parseFloat(multi_app_exec_cnt_avg[i]);
 		var intformatY2Value = parseFloat(multi_app_exec_tm_avg[i]);
 		dataArray1.push({
			x: dateformatXValue,
			y: intformatY1Value
		});
 		dataArray2.push({
			x: dateformatXValue,
			y: intformatY2Value
		}); 		
 	}
 	
	var dataset1 = {
		values : dataArray1,
		key : "이용건수",
		type: "line",
		color: '#2ca02c',
		yAxis: 1,
		disabled: useMultiDataDisabled[0]
	};
	
	var dataset2 = {
		values : dataArray2,
		key : "이용시간",
		type: "line",
		color : "#ff7f0e",
		yAxis: 2,
		disabled: useMultiDataDisabled[1]
	};

	var dataset = [dataset1, dataset2];
	
//	alert(JSON.stringify(dataset1));
//	alert(JSON.stringify(dataset2));
//	alert(JSON.stringify(dataset));
	
	return dataset;
}
