package clikmonitor.nanet.go.kr.interceptor;

import clikmonitor.nanet.go.kr.service.service.LoginService;
import clikmonitor.nanet.go.kr.dto.LoginVO;
import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    /**
     * The Login service.
     */
    LoginService loginService;
    private ApplicationContext context;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        loginService = (LoginService)context.getBean("loginService");
        LoginVO loginVO = new LoginVO();

        if(loginService.getLoginProc(request, loginVO)) {
            return true;
        } else {
            // 로그인 페이지 이동
            response.sendRedirect("/login");
            return false;
        }
    }
}
