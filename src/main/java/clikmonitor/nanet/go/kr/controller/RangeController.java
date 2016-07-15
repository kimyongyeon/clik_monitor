package clikmonitor.nanet.go.kr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by kimyongyeon on 2016-07-11.
 */
@Controller
public class RangeController {

    /**
     * 임계값 목록
     * @return
     */
    @RequestMapping(value = "/range_setting_list", method = RequestMethod.GET)
    public String range_setting_main() {
        return "biz/range_setting_list";
    }


    /**
     * 임계값 수정
     * @return
     */
    @RequestMapping(value = "/range_setting_edit", method = RequestMethod.GET)
    public String range_setting_edit() {
        return "biz/range_setting_edit";
    }

    /**
     * 임계값 설정
     * @return
     */
    @RequestMapping(value = "/range_setting_reg", method = RequestMethod.GET)
    public String range_setting_reg() {
        return "biz/range_setting_reg";
    }

}
