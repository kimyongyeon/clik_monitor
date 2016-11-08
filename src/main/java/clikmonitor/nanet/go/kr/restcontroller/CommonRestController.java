package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.CommonVO;
import clikmonitor.nanet.go.kr.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-07-21.
 */
@RestController
public class CommonRestController {

    @Autowired
    CommonService commonService;

    /**
     * 기관유형선택
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getBrtcCodeList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<CommonVO> getBrtcCodeList(@ModelAttribute(value = "commonSearchVO") CommonSearchVO commonSearchVO) {
        List<CommonVO> list = new ArrayList<CommonVO>();
        CommonVO commonVO = new CommonVO();
        commonVO.setCode("intsttcl_000023");
        commonVO.setCodenm("광역의회");
        list.add(commonVO);
        commonVO = new CommonVO();
        commonVO.setCode("intsttcl_000024");
        commonVO.setCodenm("기초의회");
        list.add(commonVO);
        return list;
    }

    /**
     * 지역선택 콤보 목록
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getInsttClCodeList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<CommonVO> getInsttClCodeList(@ModelAttribute(value = "commonSearchVO") CommonSearchVO commonSearchVO) {
        return commonService.selectBrtcCodeDetails(commonSearchVO);
    }


    /**
     * 지방의회선택 콤보 목록
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getLoasmInfo.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<CommonVO> getLoasmInfo(@ModelAttribute(value = "commonSearchVO") CommonSearchVO commonSearchVO) {
        return commonService.selectLoasmInfo(commonSearchVO);
    }

    /**
     * JSTree 목록 (지역/광역/기초 의회)
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getJstree.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getTreeViewList(@ModelAttribute("commonSearchVO") CommonSearchVO commonSearchVO) {
        return commonService.getTreeList();
    }
}
