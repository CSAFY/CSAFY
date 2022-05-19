package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    UserActivity findByUserSeqAndActivityTime(Long userSeq, LocalDate activityTime);
    List<UserActivity> findAllByUserSeqOrderByActivityTimeAsc(Long userSeq);
}
