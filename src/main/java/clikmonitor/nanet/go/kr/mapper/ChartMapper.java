package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.ChartSearchVO;
import clikmonitor.nanet.go.kr.dto.ChartVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("chartMapper")
public interface ChartMapper {
    /**
     * 전체평균요청건수 목록 조회
     *
     * @param chartSearchVO : 전체, 어제, 오늘, 주간
     * @return : 요청건수
     */
    List<ChartVO> selectTotalAvgRequestCountList(ChartSearchVO chartSearchVO);

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
    ChartVO selectAgentServerInfoBarChartOne(ChartSearchVO chartSearchVO);
}
