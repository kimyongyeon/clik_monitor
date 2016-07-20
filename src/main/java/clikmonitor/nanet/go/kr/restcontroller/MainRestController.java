package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.dto.AgentVO;
import clikmonitor.nanet.go.kr.dto.CommonVO;
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

    /**
     * Agent 상태 정보 목록
     * @return
     */
    @RequestMapping(value = "/getAreas.do", headers = "Accept=application/json; charset=utf8", method = RequestMethod.GET, produces = "text/json; charset=utf8")
    public AgentVO getAreas() {

        CommonVO commonVO = new CommonVO();
        CommonVO.MainArea mainArea = new CommonVO.MainArea();
        List<CommonVO.MainArea> areas = new ArrayList<CommonVO.MainArea>();
        AgentVO agentVO = new AgentVO();

        // 광역의회
        mainArea.setName("서울특별시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("부산특별시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("대구광역시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("2");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("인천광역시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("2");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("광주광역시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("대전광역시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("울산광역시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("세종특별자치시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경기도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("강원도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("충청북도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("충청남도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("전라북도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("전라남도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경상북도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경상남도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("1");mainArea.setState("1");areas.add(mainArea);

        agentVO.setAreas1(areas);

        // 기초의회
        areas = new ArrayList<CommonVO.MainArea>();
        mainArea = new CommonVO.MainArea();
        mainArea.setName("제주특별자치도의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경기도 부천시의회");mainArea.setUpDate ("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경기도 하남시의회");mainArea.setUpDate ("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("강원도 강릉시의회");mainArea.setUpDate ("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("충청북도 청주시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("충청남도 서산시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("2");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("전라북도 정읍시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("전라남도 순천시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경상북도 상주시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("2");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경상남도 거제시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);mainArea = new CommonVO.MainArea();
        mainArea.setName("경상남도 김해시의회");mainArea.setUpDate("2016.05.12");mainArea.setGubun("2");mainArea.setState("1");areas.add(mainArea);

        commonVO.setAreas(areas);
        agentVO.setAreas2(areas);

        return agentVO;
    }

    /**
     * Agent 상태정보 상세화면
     * @param map
     * @return
     */
    @RequestMapping(value = "/getAreaDeatail.do", headers = "Accept=application/json; charset=utf8", method = RequestMethod.GET, produces = "text/json; charset=utf8")
    public AgentVO getAreaDeatil(@RequestParam Map map) {

        AgentVO agentVO = new AgentVO();
        // ajax로 호출시 자바스크립트로 null을 전송하면 서블릿에서는 공백으로 넘어온다.
        if(map.get("code").toString().length() == 0) {
            agentVO.setRasmblyNm("서울특별시의회");
            agentVO.setSystemSttusCode("true");
            agentVO.setInstallYear("2014년");
            agentVO.setServerNm("회의록서버");
            agentVO.setServerIp("152.99.2.212");
            agentVO.setOs("Linux");
            agentVO.setWas("Tomcat");
            agentVO.setCpu("Xeon E5-2630");
            agentVO.setRam("16GB");
            agentVO.setLastDate("2016.05.01");
            agentVO.setModulePath("/usr/local");
            agentVO.setMemo("없음");
        }

        return agentVO;
    }

    /**
     * Agent 서버 상태정보
     * @return
     */
    @RequestMapping(value = "/getAreaStateInfoList.do", headers = "Accept=application/json; charset=utf8", method = RequestMethod.GET, produces = "text/json; charset=utf8")
    public AgentVO getAreaStateInfoList() {

        List agents = new ArrayList();
        AgentVO agentVO = new AgentVO();

        agentVO.setRasmblyNm("서울특별시");
        agentVO.setServerIp("162.12.13.222");
        agentVO.setCpu("Xeon E5-2630");
        agentVO.setReqProcessingRatio("90%");
        agentVO.setLastDate("2016.04.13");
        agents.add(agentVO);

        agentVO = new AgentVO();
        agentVO.setRasmblyNm("부산광역시");
        agentVO.setServerIp("162.12.13.222");
        agentVO.setCpu("Xeon E4-2630");
        agentVO.setReqProcessingRatio("90%");
        agentVO.setLastDate("2016.04.13");
        agents.add(agentVO);

        agentVO = new AgentVO();
        agentVO.setRasmblyNm("순천시");
        agentVO.setServerIp("162.12.13.222");
        agentVO.setCpu("Xeon E6-2630");
        agentVO.setReqProcessingRatio("90%");
        agentVO.setLastDate("2016.04.13");
        agents.add(agentVO);

        agentVO = new AgentVO();
        agentVO.setListAgentVO(agents);

        return agentVO;
    }
}