package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.mapper.LoginMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by kimyongyeon on 2016-06-09.
 */
public interface LoginService {

    public int loginProc(LoginVO loginVO) throws Exception;

    @Service("loginService")
    public class LoginServiceImpl implements LoginService {

        @Resource(name = "loginMapper")
        LoginMapper loginMapper;

        /**
         * 로그인 처리
         * @param loginVO
         * @return
         * @throws Exception
         */
        @Override
        public int loginProc(LoginVO loginVO) throws Exception{
            return loginMapper.loginProc(loginVO);
        }
    }
}
