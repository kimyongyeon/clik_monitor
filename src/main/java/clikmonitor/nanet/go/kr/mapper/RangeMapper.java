package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.RangeSearchVO;
import clikmonitor.nanet.go.kr.dto.RangeVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * 임계값 관리
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("rangeMapper")
public interface RangeMapper {

    /**
     * 임계값 설정 조회
     *
     * @param rangeSearchVO : 지방의회, 최종수정일(당일,1주일,1개월), 페이지번호
     * @return 의회, 지방의회, 응답시간, 요청처리율, 최종수정일
     */
    List<RangeVO> selectRangeSetPagingList(RangeSearchVO rangeSearchVO);

    /**
     * 임계값 설정 엑셀저장 : export
     *
     * @param rangeSearchVO the range search vo
     * @return list list
     */
    List<RangeVO> selectRangeSetExcelExportList(RangeSearchVO rangeSearchVO);

    /**
     * 임계값 설정 등록
     *
     * @param rangeVO : 지방의회, 서비스 요청 처리율, 알람설정 시간, 알람설정
     */
    void insertRangeSetProc(RangeVO rangeVO);

    /**
     * 임계값 설정 수정
     *
     * @param rangeVO : 지방의회, 서비스 요청 처리율, 알람설정 시간, 알람설정
     */
    void updateRangeSetProc(RangeVO rangeVO);

    /**
     * 임계값 설정 삭제
     *
     * @param rangeVO : 지방의회
     */
    void deleteRangeSetProc(RangeVO rangeVO);

}
