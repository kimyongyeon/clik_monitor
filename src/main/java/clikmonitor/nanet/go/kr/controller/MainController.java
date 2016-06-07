package clikmonitor.nanet.go.kr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by kimyongyeon on 2016-06-07.
 */
@Controller
public class MainController {

    @RequestMapping(value = "/index.do", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/login.do", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/main.do", method = RequestMethod.GET)
    public String mainMenu() {
        return "main";
    }
}
