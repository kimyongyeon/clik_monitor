package clikmonitor.nanet.go.kr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by kimyongyeon on 2016-06-07.
 */
@Controller
public class MainController {

    /**
     * Index string.
     *
     * @return the string
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    /**
     * Login string.
     *
     * @return the string
     */
    @RequestMapping(value = "/login.do", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    /**
     * Main menu string.
     *
     * @param model the model
     * @return the string
     */
    @RequestMapping(value = "/main.do", method = RequestMethod.GET)
    public String mainMenu(Model model) {
        model.addAttribute("ramblyNm", "서울광역시");
        return "main";
    }
}
