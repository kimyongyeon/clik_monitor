import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by kimyongyeon on 2016-09-20.
 */
public class Main {

    // JDBC driver name and database URL
    static String JDBC_DRIVER = "com.tmax.tibero.jdbc.TbDriver";
    static String DB_URL = "jdbc:tibero:thin:@10.201.27.150:8629:CLIKDB";

    // Database credentials
    static final String USER = "clik";
    static final String PASS = "clik#top";

    public static void main(String[] args) {
        emailStart();
    }

    public static void emailStart() {
        Main main = new Main();

        // tar_log : 로그 테이블
        StringBuffer sql_tar_log = new StringBuffer();
        sql_tar_log.append("SELECT COUNT(*) FROM TAR_LOG \n");
        sql_tar_log.append(" WHERE OCCRRNC_DE = TO_CHAR(SYSDATE, 'YYYYMMDD') \n");
        sql_tar_log.append(" AND REQUST_INSTT_ID IN (SELECT RASMBLY_ID FROM COLGOVER WHERE ISVIEW = 'Y') \n");
        sql_tar_log.append(" AND RESULT_CODE != '000' \n");
        sql_tar_log.append(" AND RESULT_CODE != '104'; \n");

        System.out.println("sql_tar_log : " + sql_tar_log.toString());
        List list = main.selInfoList(sql_tar_log.toString());
        // 1. 오늘 일자 기준 로그가 있는지 확인 한다.
        if (list.size() > 0) {
            // 2. 의회별로 관리하는 이메일이 등록 되었는지 체크
            StringBuffer sql_email_set = new StringBuffer();
            sql_email_set.append("SELECT RECEIVER, RASMLY_IDS \n");
            sql_email_set.append(" FROM EMAIL_SET \n");
            sql_email_set.append(" WHERE RASMLY_IDS IN ( \n");
            sql_email_set.append(" SELECT DISTINCT REQUST_INSTT_ID FROM TAR_LOG \n");
            sql_email_set.append(" WHERE OCCRRNC_DE = TO_CHAR(SYSDATE, 'YYYYMMDD') \n");
            sql_email_set.append(" AND REQUST_INSTT_ID IN (SELECT RASMBLY_ID FROM COLGOVER WHERE ISVIEW = 'Y') \n");
            sql_email_set.append(" AND RESULT_CODE != '000' \n");
            sql_email_set.append(" AND RESULT_CODE != '104' \n");
            sql_email_set.append(") \n");
            sql_email_set.append(" GROUP BY RECEIVER, RASMLY_IDS; \n");
            System.out.println("\n\n");
            System.out.println("sql_email_set : " + sql_email_set.toString());
            List list2 = main.selInfoList(sql_email_set.toString());
            if (list2.size() > 0) {

                for (int i = 0; i < list2.size(); i++) {
                    Map m = (Map) list2.get(i);
                    String RASMLY_IDS = m.get("RASMLY_IDS").toString();
                    String RECEIVER = m.get("RECEIVER").toString();

                    // 3. 로그테이블에 저장되지 않은 로그 정보만 추출
                    StringBuffer sql_email_mng = new StringBuffer();
                    sql_email_mng.append("SELECT REQUST_ID, REQUST_INSTT_ID RASMLY_IDS FROM TAR_LOG \n");
                    sql_email_mng.append(" WHERE OCCRRNC_DE = TO_CHAR(SYSDATE, 'YYYYMMDD') \n");
                    sql_email_mng.append(" AND REQUST_INSTT_ID = '" + RASMLY_IDS + "' \n");
                    sql_email_mng.append(" AND REQUST_ID NOT IN (SELECT TAR_LOG_SEQ FROM EMAIL_MNG) \n");
                    sql_email_mng.append(" AND RESULT_CODE != '000' \n");
                    sql_email_mng.append(" AND RESULT_CODE != '104' \n");
                    sql_email_mng.append("MINUS \n");
                    sql_email_mng.append("SELECT REQUST_ID, REQUST_INSTT_ID RASMLY_IDS FROM TAR_LOG \n");
                    sql_email_mng.append(" WHERE OCCRRNC_DE = TO_CHAR(SYSDATE, 'YYYYMMDD') \n");
                    sql_email_mng.append(" AND REQUST_INSTT_ID = '" + RASMLY_IDS + "' \n");
                    sql_email_mng.append(" AND REQUST_ID IN (SELECT TAR_LOG_SEQ FROM EMAIL_MNG) \n");
                    sql_email_mng.append(" AND RESULT_CODE != '000' \n");
                    sql_email_mng.append(" AND RESULT_CODE != '104' \n");
                    System.out.println("\n\n");
                    System.out.println("sql_email_mng : " + sql_email_mng.toString());
                    List list3 = main.selInfoList(sql_email_mng.toString());

                    if (list3.size() > 0) {
                        for (int j = 0; j < list3.size(); j++) {
                            Map requestIdMap = (Map) list3.get(j);
                            String REQUST_ID_ORG = requestIdMap.get("REQUST_ID").toString();
                            System.out.println("REQUST_ID_ORG : " + REQUST_ID_ORG);
                            // 4. 이미 보낸 데이터 인지 체크
                            StringBuffer sql_email_mng_check = new StringBuffer();
                            sql_email_mng_check.append("SELECT TAR_LOG_SEQ FROM EMAIL_MNG WHERE TAR_LOG_SEQ = '" + REQUST_ID_ORG + "' AND RASMBLY_ID = '" + RASMLY_IDS + "'\n");
                            System.out.println("sql_email_mng_check : " + sql_email_mng_check);
                            List listCheck = main.selInfoList(sql_email_mng_check.toString());
                            if (listCheck.size() > 0) {
                                continue;
                            } else {

                                System.out.println("===================이메일 전송 시작=================");
                                System.out.println("RECEIVER : " + RECEIVER);

                                // 5. 로그 데이터를 뽑아서 이메일을 전송한다.
                                StringBuffer sql_tar_log_send = new StringBuffer();
                                sql_tar_log_send.append("SELECT REQUST_ID, REQUST_INSTT_ID, RESULT_CODE, RESULT_MSSAGE \n");
                                sql_tar_log_send.append(" FROM TAR_LOG \n");
                                sql_tar_log_send.append(" WHERE OCCRRNC_DE = TO_CHAR(SYSDATE, 'YYYYMMDD') \n");
                                sql_tar_log_send.append(" AND REQUST_INSTT_ID = '" + RASMLY_IDS + "' \n");
                                sql_tar_log_send.append(" AND RESULT_CODE != '000' \n");
                                sql_tar_log_send.append(" AND RESULT_CODE != '104'; \n");
                                System.out.println("\n\n");
                                System.out.println("sql_tar_log_send : " + sql_tar_log_send.toString());
                                List list4 = main.selInfoList(sql_tar_log_send.toString());
                                if (list4.size() > 0) {
                                    for (int i2 = 0; i2 < list4.size(); i2++) {
                                        Map m2 = (Map) list4.get(i2);
                                        String REQUST_ID = m2.get("REQUST_ID").toString();
                                        String REQUST_INSTT_ID = m2.get("REQUST_INSTT_ID").toString();
                                        String RESULT_CODE = m2.get("RESULT_CODE").toString();
                                        String RESULT_MSSAGE = m2.get("RESULT_MSSAGE").toString();

                                        System.out.println("REQUST_ID : " + REQUST_ID);
                                        System.out.println("REQUST_INSTT_ID : " + REQUST_INSTT_ID);
                                        System.out.println("RESULT_CODE : " + RESULT_CODE);
                                        System.out.println("RESULT_MSSAGE : " + RESULT_MSSAGE);

                                        String title = "[" + REQUST_ID + "," + REQUST_INSTT_ID + "," + RESULT_CODE + "] " + RECEIVER + " 메일을 전송하였습니다. ";
                                        String content = RESULT_MSSAGE.replace("-", "=").replace("\'", "\"");
                                        String receiver = RECEIVER;
                                        String tar_log_seq = REQUST_ID;
                                        String rasmbly_id = REQUST_INSTT_ID;

                                        Map sendMap = new HashMap();
                                        sendMap.put("title", title);
                                        sendMap.put("content", content);
                                        sendMap.put("receiver", receiver);
                                        sendMap.put("tar_log_seq", tar_log_seq);
                                        sendMap.put("rasmbly_id", rasmbly_id);
                                        main.mailSend(sendMap); // 이메일 전송

                                        StringBuffer sql_email_mng_insert = new StringBuffer();

                                        sql_email_mng_insert.append(" INSERT INTO email_mng (" +
                                                "email_id, \n");
                                        sql_email_mng_insert.append("         title, \n");
                                        sql_email_mng_insert.append("         content,\n");
                                        sql_email_mng_insert.append("         send_date, \n");
                                        sql_email_mng_insert.append("         insert_date, \n");
                                        sql_email_mng_insert.append("         receiver, \n");
                                        sql_email_mng_insert.append("         tar_log_seq, \n");
                                        sql_email_mng_insert.append("         rasmbly_id" +
                                                ") \n");
                                        sql_email_mng_insert.append(" VALUES ( " +
                                                "( select count(email_id) + 1 from email_mng), \n");
                                        sql_email_mng_insert.append(" '" + title + "', \n");
                                        sql_email_mng_insert.append(" '" + content + "', \n");
                                        sql_email_mng_insert.append(" to_char(sysdate, 'YYYYMMDD'), \n");
                                        sql_email_mng_insert.append(" to_char(sysdate, 'YYYYMMDD'), \n");
                                        sql_email_mng_insert.append(" '" + receiver + "', \n");
                                        sql_email_mng_insert.append(" '" + tar_log_seq + "', \n");
                                        sql_email_mng_insert.append(" '" + rasmbly_id + "' \n");
                                        sql_email_mng_insert.append(" ); \n");
                                        System.out.println("\n\n");
                                        System.out.println("sql_email_mng_insert : " + sql_email_mng_insert.toString());
                                        int result = main.insertInfo(sql_email_mng_insert.toString());
                                        if (result == 1) {
                                            System.out.println("메일 전송 성공");
                                        } else {
                                            System.out.println("메일 전송 실패");
                                        }
                                    }
                                    System.out.println("===================이메일 전송 끝=================");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * insert, update 함수
     *
     * @param sql
     * @return
     */
    public int insertInfo(String sql) {
        Connection connection = null;
        Statement stmt = null;
        int row = 0;
        try {
            Class.forName(JDBC_DRIVER);

            System.out.println("Connection to database...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            stmt = connection.createStatement();
            row = stmt.executeUpdate(sql);

            stmt.close();
            connection.close();

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } // end try
        return row;
    }

    /**
     * select 함수
     *
     * @param sql
     * @return
     */
    public List selInfoList(String sql) {

        Connection connection = null;
        Statement stmt = null;
        String column;
        List<Map> list = new ArrayList<Map>();
        Map<String, Object> map;

        try {
            Class.forName(JDBC_DRIVER);

            System.out.println("Connection to database...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            ResultSetMetaData metaData = rs.getMetaData();
            int sizeofColumn = metaData.getColumnCount();

            while (rs.next()) {
                map = new HashMap<String, Object>();
                for (int indexOfcolumn = 0; indexOfcolumn < sizeofColumn; indexOfcolumn++) {
                    column = metaData.getColumnName(indexOfcolumn + 1);
                    map.put(column, rs.getString(column));
                }
                list.add(map);
            }
            rs.close();
            stmt.close();
            connection.close();

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } // end try

        return list;
    }

    /**
     * db연결 테스트
     */
    public void dbConnectionTest() {
        Connection connection = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);

            System.out.println("Connection to database...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            stmt = connection.createStatement();
            String sql = "select title from email_mng";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                String title = rs.getString("title");
                System.out.println("TITLE : " + title);
            }
            rs.close();
            stmt.close();
            connection.close();

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } // end try
    }

    public void mailSend(Map m) {
        try {
            String returnMsg = "";
            String from = "admin@nanet.go.kr"; //보내는사람
            String to = m.get("receiver").toString();   //받는사람 - 메일주소

            String subject = m.get("title").toString(); //제목
            String body = m.get("content").toString(); //내용
            String charset = "utf-8"; //인코딩

            subject = new String(subject.getBytes("utf-8"));
            body = new String(body.getBytes("utf-8"));

            // 수신자 이메일
            boolean find = false;
            String cd = "";
            find = isEmailPattern(to);

            if (find == false) {
                cd = "false";
            }

            // 이메일 유효성 검사
            if (cd.equals("false")) {

                System.out.println("이메일이 유효하지 않습니다.");
                return;
            } else {

                URL url = new URL("http://ems.nanet.go.kr/servlet/sendemailu");
                InputStream is = null;
                BufferedReader br = null;
                ImHttpRequestor requestor = new ImHttpRequestor(url);
                requestor.addParameter("from", from);    // 보내는 사람
                requestor.addParameter("to", to);    // 받는사람 이메일
                requestor.addParameter("subject", subject);    // 제목
                requestor.addParameter("body", body);    // 본문
                requestor.addParameter("charset", charset);

                try {
                    is = requestor.sendMultipartPost();
                    br = new BufferedReader(new InputStreamReader(is));
                    String line = "";
                    while ((line = br.readLine()) != null) {
                        returnMsg += line.trim();
                    }
                    br.close();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (is != null) {
                        try {
                            is.close();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    if (br != null) {
                        try {
                            br.close();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        }
        // --------------------------------------------   메일 발송 끝 --------------------------------------------
    }

    /**
     * 이메일 유효성 체크
     *
     * @param email
     * @return
     */
    public static boolean isEmailPattern(String email) {
        //Pattern pattern=Pattern.compile("\\w+[@]\\w+\\.\\w+");
        Pattern pattern = Pattern.compile("^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");
        Matcher match = pattern.matcher(email);
        return match.find();
    }

    /**
     * 이메일 주소 암호화
     *
     * @return
     */
    // EncodeBySType(strD1);
    public String EncodeBySType(String strData) {
        String strRet = null;
        strRet = Encrypt.com_Encode(":" + strData + ":sisenc");
        return strRet;
    }

    /**
     * 이메일 주소 복호화
     *
     * @return
     */
    // SSO 복호화, 사용방법 : strD1	=	DecodeBySType(strEncArr);
    public String DecodeBySType(String strData) {
        String strRet = null;
        int e, d, s, i = 0;

        strRet = Encrypt.com_Decode(strData);
        e = strRet.indexOf(":");
        d = strRet.indexOf(":sisenc");
        strRet = strRet.substring(e + 1, d);
        return strRet;
    }

    /**
     * 이메일 내용 decoding
     *
     * @return
     */
    public String ReplaceTag(String Expression, String type) {
        String result = "";
        if (Expression == null || Expression.equals("")) return "";

        if (type == "encode") {
            result = StringUtil.replace(Expression, "&", "&amp;");
            result = StringUtil.replace(result, "\"", "&quot;");

            result = StringUtil.replace(result, "'", "&apos;");
            result = StringUtil.replace(result, "<", "&lt;");
            result = StringUtil.replace(result, ">", "&gt;");
            result = StringUtil.replace(result, "\r", "<br>");
            result = StringUtil.replace(result, "\n", "<p>");
        } else if (type == "decode") {
            result = StringUtil.replace(Expression, "&amp;", "&");
            result = StringUtil.replace(result, "&quot;", "\"");

            result = StringUtil.replace(result, "&#35;", "#");
            result = StringUtil.replace(result, "&#39;", "\\");
            result = StringUtil.replace(result, "&#37;", "%");
            result = StringUtil.replace(result, "&#40;", "(");
            result = StringUtil.replace(result, "&#41;", ")");
            result = StringUtil.replace(result, "&#43;", "+");
            result = StringUtil.replace(result, "&#46;", ".");
            result = StringUtil.replace(result, "&#47;", "/");

            result = StringUtil.replace(result, "&apos;", "'");
            result = StringUtil.replace(result, "&lt;", "<");
            result = StringUtil.replace(result, "&gt;", ">");
            result = StringUtil.replace(result, "<br>", "\r");
            result = StringUtil.replace(result, "<p>", "\n");
        }

        return result;
    }
}
