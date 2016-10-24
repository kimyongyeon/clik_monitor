package clikmonitor.nanet.go.kr.login;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by kimyongyeon on 2016-08-29.
 */
@Controller
public class MainController {

    public ClikMonUser getUser() {
        return (ClikMonUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * 메인 화면
     * @return
     */
    @RequestMapping(value = "/main.do")
    public ModelAndView main(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main");
        modelAndView.addObject("username", getUser().getUsername());
        request.getSession(false).setAttribute("username", getUser().getUsername());
        return modelAndView;
    }

    /**
     * 로그인 화면
     * @return
     */
    @RequestMapping(value = "/login.do")
    public ModelAndView login(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }
}
