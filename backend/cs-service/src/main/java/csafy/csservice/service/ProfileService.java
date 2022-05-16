package csafy.csservice.service;

import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.interview.InterviewSeenDto;
import csafy.csservice.dto.profile.UserActivityDto;
import csafy.csservice.dto.request.RequestScores;
import csafy.csservice.dto.request.RequestWrongProblem;
import csafy.csservice.dto.response.ResponseStatistic;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.entity.interview.InterviewSeen;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.profile.UserActivity;
import csafy.csservice.entity.profile.UserBadge;
import csafy.csservice.entity.test.WrongProblem;
import csafy.csservice.entity.video.Video;
import csafy.csservice.repository.interview.InterviewSeenRepository;
import csafy.csservice.repository.profile.StatisticsRepository;
import csafy.csservice.repository.profile.UserActivityRepository;
import csafy.csservice.repository.profile.UserBadgeRepository;
import csafy.csservice.repository.profile.WrongProblemRepository;
import csafy.csservice.repository.video.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final VideoRepository videoRepository;

    private final InterviewSeenRepository interviewSeenRepository;

    private final StatisticsRepository statisticsRepository;

    private final UserActivityRepository userActivityRepository;

    private final WrongProblemRepository wrongProblemRepository;

    private final UserBadgeRepository userBadgeRepository;


    public List<VideoDto> getLatestStudy(Long userSeq) {
        Pageable pageable = PageRequest.of(0, 4);
        Page<Video> videoPage = videoRepository.findUserStudy(userSeq, pageable);
        List<Video> videoList = videoPage.getContent();

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }

    public List<VideoDto> getFavoriteStudy(Long userSeq) {
        Pageable pageable = PageRequest.of(0, 4);
        Page<Video> videoPage = videoRepository.findUserFavoriteStudy(userSeq, pageable);
        List<Video> videoList = videoPage.getContent();

        return videoList.stream().map(VideoDto::new).collect(Collectors.toList());
    }

    public List<InterviewSeenDto> getLatestInterview(Long userSeq) {
        Pageable pageable = PageRequest.of(0, 4);
        Page<InterviewSeen> interviewPage = interviewSeenRepository.findByInterviewSeen(userSeq, pageable);
        List<InterviewSeen> interviewList = interviewPage.getContent();

        return interviewList.stream().map(InterviewSeenDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void updateScores(RequestScores requestScores, Long userSeq) {
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if (statistic == null) {
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
            ConcurrentHashMap<String, Integer> inputMap = new ConcurrentHashMap<>();
            inputMap.put(requestScores.getSubject(), requestScores.getScore());
            statistic.setScores(inputMap);
        } else {
            ConcurrentHashMap<String, Integer> inputMap = statistic.getScores();
            if (inputMap == null) inputMap = new ConcurrentHashMap<>();

            if (inputMap.containsKey(requestScores.getSubject())) {
                int score = inputMap.get(requestScores.getSubject());
                if (score + requestScores.getScore() > 1000) inputMap.put(requestScores.getSubject(), 1000);
                else inputMap.put(requestScores.getSubject(), score + requestScores.getScore());
            } else {
                inputMap.put(requestScores.getSubject(), requestScores.getScore());
            }
            statistic.setScores(inputMap);
        }

        statisticsRepository.save(statistic);
    }

    public int getCategoryStatistics(String category, Long userSeq) {

        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if (statistic == null) return 0;

        ConcurrentHashMap<String, Integer> map = statistic.getScores();

        for (ConcurrentHashMap.Entry<String, Integer> entry : map.entrySet()) {
            if (entry.getKey().equals(category))
                return entry.getValue();
        }
        return 0;
    }

    public ResponseStatistic getStatistics(Long userSeq) {
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);
        ConcurrentHashMap<String, Integer> inputMap = null;
        if (statistic == null || statistic.getScores() == null || statistic.getScores().size() == 0) {
            inputMap = new ConcurrentHashMap<>();
        } else {
            inputMap = statistic.getScores();
        }

        int total = 0;
        for (ConcurrentHashMap.Entry<String, Integer> entry : inputMap.entrySet()) {
            total += entry.getValue();
        }

        if (!inputMap.containsKey("자료구조")) inputMap.put("자료구조", 0);
        if (!inputMap.containsKey("컴퓨터구조")) inputMap.put("컴퓨터구조", 0);
        if (!inputMap.containsKey("운영체제")) inputMap.put("운영체제", 0);
        if (!inputMap.containsKey("네트워크")) inputMap.put("네트워크", 0);
        if (!inputMap.containsKey("데이터베이스")) inputMap.put("데이터베이스", 0);
        if (!inputMap.containsKey("기타")) inputMap.put("기타", 0);
        statistic.setScores(inputMap);

        ResponseStatistic responseStatistic = new ResponseStatistic(statistic, total);
        if (total < 1500) {
            responseStatistic.setRank1("브론즈");
            responseStatistic.setRank2(calcRank2(1500, total));
        } else if (total < 3000) {
            responseStatistic.setRank1("실버");
            responseStatistic.setRank2(calcRank2(3000, total));
        } else if (total < 4500) {
            responseStatistic.setRank1("골드");
            responseStatistic.setRank2(calcRank2(4500, total));
        } else if (total < 6000) {
            responseStatistic.setRank1("플래티넘");
            responseStatistic.setRank2(calcRank2(6000, total));
        }

        return responseStatistic;
    }

    public int calcRank2(int compare, int total) {
        int index = 1;
        while (index <= 5) {
            int nowScore = compare - (300 * index);
            if (nowScore <= total) {
                return index;
            }
            index++;
        }
        return 5;
    }

    public List<UserActivityDto> getHeatmap(Long userSeq) {

        List<UserActivity> userActivities = userActivityRepository.findAllByUserSeqOrderByActivityTimeAsc(userSeq);

        if (userActivities == null) return null;

        List<UserActivityDto> result = userActivities.stream().map(UserActivityDto::new).collect(Collectors.toList());

        return result;
    }

    @Transactional
    public void updateHeatmap(Long userSeq) {

        UserActivity userActivity = userActivityRepository.findByUserSeqAndActivityTime(userSeq, LocalDate.now());

        if (userActivity == null) {
            UserActivity nowActivity = new UserActivity();
            nowActivity.setActivityTime(LocalDate.now());
            nowActivity.setUserSeq(userSeq);
            nowActivity.setActivityCount(1L);
            userActivityRepository.save(nowActivity);
        } else {
            userActivity.setActivityCount(userActivity.getActivityCount() + 1);
            userActivityRepository.save(userActivity);
        }


    }

    @Transactional
    public void updateDailyCheck(Long userSeq) {

        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if (statistic == null) {
            Statistic nowStatistic = new Statistic();
            nowStatistic.setUserSeq(userSeq);
            nowStatistic.setDailyCheck(1L);
            nowStatistic.setIsLogin("Y");
            statisticsRepository.save(nowStatistic);
        } else {
            if (statistic.getIsLogin().equals("N")) {
                statistic.setDailyCheck(statistic.getDailyCheck() + 1);
                statistic.setIsLogin("Y");
                statisticsRepository.save(statistic);
            }
        }

    }

    @Transactional
    public void petChange(Long userSeq, String petType) {
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if (statistic == null) {
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
        }
        statistic.setPetType(petType);
        statisticsRepository.save(statistic);
    }

    public String petGet(Long userSeq) {
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if (statistic == null) return "";

        return statistic.getPetType();

    }


    public List<WrongProblem> getWrongProblem(Long userSeq){

        return wrongProblemRepository.findByUserSeqOrderByRoundAsc(userSeq);

    }

    @Transactional
    public void updateWrongProblem(List<RequestWrongProblem> requestWrongProblems, Long userSeq){

        Page<WrongProblem> wrongProblems = wrongProblemRepository.findRound(userSeq, PageRequest.of(0, 1));
        WrongProblem wrongProblem = null;
        if(wrongProblems != null)
        wrongProblem = wrongProblems.getContent().get(0);
        int round = 1;
        if(wrongProblem != null) round = wrongProblem.getRound();
        int roundresult = round;
        List<WrongProblem> inputWrong = requestWrongProblems.stream().map(r -> new WrongProblem(r, userSeq, roundresult)).collect(Collectors.toList());

        wrongProblemRepository.saveAllAndFlush(inputWrong);

    }

    // 뱃지 리스트

    public List<UserBadge> getBadgeList(Long userSeq){

        List<UserBadge> result = userBadgeRepository.findByUserSeqOrderByGetTime(userSeq);

        return result;
    }
}
