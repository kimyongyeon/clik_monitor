package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.mapper.MailMapper;
import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.MailVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
public interface MailService {

    /**
     * 메일링 발송내역 목록 조회
     *
     * @param mailSearchVO : 발송일자(당일,1주일,1개월) , 검색항목, 페이지번호
     * @return : 번호, 제목, 발송일시
     */
    List<MailVO> selectMailingSendPagingList(CommonSearchVO mailSearchVO);

    List<MailVO> selectMailingSetPagingList(CommonSearchVO mailSearchVO);

    /**
     * 메일링 발송내역 목록 엑셀저장
     *
     * @param mailSearchVO : 발송일자(당일,1주일,1개월) , 검색항목, 페이지번호
     * @return : 번호, 제목, 발송일시
     */
    List<MailVO> selectMailingExcelExportList(CommonSearchVO mailSearchVO);

    /**
     * 메일설정 저장
     *
     * @param mailVO : 제목, 의회, 받는사람
     */
    void insertMailingSetProc(MailVO mailVO);

    /**
     * 메일설정 수정
     *
     * @param mailVO : 제목, 의회, 받는사람
     */
    void updateMailingSetProc(MailVO mailVO);

    /**
     * 메일설정 삭제
     *
     * @param mailVO : 제목, 의회, 받는사람
     */
    void deleteMailingSetProc(MailVO mailVO);

    @Service("mailService")
    class MailServiceImpl implements MailService {

        @Resource(name = "mailMapper")
        MailMapper mailMapper;

        @Override
        public List<MailVO> selectMailingSetPagingList(CommonSearchVO mailSearchVO) {
            return mailMapper.selectMailingSetPagingList(mailSearchVO);
        }

        @Override
        public List<MailVO> selectMailingSendPagingList(CommonSearchVO mailSearchVO) {
            return mailMapper.selectMailingSendPagingList(mailSearchVO);
        }

        @Override
        public List<MailVO> selectMailingExcelExportList(CommonSearchVO mailSearchVO) {
            return mailMapper.selectMailingExcelExportList(mailSearchVO);
        }

        @Override
        public void insertMailingSetProc(MailVO mailVO) {

            Set<String> rasmlyIds = new TreeSet<>();
            Set<String> recvs = new TreeSet<>();
            // 지방의회 광역중 선택된 의회만 String으로 저장한다.
//            rasmlyIds.addAll(mailVO.getAreas1().stream().filter(m->m.getChecked().equals("true")).map(m->m.getName()).collect(Collectors.toList()));
            // 지방의회 기초중 선택된 의회만 String으로 저장한다.
//            rasmlyIds.addAll(mailVO.getAreas2().stream().filter(m->m.getChecked().equals("true")).map(m->m.getName()).collect(Collectors.toList()));
            // 관리할 지방의회를 콤바로 저장
//            mailVO.setRasmlyIds(rasmlyIds.stream().collect(Collectors.joining(",")));
            // 받을사람중 선택된 이메일로 String으로 저장한다.
//            recvs.addAll(mailVO.getRecvs().stream().filter(m->m.getChecked().equals("true")).map(m->m.getName()).collect(Collectors.toList()));
            // 의회별 관리에 대한 받을사람 이메일 주소를 콤바로 저장
//            mailVO.setReceiver(recvs.stream().collect(Collectors.joining(",")));
            // select로 바뀌면서 아래 로직을 바꿈. VO checkbox vo도 변경함.
            if(!"".equals(mailVO.getAreas1()[0])) {
                if(mailVO.getAreas1().length != 0) {
                    mailVO.setRasmlyIds(mailVO.getAreas1()[0]);
                }
            }
            if(!"".equals(mailVO.getAreas2()[0])) {
                if(mailVO.getAreas2().length != 0) {
                    mailVO.setRasmlyIds(mailVO.getAreas2()[0]);
                }
            }

            mailVO.setReceiver(mailVO.getReceiver());
            try {
                mailMapper.insertMailingSetProc(mailVO);
            } catch (Exception e) {
                mailMapper.updateMailingSetProc(mailVO);
            }
        }

        @Override
        public void updateMailingSetProc(MailVO mailVO) {
            mailMapper.updateMailingSetProc(mailVO);
        }

        @Override
        public void deleteMailingSetProc(MailVO mailVO) {
            mailMapper.deleteMailingSetProc(mailVO);
        }
    }
}
