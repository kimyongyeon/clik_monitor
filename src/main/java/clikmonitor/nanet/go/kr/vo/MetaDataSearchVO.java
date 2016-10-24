package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 메타데이터 검색조건
 * Created by kimyongyeon on 2016-08-22.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetaDataSearchVO extends CommonSearchVO {
    private String region; // 지역명
    private String siteNm; // 사이트명
}
