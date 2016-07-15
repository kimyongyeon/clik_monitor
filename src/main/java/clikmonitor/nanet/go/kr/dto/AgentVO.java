package clikmonitor.nanet.go.kr.dto;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
public class AgentVO {

    private String rasmblyNm; // 의회명
    private String systemSttusCode; // Agent 상태

    /**
     * Gets rasmbly nm.
     *
     * @return the rasmbly nm
     */
    public String getRasmblyNm() {
        return rasmblyNm;
    }

    /**
     * Sets rasmbly nm.
     *
     * @param rasmblyNm the rasmbly nm
     */
    public void setRasmblyNm(String rasmblyNm) {
        this.rasmblyNm = rasmblyNm;
    }

    /**
     * Gets system sttus code.
     *
     * @return the system sttus code
     */
    public String getSystemSttusCode() {
        return systemSttusCode;
    }

    /**
     * Sets system sttus code.
     *
     * @param systemSttusCode the system sttus code
     */
    public void setSystemSttusCode(String systemSttusCode) {
        this.systemSttusCode = systemSttusCode;
    }
}
