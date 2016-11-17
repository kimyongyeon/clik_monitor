package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 임계값설정 검색조건
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
public class RangeSearchVO extends CommonSearchVO{
    private String colgoverSetId;
    private String keyWordSub;

}
