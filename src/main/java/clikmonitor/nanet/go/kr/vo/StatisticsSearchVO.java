package clikmonitor.nanet.go.kr.vo;

import lombok.Data;

/**
 * 통계관리 검색조
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
public class StatisticsSearchVO extends CommonSearchVO {
    private String keyWordSub;
    private String[] ramblyList;
}
