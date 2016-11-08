package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartVO {

    private String xData;
    private String yData;
    private String title;
    private String rasmblyNm;
    private String dt;
    private String ordr;
    private String cntcId;

    // Agent 서버 정보 바 차트 X축 날짜
    private String x1; // 회의록
    private String x2; // 부록
    private String x3; // 의안
    private String x4; // 의원
    // Agent 서버 정보 바 차트 Y축 데이터 수
    private String y1;
    private String y2;
    private String y3;
    private String y4;
}
