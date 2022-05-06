package csafy.csservice.repository.interview;

import csafy.csservice.entity.interview.InterviewCommentLikes;
import csafy.csservice.entity.interview.InterviewLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InterviewCommentLikesRepository extends JpaRepository<InterviewCommentLikes, Long> {

    @Query("select i from InterviewCommentLikes i where i.userSeq =:userSeq and i.interviewComment.id =:interviewCommentSeq")
    InterviewCommentLikes isLiked(@Param("userSeq") Long userSeq, @Param("interviewCommentSeq") Long interviewCommentSeq);

    @Query("select count(i) from InterviewCommentLikes i where i.id =:commentId")
    int isLikedCount(@Param("commentId") Long commentId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from InterviewCommentLikes i where i.interviewComment.id =:commentId")
    void deleteByInterviewCommentId(@Param("commentId") Long commentId);
}
