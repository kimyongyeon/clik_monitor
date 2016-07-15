package clikmonitor.nanet.go.kr.service.service;

import clikmonitor.nanet.go.kr.mapper.CommonMapper;
import clikmonitor.nanet.go.kr.dto.CommonVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
public interface CommonService {

    /**
     * Gets tree list.
     *
     * @return the tree list
     */
/*
        CommonService 메서드 선언 시작
     */
    Map<String, List<CommonVO>> getTreeList(); // 메인화면 트리뷰 목록 조회
    /*
        CommonService 메서드 선언 시작
     */

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
        public Map<String, List<CommonVO>> getTreeList() {
            Map<String, List<CommonVO>> outMap = new HashMap();
            outMap.put("area", commonMapper.selectAreaList());
            outMap.put("broad", commonMapper.selectBroadList());
            outMap.put("basic", commonMapper.selectBasicList());
            return outMap;
        }
    }
}
