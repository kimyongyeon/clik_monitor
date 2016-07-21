package clikmonitor.nanet.go.kr.service.service;

import clikmonitor.nanet.go.kr.dto.CommonSearchVO;
import clikmonitor.nanet.go.kr.dto.CommonVO;
import clikmonitor.nanet.go.kr.mapper.CommonMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
public interface CommonService {

    /**
     * Gets tree list.
     *
     * @return the tree list
     */
    Map<String, List<CommonVO>> getTreeList(); // 메인화면 트리뷰 목록 조회

    List<CommonVO> selectBrtcCodeDetails(CommonSearchVO commonSearchVO);

    List<CommonVO> selectLoasmInfo(CommonSearchVO commonSearchVO);

    /**
     * The type Common service.
     */
    @Service("commonService")
    class CommonServiceImpl implements CommonService {

        /**
         * The Common mapper.
         */
        @Resource(name = "commonMapper")
        CommonMapper commonMapper;

        @Override
        public List<CommonVO> selectBrtcCodeDetails(CommonSearchVO commonSearchVO) {
            return commonMapper.selectBrtcCodeDetails(commonSearchVO);
        }

        @Override
        public List<CommonVO> selectLoasmInfo(CommonSearchVO commonSearchVO) {
            return commonMapper.selectLoasmInfo(commonSearchVO);
        }

        @Override
        public Map<String, List<CommonVO>> getTreeList() {
            Map<String, List<CommonVO>> outMap = new HashMap();
            outMap.put("area", commonMapper.selectAreaList());
            outMap.put("broad", commonMapper.selectBroadList());
            outMap.put("basic", commonMapper.selectBasicList());
            return outMap;
        }
    }
}