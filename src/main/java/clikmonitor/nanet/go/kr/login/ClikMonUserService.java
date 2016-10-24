package clikmonitor.nanet.go.kr.login;

import clikmonitor.nanet.go.kr.vo.LoginVO;
import clikmonitor.nanet.go.kr.mapper.LoginMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;

import javax.annotation.Resource;

/**
 * Created by kimyongyeon on 2016-08-29.
 */
public class ClikMonUserService implements UserDetailsService {

    @Resource(name = "loginMapper")
    LoginMapper loginMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        StandardPasswordEncoder standardPasswordEncoder = new StandardPasswordEncoder();
        ClikMonUser clikMonUser = new ClikMonUser();
        LoginVO loginVO = new LoginVO();
        loginVO.setId(userName);

        try{
            LoginVO resultVO = loginMapper.selectLoginOne(loginVO);
            clikMonUser.setUsername(userName);
            String pw = resultVO.getPw();
            clikMonUser.setPassword(standardPasswordEncoder.encode(pw));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return clikMonUser;
    }

}
