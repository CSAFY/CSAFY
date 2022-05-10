package csafy.csservice.repository.video;

import csafy.csservice.entity.video.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    // 최근 다 본 강의
//    @Query("select v FROM VideoSeen s left join Video v ON v.id = s.video.id WHERE s.userSeq =:userSeq order by s.seenAt DESC")
//    Page<Video> findUserStudy(@Param("userSeq") Long userSeq, Pageable pageable);

    // 최근 본 강의
    @Query("select v FROM VideoPlay p left join Video v ON v.id = p.video.id WHERE p.userSeq =:userSeq order by p.playAt DESC")
    Page<Video> findUserStudy(@Param("userSeq") Long userSeq, Pageable pageable);

    @Query("select v FROM VideoFavorites f left join Video v ON v.id = f.video.id WHERE f.userSeq =:userSeq order by f.id DESC")
    Page<Video> findUserFavoriteStudy(@Param("userSeq") Long userSeq, Pageable pageable);
}
