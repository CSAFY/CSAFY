package csafy.csservice.repository.video;

import csafy.csservice.entity.Video.VideoSeen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoSeenRepository extends JpaRepository<VideoSeen, Long> {
}
