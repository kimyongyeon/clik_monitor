package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.vo.ChartSearchVO;
import clikmonitor.nanet.go.kr.vo.ChartVO;
import clikmonitor.nanet.go.kr.mapper.ChartMapper;
import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    Map selectTotalAvgRequestCountList3(ChartSearchVO chartSearchVO);
    int selectTotalAvgRequestCountList3Count(ChartSearchVO chartSearchVO);

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
    List<ChartVO> selectDataCollectionList1(ChartSearchVO chartSearchVO);
    List<ChartVO> selectDataCollectionList2(ChartSearchVO chartSearchVO);
    List<ChartVO> selectDataCollectionList3(ChartSearchVO chartSearchVO);
    List<ChartVO> selectDataCollectionList4(ChartSearchVO chartSearchVO);

    int selectDataCollectionListCount(CommonSearchVO chartSearchVO);

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
        public int selectTotalAvgRequestCountList3Count(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList3Count(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectDataCollectionList1(ChartSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionList1(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectDataCollectionList2(ChartSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionList2(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectDataCollectionList3(ChartSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionList3(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectDataCollectionList4(ChartSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionList4(chartSearchVO);
        }

        @Override
        public int selectDataCollectionListCount(CommonSearchVO chartSearchVO) {
            return chartMapper.selectDataCollectionListCount(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectTotalAvgRequestCountList1(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList1(chartSearchVO);
        }

        @Override
        public List<ChartVO> selectTotalAvgRequestCountList2(ChartSearchVO chartSearchVO) {
            return chartMapper.selectTotalAvgRequestCountList2(chartSearchVO);
        }

        @Override
        public Map selectTotalAvgRequestCountList3(ChartSearchVO chartSearchVO) {
            List<String> arrayList = new ArrayList<String>();
            for (String str : chartSearchVO.getDataTypeList()) {
                if("1".equals(str)) { // 회의록
                    chartSearchVO.setCntcId("REQ301"); // 회의록
                    arrayList = new ArrayList<String>();
                    arrayList.add("REQ301");
                    chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                }
                if("2".equals(str)) { // 부록
                    chartSearchVO.setCntcId("REQ305"); //  부록
                    arrayList = new ArrayList<String>();
                    arrayList.add("REQ305");
                    chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                }
                if("3".equals(str)) { // 의안
                    chartSearchVO.setCntcId("REQ401"); // 의안
                    arrayList = new ArrayList<String>();
                    arrayList.add("REQ401");
                    chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                }
                if("4".equals(str)) { // 의원
                    chartSearchVO.setCntcId("REQ203"); // 의원
                    arrayList = new ArrayList<String>();
                    arrayList.add("REQ203");
                    chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                }
            }

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(chartSearchVO.getPageIndex()); // 현재 페이지
            paginationInfo.setRecordCountPerPage(chartSearchVO.getPageUnit()); // 페이지 갯수
            paginationInfo.setPageSize(chartSearchVO.getPageSize()); // 페이지 사이즈
            paginationInfo.setTotalRecordCount(chartMapper.selectTotalAvgRequestCountList3Count(chartSearchVO)); // 전체카운트

            Map map = new HashMap();
            chartSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            chartSearchVO.setRecordCountPerPage(chartSearchVO.getPageUnit());
            map.put("list3", chartMapper.selectTotalAvgRequestCountList3(chartSearchVO));
            map.put("paginationInfo", paginationInfo);

            return map;
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
