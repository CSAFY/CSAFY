package csafy.csservice.service;

import csafy.csservice.dto.response.ResponseVideo;
import csafy.csservice.entity.profile.Badge;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.video.*;
import csafy.csservice.repository.profile.StatisticsRepository;
import csafy.csservice.repository.video.*;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoFavoritesRepository videoFavoritesRepository;
    private final VideoLikesRepository videoLikesRepository;
    private final VideoRepository videoRepository;
    private final VideoSeenRepository videoSeenRepository;
    private final VideoPlayRepository videoPlayRepository;
    private final VideoCertificateRepository videoCertificateRepository;

    private final StatisticsRepository statisticsRepository;

    private final BadgeService badgeService;

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
    public VideoCertificate studySeens(Long userSeq, Long studySeq){

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

        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if(statistic == null){
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
            statistic.setStudyCount(1L);
        } else{
            statistic.setStudyCount(statistic.getStudyCount() + 1);
        }

        Long studyCount = statistic.getStudyCount();
        badgeService.checkStudyCount(userSeq, studyCount);

        statisticsRepository.save(statistic);

        List<Video> videos = videoRepository.findCategoryStudy(studySeq);

        if(videos == null || videos.size() == 0){
            return null;
        }

        String category = videos.get(0).getCategoryId();

        int seenCount = videoSeenRepository.findCategorySeen(userSeq, category);

        VideoCertificate videoCertificateDuplicated = videoCertificateRepository.findByUserSeqAndCategory(userSeq, category);

        if(videos.size() == seenCount && videoCertificateDuplicated == null){
            VideoCertificate videoCertificate = new VideoCertificate();
            videoCertificate.setCategory(category);
            videoCertificate.setUserSeq(userSeq);
            videoCertificate.setCertificatedAt(LocalDate.now());
            videoCertificateRepository.save(videoCertificate);
            return videoCertificate;
        }

        return null;

    }

    @Transactional
    public void studyPlays(Long userSeq, Long studySeq){

        VideoPlay videoPlay = videoPlayRepository.checkPlay(userSeq, studySeq);

        if(videoPlay == null ) {
            videoPlay = new VideoPlay();
            videoPlay.setVideo(videoRepository.findById(studySeq).orElse(null));
            videoPlay.setUserSeq(userSeq);
            videoPlay.setPlayAt(LocalDateTime.now());
        }
        else {
            videoPlay.setPlayAt(LocalDateTime.now());
        }
        videoPlayRepository.save(videoPlay);
    }

}
