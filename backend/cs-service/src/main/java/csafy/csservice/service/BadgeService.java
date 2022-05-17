package csafy.csservice.service;

import csafy.csservice.entity.profile.UserBadge;
import csafy.csservice.repository.profile.BadgeRepository;
import csafy.csservice.repository.profile.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BadgeService {

    private final UserBadgeRepository userBadgeRepository;

    private final BadgeRepository badgeRepository;

    private final List<Long> loginList = Arrays.asList(1L, 2L, 4L, 8L, 16L, 32L, 64L, 128L);

    private final List<Long> rankList = Arrays.asList(1500L, 3000L, 4500L);
    private final List<Long> osList = Arrays.asList(300L, 600L, 900L);
    private final List<Long> dbList = Arrays.asList(300L, 600L, 900L);
    private final List<Long> networkList = Arrays.asList(300L, 600L, 900L);
    private final List<Long> structureList = Arrays.asList(300L, 600L, 900L);
    private final List<Long> computerList = Arrays.asList(300L, 600L, 900L);
    private final List<Long> etcList = Arrays.asList(300L, 600L, 900L);

    private final List<Long> studyList = Arrays.asList(5L, 10L, 20L);
    private final List<Long> interviewList = Arrays.asList(5L, 10L, 20L);
    private final List<Long> examList = Arrays.asList(5L, 10L, 20L);
    private final List<Long> multipleList = Arrays.asList(5L, 10L, 20L);
    private final List<Long> oxList = Arrays.asList(5L, 10L, 20L);


    // 로그인 체크
    @Transactional
    public void checkBadgeLogin(Long userSeq, Long loginCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 1L, 8L );
        List<Long> userLoginList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userLoginList.add(userBadge.getBadge().getId());
        }
        int len = loginList.size();
        for(int i = len-1 ; i >= 0; i--){
            if(Objects.equals(loginList.get(i), loginCount) && !userLoginList.contains((long)(i + 1))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i + 1)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }
    }

    @Transactional
    public void checkRank(Long userSeq, Long totalScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 9L, 11L );
        List<Long> userRankList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userRankList.add(userBadge.getBadge().getId());
        }
        int len = rankList.size();

        for(int i = len-1 ; i>= 0; i--){
            if(rankList.get(i) <= totalScore && !userRankList.contains((long)(i+9))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+9)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }
    }

    @Transactional
    public void checkCategoryOS(Long userSeq, int nowScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 12L, 14L );
        List<Long> userOSList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userOSList.add(userBadge.getBadge().getId());
        }
        int len = osList.size();

        for(int i = len-1 ; i>= 0; i--){
            if(osList.get(i) <= nowScore && !userOSList.contains((long)(i+12))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+12)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }
    }

    @Transactional
    public void checkCategoryDB(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 15L, 17L );
        List<Long> userDBList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userDBList.add(userBadge.getBadge().getId());
        }
        int len = dbList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(dbList.get(i) <= nowScore && !userDBList.contains((long)(i+15))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+15)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }
    }

    @Transactional
    public void checkCategoryNetwork(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 18L, 20L );
        List<Long> userNetworkList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userNetworkList.add(userBadge.getBadge().getId());
        }
        int len = networkList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(networkList.get(i) <= nowScore && !userNetworkList.contains((long)(i+18))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+18)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkCategoryStructure(Long userSeq, int nowScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 21L, 23L );
        List<Long> userStructureList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userStructureList.add(userBadge.getBadge().getId());
        }
        int len = structureList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(structureList.get(i) <= nowScore && !userStructureList.contains((long)(i+21))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+21)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }
    }

    @Transactional
    public void checkCategoryComputer(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 24L, 26L );
        List<Long> userComputerList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userComputerList.add(userBadge.getBadge().getId());
        }
        int len = computerList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(computerList.get(i) <= nowScore && !userComputerList.contains((long)(i+24))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+24)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkCategoryEtc(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 27L, 29L );
        List<Long> userEtcList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userEtcList.add(userBadge.getBadge().getId());
        }
        int len = etcList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(etcList.get(i) <= nowScore && !userEtcList.contains((long)(i+27))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+27)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkStudyCount(Long userSeq, Long studyCount){
        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 30L, 32L );
        List<Long> userStudyList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userStudyList.add(userBadge.getBadge().getId());
        }
        int len = studyList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(studyList.get(i) <= studyCount && !userStudyList.contains((long)(i+30))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+30)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkInterviewCount(Long userSeq, Long interviewCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 33L, 35L );
        List<Long> userInterviewList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userInterviewList.add(userBadge.getBadge().getId());
        }
        int len = interviewList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(interviewList.get(i) <= interviewCount && !userInterviewList.contains((long)(i+33))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+33)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkExamCount(Long userSeq, Long examCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 36L, 38L );
        List<Long> userExamList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userExamList.add(userBadge.getBadge().getId());
        }
        int len = examList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(examList.get(i) <= examCount && !userExamList.contains((long)(i+36))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+36)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
                break;
            }
        }

    }

    @Transactional
    public void checkOXCount(Long userSeq, Long oxCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 39L, 41L );
        List<Long> userOXList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userOXList.add(userBadge.getBadge().getId());
        }
        int len = oxList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(oxList.get(i) <= oxCount && !userOXList.contains((long)(i+39))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+39)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
            }
        }

    }

    @Transactional
    public void checkMultipleCount(Long userSeq, Long multipleCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findUserBadgeList(userSeq, 42L, 44L );
        List<Long> userMultipleList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userMultipleList.add(userBadge.getBadge().getId());
        }
        int len = multipleList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(multipleList.get(i) <= multipleCount && !userMultipleList.contains((long)(i+42))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+42)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                userBadgeRepository.save(nowUserBadge);
            }
        }

    }




}
