package csafy.csservice.repository.test;

import csafy.csservice.entity.test.ProblemOX;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProblemOXRepository extends JpaRepository<ProblemOX, Long> {

    @Query(value = "select p.* from problem_ox p " +
            "where p.category =:category " +
            "order by rand() limit 1", nativeQuery = true)
    ProblemOX findSingle(@Param("category") String category);


    @Query(value = "select p.* from problem_ox p " +
            "where p.category =:category " +
            "order by rand() limit :num", nativeQuery = true)
    List<ProblemOX> findMultiple(@Param("category") String category, @Param("num") int num);

    @Query(value = "select p.* from problem_ox p " +
            "where p.question_seq in :nums", nativeQuery = true)
    List<ProblemOX> findMultipleFixed(@Param("nums") List<Long> nums);

}
