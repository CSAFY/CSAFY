package csafy.csservice.repository.test;

import csafy.csservice.entity.test.TestRecent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRecentRepository extends JpaRepository<TestRecent, Long> {


    Page<TestRecent> findByUserSeqOrderByExamDoneDesc(Long userSeq, Pageable pageable);

    TestRecent findByUserSeqAndRound(Long userSeq, int round);
}
