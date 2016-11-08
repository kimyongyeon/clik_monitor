package clikmonitor.nanet.go.kr.vo;

import lombok.Data;

/**
 * 공통 검색 조건 : 많이 쓰는 검색조건은 이곳에 모아 둔다.
 * Created by kimyongyeon on 2016-07-19.
 */
@Data
public class CommonSearchVO {

    private static final long serialVersionUID = 1L;

    private String rasmblyId = ""; /* '지방의회_id'*/
    private String keyWordText; // 검색 텍스트
    private String keyWordType; // 검색 키워드
    private String brtcCode;
    private String insttClCode;
    private String startDate;
    private String endDate;
    private String loasmCode;

    // 페이징 관련
    private int currentPage = 1;
    private int pageIndex = 1;
    private int pageUnit = 10;
    private int pageSize = 10;
    private int firstIndex = 1;
    private int lastIndex = 1;
    private int recordCountPerPage = 10;
    private String searchCondition = "";
    private String searchKeyword = "";

}
