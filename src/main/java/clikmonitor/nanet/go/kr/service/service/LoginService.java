package clikmonitor.nanet.go.kr.service.service;

import clikmonitor.nanet.go.kr.mapper.LoginMapper;
import clikmonitor.nanet.go.kr.dto.LoginVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by kimyongyeon on 2016-06-09.
 */
public interface LoginService {

    /**
     * Gets login proc.
     *
     * @param request the request
     * @param loginVO the login vo
     * @return the login proc
     */
/*
        LoginService 시작
    */
    boolean getLoginProc(HttpServletRequest request, LoginVO loginVO); // 로그인 처리
    /*
        LoginService 끝
    */

    /**
     * The type Login service.
     */
    @Service("loginService")
    class LoginServiceImpl implements LoginService {

        /**
         * The Login mapper.
         */
        @Resource(name = "loginMapper")
        LoginMapper loginMapper;

        private LoginVO loginVO;

        /**
         * Sets login vo.
         *
         * @param loginVO the login vo
         */
        public void setLoginVO(LoginVO loginVO) {
            this.loginVO = loginVO;
        }

        /**
         * Gets login vo.
         *
         * @return the login vo
         */
        public LoginVO getLoginVO() {
            return loginVO;
        }

        /**
         * 손님 유무 체크
         *
         * @return boolean boolean
         */
        public boolean isGuest() {
            if(getLoginVO() == null)
                return true;
            else
                return false;
        }

        /**
         * 회원 유무 체크
         *
         * @return boolean boolean
         */
        public boolean isMember() {
            return true;
            // todo : 서버로 올릴때 풀어야 함.
//            int result = loginMapper.selectLoginOne(getLoginVO());
//            if(result > 0) {
//                return true;
//            } else {
//                return false;
//            }
        }

        /**
         * 로그인 처리
         * @param loginVO
         * @return
         */
        @Override
        public boolean getLoginProc(HttpServletRequest request, LoginVO loginVO) {

            setLoginVO(loginVO);
            // 회원
            if(isMember()) {
                request.setAttribute("logininfo", getLoginVO());
                return true;
            }
            return false;
        }

    }
}
