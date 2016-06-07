/*
 * 이미지비교검증 페이지의 Header(imageHeader.jsp)에서 쓰이는 js
*/

/* ********************************************************
 * 검색어 조회
 ******************************************************** */
function goSearch(){
	var prodName = $('#searchProdName').val().replace(/ /g, '').replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi,"");
	if (prodName == '') {
		alert('검색어를 입력해 주세요');
		return false;
	} else {
		$('#searchProdName').val(prodName);
	    $('#imageMain-form').submit();
	}
}

/* ********************************************************
 * 검색어 조회함수
 ******************************************************** */		
$(document).ready(function () {
    $("#searchProdName").autocomplete({
        source: function(request,response) {
            $.ajax({
                url: "/searchPkgName.do",
                type: "POST",
                dataType: "json",
                data: {"searchProdName":$("#searchProdName").val().replace(/ /g, '').replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi,""),"searchCount":$("#searchCount").val()},
                success: function (data) {
                    response($.map(data.keyword, function (item) {
                        return { label: item.prod_nm, value1: item.pkg_nm,  value2: item.tstore_prod_id, value3: item.naver_app_id};
                    }));
                }               
            });
        },
        focus: function( event, ui ) {
            $("#searchPkgNm").val( ui.item.value1);
            $("#searchTstoreProdId").val( ui.item.value2);
            $("#searchNaverAppId").val( ui.item.value3);
            return false;
        },        
        select: function(event, ui)
        {
        	$(this).val(ui.item.label);
            $("#searchPkgNm").val( ui.item.value1);
            $("#searchTstoreProdId").val( ui.item.value2);
            $("#searchNaverAppId").val( ui.item.value3);
            $('#imageMain-form').submit();
            return false;
        },         
        message: {
            noResults: "", results: ""
        }
    });
});