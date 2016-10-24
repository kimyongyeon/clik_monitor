package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.login.LoginSuccessHandler;
import clikmonitor.nanet.go.kr.vo.LoginVO;
import clikmonitor.nanet.go.kr.login.ClikMonUser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
@RestController
public class LoginRestController {

//    public ClikMonUser getUser() {
//        return (ClikMonUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    }
//
//    /**
//     * 로그인 페이지 아이디 쿠키 저장
//     * @param loginVO
//     * @param response
//     * @return
//     */
//    @RequestMapping(value = "/idSaveProc.do"
//            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
//            , method = RequestMethod.GET
//    )
//    public String idSaveProc(@ModelAttribute(value = "loginVO") LoginVO loginVO, HttpServletResponse response) {
//        String flag = "";
//        String[] tempid = loginVO.getId().split(",");
//        String id  = tempid[0];
//        response.addHeader("Pragma", "no-cache");
//        response.addHeader("Cache-Control", "no-cache");
//        if(id != null) {
//            flag = "true";
//            Cookie cookie = new Cookie("saved_name", id);
//            cookie.setMaxAge(7*24*60*60);
//            response.addCookie(cookie);
//            System.out.println(cookie);
//        } else {
//            flag = "false";
//            response.addCookie(new Cookie("saved_name", ""));
//        }
//        return flag;
//    }

}
