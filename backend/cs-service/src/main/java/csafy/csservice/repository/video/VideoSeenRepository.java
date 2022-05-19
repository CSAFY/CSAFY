package csafy.csservice.repository.video;

import csafy.csservice.entity.video.VideoSeen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VideoSeenRepository extends JpaRepository<VideoSeen, Long> {

    @Query("select count(s) from VideoSeen s where s.userSeq =:userSeq and s.video.id =:studySeq")
    int checkFavorites(@Param("userSeq") Long userSeq, @Param("studySeq") Long studySeq);

    @Query("select s from VideoSeen s where s.userSeq =:userSeq and s.video.id =:studySeq")
    VideoSeen checkSeen(@Param("userSeq") Long userSeq, @Param("studySeq") Long studySeq);
}
