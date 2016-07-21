package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.CommonSearchVO;
import clikmonitor.nanet.go.kr.dto.CommonVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
@Mapper("commonMapper")
public interface CommonMapper {

    /**
     * 지역별 의회 목록 조회
     *
     * @return list list
     */
    List<CommonVO> selectAreaList(); // 지역별 의회 목록 조회

    /**
     * 기초별 의회 목록 조회
     *
     * @return list list
     */
    List<CommonVO> selectBasicList(); // 기초별 의회 목록 조회

    /**
     * 광역별 의회 목록 조회
     *
     * @return list list
     */
    List<CommonVO> selectBroadList(); // 광역별 의회 목록 조회


    /**
     * 지역선택 콤보 리스트
     * @param commonSearchVO
     * @return
     */
    List<CommonVO> selectBrtcCodeDetails(CommonSearchVO commonSearchVO);

    /**
     * 의회명 콤보 리스트
     * @param commonSearchVO
     * @return
     */
    List<CommonVO> selectLoasmInfo(CommonSearchVO commonSearchVO);
}
