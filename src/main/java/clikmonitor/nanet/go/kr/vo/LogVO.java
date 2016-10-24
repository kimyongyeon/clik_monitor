package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogVO {

    private String requstId;
    private String requstInsttId;
    private String rasmblyNm;
    private String serverIp;
    private String provdInsttId;
    private String requstRecptnTm;
    private String resultCode;
    private String resultMssage;
    private String codeNm;
}
