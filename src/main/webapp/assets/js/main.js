/*
 * Home 페이지(home.jsp, login_main.jsp)에서 쓰이는 js
*/

/* ********************************************************
 * 앱상세 페이지 이동
 ******************************************************** */
function redirectDetail(searchProdId){
	location.href="/detail.do?searchProdId="+ searchProdId;
}

/* ********************************************************
 * 검색어 조회함수
 ******************************************************** */		
$(document).ready(function () {
});

/* ********************************************************
 * 아웃룩 메일 연동
 ******************************************************** */
function triggerOutlook() {        
//	var body = escape(window.document.title + String.fromCharCode(13)+ window.location.href);       
//	var subject = "문의제목";
//	window.location.href = "mailto:?body="+body+"&subject="+subject;
	window.location.href = "mailto:jinseung.lee@sk.com;yewon@sk.com?";
}

/* ********************************************************
 * ajax 요청 진행중일 때 ESC 혹은 F5(ctrl+r)를 눌렀을 때 이벤트 바인드
 ******************************************************** */
function setNewKeyEvent(){
	$(document).unbind("keydown");
	document.onkeydown = doNotReload();
	$(document).keydown(function (e){
		// esc키 키 이벤트
		if(e.keyCode == 27 ){
			jex.alert("잠시만 기다려 주세요");
			e.keyCode = 0;

			return false;
		}
		// backspace 키 키 이벤트
		if(e.keyCode == 8){
			jex.alert("잠시만 기다려 주세요");
			e.keyCode = 0;

			return false;
		}
	});
}

/* ********************************************************
 * ajax 요청 종료 후 원래의 이벤트 바인드로 복귀
 ******************************************************** */
function setOldKeyEvent() { 
	$(document).unbind("keydown");
	document.onkeydown = doReload();
	$(document).keydown(function (e){
		if(e.keyCode == 27){
			 
		}
	});
}

/* ********************************************************
 * ajax 요청 중 일 때 새로고침 방지
 ******************************************************** */
function doNotReload() {           // 새로고침 방지
	if ((event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) 
					|| (event.keyCode == 116)) {
		event.keyCode = 0;
		event.cancelBubble = true;
		event.returnValue = false;
		jex.alert("잠시만 기다려 주세요");
		 
	 }
}

/* ********************************************************
 * 새로고침 허용
 ******************************************************** */
function doReload() {
	if ((event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82))
				|| (event.keyCode == 116)) {
		event.cancelBubble = false;
		event.returnValue = true;
	}
}

/* ********************************************************
 * 문자열 길이만큼 자르기
 ******************************************************** */
function limitCharacters(text, limit) {
	if(text == null) {
		text = "null";
	}
    var textlength = text.length;
    if(textlength > limit) {
        // 제한 글자 길이만큼 값 재 저장
        text = text.substring(0,limit)+'...';
    }
    return text;
}

/* ********************************************************
 * 콤마찍기
 ******************************************************** */
function addComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}


/* ********************************************************
 * JSON 데이터 key 로 Sorting
 ******************************************************** */
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/* ********************************************************
 * 로그인 유무
 ******************************************************** */
function logout() {
	document.location.href="/logout.do";
}

/* ********************************************************
 * 리턴 URL 세팅
 ******************************************************** */
function setReturnUrl (returnUrl) {
	$('#returnUrl').val(returnUrl);
}

/* ********************************************************
 * 로그인
 ******************************************************** */
function login($userId, $password) {
    var userId = $userId.val().trim();
    var password = $password.val().trim();
    var returnUrl = $('#returnUrl').val();

    if(!userId.length) {
        alert('아이디를 입력해주세요.');
        $userId.focus();
        return;
    } else if (!password.length) {
        alert('비밀번호를 입력해주세요.');
        $password.focus();
        return;
    }

    $.post('/certifyproc.do', {
    	userId: userId,
        password: password
    }, function(data) {
        if (data.correct == true) {
            $.post('/authproc.do', {
            	userId: userId
            }, function(data) {
                if (data.correct == true) {
                	alert(returnUrl);
                	if (returnUrl != '' && returnUrl != null) location.href=returnUrl;
                	else  {
                		alert("데이터수집 장애로 인해 2015.03 이후의 통계가 부정확합니다. 참고 부탁드립니다.");
                		location.href='/index.do';
                	}
                } else {
                	alert("T store서비스 담당자만 이용가능합니다.");
                	$userId.focus();
                }
            }).fail(function() {
                alert("T store서비스 담당자만 이용가능합니다.");
                $userId.focus();
            });
        } else {
            alert("입력하신 정보가 정확하지않습니다");
            $userId.focus();
        }
    }).fail(function() {
    	alert("입력하신 정보가 정확하지않습니다");
        $userId.focus();
    });
}

/* ********************************************************
 * 엔터키를 클릭으로
 ******************************************************** */
function triggerClickLogin(e, $obj) {
    if (e.keyCode == 13) { // enter key
        $obj.trigger('click');
        return false;
    }
}