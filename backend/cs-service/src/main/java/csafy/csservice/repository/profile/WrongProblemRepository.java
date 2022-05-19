package csafy.csservice.repository.profile;

import csafy.csservice.entity.test.ProblemOX;
import csafy.csservice.entity.test.WrongProblem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface WrongProblemRepository extends JpaRepository<WrongProblem, Long> {

    List<WrongProblem> findByUserSeqOrderByRoundAsc(Long userSeq);

    List<WrongProblem> findByUserSeqAndRound(Long userSeq, int round);



//    @Query("select w from WrongProblem w " +
//            "where w.userSeq =:userSeq " +
//            "order by w.round DESC")
//    Page<WrongProblem> findRound(@Param("userSeq") Long userSeq, Pageable pageable);


}
