package csafy.csservice.service;

import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.entity.video.Video;
import csafy.csservice.repository.video.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final VideoRepository videoRepository;


    public List<VideoDto> getLatestStudy(Long userSeq){
        List<Video> videoList = videoRepository.findUserStudy(userSeq);

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }

    public List<VideoDto> getFavoriteStudy(Long userSeq){
        List<Video> videoList = videoRepository.findUserFavoriteStudy(userSeq);

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }



}
