package clikmonitor.nanet.go.kr.mapper;

import clikmonitor.nanet.go.kr.dto.AgentVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Mapper("agentMapper")
public interface AgentMapper {

    /**
     * Agent 상태 정보 목록
     *
     * @param agentVO : 현재일자
     * @return : 서울특별시 ~ 강원도 오더링 출력, Agent이상유무
     */
    List<AgentVO> selectAgentStateList(AgentVO agentVO); // Agent 상태 정보 목록

    /**
     * Agent 상태 정보 상세
     *
     * @param agentVO : 의회정보(의회ID)
     * @return : 의회명, 설치년도, 서버명, 서버IP, OS, WAS, CPU, RAM, 최종수집일, 모듈설치경로, 비고
     */
    AgentVO selectAgentInfoOne(AgentVO agentVO); // Agent 상태 정보 상세

    /**
     * Agent 정보 등록
     *
     * @param agentVO the agent vo
     */
    void insertAgentInfoProc(AgentVO agentVO); // Agent 정보 등록

    /**
     * Agent 정보 수정
     *
     * @param agentVO the agent vo
     */
    void updateAgentInfoProc(AgentVO agentVO); // Agent 정보 수정

    /**
     * Agent 정보 삭제
     *
     * @param agentVO the agent vo
     */
    void deleteAgentInfoProc(AgentVO agentVO); // Agent 정보 삭제
}
