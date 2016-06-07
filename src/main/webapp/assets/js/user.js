/*
 * User 등록, 관리 페이지(join.jsp, admin/user.jsp)에서 쓰이는 js
*/

/* ********************************************************
 * 사번인증
 ******************************************************** */
function certify($userId, $password) {
    var userId = $userId.val().trim();
    var password = $password.val().trim();

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
        	$('#certify-success').val('Y');
        	alert("Pnet사번 인증되었습니다.");
        	$('#div_step2').removeClass('circle-join-off');
        	$('#div_step2').addClass('circle-join-on');
        } else {
            alert("Pnet사번 인증이 실패하였습니다.\nAquamarine 운영자에게 연락 부탁드립니다.\njinseung.lee@sk.com / yewon@sk.com");
            $userId.focus();
        }
    }).fail(function() {
    	alert("Pnet사번 인증이 실패하였습니다.\nAquamarine 운영자에게 연락 부탁드립니다.\njinseung.lee@sk.com / yewon@sk.com");
        $userId.focus();
    });
}

/* ********************************************************
 * 회원 신청
 ******************************************************** */
function join($userId, $password, $userName, $team, $email, $certify) {
    var userId = $userId.val().trim();
    var password = $password.val().trim();
    var userName = $userName.val().trim();
    var team = $team.val().trim();
    var email = $email.val().trim();
    var certify = $certify.val().trim();
    var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    
    if(certify != 'Y') {
        alert('사번 인증을 해 주세요.');
        return;
    } else if(!userName.length) {
        alert('이름을 입력해주세요.');
        $userName.focus();
        return;
    } else if (!team.length) {
        alert('소속을 입력해주세요.');
        $team.focus();
        return;
    } else if (!email.length) {
        alert('이메일을 입력해주세요.');
        $email.focus();
        return;
    }

    if(!regEmail.test(email)) {
    	alert('이메일 주소가 유효하지 않습니다');
    	$email.focus();
        return;
    }
    
    $.post('/joinproc.do', {
    	userId: userId,
        password: password,    	
    	userName: userName,
    	team: team,
    	email: email
    }, function(data) {
    	if (data.correct == true) {
            if (data.exist == false) {
            	alert("회원가입 신청이 완료되었습니다.\n운영자 승인 후,\n기입한 메일로 알려드리겠습니다");
            	sendMailToAdmin(userName);
            } else if (data.exist == true) {
                alert("회원가입 신청이 되어있습니다.");
            }
            location.href='/index.do';
    	}
    }).fail(function() {
    	alert("회원가입 신청에 실패하였습니다.");
    	location.href='/join.do';
    });
}

/* ********************************************************
 * 회원 신청 테이블 업데이트
 ******************************************************** */
function update(userId, $scrb_stat_cd, $scrb_desc) {
    var scrb_stat_cd = $scrb_stat_cd.val().trim();	
    var scrb_desc = $scrb_desc.val().trim();
/*    if (scrb_stat_cd == '0') {
    	alert("승인/반려를 선택해 주세요.");
    	return;
    }*/
    $.post('/updateproc.do', {
    	userId: userId,   	
    	scrb_stat_cd: scrb_stat_cd,
    	scrb_desc: scrb_desc
    }, function(data) {
    	if (data.correct) alert(userId + ' 업데이트 완료하였습니다.');
    	else alert(userId + ' 업데이트 실패하였습니다.');
    }).fail(function() {
    	alert("업데이트에 실패하였습니다.");
    });
}

/* ********************************************************
 * 회원 삭제
 ******************************************************** */
function deleteUser(userId) {
	var result = confirm(userId + '를 삭제하시겠습니까?');

	if (result) {
	    $.post('/deleteproc.do', {
	    	userId: userId
	    }, function(data) {
	    	if (data.correct) {
	    		alert(userId + ' 삭제 완료하였습니다.');
	    		location.href='/admin/user.do';
	    	} else alert(userId + ' 삭제 실패하였습니다.');
	    }).fail(function() {
	    	alert("삭제 실패하였습니다.");
	    });		
	}
}

/* ********************************************************
 * 회원 신청이 들어올 때  관리자에게 이메일 전송
 ******************************************************** */
function sendMailToAdmin(userNm) {
    var message = userNm + "님이 Aquamarine 회원신청하였습니다.";
    $.post('/sendMailToAdmin.do', {    	
    	message: message
    });
}

/* ********************************************************
 * 회원 신청 결과 이메일 전송
 ******************************************************** */
function sendMail(userNm, email, $scrb_stat_cd, $scrb_desc) {
    var scrb_stat_cd = $scrb_stat_cd.val().trim();	
    var scrb_desc = $scrb_desc.val().trim();
    var message = "";
    if (scrb_stat_cd == '0') {
//    	alert("승인/반려를 선택해 주세요.");
    	return;
    } else if (scrb_stat_cd == '1') {
    	message = userNm + "님의 Aquamarine 회원신청이 승인되었습니다.";
    } else {
    	message = userNm + "님의 Aquamarine 회원신청이 반려되었습니다.";
    	message += "<br />사유 : " + scrb_desc;
    }
    $.post('/sendMail.do', {
    	email: email,    	
    	message: message
    });
}