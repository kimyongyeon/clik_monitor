package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.dto.StatisticsSearchVO;
import clikmonitor.nanet.go.kr.dto.StatisticsVO;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-21.
 */
@RestController
public class StatisticsRestController {

    /**
     * 의회별 전송 데이터
     * @param statisticsSearchVO
     * @return
     */
    @RequestMapping(value = "/getTabList1.do"
            , headers = "Accept=application/json; charset=utf8"
            , method = RequestMethod.GET
            , produces = "text/json; charset=utf8")
    public List<StatisticsVO> getTabList1(@ModelAttribute(value = "statisticsSearchVO") StatisticsSearchVO statisticsSearchVO) {

        List<StatisticsVO> list = new ArrayList<StatisticsVO>();

        // 의회, 지방의회, 대수
        StatisticsVO statisticsVO = new StatisticsVO();
        statisticsVO.setCntcResultId("123123"); // 의회, 지방의회 구해야 함.
        statisticsVO.setNumprCount("1"); // 대수
        statisticsVO.setSesnCount("10"); // 회수
        statisticsVO.setEstCount("1000"); // 선거구
        statisticsVO.setMtgnmCount("2000"); // 회의명
        statisticsVO.setAsembyCount("10"); // 의원
        statisticsVO.setAsembyactCount("10"); // 의원활동
        statisticsVO.setOfcpsCount("10"); // 의원직위
        statisticsVO.setMintsCount("10"); // 회의록
        statisticsVO.setMtrCount("10"); // 안건
        statisticsVO.setSpkngCount("10"); // 발언
        statisticsVO.setApndxCount("10"); // 부록
        statisticsVO.setBiCount("10"); // 의안정보
        statisticsVO.setItncasembyCount("10"); // 발의의원
        statisticsVO.setBifileCount("10"); // 의안파일
        statisticsVO.setBimintsCount("10"); // 의안회의록

        list.add(statisticsVO);

        return list;
    }

    /**
     * 항목별 최종전송 데이터
     * @param statisticsSearchVO
     * @return
     */
    @RequestMapping(value = "/getTabList2.do"
            , headers = "Accept=application/json; charset=utf8"
            , method = RequestMethod.GET
            , produces = "text/json; charset=utf8")
    public List<StatisticsVO> getTabList2(@ModelAttribute(value = "statisticsSearchVO") StatisticsSearchVO statisticsSearchVO) {

        return null;
    }
}
