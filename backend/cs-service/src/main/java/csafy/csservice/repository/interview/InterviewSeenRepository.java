package csafy.csservice.repository.interview;

import csafy.csservice.entity.interview.InterviewSeen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewSeenRepository extends JpaRepository<InterviewSeen, Long> {

    @Query("select i from InterviewSeen i where i.interview.interviewSeq =:interviewSeq and i.userSeq =:userSeq")
    InterviewSeen findByInterviewUser(@Param("interviewSeq") Long interviewSeq, @Param("userSeq") Long userSeq);

    @Query("select i from InterviewSeen i where i.userSeq =:userSeq order by i.seenAt DESC")
    Page<InterviewSeen> findByInterviewSeen(@Param("userSeq") Long userSeq, Pageable pageable);

}
