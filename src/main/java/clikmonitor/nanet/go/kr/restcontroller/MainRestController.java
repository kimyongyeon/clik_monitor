package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.service.service.vo.Person;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-07-14.
 */
@RestController
@Slf4j
public class MainRestController {

    @RequestMapping(value = "test.do/{id}", headers = "Accept=application/json; charset=utf8", method = RequestMethod.GET, produces = "text/json; charset=utf8")
    public List<Map> test(@RequestParam(value="name", defaultValue = "World", required = false) String name,
                          @PathVariable String id,
                          @ModelAttribute("person") Person person,
                          @RequestParam Map map
                          ) throws IOException {

        log.error("한글테스트 : " + map.get("params"));
        log.error("한글테스트 id : " + id);
        log.error("data : " + map.get("data"));
        log.error("arrayData : " + map.get("arrayData"));
        log.error("name : " + person.getName());
        log.error("number : " + person.getNumber());
        log.error("channels : " + person.getChannel()[0]);
        log.error("channels : " + person.getChannel()[1]);
        log.error("channels : " + person.getChannel()[2]);

        ObjectMapper mapper = new ObjectMapper();

//        Map<String, Object> writeMap = new HashMap<String, Object>();
//        writeMap.put("kim","1234");
//        String json = mapper.writeValueAsString(writeMap);
//        log.error(json);

        // {"name":"value"}
//        log.error(mapper.readValue(map.get("arrayData").toString(), new TypeReference<Map<String, String>>(){}).toString());
        // {persons:[{name:"value"}]
        String arrayData = map.get("arrayData").toString();
        ArrayList<HashMap<String, String>> mapArrayListist = new ArrayList<HashMap<String, String>>();
        mapArrayListist = mapper.readValue(arrayData, new TypeReference<ArrayList<HashMap<String, String>>>() {});
        log.error(mapArrayListist.toString());

        String errorMsg = "";
        if("".equals(id)) {
            errorMsg = "id is NULL";
        } else {
            errorMsg = "success!!!";
        }

        Map m = new HashMap();
        m.put("name", name);
        m.put("phone", "01012341234");
        m.put("map", map);
        m.put("errorMsg", errorMsg);
        m.put("korean", "한글테스트");
        List<Map> list = new ArrayList<Map>();
        list.add(m);
        return list;
    }
}
