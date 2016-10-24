package clikmonitor.nanet.go.kr.controller;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by kimyongyeon on 2016-08-31.
 */
@Controller
public class StatisticsController {

    @RequestMapping(value = "/statistics_list.do")
    public String list(Model model) {
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(1); // 현재 페이지
        paginationInfo.setRecordCountPerPage(20); // 페이지 갯수
        paginationInfo.setPageSize(10); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(100); // 전체카운트
        model.addAttribute("paginationInfo", paginationInfo);
        return "biz/statistics_list";
    }

}
