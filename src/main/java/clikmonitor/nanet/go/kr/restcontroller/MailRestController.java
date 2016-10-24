package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.*;
import clikmonitor.nanet.go.kr.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-08-22.
 */
@RestController
public class MailRestController {

    @Autowired
    MailService mailService;

    @RequestMapping(value = "/getMailList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<MailVO> getMailList(@ModelAttribute(value = "mailSearchVO") MailSearchVO mailSearchVO) throws Exception {
        return mailService.selectMailingSendPagingList(mailSearchVO);
    }

    @RequestMapping(value = "/getMailSetList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public List<MailVO> getMailSetList(@ModelAttribute(value = "mailSearchVO") MailSearchVO mailSearchVO) throws Exception {
        return mailService.selectMailingSetPagingList(mailSearchVO);
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
}
