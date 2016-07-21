package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.dto.StatisticsSearchVO;
import clikmonitor.nanet.go.kr.dto.StatisticsVO;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

        String subRasmblyNms[] = {"기초", "광역"};
        String rasmblyNms[] = {"서울특별시의회","부산광역시의회","대구광역시의회","인천광역시의회","광주광역시의회","대전광역시의회"
                ,"울산광역시의회","세종특별자치시의회","경기도의회","강원도의회","충청북도의회","충청남도의회","전라북도의회"
                ,"전라남도의회","경상북도의회","경상남도의회","제주특별자치의회"};
        StatisticsVO statisticsVO = new StatisticsVO();
        int k = 0;
        // 의회, 지방의회, 대수
        for(int i=0; i<rasmblyNms.length; i++) {
            statisticsVO = new StatisticsVO();
            if(i%2 == 0) {
                k = 0;
            } else {
                k = 1;
            }
            statisticsVO.setSubRasmblyNm(subRasmblyNms[k]); // 의회
            statisticsVO.setRasmblyNm(rasmblyNms[i]); // 지방의회
            Random oRandom = new Random();
            statisticsVO.setSubRasmblyNmNo(i+"");
            statisticsVO.setRasmblyNmNo(i+"");
            statisticsVO.setCntcResultId(oRandom.nextInt(10) + 1 + ""); // 의회, 지방의회 구해야 함.
            statisticsVO.setNumprCount(oRandom.nextInt(10) + 1 + ""); // 대수
            statisticsVO.setSesnCount(oRandom.nextInt(1000) + 1 + ""); // 회수
            statisticsVO.setEstCount(oRandom.nextInt(1000) + 1 + ""); // 선거구
            statisticsVO.setMtgnmCount(oRandom.nextInt(1000) + 1 + ""); // 회의명
            statisticsVO.setAsembyCount(oRandom.nextInt(10) + 1 + ""); // 의원
            statisticsVO.setAsembyactCount(oRandom.nextInt(10) + 1 + ""); // 의원활동
            statisticsVO.setOfcpsCount(oRandom.nextInt(10) + 1 + ""); // 의원직위
            statisticsVO.setMintsCount(oRandom.nextInt(1000) + 1 + ""); // 회의록
            statisticsVO.setMtrCount(oRandom.nextInt(1000) + 1 + ""); // 안건
            statisticsVO.setSpkngCount(oRandom.nextInt(1000) + 1 + ""); // 발언
            statisticsVO.setApndxCount(oRandom.nextInt(1000) + 1 + ""); // 부록
            statisticsVO.setBiCount(oRandom.nextInt(10) + 1 + ""); // 의안정보
            statisticsVO.setItncasembyCount(oRandom.nextInt(10) + 1 + ""); // 발의의원
            statisticsVO.setBifileCount(oRandom.nextInt(10) + 1 + ""); // 의안파일
            statisticsVO.setBimintsCount(oRandom.nextInt(1000) + 1 + ""); // 의안회의록

            list.add(statisticsVO);
        }

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
