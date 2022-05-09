package csafy.csservice.service;

import csafy.csservice.dto.interview.InterviewCommentResponseDto;
import csafy.csservice.dto.response.ResponseVideo;
import csafy.csservice.entity.Video.VideoFavorites;
import csafy.csservice.entity.Video.VideoSeen;
import csafy.csservice.entity.interview.InterviewLikes;
import csafy.csservice.repository.video.VideoFavoritesRepository;
import csafy.csservice.repository.video.VideoLikesRepository;
import csafy.csservice.repository.video.VideoRepository;
import csafy.csservice.repository.video.VideoSeenRepository;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoFavoritesRepository videoFavoritesRepository;
    private final VideoLikesRepository videoLikesRepository;
    private final VideoRepository videoRepository;
    private final VideoSeenRepository videoSeenRepository;

    @PersistenceContext
    EntityManager em;

    public List<ResponseVideo> getStudyList(Long userSeq){
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT v.*, " +
                "(SELECT COUNT(*) FROM video_seen s WHERE s.video_seq = v.id AND s.user_seq = " + userSeq + " ) AS seen, " +
                "(SELECT COUNT(*) FROM video_favorites f WHERE f.video_seq = v.id and f.user_seq = " + userSeq + " ) AS favorites " +
                "FROM video v");
        List<ResponseVideo> list = jpaResultMapper.list(q, ResponseVideo.class);
        return list;
    }

    public int studyFavoritesCheck(Long userSeq, Long studySeq){
        return videoFavoritesRepository.checkFavorites(userSeq, studySeq);

    }

    @Transactional
    public void studyFavorites(Long userSeq, Long studySeq){

        VideoFavorites videoFavorites = videoFavoritesRepository.isLiked(userSeq, studySeq);

        if(videoFavorites == null) {
            videoFavorites = new VideoFavorites();
            videoFavorites.setVideo(videoRepository.findById(studySeq).orElse(null));
            videoFavorites.setUserSeq(userSeq);
            videoFavoritesRepository.save(videoFavorites);
        }
        else videoFavoritesRepository.delete(videoFavorites);
    }

    public int studySeenCheck(Long userSeq, Long studySeq){
        return videoSeenRepository.checkFavorites(userSeq, studySeq);
    }

    @Transactional
    public void studySeens(Long userSeq, Long studySeq){

        VideoSeen videoSeen = videoSeenRepository.checkSeen(userSeq, studySeq);


        if(videoSeen == null ) {
            videoSeen = new VideoSeen();
            videoSeen.setVideo(videoRepository.findById(studySeq).orElse(null));
            videoSeen.setUserSeq(userSeq);
            videoSeen.setSeenAt(LocalDateTime.now());
        }
        else {
            videoSeen.setSeenAt(LocalDateTime.now());
        }
        videoSeenRepository.save(videoSeen);
    }


}
