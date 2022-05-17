package csafy.csservice.repository.test;

import csafy.csservice.entity.test.ProblemFixed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemFixedRepository extends JpaRepository<ProblemFixed, Long> {
    ProblemFixed findOneByCategory(String category);
}
