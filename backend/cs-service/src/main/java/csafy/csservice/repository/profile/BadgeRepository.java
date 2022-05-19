package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.Badge;
import csafy.csservice.entity.profile.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
