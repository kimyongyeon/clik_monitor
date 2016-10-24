package clikmonitor.nanet.go.kr.emailbatch;

import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by kimyongyeon on 2016-09-20.
 */
public class EmailMain {

    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.tmax.tibero.jdbc.TbDriver";
    static final String DB_URL = "jdbc:tibero:thin:@10.201.27.6:8629:CLIKDB";

    // Database credentials
    static final String USER = "clik";
    static final String PASS = "clik#dev";

    public static void main(String[] args) {

        EmailMain emailMain = new EmailMain();
        String sql = "SELECT /*+ INDEX_FFS(TAR_LOG CLIK_TAR_LOG_CHART_IDX) PARALLEL_INDEX(TAR_LOG CLIK_TAR_LOG_CHART_IDX) */\n" +
                "*\n" +
                "        FROM TAR_LOG, COLGOVER\n" +
                "        WHERE TAR_LOG.REQUST_INSTT_ID = COLGOVER.RASMBLY_ID\n" +
                "        AND RESULT_CODE != '000' AND RESULT_CODE != '104'\n" +
                "        AND OCCRRNC_DE BETWEEN TO_CHAR(TRUNC(SYSDATE,'DD'),'YYYYMMDD') AND TO_CHAR(LAST_DAY(ADD_MONTHS(TO_CHAR(TRUNC(SYSDATE,'DD'),'YYYYMMDD'),+11)),'YYYYMMDD')\n" +
                "        AND CNTC_ID IS NOT NULL";
        List list = emailMain.selInfoList(sql); // 전송 오류가 있는지 체크
        StringJoiner requstIds = new StringJoiner(",");
        if(list.size() > 0) {
            // requst_id 체크 이미 해당 오류건에 대해서 보냈는지?
            for(int i=0; i<list.size(); i++) {
                Map m = (Map)list.get(i);
                String requstId = m.get("REQUST_ID").toString();
                requstIds.add("'" + requstId + "'");
            }
            List resultList = emailMain.selInfoList("SELECT COUNT(*) FROM EMAIL_MNG WHERE REQUST_ID IN ("+requstIds+");"); // 전송 오류가 있는지 체크
            if(resultList.size() == 0) {
                emailMain.mailSend(); // 이메일 전송
            }
        }
    }

