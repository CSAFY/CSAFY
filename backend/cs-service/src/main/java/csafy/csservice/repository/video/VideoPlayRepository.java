package csafy.csservice.repository.video;

import csafy.csservice.entity.video.VideoPlay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VideoPlayRepository extends JpaRepository<VideoPlay, Long> {
    @Query("select p from VideoPlay p where p.userSeq =:userSeq and p.video.id =:studySeq")
    VideoPlay checkPlay(@Param("userSeq") Long userSeq, @Param("studySeq") Long studySeq);
}
