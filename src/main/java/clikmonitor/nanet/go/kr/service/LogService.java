package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.ErrorBoxVO;
import clikmonitor.nanet.go.kr.vo.LogVO;
import clikmonitor.nanet.go.kr.mapper.LogMapper;
import clikmonitor.nanet.go.kr.vo.MailVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.sym.error;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
public interface LogService {

    List<LogVO> selectErrorLogInfoList(CommonSearchVO logVO);

    LogVO selectErrorLogInfoOne(CommonSearchVO logVO);

    LogVO selectErrorLogButtonShowHideOne(CommonSearchVO logVO);

    int selectErrorLogInfoListTotalRecordCount(CommonSearchVO logVO);

    List<ErrorBoxVO> selectErrorLogBubbleList();

    void updateErrorLogBublle(ErrorBoxVO errorBoxVO);

    @Service("logService")
    class LogServiceImpl implements LogService {

        @Resource(name = "logMapper")
        LogMapper logMapper;

        @Override
        public void updateErrorLogBublle(ErrorBoxVO errorBoxVO) {
            logMapper.updateErrorLogBublle(errorBoxVO);
        }

        @Override
        public List<ErrorBoxVO> selectErrorLogBubbleList() {
            return logMapper.selectErrorLogBubbleList();
        }

        @Override
        public LogVO selectErrorLogButtonShowHideOne(CommonSearchVO logVO) {
            return logMapper.selectErrorLogButtonShowHideOne(logVO);
        }

        /**
         * 에러로그 목록
         * @param logVO
         * @return
         */
        @Override
        public List<LogVO> selectErrorLogInfoList(CommonSearchVO logVO) {
            return logMapper.selectErrorLogInfoList(logVO);
        }

        /**
         * 에러로그 상세보기
         * @param logVO
         * @return
         */
        @Override
        public LogVO selectErrorLogInfoOne(CommonSearchVO logVO) {
            return logMapper.selectErrorLogInfoOne(logVO);
        }

        @Override
        public int selectErrorLogInfoListTotalRecordCount(CommonSearchVO logVO) {
            return logMapper.selectErrorLogInfoListTotalRecordCount(logVO);
        }
    }
}
