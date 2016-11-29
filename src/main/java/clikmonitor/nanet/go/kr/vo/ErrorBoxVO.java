package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-08-03.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorBoxVO {
    private String code;
    private String msg;
    private String uid;
    private String requstId; // 코드 ( 팝업을 위해)
    private String popupState; // 코드
    private String requstInsttId; // 의회코드
    private String cntcId; // 상태
    private String serverIp; // IP
    private String resultCode; // 결과코드
    private String frstRegistPnttm; // 받은시간
}
