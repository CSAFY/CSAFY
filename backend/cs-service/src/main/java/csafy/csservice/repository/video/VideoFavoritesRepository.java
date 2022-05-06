package csafy.csservice.repository.video;

import csafy.csservice.entity.Video.VideoFavorites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoFavoritesRepository extends JpaRepository<VideoFavorites, Long> {
}
