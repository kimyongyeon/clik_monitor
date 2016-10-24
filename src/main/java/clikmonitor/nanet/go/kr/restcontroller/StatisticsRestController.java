package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.StatisticsSearchVO;
import clikmonitor.nanet.go.kr.vo.StatisticsVO;
import clikmonitor.nanet.go.kr.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by kimyongyeon on 2016-07-21.
 */
@RestController
public class StatisticsRestController {

    @Autowired
    StatisticsService statisticsService;

    /**
     * 의회별 전송 데이터
     * @param statisticsSearchVO
     * @return
     */
    @RequestMapping(value = "/getTabList1.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public List<StatisticsVO> getTabList1(@RequestBody StatisticsSearchVO statisticsSearchVO) {
        return statisticsService.getRasmblyDataSendData(statisticsSearchVO);
    }

    /**
     * 항목별 최종전송 데이터
     * @param statisticsSearchVO
     * @return
     */
    @RequestMapping(value = "/getTabList2.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public List<StatisticsVO> getTabList2(@RequestBody StatisticsSearchVO statisticsSearchVO) {

        // 테스트 데이터
//        List<StatisticsVO> list = new ArrayList<StatisticsVO>();
//
//        String subRasmblyNms[] = {"기초", "광역"};
//        String rasmblyNms[] = {"서울특별시의회","부산광역시의회","대구광역시의회","인천광역시의회","광주광역시의회","대전광역시의회"
//                ,"울산광역시의회","세종특별자치시의회","경기도의회","강원도의회","충청북도의회","충청남도의회","전라북도의회"
//                ,"전라남도의회","경상북도의회","경상남도의회","제주특별자치의회"};
//        StatisticsVO statisticsVO = new StatisticsVO();
//        int k = 0;
//        // 의회, 지방의회, 대수
//        for(int i=0; i<rasmblyNms.length; i++) {
//            statisticsVO = new StatisticsVO();
//            if(i%2 == 0) {
//                k = 0;
//            } else {
//                k = 1;
//            }
//            statisticsVO.setSubRasmblyNm(subRasmblyNms[k]); // 의회
//            statisticsVO.setRasmblyNm(rasmblyNms[i]); // 지방의회
//            Random oRandom = new Random();
//            statisticsVO.setSubRasmblyNmNo(i+"");
//            statisticsVO.setRasmblyNmNo(i+"");
//            statisticsVO.setBillMinutesFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//            statisticsVO.setItemFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//            statisticsVO.setMinutesAnswerFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//            statisticsVO.setMinutesStatementFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//            statisticsVO.setMinutesAppendixFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//            statisticsVO.setBillFrstRegistDt(oRandom.nextInt(10) + 1 + "");
//
//            list.add(statisticsVO);
//        }
//
//        return list;
        return statisticsService.getRasmblyLastSendData(statisticsSearchVO);
    }
}
