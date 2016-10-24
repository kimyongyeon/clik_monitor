package clikmonitor.nanet.go.kr.controller;

import clikmonitor.nanet.go.kr.service.RangeService;
import clikmonitor.nanet.go.kr.vo.RangeSearchVO;
import clikmonitor.nanet.go.kr.vo.RangeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by kimyongyeon on 2016-08-31.
 */
@Controller
public class RangeController {

    @Autowired
    RangeService rangeService;

    @RequestMapping(value = "/range_setting_edit.do")
    public String range_setting_edit(Model model, @ModelAttribute(value = "rangeVO") RangeVO rangeVO) throws Exception{
        RangeSearchVO rangeSearchVO = new RangeSearchVO();
        rangeSearchVO.setRasmblyId(rangeVO.getRasmblyId());
        rangeSearchVO.setColgoverSetId(rangeVO.getColgoverSetId());
        RangeVO rangeVO1 = rangeService.getRangeSetDetail(rangeSearchVO);
        model.addAttribute("colgoverSetId", rangeVO1.getColgoverSetId()); // 설정정보 pk
        model.addAttribute("rasmblyId", rangeVO1.getRasmblyId()); // 지방의회id
        model.addAttribute("rasmblyNm", rangeVO1.getRasmblyNm()); // 지방의회명
        model.addAttribute("setInterval", rangeVO1.getSetInterval()); //  응답시간
        model.addAttribute("reqProcessingRatio", rangeVO1.getReqProcessingRatio()); // 서비스 요청 처리율
        return "biz/range_setting_edit";
    }
}
