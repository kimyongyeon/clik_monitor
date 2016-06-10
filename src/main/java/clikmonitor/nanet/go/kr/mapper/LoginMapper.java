package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.service.LoginVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * Created by kimyongyeon on 2016-06-09.
 */
@Mapper("loginMapper")
public interface LoginMapper {
    public int loginProc(LoginVO loginVO) throws Exception;
}
