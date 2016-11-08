package clikmonitor.nanet.go.kr.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by kimyongyeon on 2016-06-28.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailVO {

    // 발송내역
    private int rownum;
    private String no;
    private String title; // 제목
    private String sendDate; // 보낸일자
    private String insertDate; // 등록일자
    private List<CheckBoxVO> recvs;
//    private List<CheckBoxVO> areas1;
//    private List<CheckBoxVO> areas2;
    private String[] areas1;
    private String[] areas2;

    // 이메일 설정
    private String emailId; // 이메일번호
    private String receiver; // 받는사람
    private String rasmlyIds; // 지방의회들
    private String rasmlyNm; // 지방의회명
}
