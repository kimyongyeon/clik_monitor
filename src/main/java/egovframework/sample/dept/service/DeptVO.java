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
package egovframework.sample.dept.service;

import egovframework.sample.cmmn.SearchVO;

/**
 * 부서정보를 저장하기 위한 VO클래스
 *
 * @author Daniela Kwon
 * @version 3.0
 * @see <pre>  == 개정이력(Modification Information) ==   수정일			수정자				수정내용  ---------------------------------------------------------------------------------   2014.04.07	Daniela Kwon		최초생성 </pre>
 * @since 2014.01.24
 */
public class DeptVO extends SearchVO {

	private static final long serialVersionUID = 1L;
	private String deptNo;
	private String deptNm;
	private String deptLoc;
	private String deptTel;

	/**
	 * Gets dept no.
	 *
	 * @return the dept no
	 */
	public String getDeptNo() {
		return deptNo;
	}

	/**
	 * Sets dept no.
	 *
	 * @param deptNo the dept no
	 */
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

	/**
	 * Gets dept nm.
	 *
	 * @return the dept nm
	 */
	public String getDeptNm() {
		return deptNm;
	}

	/**
	 * Sets dept nm.
	 *
	 * @param deptNm the dept nm
	 */
	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}

	/**
	 * Gets dept loc.
	 *
	 * @return the dept loc
	 */
	public String getDeptLoc() {
		return deptLoc;
	}

	/**
	 * Sets dept loc.
	 *
	 * @param deptLoc the dept loc
	 */
	public void setDeptLoc(String deptLoc) {
		this.deptLoc = deptLoc;
	}

	/**
	 * Gets dept tel.
	 *
	 * @return the dept tel
	 */
	public String getDeptTel() {
		return deptTel;
	}

	/**
	 * Sets dept tel.
	 *
	 * @param deptTel the dept tel
	 */
	public void setDeptTel(String deptTel) {
		this.deptTel = deptTel;
	}
}