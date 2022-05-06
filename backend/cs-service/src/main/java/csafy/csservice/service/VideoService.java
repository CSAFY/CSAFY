package csafy.csservice.service;

import csafy.csservice.repository.video.VideoFavoritesRepository;
import csafy.csservice.repository.video.VideoLikesRepository;
import csafy.csservice.repository.video.VideoRepository;
import csafy.csservice.repository.video.VideoSeenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoFavoritesRepository videoFavoritesRepository;
    private final VideoLikesRepository videoLikesRepository;
    private final VideoRepository videoRepository;
    private final VideoSeenRepository videoSeenRepository;
}
