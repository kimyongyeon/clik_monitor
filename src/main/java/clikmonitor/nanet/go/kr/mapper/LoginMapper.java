package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.LoginVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * Created by kimyongyeon on 2016-06-09.
 */
@Mapper("loginMapper")
public interface LoginMapper {

    /**
     * 사용자 아이디/패스워드로 조회
     *
     * @param loginVO the login vo
     * @return int int
     */
    int selectLoginOne(LoginVO loginVO); // 사용자 아이디/패스워드로 조회
}
