package clikmonitor.nanet.go.kr.controller;

import clikmonitor.nanet.go.kr.service.MailService;
import clikmonitor.nanet.go.kr.service.MetaService;
import clikmonitor.nanet.go.kr.service.RangeService;
import clikmonitor.nanet.go.kr.service.StatisticsService;
import clikmonitor.nanet.go.kr.vo.KeyWordType;
import clikmonitor.nanet.go.kr.vo.MailSearchVO;
import clikmonitor.nanet.go.kr.vo.MetaDataSearchVO;
import clikmonitor.nanet.go.kr.vo.RangeSearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-09-01.
 */
@Controller
public class ExcelController {

    @Autowired
    StatisticsService statisticsService;

    @Autowired
    RangeService rangeService;

    @Autowired
    MailService mailService;

    @Autowired
    MetaService metaService;

    @RequestMapping(value = "/excelDownload.do")
    public ModelAndView getListExcel(HttpServletRequest request) throws Exception {
        int keyWordType = 0;
        if (request.getParameter("keyWordType") != null ) {
            keyWordType = Integer.parseInt(request.getParameter("keyWordType"));
        }
        List list = new ArrayList();
        Map map = new HashMap();
        if(KeyWordType.STATIS == keyWordType) { // 의회별 전송 데이터
            list = statisticsService.getRasmblyDataSendExcelExport();
            map.put(KeyWordType.STATIS, list);
        }
        else if (KeyWordType.RANGE == keyWordType) { // 임계값
            list = rangeService.selectRangeExcelExportList(new RangeSearchVO());
            map.put(KeyWordType.RANGE, list);
        }
        else if (KeyWordType.MAIL == keyWordType) { // 메일링
            list = mailService.selectMailingExcelExportList(new MailSearchVO());
            map.put(KeyWordType.MAIL, list);
        }
        else if (KeyWordType.META == keyWordType) { // 메타데이터관리
            MetaDataSearchVO metaDataSearchVO = new MetaDataSearchVO();
            metaDataSearchVO.setStartDate(request.getParameter("startDate"));
            metaDataSearchVO.setEndDate(request.getParameter("endDate"));
            metaDataSearchVO.setRegion(request.getParameter("region"));
            metaDataSearchVO.setSiteNm(request.getParameter("siteNm"));
            list = metaService.selectMetaExcelExportList(metaDataSearchVO);
            map.put(KeyWordType.META, list);

        }
        else if (KeyWordType.SUB_STATIS == keyWordType) { // 항목별 최종전송 데이터
            list = statisticsService.getRasmblyLastSendDataExcelExport();
            map.put(KeyWordType.SUB_STATIS, list);
        }
        else {
            map.put(999, list);
        }
        return new ModelAndView("excelDownView", "map", map);
    }
}
