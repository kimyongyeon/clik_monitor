package clikmonitor.nanet.go.kr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentVO {
    private String rasmblyNm; // 의회명
    private String systemSttusCode; // Agent 상태
    private String serverNm; // 서버명
    private String installYear; // 설치년도
    private String serverIp; // 서버IP
    private String os; // OS
    private String was; // was
    private String cpu; // cpu
    private String ram; // ram
    private String lastDate; // 최종수집일
    private String modulePath; // 모듈설치경로
    private String memo; // 비고
    private String reqProcessingRatio; // 요청처리율
    private List<AgentVO> listAgentVO;
    private List<CommonVO.MainArea> areas1; // 광역의회
    private List<CommonVO.MainArea> areas2; // 기초의회
}
