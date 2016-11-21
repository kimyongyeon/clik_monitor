package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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
    private String rasmblynm;

    private String code;
    private String codenm;
    private String brtcCode;

    private String text;
    private boolean state;
    private List<Children> childrens;
    private static List<CommonVO> trees;

    private String ordr;
    private String ordr2;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Children { // 지역별
        String text;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MainArea {
        String name; // 지역명
        String upDate; // 업데이트 날짜
        String code; // 지역코드 : 상세화면 진입용
        String gubun; // 광역, 기초 구분 코드
        String state; // 상태
        String ext; // 이미지 확장자
    }

    // 지역정보 list
    private List<MainArea> areas;
    private List<CommonVO> listCommonVO;

    // 테스트 데이터
//    /**
//     * 광역의회 트리
//     * @return
//     */
//    public static List getWidejstrees() {
//        trees = new ArrayList();
//        CommonVO commonVO = new CommonVO();
//        commonVO.setText("서울특별시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("부산광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("대구광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("인천광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("광주광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("대전광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("울산광역시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("세종특별자치시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경기도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("강원도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("충청북도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("충청남도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("전라북도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("전라남도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경상북도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경상남도의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("제주특별자치의회");
//        trees.add(commonVO);
//        return trees;
//    }
//
//    /**
//     * 기초의회 트리
//     * @return
//     */
//    public static List getBasicjstrees() {
//        trees = new ArrayList();
//        CommonVO commonVO = new CommonVO();
//        commonVO.setText("경기도 부천시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경기도 하남시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("강원도 강릉시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("충청북도 청주시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("충청남도 서산시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("전라북도 정읍시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("전라남도 순천시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경상북도 상주시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경상남도 거제시의회");
//        trees.add(commonVO);
//        commonVO = new CommonVO();
//        commonVO.setText("경상남도 김해시의회");
//        trees.add(commonVO);
//        return trees;
//    }
//
//    /**
//     * 지역별 트리
//     * @return
//     */
//    public static List getAreas() {
//        trees = new ArrayList();
//        CommonVO commonVO = new CommonVO();
//        commonVO.setText("서울특별시");
//        commonVO.setState(true);
//
//        List childrens = new ArrayList();
//        Children children = new Children();
//        children.setText("서울특별시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("부산광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("부산광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("대구광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("대구광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("인천광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("인천광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("광주광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("광주광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("대전광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("대전광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("울산광역시");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("울산광역시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("경기도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("경기도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("경기도 부천시의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("경기도 하남시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//        commonVO = new CommonVO();
//        commonVO.setText("강원도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("강원도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("강원도 강릉시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("충청북도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("충청북도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("충청북도 청주시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("충청남도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("충청남도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("충청남도 서산시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("전라북도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("전라북도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("전라북도 정읍시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("전라남도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("전라남도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("전라남도 순천시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("경상북도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("경상북도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("경상북도 상주시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("경상남도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("경상남도의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("경상남도 거제시의회");
//        childrens.add(children);
//        children = new Children();
//        children.setText("경상남도 김해시의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//
//        commonVO = new CommonVO();
//        commonVO.setText("제주특별자치도");
//        commonVO.setState(true);
//
//        childrens = new ArrayList();
//        children = new Children();
//        children.setText("제주특별자치도의회");
//        childrens.add(children);
//
//        commonVO.setChildrens(childrens);
//        trees.add(commonVO);
//
//        return trees;
//    }
}
