package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StatisticsRepository extends JpaRepository<Statistic, Long> {

    Statistic findByUserSeq(Long userSeq);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update Statistic s set s.isLogin = 'N'")
    void updateDailyCheck();
}
