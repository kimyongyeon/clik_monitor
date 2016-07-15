/*
 * Copyright 2014 MOSPA(Ministry of Security and Public Administration).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.sample.emp.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

/**
 * 사원정보 CRUD 요청을 처리하는 비즈니스 인터페이스
 *
 * @author Daniela Kwon
 * @version 3.0
 * @see <pre>  == 개정이력(Modification Information) ==   수정일			수정자				수정내용  ---------------------------------------------------------------------------------   2014.04.07	Daniela Kwon		최초생성 </pre>
 * @since 2014.01.24
 */
public interface EmpService {
	/**
	 * 사원목록조회 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return List list
	 * @throws Exception the exception
	 */
	public List<EmpVO> retrieveEmpList(EmpVO empVO) throws Exception;

	/**
	 * 사원상세조회 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return List emp vo
	 * @throws Exception the exception
	 */
	public EmpVO retrieveEmp(EmpVO empVO) throws Exception;

	/**
	 * 사원정보수정 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return List
	 * @throws Exception the exception
	 */
	@Transactional
	public void updateEmp(EmpVO empVO) throws Exception;

	/**
	 * 사원정보입력 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return List
	 * @throws Exception the exception
	 */
	@Transactional
	public void insertEmp(EmpVO empVO) throws Exception;

	/**
	 * 사원정보삭제 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return List
	 * @throws Exception the exception
	 */
	@Transactional
	public void deleteEmp(EmpVO empVO) throws Exception;

	/**
	 * 총 레코드 수 조회 요청을 처리하기 위해 데이터처리를 요청한다.
	 *
	 * @param empVO the emp vo
	 * @return int int
	 * @throws Exception the exception
	 */
	public int retrieveEmpListTotCnt(EmpVO empVO) throws Exception;
}
