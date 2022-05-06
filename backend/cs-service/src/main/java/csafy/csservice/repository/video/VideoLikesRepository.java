package csafy.csservice.repository.video;

import csafy.csservice.entity.Video.VideoLikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoLikesRepository extends JpaRepository<VideoLikes, Long> {
}
