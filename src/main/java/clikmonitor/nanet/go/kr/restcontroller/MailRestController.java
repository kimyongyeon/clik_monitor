package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.*;
import clikmonitor.nanet.go.kr.service.MailService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-08-22.
 */
@RestController
public class MailRestController {

    @Autowired
    MailService mailService;

    /**
     * 발송내역
     * @param mailSearchVO
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMailList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getMailList(@ModelAttribute(value = "mailSearchVO") MailSearchVO mailSearchVO) throws Exception {

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(mailSearchVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(mailSearchVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(mailSearchVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(mailService.selectMailingSendPagingTotalCount(mailSearchVO));  // 전체카운트

        Map returnMap = new HashMap();
        mailSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        mailSearchVO.setRecordCountPerPage(mailSearchVO.getPageUnit());
        returnMap.put("list", mailService.selectMailingSendPagingList(mailSearchVO));
        returnMap.put("paginationInfo", paginationInfo);

        return returnMap;
    }

    /**
     * 메일목록
     * @param mailSearchVO
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getMailSetList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getMailSetList(@ModelAttribute(value = "mailSearchVO") MailSearchVO mailSearchVO) throws Exception {

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(mailSearchVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(mailSearchVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(mailSearchVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(mailService.selectMailingSetPagingTotalCount(mailSearchVO));  // 전체카운트

        Map returnMap = new HashMap();
        mailSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        mailSearchVO.setRecordCountPerPage(mailSearchVO.getPageUnit());
        returnMap.put("list", mailService.selectMailingSetPagingList(mailSearchVO));
        returnMap.put("paginationInfo", paginationInfo);

        return returnMap;
    }

    /**
     * 메일 등록 처리
     * @param mailVO
     * @return
     */
    @RequestMapping(value = "/getMailSettingSaveProc.do", method = RequestMethod.POST)
    public ResponseEntity<String> getMailSettingSaveProc(@RequestBody MailVO mailVO) throws Exception {
        ResponseEntity<String> entity = null;
        try {
            mailService.insertMailingSetProc(mailVO);
            entity = new ResponseEntity<String>("success", HttpStatus.CREATED);
        } catch (Exception e) {
            entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
            System.out.println(e.getMessage());
        }
        return entity;
    }
    /**
     * 메일 삭제 처리
     * @param mailVO
     * @return
     */
    @RequestMapping(value = "/getMailSettingDelProc.do", method = RequestMethod.POST)
    public ResponseEntity<String> getMailSettingDelProc(@RequestBody MailVO mailVO) throws Exception {
        ResponseEntity<String> entity = null;
        try {
            mailService.deleteMailingSetProc(mailVO);
            entity = new ResponseEntity<String>("success", HttpStatus.CREATED);
        } catch (Exception e) {
            entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
            System.out.println(e.getMessage());
        }
        return entity;
    }
}
