package clikmonitor.nanet.go.kr.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Slf4j
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        return true;
//        LoginVO loginVO = (LoginVO)request.getAttribute("USERINFO");
//        System.out.println("LoginInterceptor loginVO : " + loginVO);
//        if(loginVO != null) {
//            return true;
//        } else {
//            response.sendRedirect("/login/login.do");
//            return false;
//        }
    }
}
