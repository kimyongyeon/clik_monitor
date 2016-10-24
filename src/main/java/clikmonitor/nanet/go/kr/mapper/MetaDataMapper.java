package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.MetaDataVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * 메타 데이터 관리
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("metaDataMapper")
public interface MetaDataMapper {
    /**
     * 메타데이터 관리
     *
     * @param metaSearchVO : 지방의회, 자료유형, 최종등록일(당일, 1주일, 1개월), 검색항목, 페이지번호
     * @return : 번호, 지역, 사이트명, 사이트ID, 사이트URL, 자료유형, 게시판ID, 게시판명, 게시판URL, 최종등록일
     */
    List<MetaDataVO> selectMetaDataPagingList(CommonSearchVO metaSearchVO);

    List<MetaDataVO> selectMetaExcelExportList(CommonSearchVO metaSearchVO);

    int selectMetaDataRecordTotalCount(CommonSearchVO metaSearchVO);
}
