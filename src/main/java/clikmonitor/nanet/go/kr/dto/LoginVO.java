package clikmonitor.nanet.go.kr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by kimyongyeon on 2016-06-09.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginVO {
    private String id;
    private String pass;
}
