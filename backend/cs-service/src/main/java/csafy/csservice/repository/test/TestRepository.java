package csafy.csservice.repository.test;

import csafy.csservice.entity.test.Problem;
import csafy.csservice.entity.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {

}
