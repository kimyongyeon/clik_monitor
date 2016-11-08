package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentVO {
    private String rasmblyNm; // 의회명
    private String rasmblyId; // 의회코드
    private String rasmblyCode; // 의회코드
    private String systemSttusCode; // Agent 상태
    private String rasmblySttusCode; // 의회상태코드
    private String serverNm; // 서버명
    private String installYear; // 설치년도
    private String serverIp; // 서버IP
    private String server; // 서버IP
    private String os; // OS
    private String was; // was
    private String cpu; // cpu
    private String ram; // ram
    private String lastUpdtDt; // 수정일
    private String lastCntcDt; // 수정일
    private String deleteDt; // 삭제일
    private String moduleInstallPath; // 모듈설치경로
    private String isview; // 화면 출력 여부
    private String note; // 비고
    private String memo;
    private String reqProcessingRatio; // 요청처리율
    private String setInterval; // 응답률
    private String gubun; // 기초, 광역
    private List<AgentVO> listAgentVO;
    private List<CommonVO.MainArea> areas1; // 광역의회
    private List<CommonVO.MainArea> areas2; // 기초의회
    private String updateDt;
    private int reqstNo;
    private String cmmndNm;
    private String cmmndCode;
    private String exeCmmnd;
    private String trgetFilePath;
    private String trgetFileSize;
    private String logFileName;
    private String logFileLineCo;
    private String callUrl;
    private String cmmndTrnsmisAt;
    private String cmmndTrnsmisDt;
    private String cmmndExcDt;
    private String cmmndExcAt;
    private String cmmndExcData;
    private String cmmndExcCnfirmAt;
    private String frstRegisterId;
    private String frstRegistDt;
    private String trgetFileStrePath;
    private MultipartFile files;

}
