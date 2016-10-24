package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springmodules.validation.bean.conf.loader.annotation.handler.Length;
import org.springmodules.validation.bean.conf.loader.annotation.handler.NotNull;

/**
 * Created by kimyongyeon on 2016-08-29.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogSearchVO extends CommonSearchVO{
    @NotNull
    @Length(min = 6, max = 6)
    private String requstInsttId; // 의회별로 들어갈때
    private String requstId; // 목록에서 상세 들어갈때
}

