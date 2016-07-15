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
package egovframework.sample.cmmn;

import java.io.Serializable;

/**
 * The type Search vo.
 */
public class SearchVO implements Serializable {

	private static final long serialVersionUID = 1L; 
	private static final int RECORD_COUNT_PER_PAGE = 10;

	private int pageIndex = 1;
	private int pageUnit;
	private int pageSize;
	private int firstIndex = 1;
	private int lastIndex = 1;
	private int recordCountPerPage = RECORD_COUNT_PER_PAGE;
	private String searchCondition = "";
	private String searchKeyword = "";

	/**
	 * Gets page index.
	 *
	 * @return the page index
	 */
	public int getPageIndex() {
		return pageIndex;
	}

	/**
	 * Sets page index.
	 *
	 * @param pageIndex the page index
	 */
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	/**
	 * Gets page unit.
	 *
	 * @return the page unit
	 */
	public int getPageUnit() {
		return pageUnit;
	}

	/**
	 * Sets page unit.
	 *
	 * @param pageUnit the page unit
	 */
	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	/**
	 * Gets page size.
	 *
	 * @return the page size
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * Sets page size.
	 *
	 * @param pageSize the page size
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * Gets first index.
	 *
	 * @return the first index
	 */
	public int getFirstIndex() {
		return firstIndex;
	}

	/**
	 * Sets first index.
	 *
	 * @param firstIndex the first index
	 */
	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	/**
	 * Gets last index.
	 *
	 * @return the last index
	 */
	public int getLastIndex() {
		return lastIndex;
	}

	/**
	 * Sets last index.
	 *
	 * @param lastIndex the last index
	 */
	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	/**
	 * Gets record count per page.
	 *
	 * @return the record count per page
	 */
	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	/**
	 * Sets record count per page.
	 *
	 * @param recordCountPerPage the record count per page
	 */
	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	/**
	 * Gets search condition.
	 *
	 * @return the search condition
	 */
	public String getSearchCondition() {
		return searchCondition;
	}

	/**
	 * Sets search condition.
	 *
	 * @param searchCondition the search condition
	 */
	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	/**
	 * Gets search keyword.
	 *
	 * @return the search keyword
	 */
	public String getSearchKeyword() {
		return searchKeyword;
	}

	/**
	 * Sets search keyword.
	 *
	 * @param searchKeyword the search keyword
	 */
	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	@Override
	public String toString() {
		return "SearchVO [pageIndex=" + pageIndex + ", searchCondition=" + searchCondition + ", searchKeyword=" + searchKeyword + ", pageUnit=" + pageUnit + ", pageSize="
				+ pageSize + "]";
	}
}
