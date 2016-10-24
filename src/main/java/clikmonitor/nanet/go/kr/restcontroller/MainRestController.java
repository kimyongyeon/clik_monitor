package clikmonitor.nanet.go.kr.restcontroller;

import clikmonitor.nanet.go.kr.component.CommonUtil;
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
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by kimyongyeon on 2016-07-14.
 */
@RestController
@Slf4j
@PropertySource("classpath:config.properties")
public class MainRestController {

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
            , method = RequestMethod.GET)
    public Map getAreas() {
        final List<CommonVO.MainArea> areas = new ArrayList<>();
        final List<CommonVO.MainArea> areas2 = new ArrayList<>();
        Map map = new HashMap();
        agentService.getAgentStateInfoList(new AgentSearchVO()).forEach(a ->
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
    @RequestMapping(value = "/getAreaDetail.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public AgentVO getAreaDetail(@ModelAttribute(value = "pAgentVO") AgentSearchVO pAgentVO) {
        return agentService.getnAgentInfoDetail(pAgentVO);
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
            , method = RequestMethod.GET)
    public Map getAreaStateInfoList(AgentSearchVO agentVO) {
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
     * Agent 로그 목록 데이터
     *
     * @return
     */
    @RequestMapping(value = "/getLogDataList.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.GET)
    public Map getLogDataList(LogSearchVO pLogVO) {

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(pLogVO.getCurrentPage()); // 현재 페이지
        paginationInfo.setRecordCountPerPage(20); // 페이지 갯수
        paginationInfo.setPageSize(10); // 페이지 사이즈
        paginationInfo.setTotalRecordCount(logService.selectErrorLogInfoListTotalRecordCount(pLogVO)); // 전체카운트

        Map map = new HashMap();
        pLogVO.setFirstIndex(pLogVO.getCurrentPage());
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
//        map.put("list1", chartService.selectTotalAvgRequestCountList1(chartSearchVO)); // 금주
//        map.put("list2", chartService.selectTotalAvgRequestCountList2(chartSearchVO)); // 전주
        map.put("list3", chartService.selectTotalAvgRequestCountList3(chartSearchVO)); // 전월
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
            return map;
        }

        for (String str : chartSearchVO.getDataTypeList()) {
            if("1".equals(str)) { // 회의록
                chartSearchVO.setCntcId("REQ301"); // 회의록
                map.put("list2", chartService.selectTransactionList(chartSearchVO));
            }
            if("2".equals(str)) { // 부록
                chartSearchVO.setCntcId("REQ305"); //  부록
                map.put("list3", chartService.selectTransactionList(chartSearchVO));
            }
            if("3".equals(str)) { // 의안
                chartSearchVO.setCntcId("REQ401"); // 의안
                map.put("list4", chartService.selectTransactionList(chartSearchVO));
            }
            if("4".equals(str)) { // 의원
                chartSearchVO.setCntcId("REQ203"); // 의원
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

        List<ChartVO> list = chartService.selectDataCollectionList(chartSearchVO);

        map.put("list5",commonService.selectChartXdataList(chartSearchVO));

        for (String str : chartSearchVO.getDataTypeList()) {
            if("1".equals(str)) { // 회의록
                map.put("list1",list.stream().filter(a->a.getTitle().equals("회의록")).collect(Collectors.toList()));
            }
            if("2".equals(str)) { // 부록
                map.put("list2",list.stream().filter(a->a.getTitle().equals("부록")).collect(Collectors.toList()));
            }
            if("3".equals(str)) { // 의안
                map.put("list3",list.stream().filter(a->a.getTitle().equals("의안")).collect(Collectors.toList()));
            }
            if("4".equals(str)) { // 의원
                map.put("list4",list.stream().filter(a->a.getTitle().equals("의원")).collect(Collectors.toList()));
            }
        }
        map.put("list",list);

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

    public String showMemory() {

        Runtime r = Runtime.getRuntime();

        //JVM이 현재 시스템에 요구 가능한 최대 메모리량, 이 값을 넘으면 OutOfMemory 오류가 발생 합니다.
        double max = r.maxMemory();

        //JVM이 현재 시스템에 얻어 쓴 메모리의 총량
        double total = r.totalMemory();

        //JVM이 현재 시스템에 청구하여 사용중인 최대 메모리(total)중에서 사용 가능한 메모리
        double free = r.freeMemory();

        Double mem = 100.0 * (total - free);

        return mem.toString();
    }

    public String showCpu()  {
        OperatingSystemMXBean osbean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        double load = osbean.getSystemCpuLoad();
        if(load < 0.0) {
            return "";
        }
        load = load*100.0;
        try{
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("CPU Usage: " + load);
        return load + "";
    }


    /**
     * 수집관리 - 표준연계API 모니터링 : 지방의회 시스템 설정을 처리한다.
     * @param multiRequest
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/insertCouncilSystemControl.do"
            , headers = HttpHeaders.ACCEPT + "=" + MediaType.APPLICATION_JSON_UTF8_VALUE
            , method = RequestMethod.POST)
    public Map insertCouncilSystemControl(MultipartHttpServletRequest multiRequest, ModelMap model, AgentVO agentVO) throws Exception {

        HashMap<String, Object> returnJson = new HashMap<String, Object>();

        try {

            String cmmndCode = CommonUtil.nullConvert(multiRequest.getParameter("cmmndCode"));
            String rasmblyId = CommonUtil.nullConvert(multiRequest.getParameter("rasmblyId"));
            agentVO.setReqstNo(councilSystemContrlIdGnrService.getNextIntegerId());
            agentVO.setRasmblyId(rasmblyId);
            agentVO.setCmmndCode(cmmndCode);
            agentVO.setCmmndTrnsmisAt("N");
            agentVO.setCmmndExcAt("N");
            agentVO.setCmmndExcCnfirmAt("N");
            agentVO.setFrstRegisterId(getUser().getUsername());
            //startup
            if ("REQ001".equals(cmmndCode)) {
                if ("002001".equals(rasmblyId)) {            //서울특별시의회
                    agentVO.setExeCmmnd("");
                } else if ("051001".equals(rasmblyId)) {    //부산광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("053001".equals(rasmblyId)) {    //대구광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("032001".equals(rasmblyId)) {    //인천광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("062001".equals(rasmblyId)) {    //광주광역시의회
                    agentVO.setExeCmmnd("service tomcat_AGT start");
                } else if ("042001".equals(rasmblyId)) {    //대전광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("052001".equals(rasmblyId)) {    //울산광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("044001".equals(rasmblyId)) {    //세종특별자치시의회
                    agentVO.setExeCmmnd("");
                } else if ("031001".equals(rasmblyId)) {    //경기도의회
                    agentVO.setExeCmmnd("");
                } else if ("033001".equals(rasmblyId)) {    //강원도의회
                    agentVO.setExeCmmnd("net start agent");
                } else if ("043001".equals(rasmblyId)) {    //충청북도의회
                    agentVO.setExeCmmnd("");
                } else if ("041001".equals(rasmblyId)) {    //충청남도의회
                    agentVO.setExeCmmnd("");
                } else if ("063001".equals(rasmblyId)) {    //전라북도의회
                    agentVO.setExeCmmnd("");
                } else if ("061001".equals(rasmblyId)) {    //전라남도의회
                    agentVO.setExeCmmnd("service tomcat_AGT start");
                } else if ("054001".equals(rasmblyId)) {    //경상북도의회
                    agentVO.setExeCmmnd("");
                } else if ("055001".equals(rasmblyId)) {    //경상남도의회
                    agentVO.setExeCmmnd("");
                } else if ("064001".equals(rasmblyId)) {    //제주특별자치도의회
                    agentVO.setExeCmmnd("");
                } else if ("031012".equals(rasmblyId)) {    //경기도 부천시의회
                    agentVO.setExeCmmnd("");
                } else if ("031031".equals(rasmblyId)) {    //경기도 하남시의회
                    agentVO.setExeCmmnd("net start agent");
                } else if ("033002".equals(rasmblyId)) {    //강원도 강릉시의회
                    agentVO.setExeCmmnd("");
                } else if ("041009".equals(rasmblyId)) {    //충청남도 서산시의회
                    agentVO.setExeCmmnd("");
                } else if ("041900".equals(rasmblyId)) {    //충청남도 서산군의회
                    agentVO.setExeCmmnd("");
                } else if ("043012".equals(rasmblyId)) {    //충청북도 청주시의회
                    agentVO.setExeCmmnd("");
                } else if ("054010".equals(rasmblyId)) {    //경상북도 상주시의회
                    agentVO.setExeCmmnd("service tomcat_AGT start");
                } else if ("055002".equals(rasmblyId)) {    //경상남도 거제시의회
                    agentVO.setExeCmmnd("");
                } else if ("055005".equals(rasmblyId)) {    //경상남도 김해시의회
                    agentVO.setExeCmmnd("service tomcat_AGT start");
                } else if ("061012".equals(rasmblyId)) {    //전라남도 순천시의회
                    agentVO.setExeCmmnd("");
                } else if ("063014".equals(rasmblyId)) {    //전라북도 정읍시의회
                    agentVO.setExeCmmnd("");
                }

                //TODO 제윤측에서 정보 받은 후 제거 해야함
                agentVO.setExeCmmnd(multiRequest.getParameter("EXE_CMMND"));
            }

            //shutdown
            if ("REQ002".equals(cmmndCode)) {
                if ("002001".equals(rasmblyId)) {            //서울특별시의회
                    agentVO.setExeCmmnd("");
                } else if ("051001".equals(rasmblyId)) {    //부산광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("053001".equals(rasmblyId)) {    //대구광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("032001".equals(rasmblyId)) {    //인천광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("062001".equals(rasmblyId)) {    //광주광역시의회
                    agentVO.setExeCmmnd("service tomcat_AGT stop");
                } else if ("042001".equals(rasmblyId)) {    //대전광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("052001".equals(rasmblyId)) {    //울산광역시의회
                    agentVO.setExeCmmnd("");
                } else if ("044001".equals(rasmblyId)) {    //세종특별자치시의회
                    agentVO.setExeCmmnd("");
                } else if ("031001".equals(rasmblyId)) {    //경기도의회
                    agentVO.setExeCmmnd("");
                } else if ("033001".equals(rasmblyId)) {    //강원도의회
                    agentVO.setExeCmmnd("net stop agent");
                } else if ("043001".equals(rasmblyId)) {    //충청북도의회
                    agentVO.setExeCmmnd("");
                } else if ("041001".equals(rasmblyId)) {    //충청남도의회
                    agentVO.setExeCmmnd("");
                } else if ("063001".equals(rasmblyId)) {    //전라북도의회
                    agentVO.setExeCmmnd("");
                } else if ("061001".equals(rasmblyId)) {    //전라남도의회
                    agentVO.setExeCmmnd("service tomcat_AGT stop");
                } else if ("054001".equals(rasmblyId)) {    //경상북도의회
                    agentVO.setExeCmmnd("");
                } else if ("055001".equals(rasmblyId)) {    //경상남도의회
                    agentVO.setExeCmmnd("");
                } else if ("064001".equals(rasmblyId)) {    //제주특별자치도의회
                    agentVO.setExeCmmnd("");
                } else if ("031012".equals(rasmblyId)) {    //경기도 부천시의회
                    agentVO.setExeCmmnd("");
                } else if ("031031".equals(rasmblyId)) {    //경기도 하남시의회
                    agentVO.setExeCmmnd("net stop agent");
                } else if ("033002".equals(rasmblyId)) {    //강원도 강릉시의회
                    agentVO.setExeCmmnd("");
                } else if ("041009".equals(rasmblyId)) {    //충청남도 서산시의회
                    agentVO.setExeCmmnd("");
                } else if ("041900".equals(rasmblyId)) {    //충청남도 서산군의회
                    agentVO.setExeCmmnd("");
                } else if ("043012".equals(rasmblyId)) {    //충청북도 청주시의회
                    agentVO.setExeCmmnd("");
                } else if ("054010".equals(rasmblyId)) {    //경상북도 상주시의회
                    agentVO.setExeCmmnd("service tomcat_AGT stop");
                } else if ("055002".equals(rasmblyId)) {    //경상남도 거제시의회
                    agentVO.setExeCmmnd("");
                } else if ("055005".equals(rasmblyId)) {    //경상남도 김해시의회
                    agentVO.setExeCmmnd("service tomcat_AGT stop");
                } else if ("061012".equals(rasmblyId)) {    //전라남도 순천시의회
                    agentVO.setExeCmmnd("");
                } else if ("063014".equals(rasmblyId)) {    //전라북도 정읍시의회
                    agentVO.setExeCmmnd("");
                }

                //TODO 제윤측에서 정보 받은 후 제거 해야함
                agentVO.setExeCmmnd(multiRequest.getParameter("EXE_CMMND"));
            }

            //update
            else if ("REQ003".equals(cmmndCode)) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                final Map<String, MultipartFile> files = multiRequest.getFileMap();
                if (!files.isEmpty()) {
                    Iterator<Map.Entry<String, MultipartFile>> itr = files.entrySet().iterator();
                    while (itr.hasNext()) {
                        Map.Entry<String, MultipartFile> entry = itr.next();
                        MultipartFile mFile = entry.getValue();
                        String filePath = updateFilePath + rasmblyId + File.separator + sdf.format(new Date()) + File.separator;
                        File tempFile = new File(filePath);
                        if (!tempFile.exists()) {
                            tempFile.mkdirs();
                        }
                        filePath += mFile.getOriginalFilename();
                        tempFile = new File(filePath);
                        mFile.transferTo(tempFile);

                        if (!mFile.isEmpty()) {
                            agentVO.setTrgetFilePath(multiRequest.getParameter("TRGET_FILE_PATH"));
                            agentVO.setTrgetFileStrePath(filePath);
                            agentVO.setTrgetFileSize(multiRequest.getParameter("TRGET_FILE_SIZE"));
                        }
                    }//end while
                }//end if
            }

            //log list
            else if ("REQ004".equals(cmmndCode)) {

            }

            //log view
            else if ("REQ005".equals(cmmndCode)) {
                agentVO.setLogFileName(multiRequest.getParameter("LOG_FILE_NAME"));

                if (!"".equals(multiRequest.getParameter("LOG_FILE_LINE_CO"))) {
                    agentVO.setLogFileLineCo(multiRequest.getParameter("LOG_FILE_LINE_CO"));
                } else {
                    agentVO.setLogFileLineCo("0");
                }
            }

            //request interval
            else if ("REQ006".equals(cmmndCode)) {
                agentVO.setSetInterval(multiRequest.getParameter("SET_INTERVAL"));
            }

            //표준연계 데이터 재수집 요청
            else if ("REQ007".equals(cmmndCode)) {

            }

            //etc call
            else if ("REQ901".equals(cmmndCode)) {
                agentVO.setCallUrl(multiRequest.getParameter("CALL_URL"));
            }

            agentService.insertCouncilSystemControl(agentVO);

            returnJson.put("return_url", "/rlm/StdCntcApiColctMntrng.do");
            returnJson.put("message", "정상처리되었습니다.");

        }catch(Exception e) {

            returnJson.put("return_url", "");
            returnJson.put("message", e.getMessage());

        }finally {
            
        }
        return returnJson;
    }
}