package csafy.csservice.repository.video;

import csafy.csservice.entity.video.VideoLikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoLikesRepository extends JpaRepository<VideoLikes, Long> {
}
