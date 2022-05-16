package csafy.csservice.service;

import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.profile.UserBadge;
import csafy.csservice.repository.profile.BadgeRepository;
import csafy.csservice.repository.profile.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    private final List<Long> loginList = Arrays.asList(2L, 4L, 8L, 16L, 32L, 64L, 128L);

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
    public void checkBadgeLogin(Long userSeq, Long loginCount){

        if(loginCount > 128 || !loginList.contains(loginCount)) return;

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 1, 8 );
        List<Long> userLoginList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userLoginList.add(userBadge.getBadge().getId());
        }
        int len = loginList.size();
        for(int i = len-1 ; i >= 0; i--){
            if(Objects.equals(loginList.get(i), loginCount) && !userLoginList.contains((long)(i + 2))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i + 2)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }
    }

    public void checkRank(Long userSeq, Long totalScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 9, 11 );
        List<Long> userRankList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userRankList.add(userBadge.getBadge().getId());
        }
        int len = userRankList.size();

        for(int i = len-1 ; i>= 0; i--){
            if(rankList.get(i) <= totalScore && !userRankList.contains((long)(i+9))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+9)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }
    }

    public void checkCategoryOS(Long userSeq, int nowScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 12, 14 );
        List<Long> userOSList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userOSList.add(userBadge.getBadge().getId());
        }
        int len = userOSList.size();

        for(int i = len-1 ; i>= 0; i--){
            if(osList.get(i) <= nowScore && !userOSList.contains((long)(i+12))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+12)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }
    }
    public void checkCategoryDB(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 15, 17 );
        List<Long> userDBList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userDBList.add(userBadge.getBadge().getId());
        }
        int len = userDBList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(dbList.get(i) <= nowScore && !userDBList.contains((long)(i+15))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+15)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }
    }
    public void checkCategoryNetwork(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 18, 20 );
        List<Long> userNetworkList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userNetworkList.add(userBadge.getBadge().getId());
        }
        int len = userNetworkList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(networkList.get(i) <= nowScore && !userNetworkList.contains((long)(i+18))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+18)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }
    public void checkCategoryStructure(Long userSeq, int nowScore){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 21, 23 );
        List<Long> userStructureList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userStructureList.add(userBadge.getBadge().getId());
        }
        int len = userStructureList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(structureList.get(i) <= nowScore && !userStructureList.contains((long)(i+21))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+21)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }
    }
    public void checkCategoryComputer(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 24, 26 );
        List<Long> userComputerList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userComputerList.add(userBadge.getBadge().getId());
        }
        int len = userComputerList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(computerList.get(i) <= nowScore && !userComputerList.contains((long)(i+24))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+24)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }
    public void checkCategoryEtc(Long userSeq, int nowScore){
        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 27, 29 );
        List<Long> userEtcList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userEtcList.add(userBadge.getBadge().getId());
        }
        int len = userEtcList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(etcList.get(i) <= nowScore && !userEtcList.contains((long)(i+27))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+27)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }

    public void checkStudyCount(Long userSeq, Long studyCount){
        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 30, 32 );
        List<Long> userStudyList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userStudyList.add(userBadge.getBadge().getId());
        }
        int len = userStudyList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(studyList.get(i) <= studyCount && !userStudyList.contains((long)(i+30))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+30)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }

    public void checkInterviewCount(Long userSeq, Long interviewCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 33, 35 );
        List<Long> userInterviewList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userInterviewList.add(userBadge.getBadge().getId());
        }
        int len = userInterviewList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(interviewList.get(i) <= interviewCount && !userInterviewList.contains((long)(i+33))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+33)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }
    public void checkExamCount(Long userSeq, Long examCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 36, 38 );
        List<Long> userExamList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userExamList.add(userBadge.getBadge().getId());
        }
        int len = userExamList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(examList.get(i) <= examCount && !userExamList.contains((long)(i+36))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+36)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
                break;
            }
        }

    }

    public void checkOXCount(Long userSeq, Long oxCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 39, 41 );
        List<Long> userOXList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userOXList.add(userBadge.getBadge().getId());
        }
        int len = userOXList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(oxList.get(i) <= oxCount && !userOXList.contains((long)(i+39))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+39)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
            }
        }

    }
    public void checkMultipleCount(Long userSeq, Long multipleCount){

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserSeqOrderByIdAsc(userSeq, 42, 44 );
        List<Long> userMultipleList = new ArrayList<>();
        for(UserBadge userBadge : userBadgeList){
            userMultipleList.add(userBadge.getBadge().getId());
        }
        int len = userMultipleList.size();
        for(int i = len-1 ; i>= 0; i--){
            if(multipleList.get(i) <= multipleCount && !userMultipleList.contains((long)(i+42))){
                UserBadge nowUserBadge = new UserBadge();
                nowUserBadge.setUserSeq(userSeq);
                nowUserBadge.setBadge(badgeRepository.findById((long)(i+42)).orElse(null));
                nowUserBadge.setGetTime(LocalDate.now());
            }
        }

    }




}
