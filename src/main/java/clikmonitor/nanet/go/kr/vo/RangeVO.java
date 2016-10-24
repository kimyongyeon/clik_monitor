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
public class RangeVO {
    private String  subRasmblyNmNo; // 의회번호
    private String  colgoverSetId; // 설정정보 primary key
    private String  rasmblyId = ""; /* '지방의회_id'*/
    private String  subRasmblyNm; // 의회명
    private String  rasmblyNm; // 의회명
    private String  setInterval = ""; /* '요청시간간격' */
    private String  installYear = "";/* '설치년도'*/
    private String  server = "";/* '서버명'*/
    private String  os = "";/* 'os명'*/
    private String  was = "";/* 'was명'*/
    private String  cpu = "";/* 'cpu명'*/
    private String  ram = "";/* 'ram명'*/
    private String  moduleInstallPath = "";/* '모듈설치경로'*/
    private String  note = "";/* '비고'*/
    private String  reqProcessingRatio = "";/* '요청처리율'*/
    private String  lastCntcDt = ""; /* 최종수정일 */

}
