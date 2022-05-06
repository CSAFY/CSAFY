package csafy.csservice.repository.video;

import csafy.csservice.entity.Video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
