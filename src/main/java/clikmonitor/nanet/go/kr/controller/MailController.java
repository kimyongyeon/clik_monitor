package clikmonitor.nanet.go.kr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by kimyongyeon on 2016-07-11.
 */
@Controller
public class MailController {
    @RequestMapping(value = "/mail_list", method = RequestMethod.GET)
    public String mail_main() {
        return "biz/mail_list";
    }

}
