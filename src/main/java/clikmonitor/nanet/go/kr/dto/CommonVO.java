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
public class CommonVO {

    // -- 지역
    private String loasmCode; // 지역코드
    private String loasmNm; // 지역명

    private String code;
    private String codenm;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MainArea {
        String name; // 지역명
        String upDate; // 업데이트 날짜
        String code; // 지역코드 : 상세화면 진입용
        String gubun; // 광역, 기초 구분 코드
        String state; // 상태
    }

    // 지역정보 list
    private List<MainArea> areas;

    private List<CommonVO> listCommonVO;

}
