package clikmonitor.nanet.go.kr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsVO {
    private String subRasmblyNmNo; // 의회번호
    private String rasmblyNmNo; // 지방의회번호
    private String subRasmblyNm; // 의회명
    private String rasmblyNm; // 의회명
    private String cntcResultId = ""; //IS 연계_결과_ID
    private String numprCount = ""; //IS '대수_개수';
    private String sesnCount = ""; // IS '회기_개수';
    private String estCount = ""; // IS '선거구_개수';
    private String mtgnmCount = ""; // IS '회의명_개수';
    private String asembyCount = ""; // IS '의원_개수';
    private String ofcpsCount = ""; // IS '의원직위_개수';
    private String asembyactCount = ""; // IS '의원활동_개수';
    private String biCount = ""; // IS '의안_개수';
    private String bifileCount = ""; // IS '의안파일_개수';
    private String bimintsCount = ""; // IS '의안회의록_개수';
    private String itncasembyCount = ""; // IS '발의의원_개수';
    private String mintsCount = ""; // IS '회의록_개수';
    private String apndxCount = ""; // IS '부록_개수';
    private String mtrCount = ""; // IS '안건_개수';
    private String spkngCount = ""; // IS '발언_개수';

}
