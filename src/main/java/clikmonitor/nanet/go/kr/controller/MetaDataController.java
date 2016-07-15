package clikmonitor.nanet.go.kr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by kimyongyeon on 2016-07-11.
 */
@Controller
public class MetaDataController {
    @RequestMapping(value = "/metadata_list.do", method = RequestMethod.GET)
    public String metadata_main() {
        return "biz/metadata_list";
    }
}
