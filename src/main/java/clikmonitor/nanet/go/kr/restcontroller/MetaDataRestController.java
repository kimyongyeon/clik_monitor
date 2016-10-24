package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.MetaDataSearchVO;
import clikmonitor.nanet.go.kr.vo.MetaDataVO;
import clikmonitor.nanet.go.kr.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
    public List<MetaDataVO> getMetaDataList(@ModelAttribute(value = "metaDataSearchVO") MetaDataSearchVO metaDataSearchVO) throws Exception{
        System.out.println("getMetaDataList.do call start");
        return metaService.selectMetaDataPagingList(metaDataSearchVO);
    }
}
