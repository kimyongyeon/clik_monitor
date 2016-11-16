package clikmonitor.nanet.go.kr.controller;

import clikmonitor.nanet.go.kr.service.MailService;
import clikmonitor.nanet.go.kr.service.MetaService;
import clikmonitor.nanet.go.kr.service.RangeService;
import clikmonitor.nanet.go.kr.service.StatisticsService;
import clikmonitor.nanet.go.kr.vo.*;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
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
            StatisticsSearchVO statisticsSearchVO = new StatisticsSearchVO();
            String brtcCode = request.getParameter("brtcCode");
            String insttClCode = request.getParameter("insttClCode");
            String loasmCode = request.getParameter("loasmCode");
            String startDate = request.getParameter("startDate");
            String endDate = request.getParameter("endDate");
            String keyWordSub = request.getParameter("keyWordSub");
            statisticsSearchVO.setBrtcCode(brtcCode);
            statisticsSearchVO.setInsttClCode(insttClCode);
            statisticsSearchVO.setLoasmCode(loasmCode);
            statisticsSearchVO.setStartDate(startDate);
            statisticsSearchVO.setEndDate(endDate);
            statisticsSearchVO.setKeyWordSub(keyWordSub);
            list = statisticsService.getRasmblyDataSendExcelExport(statisticsSearchVO);
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
            metaDataSearchVO.setSiteId(request.getParameter("siteId"));

            PaginationInfo paginationInfo = new PaginationInfo();
            int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
            int pageUnit = Integer.parseInt(request.getParameter("pageUnit"));
            paginationInfo.setCurrentPageNo(pageIndex); // 현재 페이지
            paginationInfo.setRecordCountPerPage(pageUnit); // 페이지 갯수
            paginationInfo.setTotalRecordCount(metaService.selectMetaDataRecordTotalCount(metaDataSearchVO));  // 전체카운트

            metaDataSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            metaDataSearchVO.setRecordCountPerPage(pageUnit);
            list = metaService.selectMetaExcelExportList(metaDataSearchVO);
            map.put(KeyWordType.META, list);

        }
        else if (KeyWordType.SUB_STATIS == keyWordType) { // 항목별 최종전송 데이터
            StatisticsSearchVO statisticsSearchVO = new StatisticsSearchVO();
            String brtcCode = request.getParameter("brtcCode");
            String insttClCode = request.getParameter("insttClCode");
            String loasmCode = request.getParameter("loasmCode");
            String startDate = request.getParameter("startDate");
            String endDate = request.getParameter("endDate");
            String keyWordSub = request.getParameter("keyWordSub");
            statisticsSearchVO.setBrtcCode(brtcCode);
            statisticsSearchVO.setInsttClCode(insttClCode);
            statisticsSearchVO.setLoasmCode(loasmCode);
            statisticsSearchVO.setStartDate(startDate);
            statisticsSearchVO.setEndDate(endDate);
            statisticsSearchVO.setKeyWordSub(keyWordSub);
            list = statisticsService.getRasmblyLastSendDataExcelExport(statisticsSearchVO);
            map.put(KeyWordType.SUB_STATIS, list);
        }
        else {
            map.put(999, list);
        }
        return new ModelAndView("excelDownView", "map", map);
    }
}
