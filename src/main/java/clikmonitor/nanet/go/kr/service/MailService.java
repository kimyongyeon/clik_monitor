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

    int selectMailingSendPagingTotalCount(CommonSearchVO mailSearchVO);

    int selectMailingSetPagingTotalCount(CommonSearchVO mailSearchVO);

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
        public int selectMailingSendPagingTotalCount(CommonSearchVO mailSearchVO) {
            return mailMapper.selectMailingSendPagingTotalCount(mailSearchVO);
        }

        @Override
        public int selectMailingSetPagingTotalCount(CommonSearchVO mailSearchVO) {
            return mailMapper.selectMailingSetPagingTotalCount(mailSearchVO);
        }

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

            if(!"Fail".equals(mailVO.getAreas1()[0])) {
                mailVO.setRasmlyIds(mailVO.getAreas1()[0]);
            }
            if(!"Fail".equals(mailVO.getAreas2()[0])) {
                mailVO.setRasmlyIds(mailVO.getAreas2()[0]);
            }

            try {
                int i = mailMapper.selectMailSetCheck(mailVO);
                if(i > 0) {
                    mailMapper.updateMailingSetProc(mailVO);
                } else {
                    mailMapper.insertMailingSetProc(mailVO);
                }
            } catch (Exception e) {
                System.out.println(e.getStackTrace());
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
