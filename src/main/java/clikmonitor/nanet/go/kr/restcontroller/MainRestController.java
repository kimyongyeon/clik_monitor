package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.login.ClikMonUser;
import clikmonitor.nanet.go.kr.service.AgentService;
import clikmonitor.nanet.go.kr.service.ChartService;
import clikmonitor.nanet.go.kr.service.CommonService;
import clikmonitor.nanet.go.kr.service.LogService;
import clikmonitor.nanet.go.kr.vo.*;
import com.sun.management.OperatingSystemMXBean;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by kimyongyeon on 2016-07-14.
 */
@RestController
@Slf4j
@Configuration
@PropertySource("classpath:/META-INF/property/globals.mdm.properties")
public class MainRestController  {

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Autowired
    AgentService agentService;

    @Autowired
    ChartService chartService;

    @Autowired
    LogService logService;

    @Autowired
    CommonService commonService;

    @Autowired
    private EgovIdGnrService councilSystemContrlIdGnrService;

    @Value("${Globals.council.updatefile.path}")
    private String updateFilePath;

    @Value("${start002001}")
    private String start002001;
    @Value("${start051001}")
    private String start051001;
    @Value("${start053001}")
    private String start053001;
    @Value("${start032001}")
    private String start032001;
    @Value("${start062001}")
    private String start062001;
    @Value("${start042001}")
    private String start042001;
    @Value("${start052001}")
    private String start052001;
    @Value("${start044001}")
    private String start044001;
    @Value("${start031001}")
    private String start031001;
    @Value("${start033001}")
    private String start033001;
    @Value("${start043001}")
    private String start043001;
    @Value("${start041001}")
    private String start041001;
    @Value("${start063001}")
    private String start063001;
    @Value("${start061001}")
    private String start061001;
    @Value("${start054001}")
    private String start054001;
    @Value("${start055001}")
    private String start055001;
    @Value("${start064001}")
    private String start064001;
    @Value("${start031012}")
    private String start031012;
    @Value("${start031031}")
    private String start031031;
    @Value("${start033002}")
    private String start033002;
    @Value("${start041009}")
    private String start041009;
    @Value("${start041900}")
    private String start041900;
    @Value("${start043012}")
    private String start043012;
    @Value("${start054010}")
    private String start054010;
    @Value("${start055002}")
    private String start055002;
    @Value("${start055005}")
    private String start055005;
    @Value("${start061012}")
    private String start061012;
    @Value("${start063014}")
    private String start063014;
    
    @Value("${stop002001}")
    private String stop002001;
    @Value("${stop051001}")
    private String stop051001;
    @Value("${stop053001}")
    private String stop053001;
    @Value("${stop032001}")
    private String stop032001;
    @Value("${stop062001}")
    private String stop062001;
    @Value("${stop042001}")
    private String stop042001;
    @Value("${stop052001}")
    private String stop052001;
    @Value("${stop044001}")
    private String stop044001;
    @Value("${stop031001}")
    private String stop031001;
    @Value("${stop033001}")
    private String stop033001;
    @Value("${stop043001}")
    private String stop043001;
    @Value("${stop041001}")
    private String stop041001;
    @Value("${stop063001}")
    private String stop063001;
    @Value("${stop061001}")
    private String stop061001;
    @Value("${stop054001}")
    private String stop054001;
    @Value("${stop055001}")
    private String stop055001;
    @Value("${stop064001}")
    private String stop064001;
    @Value("${stop031012}")
    private String stop031012;
    @Value("${stop031031}")
    private String stop031031;
    @Value("${stop033002}")
    private String stop033002;
    @Value("${stop041009}")
    private String stop041009;
    @Value("${stop041900}")
    private String stop041900;
    @Value("${stop043012}")
    private String stop043012;
    @Value("${stop054010}")
    private String stop054010;
    @Value("${stop055002}")
    private String stop055002;
    @Value("${stop055005}")
    private String stop055005;
    @Value("${stop061012}")
    private String stop061012;
    @Value("${stop063014}")
    private String stop063014;

