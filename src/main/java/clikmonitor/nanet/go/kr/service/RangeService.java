package clikmonitor.nanet.go.kr.service;

import clikmonitor.nanet.go.kr.mapper.RangeMapper;
import clikmonitor.nanet.go.kr.vo.CommonSearchVO;
import clikmonitor.nanet.go.kr.vo.RangeSearchVO;
import clikmonitor.nanet.go.kr.vo.RangeVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by kimyongyeon on 2016-07-29.
 */
public interface RangeService {

    List getRangeSetPagingList(CommonSearchVO rangeSearchVO);
    List selectRangeExcelExportList(CommonSearchVO rangeSearchVO);
    RangeVO getRangeSetDetail(CommonSearchVO rangeSearchVO);
    void regRangeSetProc(RangeVO rangeVO);
    void editRangeSetProc(RangeVO rangeVO);
    void delRangeSetProc(RangeVO rangeVO);


    @Service("rangeService")
    class RangeServiceImpl implements RangeService {

        @Resource(name = "rangeMapper")
        RangeMapper rangeMapper;

        @Override
        public List selectRangeExcelExportList(CommonSearchVO rangeSearchVO) {
            return rangeMapper.selectRangeExcelExportList(rangeSearchVO);
        }

        @Override
        public RangeVO getRangeSetDetail(CommonSearchVO rangeSearchVO) {
            return rangeMapper.selectRangeSetDetail(rangeSearchVO);
        }

        @Override
        public List getRangeSetPagingList(CommonSearchVO rangeSearchVO) {
            return rangeMapper.selectRangeSetPagingList(rangeSearchVO);
        }

        @Override
        public void regRangeSetProc(RangeVO rangeVO) {

            RangeSearchVO rangeSearchVO = new RangeSearchVO();
            rangeSearchVO.setRasmblyId(rangeVO.getRasmblyId());
            RangeVO rangeVO1 = rangeMapper.selectRangeSetDetail(rangeSearchVO);
            // 이미 존재하는 의회는 저장할 수 없다.
            // 존재하는 의회는 수정만 가능함.
            // 중복의회 저장 허용안함.
            if (rangeVO1 == null) {
                rangeMapper.insertRangeSetProc(rangeVO);
            }
        }

        @Override
        public void editRangeSetProc(RangeVO rangeVO) {
            rangeMapper.updateRangeSetProc(rangeVO);
        }

        @Override
        public void delRangeSetProc(RangeVO rangeVO) {
            rangeMapper.deleteRangeSetProc(rangeVO);
        }
    }
}
