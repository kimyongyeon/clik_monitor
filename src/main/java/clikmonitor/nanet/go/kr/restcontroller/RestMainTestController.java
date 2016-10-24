package clikmonitor.nanet.go.kr.restcontroller;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.type.TypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@RestController
@RequestMapping(value = "/rest/")
@Slf4j
public class RestMainTestController {

    @RequestMapping(value = "test.do/{id}"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<Map> test(@RequestParam(value = "name", defaultValue = "World", required = false) String name,
                          @PathVariable String id,
                          @RequestParam Map map
    ) throws IOException {

        log.error("한글테스트 : " + map.get("params"));
        log.error("한글테스트 id : " + id);
        log.error("data : " + map.get("data"));
        log.error("arrayData : " + map.get("arrayData"));
        return null;
    }

    /**
     * Welcomedo string.
     *
     * @return the string
     */
    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String welcomedo() {
        return "Welcome to RestTemplate Example";
    }

    /**
     * Gets test list.
     *
     * @return the test list
     */
    @RequestMapping(value = "/test_list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getTestList() {
        List<String> list = new ArrayList<String>();
        list.add("id : 테스트 중입니다.");
        return list;
    }

    /**
     * Gets test map.
     *
     * @param id the id
     * @return the test map
     */
    @RequestMapping(value = "/test_detail/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getTestMap(@PathVariable String id) {
        Map outMap = new HashMap();
        outMap.put("id", id);
        return outMap;
    }

    /**
     * Gets test map list.
     *
     * @return the test map list
     */
    @RequestMapping(value = "/test_map", method = RequestMethod.GET
            , produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> getTestMapList() {
        Map outmap = new HashMap<String, Object>();
        List<String> list = new ArrayList<String>();
        list.add("1");
        list.add("2");
        list.add("3");
        list.add("4");
        outmap.put("id", "kimyongyeon");
        outmap.put("list", list);
        outmap.put("phone", "010-1234-5678");
        return outmap;
    }

}
