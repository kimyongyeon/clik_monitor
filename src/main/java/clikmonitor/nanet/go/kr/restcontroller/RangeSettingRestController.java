package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.RangeSearchVO;
import clikmonitor.nanet.go.kr.vo.RangeVO;
import clikmonitor.nanet.go.kr.service.RangeService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by kimyongyeon on 2016-08-22.
 */
@RestController
public class RangeSettingRestController {

    @Autowired
    RangeService rangeService;

    /**
     * 임계값 설정 데이터 목록
     * @param rangeSearchVO
     * @return
     */
    @RequestMapping(value = "/getRangeSettingList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getRangeSettingList(@RequestBody RangeSearchVO rangeSearchVO) {
        Map map = new HashMap();
        map.put("list", rangeService.getRangeSetPagingList(rangeSearchVO));
        return map;
    }

    /**
     * 임계값 설정 상세화면
     * @param rangeSearchVO
     * @return
     */
    @RequestMapping(value = "/getRangeSettingDetail.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public RangeVO getRangeSettingDetail(@ModelAttribute(value = "rangeSearchVO") RangeSearchVO rangeSearchVO) {
        return rangeService.getRangeSetDetail(rangeSearchVO);
    }

    /**
     * 임계값 수정 처리
     * @param rangeVO
     * @return
     */
    @RequestMapping(value = "/getRangeSettingEditProc.do", method = RequestMethod.PUT)
    public ResponseEntity<String> getRangeSettingEditProc(@RequestBody RangeVO rangeVO) {
        ResponseEntity<String> entity = null;
        try {
            rangeService.editRangeSetProc(rangeVO);
            entity = new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e) {
            entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    /**
     * 임계값 삭제 처리
     * @param rangeVO
     * @return
     */
    @RequestMapping(value = "/getRangeSettingDelProc.do", method = RequestMethod.DELETE)
    public ResponseEntity<String> getRangeSettingDelProc(@RequestBody RangeVO rangeVO) {
        ResponseEntity<String> entity = null;
        try {
            rangeService.delRangeSetProc(rangeVO);
            entity = new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e) {
            entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    /**
     * 임계값 등록 처리
     * @param rangeVO
     * @return
     */
    @RequestMapping(value = "/getRangeSettingRegProc.do", method = RequestMethod.POST)
    public ResponseEntity<String> getRangeSettingRegProc(@RequestBody RangeVO rangeVO) {

        ResponseEntity<String> entity = null;
        try {
            rangeService.regRangeSetProc(rangeVO);
            entity = new ResponseEntity<String>("success", HttpStatus.CREATED);
        } catch (Exception e) {
            entity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

}
