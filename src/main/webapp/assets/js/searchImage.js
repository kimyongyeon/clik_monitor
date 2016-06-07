/*
 * 이미지 비교 찾기 페이지(searchImage.jsp, searchImagePopup.jsp)에서 쓰이는 js
*/

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