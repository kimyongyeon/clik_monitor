package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-08-22.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetaDataVO {
    private String rnum; // 번호
    private String num; // 번호
    private String area; // 지역
    private String seednm;
    private String seedid;
    private String seedurl;
    private String doctypeName;
    private String sitenm;
    private String siteid;
    private String url;
    private String regdate;
}
