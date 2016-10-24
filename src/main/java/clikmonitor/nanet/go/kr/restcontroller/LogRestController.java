package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.vo.LogSearchVO;
import clikmonitor.nanet.go.kr.vo.LogVO;
import clikmonitor.nanet.go.kr.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-08-05.
 */
@RestController
public class LogRestController {

    @Autowired
    LogService logService;

    /**
     * 에러로그 데이터 목록
     * @param logVO
     * @return
     */
    @RequestMapping(value = "/logList", method = RequestMethod.GET)
    public List<LogVO> getLogList(@ModelAttribute(value = "logVO") LogSearchVO logVO) {
        return logService.selectErrorLogInfoList(logVO);
    }

    /**
     * 에러로그 데이터 상세보기
     * @param logVO
     * @return
     */
    @RequestMapping(value = "/logDetail", method = RequestMethod.GET)
    public LogVO getLogDetail(@ModelAttribute(value = "logVO") LogSearchVO logVO) {
        return logService.selectErrorLogInfoOne(logVO);
    }
}
