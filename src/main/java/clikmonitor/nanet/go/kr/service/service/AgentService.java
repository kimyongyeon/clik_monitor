package clikmonitor.nanet.go.kr.service.service;

import clikmonitor.nanet.go.kr.dto.AgentVO;
import clikmonitor.nanet.go.kr.dto.ChartSearchVO;
import clikmonitor.nanet.go.kr.mapper.AgentMapper;
import clikmonitor.nanet.go.kr.mapper.ChartMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
public interface AgentService {

    /**
     * Gets agent state info list.
     *
     * @param agentVO the agent vo
     * @return the agent state info list
     */
/*
        AgentService 메서드 선언 시작
     */
    List<AgentVO> getAgentStateInfoList(AgentVO agentVO); // Agent 상태 정보 목록 조회

    /**
     * Gets agent info detail.
     *
     * @param agentVO the agent vo
     * @return the agent info detail
     */
    Map<String, Object>  getnAgentInfoDetail(AgentVO agentVO); // Agent 정보 상세 조회

    /**
     * Reg agent info.
     *
     * @param agentVO the agent vo
     */
    void regAgentInfo(AgentVO agentVO); // Agent 정보 등록

    /**
     * Edit agent info.
     *
     * @param agentVO the agent vo
     */
    void editAgentInfo(AgentVO agentVO); // Agent 정보 수정

    /**
     * Remove agent info.
     *
     * @param agentVO the agent vo
     */
    void removeAgentInfo(AgentVO agentVO); // Agent 정보 삭제
    /*
        AgentService 메서드 선언 끝
     */

    /**
     * The type Agent service.
     */
    @Service("agentService")
    @Transactional
    class AgentServiceImpl implements AgentService {

        /**
         * The constant MSG_ERROR_AGENTVO_NULL.
         */
        public static final String MSG_ERROR_AGENTVO_NULL = ": AgentVO정보가 널 입니다. AgentVO: ";
        /**
         * The constant MSG_ERROR_AGENTVO_SPACE.
         */
        public static final String MSG_ERROR_AGENTVO_SPACE = ": AgentVO 키값이 공백 또는 널 입니다.";
        /**
         * The constant MSG_ERROR_RASMBLYNM_DUPLICATION.
         */
        public static final String MSG_ERROR_RASMBLYNM_DUPLICATION = ": 기존의 의회명이 이미 존재 합니다, 의회명: ";

        /**
         * The Agent mapper.
         */
        @Resource(name = "agentMapper")
        AgentMapper agentMapper;

        /**
         * The Chart mapper.
         */
        @Resource(name = "chartMapper")
        ChartMapper chartMapper;


        private AgentVO agentVO;

        /**
         * Sets agent vo.
         *
         * @param agentVO the agent vo
         */
        public void setAgentVO(AgentVO agentVO) {
            this.agentVO = agentVO;
        }

        /**
         * Gets agent vo.
         *
         * @return the agent vo
         */
        public AgentVO getAgentVO() {
            return agentVO;
        }

        /**
         * Agent 정보가 데이터베이스에 이미 존재하는지 체크 (등록 및 수정에서 사용)
         * @return
         */
        private boolean isDbAgentInfoCheck() {

            if(getAgentVO() == null)
                return false;

            AgentVO agentVO = agentMapper.selectAgentInfoOne(getAgentVO());
            if (agentVO == null)
                return false;
            else
                return true;
        }

        /**
         * AgentVO 널 체크 및 맴버변수에 AgentVO 대입
         * @param agentVO
         * @return
         */
        private boolean isAgentVoNullCheck(AgentVO agentVO) {
            if (agentVO == null) {
                return false;
            } else {
                setAgentVO(agentVO);
                return true;
            }
        }

        /**
         * Agent 서버정보 등록
         * @param agentVO
         */
        @Override
        public void regAgentInfo(AgentVO agentVO) {

            // 0. 데이터 검증 : AgentVO 값 체크
            String methodName = new Exception().getStackTrace()[0].getMethodName();
            if(!isAgentVoNullCheck(agentVO))
                throw new Error(methodName + MSG_ERROR_AGENTVO_NULL + agentVO);

            // 1. 기존의 값이 데이터에스에 있는지 조회
            if(isDbAgentInfoCheck()) {
                // 1.1. 예외처리
                throw new Error(methodName + MSG_ERROR_RASMBLYNM_DUPLICATION + agentVO.getRasmblyNm());
            } else {
                // 1.2. Agent 서버 정보 등록
                agentMapper.insertAgentInfoProc(agentVO);
            }
        }

        /**
         * Agent 서버정보 편집
         * @param agentVO
         */
        @Override
        public void editAgentInfo(AgentVO agentVO) {

            // 0. 데이터 검증 : AgentVO 값 체크
            String methodName = new Exception().getStackTrace()[0].getMethodName();
            if(!isAgentVoNullCheck(agentVO))
                throw new Error(methodName + MSG_ERROR_AGENTVO_NULL + agentVO);

            // 1. 기존의 값이 데이터에스에 있는지 조회
            if(isDbAgentInfoCheck()) {
                // 1.1. Agent 서버 정보 수정 처리
                agentMapper.updateAgentInfoProc(agentVO);
            } else {
                // 1.2. Agent 서버 정보 등록 처리
                agentMapper.insertAgentInfoProc(agentVO);
            }
        }

        /**
         * Agent 서버정보 지우기
         * @param agentVO
         */
        @Override
        public void removeAgentInfo(AgentVO agentVO) {

            // 0. 데이터 검증
            String methodName = new Exception().getStackTrace()[0].getMethodName();
            if(!isAgentVoNullCheck(agentVO))
                throw new Error(methodName + MSG_ERROR_AGENTVO_NULL + agentVO);

            String seq = agentVO.getRasmblyNm();
            assert "".equals(seq) : methodName + MSG_ERROR_AGENTVO_SPACE;

            // 1. Agent 서버정보 삭제 처리
            agentMapper.deleteAgentInfoProc(agentVO);
        }

        /**
         * Agent 메인 화면 목록 출력
         * @param agentVO
         * @return
         */
        @Override
        public List<AgentVO> getAgentStateInfoList(AgentVO agentVO) {
            return agentMapper.selectAgentStateList(agentVO);
        }

        /**
         * Agent 서버정보
         * @param agentVO
         * @return
         */
        @Override
        public Map<String, Object> getnAgentInfoDetail(AgentVO agentVO) {

            // 0. 데이터 검증 키값이 존재하는지 체크 한다.
            String methodName = new Exception().getStackTrace()[0].getMethodName();
            String seq = agentVO.getRasmblyNm();
            assert "".equals(seq) : methodName + MSG_ERROR_AGENTVO_SPACE;

            Map outMap = new HashMap();
            // 1. 상단 목록
            outMap.put("detail",agentMapper.selectAgentInfoOne(agentVO));
            // 2. 차트 목록
            ChartSearchVO chartSearchVO = new ChartSearchVO();
            outMap.put("detail", chartMapper.selectAgentServerInfoBarChartOne(chartSearchVO));

            // 3. todo : 버튼 이벤트 리스너(수집API 구동, 수집API 종료, 업데이트 요청) jsp 화면에서 처리

            return outMap;
        }

    }
}
