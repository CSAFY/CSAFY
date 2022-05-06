package csafy.csservice.repository.interview;

import csafy.csservice.entity.interview.InterviewMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InterviewMemoRepository extends JpaRepository<InterviewMemo, Long> {

    @Query("select m from InterviewMemo m where m.userSeq =:userSeq and m.interview.interviewSeq =:interviewSeq")
    InterviewMemo findDuplicate(@Param("userSeq") Long userSeq, @Param("interviewSeq") Long interviewSeq);

    @Query("select m from InterviewMemo m where m.userSeq =:userSeq and m.interview.interviewSeq =:interviewSeq")
    InterviewMemo findMemo(@Param("userSeq") Long userSeq, @Param("interviewSeq") Long interviewSeq);
}
