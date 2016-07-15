package clikmonitor.nanet.go.kr.dto;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-22.
 */
public class CommonVO {

    // -- 지역
    private String loasmCode;
    private String loasmNm;

    // -- list
    private List<CommonVO> listCommonVO;

    /**
     * Gets list common vo.
     *
     * @return the list common vo
     */
    public List<CommonVO> getListCommonVO() {
        return listCommonVO;
    }

    /**
     * Sets list common vo.
     *
     * @param listCommonVO the list common vo
     */
    public void setListCommonVO(List<CommonVO> listCommonVO) {
        this.listCommonVO = listCommonVO;
    }

    /**
     * Gets loasm code.
     *
     * @return the loasm code
     */
    public String getLoasmCode() {
        return loasmCode;
    }

    /**
     * Sets loasm code.
     *
     * @param loasmCode the loasm code
     */
    public void setLoasmCode(String loasmCode) {
        this.loasmCode = loasmCode;
    }

    /**
     * Gets loasm nm.
     *
     * @return the loasm nm
     */
    public String getLoasmNm() {
        return loasmNm;
    }

    /**
     * Sets loasm nm.
     *
     * @param loasmNm the loasm nm
     */
    public void setLoasmNm(String loasmNm) {
        this.loasmNm = loasmNm;
    }


}
