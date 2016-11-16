package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 차트 검색조건
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
public class ChartSearchVO extends CommonSearchVO {
    private String xData;
    private String yData;
    private String title;
    private String cntcId;
    private String[] ramblyList; // 의회목록 선택항목
    private String[] dataTypeList; // 희의록, 부록, 의안, 의원 선택항목
    private String month; // 1,3,6 개월
    private String searchRamblyKeyword;
    private String searchDataTypeKeyword;
    private String[] cntcIdList;

}
