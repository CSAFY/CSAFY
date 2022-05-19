package csafy.csservice.repository.profile;

import csafy.csservice.entity.profile.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    List<UserBadge> findByUserSeqOrderByGetTime(Long userSeq);

    @Query("select b from UserBadge b where b.userSeq =:userSeq and b.badge.id >= :min and b.badge.id <= :max")
    List<UserBadge> findUserBadgeList(@Param("userSeq") Long UserSeq, @Param("min") Long min, @Param("max") Long max);
}
