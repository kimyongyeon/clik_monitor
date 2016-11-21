package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.StatisticsSearchVO;
import clikmonitor.nanet.go.kr.vo.StatisticsVO;
import clikmonitor.nanet.go.kr.mapper.StatisticsMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
public interface StatisticsService {

    /**
     * Gets rasmbly data send data.
     *
     * @param statisticsSearchVO the statistics search vo
     * @return the rasmbly data send data
     */
    List<StatisticsVO> getRasmblyDataSendData(StatisticsSearchVO statisticsSearchVO); // 의회별 전송 데이터 목록 조회

    /**
     * Gets rasmbly data send excel export.
     *
     * @return the rasmbly data send excel export
     */
    List<StatisticsVO> getRasmblyDataSendExcelExport(StatisticsSearchVO statisticsSearchVO); // 의회별 전송 데이터 목록 엑셀저장

    /**
     * Gets rasmbly last send data.
     *
     * @param statisticsSearchVO the statistics search vo
     * @return the rasmbly last send data
     */
    List<StatisticsVO> getRasmblyLastSendData(StatisticsSearchVO statisticsSearchVO); // 항목별 최종전송 데이터 목록 조회

    /**
     * Gets rasmbly last send data excel export.
     *
     * @return the rasmbly last send data excel export
     */
    List<StatisticsVO> getRasmblyLastSendDataExcelExport(StatisticsSearchVO statisticsSearchVO); // 항목별 최종전송 데이터 목록 엑셀저장
    /*
        StatisticsService 끝
    */

    /**
     * The type Statistics service.
     */
    @Service("statisticsService")
    class StatisticsServiceImpl implements StatisticsService {

        /**
         * The Statistics mapper.
         */
        @Resource(name = "statisticsMapper")
        StatisticsMapper statisticsMapper;

        @Override
        public List<StatisticsVO> getRasmblyDataSendData(StatisticsSearchVO statisticsSearchVO) {
            return statisticsMapper.selectRasmblyDataSendList(statisticsSearchVO);
        }

        @Override
        public List<StatisticsVO> getRasmblyDataSendExcelExport(StatisticsSearchVO statisticsSearchVO) {
            return statisticsMapper.selectRasmblyDataSendExcelExportList(statisticsSearchVO);
        }

        @Override
        public List<StatisticsVO> getRasmblyLastSendData(StatisticsSearchVO statisticsSearchVO) {
            if(statisticsSearchVO.getKeyWordSub().equals("intsttcl_000024")) {

            }
            if(statisticsSearchVO.getKeyWordSub().equals("intsttcl_000023")) {

            }
            return statisticsMapper.selectRasmblyLastSendDataList(statisticsSearchVO);
        }

        @Override
        public List<StatisticsVO> getRasmblyLastSendDataExcelExport(StatisticsSearchVO statisticsSearchVO) {
            return statisticsMapper.selectRasmblyLastSendDataExcelExportList(statisticsSearchVO);
        }
    }

}
