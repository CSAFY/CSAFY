package csafy.csservice.repository.test;

import csafy.csservice.entity.test.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findAllByQuestionNum(int questionNum);
}