    public ClikMonUser getUser() {
        return (ClikMonUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * 에러박스
     *
     * @return
     */
    @RequestMapping(value = "/getAgentErrorCheck.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public ErrorBoxVO getAgentErrorCheck() throws InterruptedException {
        Thread.sleep(5000);
        return new ErrorBoxVO("-1", "에러 테스트 중입니다.", UUID.randomUUID().toString());
    }

    /**
     * Agent 서버 상태 정보 목록(광역,기초) : 메인화면
     *
     * @return
     */
    @RequestMapping(value = "/getAreas.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getAreas(@RequestBody  AgentSearchVO agentSearchVO) {
        final List<CommonVO.MainArea> areas = new ArrayList<>();
        final List<CommonVO.MainArea> areas2 = new ArrayList<>();
        Map map = new HashMap();
        agentService.getAgentStateInfoList(agentSearchVO).forEach(a ->
        {
            String status = "";
            String ext = ""; // 확장자

            if("001".equals(a.getGubun())) { // 광역
                CommonVO.MainArea mainArea = new CommonVO.MainArea();
                mainArea.setName(a.getRasmblyNm().toString().replace("의회",""));
                mainArea.setUpDate(a.getLastUpdtDt());
                mainArea.setCode(a.getRasmblyId());
                mainArea.setGubun(a.getGubun());
                setSystemCode(a, mainArea);
                areas.add(mainArea);
                map.put("areas", areas); // 광역
            } else {
                CommonVO.MainArea mainArea = new CommonVO.MainArea();
                mainArea.setName(a.getRasmblyNm().toString().replace("의회",""));
                mainArea.setUpDate(a.getLastUpdtDt());
                mainArea.setCode(a.getRasmblyId());
                mainArea.setGubun(a.getGubun());
                setSystemCode(a, mainArea);
                areas2.add(mainArea);
                map.put("areas2", areas2); // 광역
            }

        });
        return map;
    }

    private void setSystemCode(AgentVO a, CommonVO.MainArea mainArea) {
        String status;
        String ext;
        if(a.getSystemSttusCode() == null) { // 회색
            status = "3";
            ext = "png";
        } else if("000".equals(a.getSystemSttusCode())) { // 정상
            status = "1";
            ext = "png";
        } else { // 뻘건색
            status = "2";
            ext = "gif";
        }
        mainArea.setState(status);
        mainArea.setExt(ext);
    }

    /**
     * Agent 상태정보 상세화면
     *
     * @return
     */
    @RequestMapping(value = "/getAgentInfoDetail.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public AgentVO getAgentInfoDetail(@ModelAttribute(value = "pAgentVO") AgentSearchVO pAgentVO) {
        return agentService.getAgentInfoDetail(pAgentVO);
    }

    /**
     * Agent 상태 설정 정보 목록 조회
     *
     * @return
     */
    @RequestMapping(value = "/getAgentSetHisList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getAgentSetHisList(@ModelAttribute(value = "pAgentVO") AgentSearchVO pAgentVO) {

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(pAgentVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(pAgentVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(pAgentVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(agentService.selectAgentSetStateListCount(pAgentVO));  // 전체카운트

        Map map = new HashMap();
        pAgentVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        map.put("list", agentService.selectAgentSetStateList(pAgentVO));
        map.put("paginationInfo", paginationInfo);

        return map;
    }

    /**
     * Agent 상태정보 상세화면 차트
     *
     * @param chartSearchVO
     * @return
     */
    @RequestMapping(value = "/getAreaDetailChart.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getAreaDetailChart(@ModelAttribute(value = "chartSearchVO") ChartSearchVO chartSearchVO) {
        Map map = new HashMap();
        List<ChartVO> charts = chartService.selectAgentServerInfoBarChartOne(chartSearchVO);
        List list = new ArrayList();
        ChartVO mChartVO = new ChartVO();
        for(ChartVO chartVO: charts) {
            if("회의록".equals(chartVO.getTitle())) {
                mChartVO.setX1(chartVO.getTitle()); // X축
                mChartVO.setY1(chartVO.getYData()); // Y축
            }
            else if ("부록".equals(chartVO.getTitle())) {
                mChartVO.setX2(chartVO.getTitle()); // X축
                mChartVO.setY2(chartVO.getYData()); // Y축
            }
            else if ("의안".equals(chartVO.getTitle())) {
                mChartVO.setX3(chartVO.getTitle()); // X축
                mChartVO.setY3(chartVO.getYData()); // Y축
            }
            else if ("의원".equals(chartVO.getTitle())) {
                mChartVO.setX4(chartVO.getTitle()); // X축
                mChartVO.setY4(chartVO.getYData()); // Y축
            }
        }
        map.put("list", mChartVO);
        return map;
    }

    /**
     * Agent 서버 상태정보 테이블 목록
     *
     * @return
     */
    @RequestMapping(value = "/getAreaStateInfoList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getAreaStateInfoList(@RequestBody  AgentSearchVO agentVO) {
        Map map = new HashMap();
        map.put("listAgentVO", agentService.getAgentServerTableList(agentVO));
        return map;
    }

    /**
     * Agent 로그 데이터
     *
     * @return
     */
    @RequestMapping(value = "/getLogDataInfo.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public LogVO getLogDataInfo(LogSearchVO pLogVO) {
        return logService.selectErrorLogInfoOne(pLogVO);
    }

    /**
     * Agent 로그 데이터
     *
     * @return
     */
    @RequestMapping(value = "/getLogDataButtonShowHideCheck.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public LogVO getLogDataButtonShowHideCheck(LogSearchVO pLogVO) {
        return logService.selectErrorLogButtonShowHideOne(pLogVO);
    }

    /**
     * Agent 로그 목록 데이터
     *
     * @return
     */
    @RequestMapping(value = "/getLogDataList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getLogDataList(LogSearchVO pLogVO) {

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(pLogVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(pLogVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(pLogVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(logService.selectErrorLogInfoListTotalRecordCount(pLogVO)); // 전체카운트

        Map map = new HashMap();
        pLogVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        pLogVO.setRecordCountPerPage(pLogVO.getPageUnit());
        map.put("list", logService.selectErrorLogInfoList(pLogVO));
        map.put("paginationInfo", paginationInfo);
        return map;
    }

    /**
     * 전체평균요청건수 목록 조회
     *
     * @param chartSearchVO
     * @return
     */
    @RequestMapping(value = "/getTotalAvgReqCntList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getTotalAvgReqCntList(@RequestBody ChartSearchVO chartSearchVO) {

        Map map = new HashMap();

        if(chartSearchVO.getRamblyList().length == 0) {
            return map;
        }

        map = chartService.selectTotalAvgRequestCountList3(chartSearchVO);

        return map;
    }

    /**
     * 트랜잭션 목록 조회
     *
     * @param chartSearchVO
     * @return
     */
    @RequestMapping(value = "/getTransactionList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getTransactionList(@RequestBody ChartSearchVO chartSearchVO) {

        Map map = new HashMap();
        if(chartSearchVO.getRamblyList().length == 0) {
            map.put("list1", "");
            map.put("list2", "");
            map.put("list3", "");
            map.put("list4", "");
            return map;
        }
        List<String> arrayList = new ArrayList<String>();
        map.put("list1", "");
        map.put("list2", "");
        map.put("list3", "");
        map.put("list4", "");
        for (String str : chartSearchVO.getDataTypeList()) {
            if("1".equals(str)) { // 회의록
                chartSearchVO.setCntcId("REQ301"); // 회의록
                arrayList = new ArrayList<String>();
                arrayList.add("REQ301");
                chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                map.put("list2", chartService.selectTransactionList(chartSearchVO));
            }
            if("2".equals(str)) { // 부록
                chartSearchVO.setCntcId("REQ305"); //  부록
                arrayList = new ArrayList<String>();
                arrayList.add("REQ305");
                chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                map.put("list3", chartService.selectTransactionList(chartSearchVO));
            }
            if("3".equals(str)) { // 의안
                chartSearchVO.setCntcId("REQ401"); // 의안
                arrayList = new ArrayList<String>();
                arrayList.add("REQ401");
                chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                map.put("list4", chartService.selectTransactionList(chartSearchVO));
            }
            if("4".equals(str)) { // 의원
                chartSearchVO.setCntcId("REQ203"); // 의원
                arrayList = new ArrayList<String>();
                arrayList.add("REQ203");
                chartSearchVO.setCntcIdList(arrayList.toArray(new String[arrayList.size()]));
                map.put("list1", chartService.selectTransactionList(chartSearchVO));
            }
        }
        return map;
    }

    /**
     * 데이터 수집현황 목록 조회
     *
     * @param chartSearchVO
     * @return
     */
    @RequestMapping(value = "/getDataCollectionList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map getDataCollectionList(@RequestBody ChartSearchVO chartSearchVO) {
        Map map = new HashMap();

        if(chartSearchVO.getRamblyList().length == 0) {
            return map;
        }

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(chartSearchVO.getPageIndex()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(chartSearchVO.getPageUnit()); // 페이지 갯수
        paginationInfo.setPageSize(chartSearchVO.getPageSize()); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(chartService.selectDataCollectionListCount(chartSearchVO));  // 전체카운트
        chartSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        chartSearchVO.setRecordCountPerPage(chartSearchVO.getPageUnit());
        List<ChartVO> list = chartService.selectDataCollectionList(chartSearchVO);
        map.put("list1", chartService.selectDataCollectionList1(chartSearchVO)); // 회의록
        map.put("list3", chartService.selectDataCollectionList2(chartSearchVO)); // 의안
        map.put("list4", chartService.selectDataCollectionList3(chartSearchVO)); // 의원
        map.put("list2", chartService.selectDataCollectionList4(chartSearchVO)); // 부록
        map.put("list",list);
        map.put("paginationInfo",paginationInfo);

        return map;
    }

    /**
     * 시스템 정보 : 시스템 함수 사용
     * 1초 주기 호출
     *
     * @return
     */
    @RequestMapping(value = "/getSystemInfoList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getSystemInfoList() {
        Map map = new HashMap();
        map.put("cpuList", showCpu());
        map.put("memList", showMemory());
        System.out.println(showCpu());
        System.out.println(showMemory());
        return map;
    }

    /**
     * 연계파일 저장용량 모니터링
     * @return
     */
    @RequestMapping(value = "/getHddList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getHddList() {

        Map map = new HashMap();
        String directoryPath = "";
        double diskSize;
        double diskSizeGB;
        double diskFreeSize;
        double diskFreeSizeGB;
        double diskUsableSizeGB;

        //clik-cols
        directoryPath = "/clik-cols";
        diskSize = new File(directoryPath).getTotalSpace();
        diskSizeGB = diskSize / 1024 / 1024 / 1024;
        map.put("clikColsDiskSizeGB", String.format("%,d", (int) diskSizeGB));
        diskFreeSize = new File(directoryPath).getFreeSpace();
        diskFreeSizeGB = diskFreeSize / 1024 / 1024 / 1024;
        map.put("clikColsDiskFreeSizeGB", String.format("%,d", (int) diskFreeSizeGB));
        diskUsableSizeGB = diskSizeGB - diskFreeSizeGB;
        map.put("clikColsDiskUsableSizeGB", String.format("%,d", (int) diskUsableSizeGB));
        map.put("clikColsDiskUsableRate", (int) (diskUsableSizeGB * 100d / diskSizeGB));

        //clik-data
        directoryPath = "/clik-data";
        diskSize = new File(directoryPath).getTotalSpace();
        diskSizeGB = diskSize / 1024 / 1024 / 1024;
        map.put("clikDataDiskSizeGB", String.format("%,d", (int) diskSizeGB));
        diskFreeSize = new File(directoryPath).getFreeSpace();
        diskFreeSizeGB = diskFreeSize / 1024 / 1024 / 1024;
        map.put("clikDataDiskFreeSizeGB", String.format("%,d", (int) diskFreeSizeGB));
        diskUsableSizeGB = diskSizeGB - diskFreeSizeGB;
        map.put("clikDataDiskUsableSizeGB", String.format("%,d", (int) diskUsableSizeGB));
        map.put("clikDataDiskUsableRate", (int) (diskUsableSizeGB * 100d / diskSizeGB));

        //clikapi-file/clik001
        directoryPath = "/clikapi-file/clik001";
        diskSize = new File(directoryPath).getTotalSpace();
        diskSizeGB = diskSize / 1024 / 1024 / 1024;
        map.put("clikapiFileDiskSizeGB", String.format("%,d", (int) diskSizeGB));
        diskFreeSize = new File(directoryPath).getFreeSpace();
        diskFreeSizeGB = diskFreeSize / 1024 / 1024 / 1024;
        map.put("clikapiFileDiskFreeSizeGB", String.format("%,d", (int) diskFreeSizeGB));
        diskUsableSizeGB = diskSizeGB - diskFreeSizeGB;
        map.put("clikapiFileDiskUsableSizeGB", String.format("%,d", (int) diskUsableSizeGB));
        map.put("clikapiFileDiskUsableRate", (int) (diskUsableSizeGB * 100d / diskSizeGB));
        return map;
    }

    public static String onlyNum(String str) {
        if ( str == null ) return "";

        StringBuffer sb = new StringBuffer();
        for(int i = 0; i < str.length(); i++){
            if( Character.isDigit( str.charAt(i) ) ) {
                sb.append( str.charAt(i) );
            }
        }
        return sb.toString();
    }

    public String showMemory() {

        Double used = 0.0;
        try{
            Process p = Runtime.getRuntime().exec("top -b -n 1");
            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line = null;
            String[] str;
            int i=0;
            while((line = br.readLine()) != null){
                switch(i) {
                    case 3: // mem
                        line = line.replace("  ", " ");
                        line = line.replace(" ", ",");
                        str = line.split(",");
                        String total = onlyNum(str[1]); // total
                        String use = onlyNum(str[4]); // use
                        used = (Double.parseDouble(use) / Double.parseDouble(total)) * 100;
                        System.out.println(used);
                        break;
                }
                i++;
            }
        }catch(Exception e){
            System.out.println(e);
        }
        return used.toString();
    }

    public String showCpu()  {
        Double used = 0.0;
        try{
            Process p = Runtime.getRuntime().exec("top -b -n 1");
            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line = null;
            String[] str;
            int i=0;
            while((line = br.readLine()) != null){
                switch(i) {
                    case 2: // cpu
                        line = line.replace("  ", " ");
                        line = line.replace(" ", ",");

                        str = line.split(",");
                        String[] per = str[1].split("%");
                        str = per[0].split("\\.");
                        String uses = str[0] + "." + str[1];

                        str = line.split(",");
                        per = str[3].split("%");
                        str = per[0].split("\\.");
                        String sys = str[0] + "." + str[1];

                        used = Double.parseDouble(uses) + Double.parseDouble(sys);
                        System.out.println(used);
                        break;
                }
                i++;
            }
        }catch(Exception e){
            System.out.println(e);
        }
        return used.toString();
    }


    /**
     * 수집관리 - 표준연계API 모니터링 : 지방의회 시스템 설정을 처리한다.
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/insertCouncilSystemControl.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST, produces = "application/json")
    public ModelAndView insertCouncilSystemControl(@ModelAttribute("agentVO") AgentVO agentVO, RedirectAttributes redirectAttributes) throws Exception {

        agentVO.setRasmblyId(agentVO.getRasmblyCode());

        HashMap<String, Object> returnJson = new HashMap<String, Object>();

        try {
            String rasmblyId = agentVO.getRasmblyId();
            String cmmndCode = agentVO.getCmmndCode();
            agentVO.setReqstNo(councilSystemContrlIdGnrService.getNextIntegerId());
            agentVO.setCmmndTrnsmisAt("N");
            agentVO.setCmmndExcAt("N");
            agentVO.setCmmndExcCnfirmAt("N");
            agentVO.setFrstRegisterId(getUser().getUsername());
            //startup
            if ("REQ001".equals(cmmndCode)) {
                agentVoSetExeCommnd(agentVO, rasmblyId, cmmndCode);
            }
            //shutdown
            else if ("REQ002".equals(cmmndCode)) {
                agentVoSetExeCommnd(agentVO, rasmblyId, cmmndCode);
            }
            //update
            else if ("REQ003".equals(cmmndCode)) {

                // TODO agent 정지 후 업데이트 요청
                // agent 시작
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                List<String> fileNames = new ArrayList<String>();
                MultipartFile files =agentVO.getFiles();
                if(null != files) {
                    String fileName = files.getOriginalFilename();
                    fileNames.add(fileName);
                    String filePath = updateFilePath + rasmblyId + File.separator + sdf.format(new Date()) +File.separator;
                    File tempFile = new File(filePath);
                    if (!tempFile.exists()) {
                        tempFile.mkdirs();
                    }
                    filePath += files.getOriginalFilename();
                    tempFile = new File(filePath);
                    files.transferTo(tempFile);

                    if (!files.isEmpty()) {
                        agentVO.setTrgetFilePath(agentVO.getTrgetFilePath());
                        agentVO.setTrgetFileStrePath(filePath);
                        agentVO.setTrgetFileSize(agentVO.getTrgetFileSize());
                    }
                }
            }

            //request interval
            else if ("REQ006".equals(cmmndCode)) {
                agentVO.setSetInterval(agentVO.getSetInterval());
            }

            else if ("NOTE_UPDATE".equals(cmmndCode)) {
                agentVO.setNote(agentVO.getMemo());
                agentService.updateAgentNoteOne(agentVO);

                return new ModelAndView("redirect:/main.do?rasmblyId="+agentVO.getRasmblyId());
            }

            agentService.insertCouncilSystemControl(agentVO);

        }catch(Exception e) {
        }finally {}
        return new ModelAndView("redirect:/main.do?rasmblyId="+agentVO.getRasmblyId());
    }

    private void agentVoSetExeCommnd(@ModelAttribute("agentVO") AgentVO agentVO, String rasmblyId, String cmmndCode) {
        //startup
        if ("REQ001".equals(cmmndCode)) {
            if ("002001".equals(rasmblyId)) {            //서울특별시의회
                agentVO.setExeCmmnd(start002001);
            } else if ("051001".equals(rasmblyId)) {    //부산광역시의회
                agentVO.setExeCmmnd(start051001);
            } else if ("053001".equals(rasmblyId)) {    //대구광역시의회
                agentVO.setExeCmmnd(start053001);
            } else if ("032001".equals(rasmblyId)) {    //인천광역시의회
                agentVO.setExeCmmnd(start032001);
            } else if ("062001".equals(rasmblyId)) {    //광주광역시의회
                agentVO.setExeCmmnd(start062001);
            } else if ("042001".equals(rasmblyId)) {    //대전광역시의회
                agentVO.setExeCmmnd(start042001);
            } else if ("052001".equals(rasmblyId)) {    //울산광역시의회
                agentVO.setExeCmmnd(start052001);
            } else if ("044001".equals(rasmblyId)) {    //세종특별자치시의회
                agentVO.setExeCmmnd(start044001);
            } else if ("031001".equals(rasmblyId)) {    //경기도의회
                agentVO.setExeCmmnd(start031001);
            } else if ("033001".equals(rasmblyId)) {    //강원도의회
                agentVO.setExeCmmnd(start033001);
            } else if ("043001".equals(rasmblyId)) {    //충청북도의회
                agentVO.setExeCmmnd(start043001);
            } else if ("041001".equals(rasmblyId)) {    //충청남도의회
                agentVO.setExeCmmnd(start041001);
            } else if ("063001".equals(rasmblyId)) {    //전라북도의회
                agentVO.setExeCmmnd(start063001);
            } else if ("061001".equals(rasmblyId)) {    //전라남도의회
                agentVO.setExeCmmnd(start061001);
            } else if ("054001".equals(rasmblyId)) {    //경상북도의회
                agentVO.setExeCmmnd(start054001);
            } else if ("055001".equals(rasmblyId)) {    //경상남도의회
                agentVO.setExeCmmnd(start055001);
            } else if ("064001".equals(rasmblyId)) {    //제주특별자치도의회
                agentVO.setExeCmmnd(start064001);
            } else if ("031012".equals(rasmblyId)) {    //경기도 부천시의회
                agentVO.setExeCmmnd(start031012);
            } else if ("031031".equals(rasmblyId)) {    //경기도 하남시의회
                agentVO.setExeCmmnd(start031031);
            } else if ("033002".equals(rasmblyId)) {    //강원도 강릉시의회
                agentVO.setExeCmmnd(start033002);
            } else if ("041009".equals(rasmblyId)) {    //충청남도 서산시의회
                agentVO.setExeCmmnd(start041009);
            } else if ("041900".equals(rasmblyId)) {    //충청남도 서산군의회
                agentVO.setExeCmmnd(start041900);
            } else if ("043012".equals(rasmblyId)) {    //충청북도 청주시의회
                agentVO.setExeCmmnd(start043012);
            } else if ("054010".equals(rasmblyId)) {    //경상북도 상주시의회
                agentVO.setExeCmmnd(start054010);
            } else if ("055002".equals(rasmblyId)) {    //경상남도 거제시의회
                agentVO.setExeCmmnd(start055002);
            } else if ("055005".equals(rasmblyId)) {    //경상남도 김해시의회
                agentVO.setExeCmmnd(start055005);
            } else if ("061012".equals(rasmblyId)) {    //전라남도 순천시의회
                agentVO.setExeCmmnd(start061012);
            } else if ("063014".equals(rasmblyId)) {    //전라북도 정읍시의회
                agentVO.setExeCmmnd(start063014);
            }
        }
        if ("REQ002".equals(cmmndCode)) {
            if ("002001".equals(rasmblyId)) {            //서울특별시의회
                agentVO.setExeCmmnd(stop002001);
            } else if ("051001".equals(rasmblyId)) {    //부산광역시의회
                agentVO.setExeCmmnd(stop051001);
            } else if ("053001".equals(rasmblyId)) {    //대구광역시의회
                agentVO.setExeCmmnd(stop053001);
            } else if ("032001".equals(rasmblyId)) {    //인천광역시의회
                agentVO.setExeCmmnd(stop032001);
            } else if ("062001".equals(rasmblyId)) {    //광주광역시의회
                agentVO.setExeCmmnd(stop062001);
            } else if ("042001".equals(rasmblyId)) {    //대전광역시의회
                agentVO.setExeCmmnd(stop042001);
            } else if ("052001".equals(rasmblyId)) {    //울산광역시의회
                agentVO.setExeCmmnd(stop052001);
            } else if ("044001".equals(rasmblyId)) {    //세종특별자치시의회
                agentVO.setExeCmmnd(stop044001);
            } else if ("031001".equals(rasmblyId)) {    //경기도의회
                agentVO.setExeCmmnd(stop031001);
            } else if ("033001".equals(rasmblyId)) {    //강원도의회
                agentVO.setExeCmmnd(stop033001);
            } else if ("043001".equals(rasmblyId)) {    //충청북도의회
                agentVO.setExeCmmnd(stop043001);
            } else if ("041001".equals(rasmblyId)) {    //충청남도의회
                agentVO.setExeCmmnd(stop041001);
            } else if ("063001".equals(rasmblyId)) {    //전라북도의회
                agentVO.setExeCmmnd(stop063001);
            } else if ("061001".equals(rasmblyId)) {    //전라남도의회
                agentVO.setExeCmmnd(stop061001);
            } else if ("054001".equals(rasmblyId)) {    //경상북도의회
                agentVO.setExeCmmnd(stop054001);
            } else if ("055001".equals(rasmblyId)) {    //경상남도의회
                agentVO.setExeCmmnd(stop055001);
            } else if ("064001".equals(rasmblyId)) {    //제주특별자치도의회
                agentVO.setExeCmmnd(stop064001);
            } else if ("031012".equals(rasmblyId)) {    //경기도 부천시의회
                agentVO.setExeCmmnd(stop031012);
            } else if ("031031".equals(rasmblyId)) {    //경기도 하남시의회
                agentVO.setExeCmmnd(stop031031);
            } else if ("033002".equals(rasmblyId)) {    //강원도 강릉시의회
                agentVO.setExeCmmnd(stop033002);
            } else if ("041009".equals(rasmblyId)) {    //충청남도 서산시의회
                agentVO.setExeCmmnd(stop041009);
            } else if ("041900".equals(rasmblyId)) {    //충청남도 서산군의회
                agentVO.setExeCmmnd(stop041900);
            } else if ("043012".equals(rasmblyId)) {    //충청북도 청주시의회
                agentVO.setExeCmmnd(stop043012);
            } else if ("054010".equals(rasmblyId)) {    //경상북도 상주시의회
                agentVO.setExeCmmnd(stop054010);
            } else if ("055002".equals(rasmblyId)) {    //경상남도 거제시의회
                agentVO.setExeCmmnd(stop055002);
            } else if ("055005".equals(rasmblyId)) {    //경상남도 김해시의회
                agentVO.setExeCmmnd(stop055005);
            } else if ("061012".equals(rasmblyId)) {    //전라남도 순천시의회
                agentVO.setExeCmmnd(stop061012);
            } else if ("063014".equals(rasmblyId)) {    //전라북도 정읍시의회
                agentVO.setExeCmmnd(stop063014);
            }
        }
    }
}