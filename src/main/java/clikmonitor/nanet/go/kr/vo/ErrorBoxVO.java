package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-08-03.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorBoxVO {
    private String code;
    private String msg;
    private String uid;
}
