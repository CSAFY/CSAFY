package csafy.csservice.repository.video;

import csafy.csservice.entity.video.VideoFavorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VideoFavoritesRepository extends JpaRepository<VideoFavorites, Long> {


    @Query("select count(f) from VideoFavorites f where f.userSeq =:userSeq and f.video.id =:studySeq")
    int checkFavorites(@Param("userSeq") Long userSeq, @Param("studySeq") Long studySeq);

    @Query("select f from VideoFavorites f where f.userSeq =:userSeq and f.video.id =:studySeq")
    VideoFavorites isLiked(@Param("userSeq") Long userSeq, @Param("studySeq") Long studySeq);
}
