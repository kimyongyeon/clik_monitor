package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.MailSearchVO;
import clikmonitor.nanet.go.kr.vo.MailVO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-11-04.
 */
@RestController
public class TestRestController {
    @RequestMapping(value = "/ajax_test_list.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getTestList() throws Exception {
        Map returnMap = new HashMap();

        List list = new ArrayList<>();
        list.add("1");
        list.add("2");
        list.add("3");
        list.add("4");
        returnMap.put("list",list);
        return returnMap;
    }
}
