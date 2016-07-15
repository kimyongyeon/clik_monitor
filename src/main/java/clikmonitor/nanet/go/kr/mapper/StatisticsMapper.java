package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.StatisticsVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import clikmonitor.nanet.go.kr.dto.StatisticsSearchVO;

import java.util.List;

/**
 * 통계 관리
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("statisticsMapper")
public interface StatisticsMapper {

    /**
     * 로그 데이터 상세 정보 조회
     *
     * @param statisticsSearchVO : 지방의회 아이디
     * @return : 에러 로그 정보
     */
    StatisticsVO selectErrorLogInfoOne(StatisticsSearchVO statisticsSearchVO);

    /**
     * 의회별 전송 데이터 목록 조회
     *
     * @param statisticsSearchVO : 지방의회
     * @return : 의회, 지방의회, 대수, 회기, 선거구, 회의명, 의원, 의원활동, 의원직위, 회의록, 안건, 발언, 의안정보, 발의의원, 의안파일 , 의안회의록
     */
    List<StatisticsVO> selectRasmblyDataSendList(StatisticsSearchVO statisticsSearchVO);

    /**
     * 의회별 전송 데이터 목록 엑셀저장
     *
     * @param statisticsSearchVO : 지방의회
     * @return : 의회, 지방의회, 대수, 회기, 선거구, 회의명, 의원, 의원활동, 의원직위, 회의록, 안건, 발언, 의안정보, 발의의원, 의안파일 , 의안회의록
     */
    List<StatisticsVO> selectRasmblyDataSendExcelExportList(StatisticsSearchVO statisticsSearchVO);

    /**
     * 항목별 최종전송 데이터 목록 조회
     *
     * @param statisticsSearchVO : 지방의회
     * @return : 의회, 지방의회, 회의록 최종일자, 안건 최종일자, 발언 최종일자, 발언답변 최종일자, 부록 최종일자, 의안 최종일자
     */
    List<StatisticsVO> selectRasmblyLastSendDataList(StatisticsSearchVO statisticsSearchVO);

    /**
     * 항목별 최종전송 데이터 목록 엑셀저장
     *
     * @param statisticsSearchVO : 지방의회
     * @return : 의회, 지방의회, 회의록 최종일자, 안건 최종일자, 발언 최종일자, 발언답변 최종일자, 부록 최종일자, 의안 최종일자
     */
    List<StatisticsVO> selectRasmblyLastSendDataExcelExportList(StatisticsSearchVO statisticsSearchVO);

}
