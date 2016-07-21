package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.dto.CommonSearchVO;
import clikmonitor.nanet.go.kr.dto.CommonVO;
import clikmonitor.nanet.go.kr.service.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-21.
 */
@RestController
public class CommonRestController {

    @Autowired
    CommonService commonService;

    /**
     * 지역선택 콤보 목록
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getBrtcCodeDetailsList.do"
            , headers = "Accept=application/json; charset=utf8"
            , method = RequestMethod.GET
            , produces = "text/json; charset=utf8")
    public List<CommonVO> getBrtcCodeDetailsList(@ModelAttribute(value = "commonSearchVO") CommonSearchVO commonSearchVO) {

        List<CommonVO> list = new ArrayList<CommonVO>();

        CommonVO commonVO = new CommonVO();
        commonVO.setCode("1");
        commonVO.setCodenm("지역선택 코드이름1");
        list.add(commonVO);

        commonVO = new CommonVO();
        commonVO.setCode("2");
        commonVO.setCodenm("지역선택 코드이름2");
        list.add(commonVO);

        commonVO = new CommonVO();
        commonVO.setCode("3");
        commonVO.setCodenm("지역선택 코드이름3");
        list.add(commonVO);

        return list;

//        return commonService.selectBrtcCodeDetails(commonSearchVO);
    }

    /**
     * 의회명 콤보 목록
     * @param commonSearchVO
     * @return
     */
    @RequestMapping(value = "/getLoasmInfo.do"
            , headers = "Accept=application/json; charset=utf8"
            , method = RequestMethod.GET
            , produces = "text/json; charset=utf8")
    public List<CommonVO> getLoasmInfo(@ModelAttribute(value = "commonSearchVO") CommonSearchVO commonSearchVO) {

        List<CommonVO> list = new ArrayList<CommonVO>();

        CommonVO commonVO = new CommonVO();
        commonVO.setCode("1");
        commonVO.setCodenm("지방의회선택 코드이름1");
        list.add(commonVO);

        commonVO = new CommonVO();
        commonVO.setCode("2");
        commonVO.setCodenm("지방의회선택 코드이름2");
        list.add(commonVO);

        commonVO = new CommonVO();
        commonVO.setCode("3");
        commonVO.setCodenm("지방의회선택 코드이름3");
        list.add(commonVO);

        return list;

//        return commonService.selectLoasmInfo(commonSearchVO);
    }

    @RequestMapping(value = "/comboList.do")
    public String comboList() {
        return "commboList";
    }
}
