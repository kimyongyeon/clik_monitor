package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.LogVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
@Mapper("logMapper")
public interface LogMapper {

    /**
     * 로그 데이터 상세 정보 조회
     * @param logVO
     * @return
     */
    LogVO selectErrorLogInfoOne(CommonSearchVO logVO);

    LogVO selectErrorLogButtonShowHideOne(CommonSearchVO logVO);

    /**
     * 로그 데이터 목록 정보 조회
     * @param logVO
     * @return
     */
    List<LogVO> selectErrorLogInfoList(CommonSearchVO logVO);

    int selectErrorLogInfoListTotalRecordCount(CommonSearchVO logVO);

}
