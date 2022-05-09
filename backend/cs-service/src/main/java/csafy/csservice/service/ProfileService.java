package csafy.csservice.service;

import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.interview.InterviewSeenDto;
import csafy.csservice.dto.request.RequestScores;
import csafy.csservice.dto.response.ResponseStatistic;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.entity.interview.InterviewSeen;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.video.Video;
import csafy.csservice.repository.interview.InterviewSeenRepository;
import csafy.csservice.repository.profile.StatisticsRepository;
import csafy.csservice.repository.video.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final VideoRepository videoRepository;

    private final InterviewSeenRepository interviewSeenRepository;

    private final StatisticsRepository statisticsRepository;


    public List<VideoDto> getLatestStudy(Long userSeq){
        List<Video> videoList = videoRepository.findUserStudy(userSeq);

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }

    public List<VideoDto> getFavoriteStudy(Long userSeq){
        List<Video> videoList = videoRepository.findUserFavoriteStudy(userSeq);

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }

    public List<InterviewSeenDto> getLatestInterview(Long userSeq){
        List<InterviewSeen> interviewList = interviewSeenRepository.findByInterviewSeen(userSeq);

        return interviewList.stream().map(InterviewSeenDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void updateScores(RequestScores requestScores, Long userSeq){
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if(statistic == null){
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
            ConcurrentHashMap<String, Integer> inputMap = new ConcurrentHashMap<>();
            inputMap.put(requestScores.getSubject(), requestScores.getScore());
            statistic.setScores(inputMap);
        }
        else {
            ConcurrentHashMap<String, Integer> inputMap = statistic.getScores();
            if(inputMap == null) inputMap = new ConcurrentHashMap<>();

            if(inputMap.containsKey(requestScores.getSubject())){
                int score = inputMap.get(requestScores.getSubject());
                inputMap.put(requestScores.getSubject(), score + requestScores.getScore());
            } else {
                inputMap.put(requestScores.getSubject(), requestScores.getScore());
            }
            statistic.setScores(inputMap);
        }

        statisticsRepository.save(statistic);
    }
    public ResponseStatistic getStatistics(Long userSeq){
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);
        ConcurrentHashMap<String, Integer> inputMap = null;
        if(statistic == null || statistic.getScores() == null || statistic.getScores().size() == 0){
            inputMap = new ConcurrentHashMap<>();
        }
        else{
            inputMap = statistic.getScores();
        }

        int total = 0;
        for(ConcurrentHashMap.Entry<String, Integer> entry : inputMap.entrySet()){
            total += entry.getValue();
        }

        if(!inputMap.containsKey("자료구조")) inputMap.put("자료구조", 0);
        if(!inputMap.containsKey("컴퓨터구조")) inputMap.put("컴퓨터구조", 0);
        if(!inputMap.containsKey("운영체제")) inputMap.put("운영체제", 0);
        if(!inputMap.containsKey("네트워크")) inputMap.put("네트워크", 0);
        if(!inputMap.containsKey("데이터베이스")) inputMap.put("데이터베이스", 0);
        if(!inputMap.containsKey("기타")) inputMap.put("기타", 0);
        statistic.setScores(inputMap);

        ResponseStatistic responseStatistic = new ResponseStatistic(statistic, total);
        if(total < 1500){
            responseStatistic.setRank1("브론즈");
            responseStatistic.setRank2(calcRank2(1500, total));
        } else if(total < 3000) {
            responseStatistic.setRank1("실버");
            responseStatistic.setRank2(calcRank2(3000, total));
        } else if(total < 4500) {
            responseStatistic.setRank1("골드");
            responseStatistic.setRank2(calcRank2(4500, total));
        } else if(total < 6000) {
            responseStatistic.setRank1("플래티넘");
            responseStatistic.setRank2(calcRank2(6000, total));
        } else{
            responseStatistic.setRank1("루비");
            responseStatistic.setRank2(calcRank2(7500, total));
        }

        return responseStatistic;
    }

    public int calcRank2(int compare, int total){
        int index = 1;
        while(index <= 5){
            int nowScore = compare - (300 * index);
            if(nowScore <= total) {
                return index;
            }
            index++;
        }
        return 5;
    }



}
