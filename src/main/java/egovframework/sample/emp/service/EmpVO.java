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

import egovframework.sample.cmmn.SearchVO;

/**
 * 사원정보를 저장하기 위한 VO클래스
 *
 * @author Daniela Kwon
 * @version 3.0
 * @see <pre>  == 개정이력(Modification Information) ==   수정일			수정자				수정내용  ---------------------------------------------------------------------------------   2014.04.07	Daniela Kwon		최초생성 </pre>
 * @since 2014.01.24
 */
public class EmpVO extends SearchVO {

	private static final long serialVersionUID = 1L;
	private String empNo;
	private String empNm;
	private String birthdate;
	private String telephone;
	private String address;

	/**
	 * Gets emp no.
	 *
	 * @return the emp no
	 */
	public String getEmpNo() {
		return empNo;
	}

	/**
	 * Sets emp no.
	 *
	 * @param empNo the emp no
	 */
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	/**
	 * Gets emp nm.
	 *
	 * @return the emp nm
	 */
	public String getEmpNm() {
		return empNm;
	}

	/**
	 * Sets emp nm.
	 *
	 * @param empNm the emp nm
	 */
	public void setEmpNm(String empNm) {
		this.empNm = empNm;
	}

	/**
	 * Gets birthdate.
	 *
	 * @return the birthdate
	 */
	public String getBirthdate() {
		return birthdate;
	}

	/**
	 * Sets birthdate.
	 *
	 * @param birthdate the birthdate
	 */
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	/**
	 * Gets telephone.
	 *
	 * @return the telephone
	 */
	public String getTelephone() {
		return telephone;
	}

	/**
	 * Sets telephone.
	 *
	 * @param telephone the telephone
	 */
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	/**
	 * Gets address.
	 *
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * Sets address.
	 *
	 * @param address the address
	 */
	public void setAddress(String address) {
		this.address = address;
	}
}
