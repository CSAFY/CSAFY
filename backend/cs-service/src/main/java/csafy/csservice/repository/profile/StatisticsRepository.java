package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticsRepository extends JpaRepository<Statistic, Long> {

    Statistic findByUserSeq(Long userSeq);
}
