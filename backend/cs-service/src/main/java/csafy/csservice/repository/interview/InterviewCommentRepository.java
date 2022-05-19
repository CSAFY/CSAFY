package csafy.csservice.repository.interview;

import csafy.csservice.entity.interview.InterviewComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InterviewCommentRepository extends JpaRepository<InterviewComment, Long> {
    @Query("select c from InterviewComment c where c.userSeq =:userSeq and c.interview.interviewSeq =:interviewSeq")
    InterviewComment findDuplicate(@Param("userSeq") Long userSeq, @Param("interviewSeq") Long interviewSeq);
}
