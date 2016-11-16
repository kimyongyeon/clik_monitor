package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.mapper.MetaDataMapper;
import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.MetaDataVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
public interface MetaService {

    List<MetaDataVO> selectMetaDataPagingList(CommonSearchVO metaSearchVO);
    List<MetaDataVO> selectSiteList(CommonSearchVO metaSearchVO);
    List<MetaDataVO> selectMetaExcelExportList(CommonSearchVO metaSearchVO);
    int selectMetaDataRecordTotalCount(CommonSearchVO metaSearchVO);

    @Service("metaService")
    class MetaServiceImpl implements MetaService {

        @Resource(name = "metaDataMapper")
        MetaDataMapper metaDataMapper;

        @Override
        public List<MetaDataVO> selectSiteList(CommonSearchVO metaSearchVO) {
            return metaDataMapper.selectSiteList(metaSearchVO);
        }

        @Override
        public List<MetaDataVO> selectMetaExcelExportList(CommonSearchVO metaSearchVO) {
            return metaDataMapper.selectMetaExcelExportList(metaSearchVO);
        }

        @Override
        public int selectMetaDataRecordTotalCount(CommonSearchVO metaSearchVO) {
            return metaDataMapper.selectMetaDataRecordTotalCount(metaSearchVO);
        }

        @Override
        public List<MetaDataVO> selectMetaDataPagingList(CommonSearchVO metaSearchVO) {
                return metaDataMapper.selectMetaDataPagingList(metaSearchVO);
        }
    }
}
