package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.CommonVO;
import clikmonitor.nanet.go.kr.vo.MetaDataSearchVO;
import clikmonitor.nanet.go.kr.vo.MetaDataVO;
import clikmonitor.nanet.go.kr.service.MetaService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-08-22.
 */
@RestController
public class MetaDataRestController {

    @Autowired
    MetaService metaService;

    /**
     * 메타 데이터 목록
     * @param metaDataSearchVO
     * @return
     */
    @RequestMapping(value = "/getMetaDataList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getMetaDataList(@ModelAttribute(value = "metaDataSearchVO") MetaDataSearchVO metaDataSearchVO) throws Exception{

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(metaDataSearchVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(metaDataSearchVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(metaDataSearchVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(metaService.selectMetaDataRecordTotalCount(metaDataSearchVO));  // 전체카운트

        Map returnMap = new HashMap();
        metaDataSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        metaDataSearchVO.setRecordCountPerPage(metaDataSearchVO.getPageUnit());
        returnMap.put("list", metaService.selectMetaDataPagingList(metaDataSearchVO));
        returnMap.put("paginationInfo", paginationInfo);

        return returnMap;
    }

    /**
     * 지역선택 콤보 목록
     * @param metaDataSearchVO
     * @return
     */
    @RequestMapping(value = "/getSiteList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<MetaDataVO> getSiteList(@ModelAttribute(value = "metaDataSearchVO") MetaDataSearchVO metaDataSearchVO) {
        return metaService.selectSiteList(metaDataSearchVO);
    }
}
