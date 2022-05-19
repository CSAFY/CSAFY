package csafy.csservice.repository.interview;

import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.entity.interview.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    @Query("select i from Interview i where i.category =:category")
    List<Interview> findCategory(@Param("category") String category);

    @Query(value = "select i.*, m.memo from interview i left join interview_memo m " +
            "on i.interview_seq = m.interview_seq and m.user_seq = :userSeq " +
            "order by rand() limit :question", nativeQuery = true)
    List<InterviewDto> findInterviewLimit(@Param("question") int question, @Param("userSeq") Long userSeq);

    @Query(value = "select i.*, m.memo from Interview i left join interview_memo m " +
            "on i.category =:category and i.interview_seq = m.interview_seq and m.user_seq = :userSeq " +
            "order by rand() limit :question", nativeQuery = true)
    List<InterviewDto> findInterviewLimitCategory(@Param("category") String category, @Param("question") int question, @Param("userSeq") Long userSeq);


}
