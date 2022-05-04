package csafy.csservice.repository.interview;

import csafy.csservice.entity.interview.InterviewLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewLikesRepository extends JpaRepository<InterviewLikes, Long> {

    @Query("select i from InterviewLikes i where i.userSeq =:userSeq and i.interview.interviewSeq =:interviewSeq")
    InterviewLikes isLiked(@Param("userSeq") Long userSeq, @Param("interviewSeq") Long interviewSeq);

    @Query("select count(i) from InterviewLikes i where i.interview.interviewSeq =:interviewSeq")
    int isLikedCount(@Param("interviewSeq") Long interviewSeq);
}
