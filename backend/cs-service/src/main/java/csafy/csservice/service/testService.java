package csafy.csservice.service;

import csafy.csservice.dto.response.zzz;
import org.qlrm.mapper.JpaResultMapper;

import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;


public class testService {

    @PersistenceContext
    EntityManager em;

    // 리파지터리 나중에ㅐ
    //private final StackRepository stackRepository;

    // getStackList : 과목별 문제집 가져오기
    // 테이블 구조 어떻게 되있는거지
    public List<zzz> getStackList(Long userSeq){
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT * FROM A");
        // userSeq, 과목조건 where문 차후 추가
        List<zzz> list = jpaResultMapper.list(q, zzz.class);
        return list;
    }

    // getMyStackList : 나만의 문제집 GET
    // 일단 하나만 만들고 구조는 복사했었으니까. 검수받은 후에 고쳐옮기자
}