    /**
     * insert, update 함수
     * @param sql
     * @return
     */
    public int insertInfo(String sql) {
        Connection connection = null;
        Statement stmt = null;
        int row = 0;
        try{
            Class.forName(JDBC_DRIVER);

            System.out.println("Connection to database...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            stmt = connection.createStatement();

            row = stmt.executeUpdate(sql);

            stmt.close();
            connection.close();

        } catch (SQLException se){
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if(connection != null)
                    connection.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } // end try
        return row;
    }

    /**
     * select 함수
     * @param sql
     * @return
     */
    public List selInfoList(String sql) {

        Connection connection = null;
        Statement stmt = null;
        String column;
        List<Map> list = new ArrayList<>();
        Map<String, Object> map;

        try{
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
                for(int indexOfcolumn=0; indexOfcolumn<sizeofColumn; indexOfcolumn++) {
                    column = metaData.getColumnName(indexOfcolumn + 1);
                    map.put(column, rs.getString(column));
                }
                list.add(map);
            }
            rs.close();
            stmt.close();
            connection.close();

        } catch (SQLException se){
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if(connection != null)
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
        try{
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

        } catch (SQLException se){
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(stmt != null)
                    stmt.close();
            } catch (SQLException se) {
            }
            try {
                if(connection != null)
                    connection.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } // end try
    }

    public void mailSend() {
        try {
            // 1. 메일 발송내역 저장----------------------------------------------------------------------------
            insertInfo("insert into email_mng"); // 최초 등록일자 저장
            // 1. 메일 발송내역 저장 끝----------------------------------------------------------------------------

            // 3. 메일 발송----------------------------------------------------------------------------------------
            List list = selInfoList("select * from email_set");

            String returnMsg = "";
            String from = "toyongyeon@gmail.com"; //보내는사람
            String to = "toyongyeon@gmail.com";   //받는사람 - 메일주소

            String subject = "[요청번호] [의회코드] 서울시의회 오류 사항 입니다."; //제목
            String body = "exception 오류 발생했습니다. 지금 서버에서 확인하세요."; //내용
            String charset = "utf-8"; //인코딩

            subject = new String(subject.getBytes("utf-8"));
            body = new String(body.getBytes("utf-8"));

            for(int i=0; i<list.size(); i++) {

                // 수신자 이메일
                boolean find = false;
                String cd = "";
                find = isEmailPattern(to);

                if(find == false){
                    cd = "false";
                }

                // 이메일 유효성 검사
                if(cd.equals("false")){
                    System.out.println("이메일이 유효하지 않습니다.");
                    return;
                }else{
                    URL url = new URL("http://ems.nanet.go.kr/servlet/sendemailu");
                    InputStream is = null;
                    BufferedReader br = null;
                    ImHttpRequestor requestor = new ImHttpRequestor(url);
                    requestor.addParameter("from", from);	// 보내는 사람
                    requestor.addParameter("to", to);	// 받는사람 이메일
                    requestor.addParameter("subject", subject);	// 제목
                    requestor.addParameter("body", body);	// 본문
                    requestor.addParameter("charset", charset);

                    try {
                        is = requestor.sendMultipartPost();
                        br = new BufferedReader(new InputStreamReader(is));
                        String line = "";
                        while( (line=br.readLine())!= null ) {
                            returnMsg += line.trim();
                        }
                        br.close();
                    } catch(Exception e){
                        e.printStackTrace();
                    } finally {
                        if ( is != null ){
                            try {
                                is.close();
                            }
                            catch(Exception e){
                                e.printStackTrace();
                            }
                        }
                        if ( br != null ){
                            try {
                                br.close();
                            }catch(Exception e){
                                e.printStackTrace();
                            }
                        }
                    }
                }

            }

            // 메일 발송이 성공이면 메일 상태를 발송성공으로 수정 및 메일 수신거부자 수정
            insertInfo("insert into email_mng"); // 수정날짜 업데이트

        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        }
        // --------------------------------------------   메일 발송 끝 --------------------------------------------
    }
    /**
     * 이메일 유효성 체크
     * @param email
     * @return
     */
    public static boolean isEmailPattern(String email){
        //Pattern pattern=Pattern.compile("\\w+[@]\\w+\\.\\w+");
        Pattern pattern= Pattern.compile("^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");
        Matcher match=pattern.matcher(email);
        return match.find();
    }

    /**
     * 이메일 주소 암호화
     * @return
     */
    // EncodeBySType(strD1);
    public String EncodeBySType(String strData){
        String strRet = null;
        strRet = Encrypt.com_Encode(":" + strData + ":sisenc");
        return strRet;
    }

    /**
     * 이메일 주소 복호화
     * @return
     */
    // SSO 복호화, 사용방법 : strD1	=	DecodeBySType(strEncArr);
    public String DecodeBySType(String strData){
        String strRet = null;
        int e, d, s, i=0;

        strRet = Encrypt.com_Decode(strData);
        e = strRet.indexOf(":");
        d = strRet.indexOf(":sisenc");
        strRet = strRet.substring(e+1, d);
        return strRet;
    }

    /**
     * 이메일 내용 decoding
     * @return
     */
    public String ReplaceTag(String Expression, String type){
        String result = "";
        if (Expression==null || Expression.equals("")) return "";

        if (type == "encode") {
            result = StringUtils.replace(Expression, "&", "&amp;");
            result = StringUtils.replace(result, "\"", "&quot;");

            result = StringUtils.replace(result, "'", "&apos;");
            result = StringUtils.replace(result, "<", "&lt;");
            result = StringUtils.replace(result, ">", "&gt;");
            result = StringUtils.replace(result, "\r", "<br>");
            result = StringUtils.replace(result, "\n", "<p>");
        }
        else if (type == "decode") {
            result = StringUtils.replace(Expression, "&amp;", "&");
            result = StringUtils.replace(result, "&quot;", "\"");

            result = StringUtils.replace(result, "&#35;", "#");
            result = StringUtils.replace(result, "&#39;", "\\");
            result = StringUtils.replace(result, "&#37;", "%");
            result = StringUtils.replace(result, "&#40;", "(");
            result = StringUtils.replace(result, "&#41;", ")");
            result = StringUtils.replace(result, "&#43;", "+");
            result = StringUtils.replace(result, "&#46;", ".");
            result = StringUtils.replace(result, "&#47;", "/");

            result = StringUtils.replace(result, "&apos;", "'");
            result = StringUtils.replace(result, "&lt;", "<");
            result = StringUtils.replace(result, "&gt;", ">");
            result = StringUtils.replace(result, "<br>", "\r");
            result = StringUtils.replace(result, "<p>", "\n");
        }

        return result;
    }
}
