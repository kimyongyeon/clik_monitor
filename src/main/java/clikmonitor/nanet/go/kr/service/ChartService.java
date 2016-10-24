package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.vo.ChartSearchVO;
import clikmonitor.nanet.go.kr.vo.ChartVO;
import clikmonitor.nanet.go.kr.mapper.ChartMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
public interface ChartService {

    /**
     * 전체평균요청건수 목록 조회
     *
     * @param chartSearchVO : 전체, 어제, 오늘, 주간
     * @return : 요청건수
     */
    List<ChartVO> selectTotalAvgRequestCountList1(ChartSearchVO chartSearchVO);
    List<ChartVO> selectTotalAvgRequestCountList2(ChartSearchVO chartSearchVO);
    List<ChartVO> selectTotalAvgRequestCountList3(ChartSearchVO chartSearchVO);

    /**
     * 트랜잭션 목록 조회
     *
     * @param chartSearchVO : 회의록, 부록, 의안, 의원, 이벤트
     * @return 회의록, 부록, 의안, 의원 요청 건수
     */
    List<ChartVO> selectTransactionList(ChartSearchVO chartSearchVO);

    /**
     * 데이터 수집현황 목록 조회
     *
     * @param chartSearchVO : 일간, 주간, 월간
     * @return : 의회별 데이터건수
     */
    List<ChartVO> selectDataCollectionList(ChartSearchVO chartSearchVO);

    /**
     * Agent 서버 정보 바 차트 조회
     *
     * @param chartSearchVO : 의회정보(의회ID)
     * @return : 회의록, 부록, 의안, 의원, 최신일자, 데이터총개수
     */
    List<ChartVO> selectAgentServerInfoBarChartOne(ChartSearchVO chartSearchVO);

    @Service("chartService")
    class ChartServiceImpl implements ChartService {

        @Resource(name = "chartMapper")
        ChartMapper chartMapper;

        @Override
        public List<ChartVO> selectTotalAvgRequestCountList1(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList1(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectTotalAvgRequestCountList2(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList2(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectTotalAvgRequestCountList3(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList3(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectTransactionList(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTransactionList(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectDataCollectionList(ChartSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionList(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectAgentServerInfoBarChartOne(ChartSearchVO chartSearchVO) {
            return chartMapper.selectAgentServerInfoBarChartOne(chartSearchVO);
        }
    }
}
