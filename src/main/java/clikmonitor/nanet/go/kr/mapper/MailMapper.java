package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.MailVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * 메일 관리
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("mailMapper")
public interface MailMapper {

    /**
     * 메일링 발송내역 목록 조회
     *
     * @param mailSearchVO : 발송일자(당일,1주일,1개월) , 검색항목, 페이지번호
     * @return : 번호, 제목, 발송일시
     */
    List<MailVO> selectMailingSendPagingList(CommonSearchVO mailSearchVO);

    /**
     * 메일링 설정내역 목록 조회
     * @param mailSearchVO
     * @return
     */
    List<MailVO> selectMailingSetPagingList(CommonSearchVO mailSearchVO);

    /**
     * 메일링 발송내역 전체 카운트
     * @param mailSearchVO
     * @return
     */
    int selectMailingSendPagingTotalCount(CommonSearchVO mailSearchVO);
    /**
     * 메일링 설정 전체 카운트
     * @param mailSearchVO
     * @return
     */
    int selectMailingSetPagingTotalCount(CommonSearchVO mailSearchVO);

    /**
     * 메일링 발송내역 목록 엑셀저장
     *
     * @param mailSearchVO : 발송일자(당일,1주일,1개월) , 검색항목, 페이지번호
     * @return : 번호, 제목, 발송일시
     */
    List<MailVO> selectMailingExcelExportList(CommonSearchVO mailSearchVO);

    int selectMailSetCheck(MailVO mailVO);

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

}
