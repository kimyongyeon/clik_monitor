package clikmonitor.nanet.go.kr.component;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
public class CommonUtil {

    /**
     * 시작일, 종료일 범위 일자
     */
    static class DateRange {
        /**
         * The Start day.
         */
        String startDay; // 오늘시작일자
        /**
         * The End day.
         */
        String endDay; // 오늘종료일자
    }

    public static String nullConvert(String src) {
        if(isEmpty(src)) {
            return "";
        } else {
            return src.trim();
        }
    }

    /**
     * 객체 NULL 체크
     *
     * @param s the s
     * @return boolean boolean
     */
    public static boolean isEmpty(Object s) {
        if (s == null) {
            return true;
        }
        if ((s instanceof String) && (((String)s).trim().length() == 0)) {
            return true;
        }
        if (s instanceof Map) {
            return ((Map<?, ?>)s).isEmpty();
        }
        if (s instanceof List) {
            return ((List<?>)s).isEmpty();
        }
        if (s instanceof Object[]) {
            return (((Object[])s).length == 0);
        }
        return false;
    }

    /**
     * String 타입 체크
     *
     * @param object the object
     * @return boolean boolean
     */
    static boolean isTypeStringCheck(Object object) {
        if (object instanceof String) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Integer 타입 체크
     *
     * @param object the object
     * @return boolean boolean
     */
    static boolean isTypeIntegerCheck(Object object) {
        if (object instanceof Integer) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Double 타입 체크
     *
     * @param object the object
     * @return boolean boolean
     */
    static boolean isTypeDoubleCheck(Object object) {
        if (object instanceof Double) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 당일 범위 구하기
     *
     * @param date : 날짜
     * @return : 오늘이 만약 2016.10.10 이면 startDay = 2016.10.10 ~ endDay = 2016.10.10
     */
    public static DateRange DateToTodayRange(Date date) {
        DateRange dateRange = new DateRange();
        return dateRange;
    }

    /**
     * 1주일 범위 구하기
     *
     * @param date : 날짜
     * @return : 오늘이 만약 2016.10.10 이면 startDay = 2016.10.3 ~ endDay = 2016.10.10
     */
    public static DateRange DateWeekendRnage(Date date) {
        DateRange dateRange = new DateRange();
        return dateRange;
    }

    /**
     * 1개월 범위 구하기
     *
     * @param date : 날짜
     * @return : 오늘이 만약 2016.10.10 이면 * startDay = 2016.9.10 ~ endDay = 2016.10.10
     */
    public static DateRange DateMonthRnage(Date date) {
        DateRange dateRange = new DateRange();
        return dateRange;
    }

}
