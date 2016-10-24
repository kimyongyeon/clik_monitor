package clikmonitor.nanet.go.kr.component;

import clikmonitor.nanet.go.kr.vo.*;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-09-01.
 */
public class ExcelComponent extends AbstractExcelView {

    @Override
    protected void buildExcelDocument(Map model, HSSFWorkbook wb, HttpServletRequest req, HttpServletResponse resp) throws Exception {

        Map<String, Object> map= (Map<String, Object>) model.get("map");
        List<Object> list = new ArrayList<>();
        HSSFCell cell = null;
        HSSFSheet sheet = null;

        String titles[] = {"의회별 전송 데이터 ", "임계값설정", "메일링관리", "메타데이터관리", "항목별 최종전송 데이터 "};

        int conditionData = 0;
        Iterator iterator = map.keySet().iterator();
        while(iterator.hasNext()) {
            conditionData = (Integer)iterator.next();
        }

        if(conditionData == KeyWordType.STATIS) {

            // 시트명
            list = (List<Object>) map.get(KeyWordType.STATIS);
            sheet = wb.createSheet(titles[0]);
            sheet.setDefaultColumnWidth((short) 12);
            // 헤더명
            cell = getCell(sheet, 0, 0);
            setText(cell, titles[0]);

            // 데이터 : 의회별 전송 데이터
            // set header information
            setText(getCell(sheet, 2, 0), "의회");
            setText(getCell(sheet, 2, 1), "지방의회");
            setText(getCell(sheet, 2, 2), "대수");
            setText(getCell(sheet, 2, 3), "회기");
            setText(getCell(sheet, 2, 4), "선거구");
            setText(getCell(sheet, 2, 5), "회의명");
            setText(getCell(sheet, 2, 6), "의원");
            setText(getCell(sheet, 2, 7), "의원활동");
            setText(getCell(sheet, 2, 8), "의원직위");
            setText(getCell(sheet, 2, 9), "회의록");
            setText(getCell(sheet, 2, 10), "안건");
            setText(getCell(sheet, 2, 11), "발언");
            setText(getCell(sheet, 2, 12), "발언답변");
            setText(getCell(sheet, 2, 13), "부록");
            setText(getCell(sheet, 2, 14), "의안정보");
            setText(getCell(sheet, 2, 15), "발의의원");
            setText(getCell(sheet, 2, 16), "의안파일");
            setText(getCell(sheet, 2, 17), "의안회의록");
            boolean isVO = false;
            if (list.size() > 0) {
                Object obj = list.get(0);
                isVO = obj instanceof StatisticsVO;
            }
            for (int i = 0; i < list.size(); i++) {
                if (isVO) {	// VO
                    StatisticsVO vo = (StatisticsVO) list.get(i);
                    cell = getCell(sheet, 3 + i, 0);
                    setText(cell, "기초/광역");
                    cell = getCell(sheet, 3 + i, 1);
                    setText(cell, vo.getRasmblyNm()+"");
                    cell = getCell(sheet, 3 + i, 2);
                    setText(cell, vo.getNumprCount()+"");
                    cell = getCell(sheet, 3 + i, 3);
                    setText(cell, vo.getSesnCount()+"");
                    cell = getCell(sheet, 3 + i, 4);
                    setText(cell, vo.getEstCount()+"");
                    cell = getCell(sheet, 3 + i, 5);
                    setText(cell, vo.getMtgnmCount()+"");
                    cell = getCell(sheet, 3 + i, 6);
                    setText(cell, vo.getAsembyCount()+"");
                    cell = getCell(sheet, 3 + i, 7);
                    setText(cell, vo.getAsembyactCount()+"");
                    cell = getCell(sheet, 3 + i, 8);
                    setText(cell, vo.getOfcpsCount()+"");
                    cell = getCell(sheet, 3 + i, 9);
                    setText(cell, vo.getMintsCount()+"");
                    cell = getCell(sheet, 3 + i, 10);
                    setText(cell, vo.getMtrCount()+"");
                    cell = getCell(sheet, 3 + i, 11);
                    setText(cell, vo.getSpkngCount()+"");
                    cell = getCell(sheet, 3 + i, 12);
                    setText(cell, vo.getNumprCount()+"");
                    cell = getCell(sheet, 3 + i, 13);
                    setText(cell, vo.getApndxCount()+"");
                    cell = getCell(sheet, 3 + i, 14);
                    setText(cell, vo.getAsembyCount()+"");
                    cell = getCell(sheet, 3 + i, 15);
                    setText(cell, vo.getItncasembyCount()+"");
                    cell = getCell(sheet, 3 + i, 16);
                    setText(cell, vo.getBifileCount()+"");
                    cell = getCell(sheet, 3 + i, 17);
                    setText(cell, vo.getBimintsCount()+"");
                }
            }
        }
        if(conditionData == KeyWordType.SUB_STATIS) {

            // 시트명
            list = (List<Object>) map.get(KeyWordType.SUB_STATIS);
            sheet = wb.createSheet(titles[4]);
            sheet.setDefaultColumnWidth((short) 12);
            // 헤더명
            cell = getCell(sheet, 0, 0);
            setText(cell, titles[4]);

            // 데이터 : 의회별 전송 데이터
            // set header information
            setText(getCell(sheet, 2, 0), "의회");
            setText(getCell(sheet, 2, 1), "지방의회");
            setText(getCell(sheet, 2, 2), "회의록최종일자");
            setText(getCell(sheet, 2, 3), "안건최종일자");
            setText(getCell(sheet, 2, 4), "발언최종일자");
            setText(getCell(sheet, 2, 5), "발언답변최종일자");
            setText(getCell(sheet, 2, 6), "부록최종일자");
            setText(getCell(sheet, 2, 7), "의안최종일자");
            boolean isVO = false;
            if (list.size() > 0) {
                Object obj = list.get(0);
                isVO = obj instanceof StatisticsVO;
            }
            for (int i = 0; i < list.size(); i++) {
                if (isVO) {	// VO
                    StatisticsVO vo = (StatisticsVO) list.get(i);
                    cell = getCell(sheet, 3 + i, 0);
                    setText(cell, "기초/광역");
                    cell = getCell(sheet, 3 + i, 1);
                    setText(cell, vo.getRasmblyNm()+""); // 지방의회
                    cell = getCell(sheet, 3 + i, 2);
                    setText(cell, vo.getBillMinutesFrstRegistDt()+""); // 회의록
                    cell = getCell(sheet, 3 + i, 3);
                    setText(cell, vo.getItemFrstRegistDt()+""); // 안건 itemFrstRegistDt
                    cell = getCell(sheet, 3 + i, 4);
                    setText(cell, vo.getMinutesStatementFrstRegistDt()+""); // 발언 minutesStatementFrstRegistDt
                    cell = getCell(sheet, 3 + i, 5);
                    setText(cell, vo.getMinutesAnswerFrstRegistDt()+""); // 발언답변 minutesAnswerFrstRegistDt
                    cell = getCell(sheet, 3 + i, 6);
                    setText(cell, vo.getMinutesAppendixFrstRegistDt()+""); // 부록 minutesAppendixFrstRegistDt
                    cell = getCell(sheet, 3 + i, 7);
                    setText(cell, vo.getBillFrstRegistDt()+""); // 의안 billFrstRegistDt
                }
            }
        }
        if(conditionData == KeyWordType.RANGE) {

            // 시트명
            list = (List<Object>) map.get(KeyWordType.RANGE);
            sheet = wb.createSheet(titles[1]);
            sheet.setDefaultColumnWidth((short) 12);
            // 헤더명
            cell = getCell(sheet, 0, 0);
            setText(cell, titles[1]);

            // 데이터 : 의회별 전송 데이터
            // set header information
            setText(getCell(sheet, 2, 0), "의회");
            setText(getCell(sheet, 2, 1), "지방의회");
            setText(getCell(sheet, 2, 2), "응답시간");
            setText(getCell(sheet, 2, 3), "요청처리율");
            setText(getCell(sheet, 2, 4), "최종수정일");
            boolean isVO = false;
            if (list.size() > 0) {
                Object obj = list.get(0);
                isVO = obj instanceof RangeVO;
            }
            for (int i = 0; i < list.size(); i++) {
                if (isVO) {	// VO
                    RangeVO vo = (RangeVO) list.get(i);
                    cell = getCell(sheet, 3 + i, 0);
                    setText(cell, "기초/광역"); // subRasmblyNm
                    cell = getCell(sheet, 3 + i, 1);
                    setText(cell, vo.getRasmblyNm()+""); // rasmblyNm
                    cell = getCell(sheet, 3 + i, 2);
                    setText(cell, vo.getSetInterval()+""); // setInterval
                    cell = getCell(sheet, 3 + i, 3);
                    setText(cell, vo.getReqProcessingRatio()+""); // reqProcessingRatio
                    cell = getCell(sheet, 3 + i, 4);
                    setText(cell, vo.getLastCntcDt()+""); // lastCntcDt
                }
            }
        }
        if(conditionData == KeyWordType.MAIL) {
            list = (List<Object>) map.get( KeyWordType.MAIL);
            sheet = wb.createSheet(titles[2]);
            sheet.setDefaultColumnWidth((short) 12);
            cell = getCell(sheet, 0, 0);
            setText(cell, titles[2]);

            // 데이터 : 메일
            // set header information
            setText(getCell(sheet, 2, 0), "번호");
            setText(getCell(sheet, 2, 1), "제목");
            setText(getCell(sheet, 2, 2), "발송일자");
            boolean isVO = false;
            if (list.size() > 0) {
                Object obj = list.get(0);
                isVO = obj instanceof MailVO;
            }
            for (int i = 0; i < list.size(); i++) {
                if (isVO) {	// VO
                    MailVO vo = (MailVO) list.get(i);
                    cell = getCell(sheet, 3 + i, 0);
                    setText(cell, vo.getNo()+"");
                    cell = getCell(sheet, 3 + i, 1);
                    setText(cell, vo.getTitle()+"");
                    cell = getCell(sheet, 3 + i, 2);
                    setText(cell, vo.getSendDate()+"");
                }
            }
        }
        // todo : 구현예정
        if(conditionData == KeyWordType.META) {
            list = (List<Object>) map.get(KeyWordType.META);
            sheet = wb.createSheet(titles[3]);
            sheet.setDefaultColumnWidth((short) 12);
            cell = getCell(sheet, 0, 0);
            setText(cell, titles[3]);

            // 데이터 : 메타
            // set header information
            setText(getCell(sheet, 2, 0), "번호");
            setText(getCell(sheet, 2, 1), "지역명");
            setText(getCell(sheet, 2, 2), "사이트명");
            setText(getCell(sheet, 2, 3), "사이트ID");
            setText(getCell(sheet, 2, 4), "사이트URL");
            setText(getCell(sheet, 2, 5), "자료유형");
            setText(getCell(sheet, 2, 6), "게시판명");
            setText(getCell(sheet, 2, 7), "게시판URL");
            setText(getCell(sheet, 2, 8), "최종등록일");
            boolean isVO = false;
            if (list.size() > 0) {
                Object obj = list.get(0);
                isVO = obj instanceof MailVO;
            }
            for (int i = 0; i < list.size(); i++) {
                if (isVO) {	// VO
                    MetaDataVO vo = (MetaDataVO) list.get(i);
                    cell = getCell(sheet, 3 + i, 0);
                    setText(cell, vo.getNum()+"");
                    cell = getCell(sheet, 3 + i, 1);
                    setText(cell, vo.getArea()+"");
                    cell = getCell(sheet, 3 + i, 2);
                    setText(cell, vo.getSeednm()+"");
                    cell = getCell(sheet, 3 + i, 3);
                    setText(cell, vo.getSeedid()+"");
                    cell = getCell(sheet, 3 + i, 4);
                    setText(cell, vo.getSeedurl()+"");
                    cell = getCell(sheet, 3 + i, 5);
                    setText(cell, vo.getDoctypeName()+"");
                    cell = getCell(sheet, 3 + i, 6);
                    setText(cell, vo.getSitenm()+"");
                    cell = getCell(sheet, 3 + i, 7);
                    setText(cell, vo.getUrl()+"");
                    cell = getCell(sheet, 3 + i, 8);
                    setText(cell, vo.getRegdate()+"");
                }
            }
        }

    }
}
