package csafy.csservice.repository.video;

import csafy.csservice.entity.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query("select v FROM VideoSeen s left join Video v ON v.id = s.userSeq WHERE s.userSeq =:userSeq order by s.seenAt DESC")
    List<Video> findUserStudy(@Param("userSeq") Long userSeq);

    @Query("select v FROM VideoFavorites f left join Video v ON v.id = f.userSeq WHERE f.userSeq =:userSeq order by f.id DESC")
    List<Video> findUserFavoriteStudy(@Param("userSeq") Long userSeq);
}
