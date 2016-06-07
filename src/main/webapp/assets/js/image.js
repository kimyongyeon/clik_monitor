/*
 * 이미지 비교 검증 페이지(image.jsp)에서 쓰이는 js
*/

$(document).ready(function() {
	// 팩터값이 변할때 액션
	$( "#factor" ).change(function() {
		searchImage();
	});
	
	// 정렬이 변할때 액션
	$( "#orderBy" ).change(function() {
		searchImage();
	});
});

/* ********************************************************
 * 이미지 검색
 ******************************************************** */
function searchImage(){
	var frm = document.getElementById("image-form");
    frm.action="/image.do";
    frm.submit();
}

/* ********************************************************
 * 체크박스 클릭 액션
 ******************************************************** */
function checkImage(chkbox, factor, image_cmpr_value){
	if (chkbox.checked) {
		insertImage(factor, image_cmpr_value);
		chkbox.checked = true;
	} else {
		deleteImage(factor, image_cmpr_value);
		chkbox.checked = false;
	}
}


/* ********************************************************
 * 선택된 factor와 Hash 값 insert 액션
 ******************************************************** */
function insertImage(factor, image_cmpr_value) {
    $.ajax({
        url: "/insertImage.do",
        type: "POST",
        dataType: "json",
        data: {"factor":factor, "image_cmpr_value":image_cmpr_value},
        success: function (data) {	
        	alert(data.result);       
        }
    });
}

/* ********************************************************
 * 선택된 factor와 Hash 값 delete 액션
 ******************************************************** */
function deleteImage(factor, image_cmpr_value) {
    $.ajax({
        url: "/deleteImage.do",
        type: "POST",
        dataType: "json",
        data: {"factor":factor, "image_cmpr_value":image_cmpr_value},
        success: function (data) {	
        	alert(data.result);
        }
    });
}