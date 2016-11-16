package clikmonitor.nanet.go.kr.vo;

import lombok.Data;

/**
 * Created by kimyongyeon on 2016-08-29.
 */
@Data
public class AgentSearchVO extends CommonSearchVO {
    private String[] ramblyList; // 의회목록 선택항목
}
