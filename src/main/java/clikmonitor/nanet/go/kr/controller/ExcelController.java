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
        String keyWordType = request.getParameter("keyWordType");
        List list = new ArrayList();
        Map map = new HashMap();
        if(KeyWordType.STATIS.equals(keyWordType)) { // 의회별 전송 데이터
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
            map.put("menu", KeyWordType.STATIS);
            map.put("100", startDate);
            map.put("200", endDate);
        }
        else if (KeyWordType.RANGE.equals(keyWordType)) { // 임계값
            RangeSearchVO rangeSearchVO = new RangeSearchVO();
            String brtcCode = request.getParameter("brtcCode");
            String insttClCode = request.getParameter("insttClCode");
            String loasmCode = request.getParameter("loasmCode");
            String keyWordSub = request.getParameter("keyWordSub");
            rangeSearchVO.setBrtcCode(brtcCode);
            rangeSearchVO.setInsttClCode(insttClCode);
            rangeSearchVO.setLoasmCode(loasmCode);
            rangeSearchVO.setKeyWordSub(keyWordSub);
            list = rangeService.selectRangeExcelExportList(rangeSearchVO);
            map.put(KeyWordType.RANGE, list);
            map.put("menu", KeyWordType.RANGE);
        }
        else if (KeyWordType.MAIL.equals(keyWordType)) { // 메일링
            MailSearchVO mailSearchVO = new MailSearchVO();
            String startDate = request.getParameter("startDate");
            String endDate = request.getParameter("endDate");
            String keyWordSub = request.getParameter("keyWordSub");
            String keyWordText = request.getParameter("keyWordText");
            mailSearchVO.setStartDate(startDate);
            mailSearchVO.setEndDate(endDate);
            mailSearchVO.setKeyWordSub(keyWordSub);
            mailSearchVO.setKeyWordText(keyWordText);

            PaginationInfo paginationInfo = new PaginationInfo();
            int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
            int pageUnit = Integer.parseInt(request.getParameter("pageUnit"));
            paginationInfo.setCurrentPageNo(pageIndex); // 현재 페이지
            paginationInfo.setRecordCountPerPage(pageUnit); // 페이지 갯수
            paginationInfo.setTotalRecordCount(mailService.selectMailingSendPagingTotalCount(mailSearchVO));  // 전체카운트

            mailSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            mailSearchVO.setRecordCountPerPage(pageUnit);

            list = mailService.selectMailingExcelExportList(mailSearchVO);
            map.put(KeyWordType.MAIL, list);
            map.put("menu", KeyWordType.MAIL);
        }
        else if (KeyWordType.META.equals(keyWordType)) { // 메타데이터관리
            MetaDataSearchVO metaDataSearchVO = new MetaDataSearchVO();

            String startDate = request.getParameter("startDate");
            String endDate = request.getParameter("endDate");

            metaDataSearchVO.setStartDate(startDate);
            metaDataSearchVO.setEndDate(endDate);
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
            map.put("menu", KeyWordType.META);
            map.put("100", startDate);
            map.put("200", endDate);

        }
        else if (KeyWordType.SUB_STATIS.equals(keyWordType)) { // 항목별 최종전송 데이터
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
            map.put("menu", KeyWordType.SUB_STATIS);
            map.put("100", startDate);
            map.put("200", endDate);
        }
        else {
            map.put(999, list);
        }
        return new ModelAndView("excelDownView", "map", map);
    }
}
