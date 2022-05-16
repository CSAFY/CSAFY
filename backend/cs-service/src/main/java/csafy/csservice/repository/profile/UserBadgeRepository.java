package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    List<UserBadge> findByUserSeqOrderByGetTime(Long userSeq);
}
