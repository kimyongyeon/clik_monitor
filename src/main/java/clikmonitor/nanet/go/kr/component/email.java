//package clikmonitor.nanet.go.kr.component;
//
//import clikmonitor.nanet.go.kr.vo.LoginVO;
//import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.net.URLDecoder;
//
///**
// * Created by kimyongyeon on 2016-09-20.
// */
//public class email {
//
//    public void mailSend() {
//        try {
//
//            // 0. 특수문자 변환 된 것을 HTML로 다시 변환
//            //mimManageVO.setEmailCn(ReplaceTag(mimManageVO.getEmailCn(), "decode"));
//
//            mimManageVO.setEmailCn(URLDecoder.decode(mimManageVO.getEmailCn(),"utf-8"));
//
//            // 1. 메일 발송내역 저장----------------------------------------------------------------------------
//            // 첨부파일 관련 첨부파일ID 생성
//            List<FileVO> _result = null;
//            String _atchFileId = "";
//
//            final Map<String, MultipartFile> files = multiRequest.getFileMap();
//
//            if(!files.isEmpty()){
//                _result = fileUtil.parseFileInf(files, "EMAIL_", 0, "", "Globals.mailFileStorePath");
//                _atchFileId = fileMngService.insertFileInfs(_result);  //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
//            }
//
//            // 리턴받은 첨부파일ID를 셋팅한다..
//            mimManageVO.setAtchFileId(_atchFileId);					// 첨부파일 ID
//
//            // 로그인VO에서  사용자 정보 가져오기
//            LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
//            String frstRegisterId = loginVO.getMngrId();
//            mimManageVO.setFrstRegisterId(frstRegisterId);			// 최초등록자ID
//            mimManageVO.setLastUpdusrId(frstRegisterId);    		// 최종수정자ID
////	    	mimManageVO.setSn(sendMailDetailInfoIdGnrService.getNextIntegerId());	//상세내용 Sequence ID
//
//            mimManageService.insertSendMailInfo(mimManageVO);
//
//            // 1. 메일 발송내역 저장 끝----------------------------------------------------------------------------
//
//            // 2. 메일 수신 거부 제외 -----------------------------------------------------------------------------
//            int rejectCnt = 0;			// 실 수신자 수
//            List rejectRcverEmailList = mimManageService.selectRejectRcvr(mimManageVO);
//
//            // 2. 메일 수신 거부 끝 -------------------------------------------------------------------------------
//
//            // 3. 메일 발송----------------------------------------------------------------------------------------
//            String returnMsg = "";
//            String returnUrl = "";
//            String from = StringUtil.isNullToString(mimManageVO.getSendNm()); //보내는사람
//            String to = ""; 			//받는사람 - 메일주소
//            String recname = ""; //받는사람 - 이름
//
//            // 받는 사람 스트링으로 만들기.
//            String[] rcversDtls;		//textarea에 있던 구성원을 분리 값을 담는 배열
//            String[] rcversSt;			//textarea에 있던 이름과 이메일 주소 구분값 담는 배열
//            String rcverNm = "";		//구성원 이름
//            String rcverEmail = "";	//구성원 이메일
//            String job = "";				//수신자 직업구분
//
//            String subject = StringUtil.isNullToString(mimManageVO.getSj()); //제목
//            String body = StringUtil.isNullToString(mimManageVO.getEmailCn()); //내용
//            String charset = "utf-8"; //인코딩
//
//            subject = new String(subject.getBytes("utf-8"));
//            body = new String(body.getBytes("utf-8"));
//
//            String tempFile = "";
//
//            //첨부파일
//            String fileStorePath = EgovProperties.getProperty("Globals.mailFileStorePath");
//            Iterator fileIter = multiRequest.getFileNames();
//            int cnt = 0;
//            while (fileIter.hasNext()) {
//                MultipartFile mFile = multiRequest.getFile((String)fileIter.next());
//                if (mFile.getSize() > 0) {
//                    HashMap _map = new EgovFileMngUtil().mailUploadFile(mFile, fileStorePath);
//                    tempFile += (String)_map.get("FILE_PATH")+"/"+(String)_map.get("UPLOAD_FILE_NM")+",";
//                }
//            }
//
//            String[] realFile = tempFile.split(",");
//
//            for(int i=0; i<rejectRcverEmailList.size(); i++) {
//                MimManageVO vo = (MimManageVO)rejectRcverEmailList.get(i);
//
//                // 수신자 이메일
//                to = StringUtil.isNullToString(vo.getRcverEmail());
//                if (vo.getRcverNm() == "" || vo.getRcverNm() != null) {
//                    String[] arrayRcverNm = vo.getRcverNm().split("\\_");
//                    rcverNm = arrayRcverNm[1];
//                    job = arrayRcverNm[0];
//                }
//
//                boolean find = false;
//                String cd = "";
//                find = isEmailPattern(to);
//
//                if(find == false){
//                    cd = "false";
//                }
//
//                // 이메일 유효성 검사
//                if(cd.equals("false")){
//                    multiRequest.setAttribute("find", "fail");
//                    returnUrl = "redirect:/mim/SendMailList.do";
//                }else{
//
//                    String result = "";
//
//                    // 수신거부 파라미터 암호화
//                    String encString1 = "";
//                    String encString2 = "";
//                    String encString3 = "";
//                    encString1 = EncodeBySType(to);
//                    encString2 = EncodeBySType(rcverNm);
//                    encString3 = EncodeBySType(job);
//
//                    String hostAddress = EgovProperties.getProperty("Globals.HostAddress");
//                    String hostPort = EgovProperties.getProperty("Globals.Port");
//                    // 수신거부 HTML
//                    // encString1 : 이메일주소, encString2 : 이름, encString3 : 직업
//
//                    log.info("hostAddress = " + hostAddress + ", hostPort = " + hostPort);
//
//                    String rejectHtml = "<a href=\"http://"+hostAddress+":"+hostPort+"/mim/rejectEmail.do?value1=" + encString1 + "&value2=" +encString2+ "&value3=" +encString3+ "\">수신거부</a> ";
//
//                    URL url = new URL("http://ems.nanet.go.kr/servlet/sendemailu");
//                    InputStream is = null;
//                    BufferedReader br = null;
//                    ImHttpRequestor requestor = new ImHttpRequestor(url);
//                    requestor.addParameter("from", from);	// 보내는 사람
//                    requestor.addParameter("to", to);	// 받는사람 이메일
//                    requestor.addParameter("subject", subject);	// 제목
//                    requestor.addParameter("body", body+rejectHtml);	// 본문
//                    requestor.addParameter("charset", charset);
//
//                    for(int j = 0; j < realFile.length; j++){
//                        if(!realFile[j].equals("")){
//                            requestor.addFile("file", realFile[j]);
//                        }
//                    }
//
//                    try {
//                        is = requestor.sendMultipartPost();
//                        br = new BufferedReader(new InputStreamReader(is));
//                        String line = "";
//                        while( (line=br.readLine())!= null ) {
//                            returnMsg += line.trim();
//                            result = "ok";
//                        }
//                        br.close();
//                    } catch(Exception e){
//                        e.printStackTrace();
//                    } finally {
//                        if ( is != null ){
//                            try {
//                                is.close();
//                            }
//                            catch(Exception e){
//                                e.printStackTrace();
//                            }
//                        }
//                        if ( br != null ){
//                            try {
//                                br.close();
//                            }catch(Exception e){
//                                e.printStackTrace();
//                            }
//                        }
//                    }
//                }
//
//            }
//
//            // 실 수신자 수
//            mimManageVO.setSendRejectCnt(rejectRcverEmailList.size());
//            // 메일 발송이 성공이면 메일 상태를 발송성공으로 수정 및 메일 수신거부자 수정
//            mimManageService.updateSendMailStatus(mimManageVO);
//
//        } catch (Exception e) {
//            log.debug("::: EMAIL SEND ERROR ::: " + e.getMessage());
//            e.printStackTrace();
//            e.getMessage();
//        }
//        // --------------------------------------------   메일 발송 끝 --------------------------------------------
//    }
//
//    public static void main(String[] args) {
//
//    }
//}
