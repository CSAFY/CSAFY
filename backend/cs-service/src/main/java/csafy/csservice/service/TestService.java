package csafy.csservice.service;

import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.interview.InterviewCreateDto;
import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.request.TestResultRequest;
import csafy.csservice.dto.response.ResponseTestRecent;
import csafy.csservice.dto.test.*;
import csafy.csservice.entity.interview.InterviewLikes;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.test.*;
import csafy.csservice.repository.profile.StatisticsRepository;
import csafy.csservice.repository.test.*;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final ProblemRepository problemRepository;
    private final ProblemFixedRepository problemFixedRepository;
    private final ProblemOXRepository problemOXRepository;
    private final CardRepository cardRepository;
    private final CardLikesRepository cardLikesRepository;
    private final TestRecentRepository testRecentRepository;
    private final StatisticsRepository statisticsRepository;
    private final QuizFixedRepository quizFixedRepository;

    private final BadgeService badgeService;

    @PersistenceContext
    EntityManager em;

    public List<TestDto> getMultipleQuizList(String category, int questionNum){

        Random random = new Random();

        questionNum = questionNum + 1;

        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT pr.* " +
                "FROM problem pr JOIN " +
                "(SELECT distinct p.question_num FROM problem p WHERE p.category = "+ "\'" +category + "\'"+" ORDER BY RAND() LIMIT " + questionNum + ") pp " +
                "ON pr.question_num = pp.question_num ORDER BY pr.question_num ASC, RAND()");

        List<TestResultDto> list = jpaResultMapper.list(q, TestResultDto.class);
        List<ProblemDto> problemList = new ArrayList<>();

        for(TestResultDto nowTest:list){
            problemList.add(new ProblemDto(nowTest));
        }

        List<TestDto> result = new ArrayList<>();
        int numCount = 0;
        int prevNum = problemList.get(0).getQuestionNum();
        int wrongIndex = 0;
        List<String> nowExamples = new ArrayList<>();
        TestDto testDto = new TestDto();
        Boolean flag = true;

        for(ProblemDto nowTest:problemList){
            if(numCount > 3 && prevNum == nowTest.getQuestionNum()) continue;

            if(numCount > 3 && prevNum != nowTest.getQuestionNum()) {
                int count = random.nextInt(4);
                String wrongTmp = nowExamples.remove(wrongIndex);
                nowExamples.add(count, wrongTmp);
                testDto.setExamples(nowExamples);
                testDto.setAnswer(count + 1);
                result.add(testDto);

                numCount = 0;
                prevNum = nowTest.getQuestionNum();
                testDto = new TestDto();
                nowExamples = new ArrayList<>();
                flag = true;
                wrongIndex = 0;
            }

            if(numCount == 0){
                testDto.setQuestion(nowTest.getQuestion());
                testDto.setCategory(nowTest.getCategory());
                testDto.setCategoryChapter(nowTest.getCategoryChapter());
                testDto.setTestSeq(nowTest.getQuestionNum().longValue());
            }

            if (nowTest.getWrongNum() > 0 && flag){
                int count = random.nextInt(nowTest.getWrongNum());
                nowExamples.add(nowTest.getWrong().get(count));
                wrongIndex = count;
                flag = false;
            } else{
                nowExamples.add(nowTest.getAnswer());
            }

                numCount++;

        }
        return result;
    }

    public List<TestDto> getMultipleQuizFixedList(Long problemNum){

        Random random = new Random();

        QuizFixedList quizFixedList = quizFixedRepository.findById(problemNum).orElse(null);

        if(quizFixedList == null) return null;

        if(quizFixedList.getQuestions() == null || quizFixedList.getQuestions().size() == 0) return null;


        List<Long> problemLists = quizFixedList.getQuestions();

        String inputProblem = "";

        int len = problemLists.size();
        for(int i = 0; i < len; i++){
            if(i == 0){
                inputProblem += String.valueOf(problemLists.get(i));
            } else{
                inputProblem += ", " + String.valueOf(problemLists.get(i));
            }

        }

        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT pr.* FROM problem_fixed pr JOIN (SELECT distinct p.question_seq " +
                "FROM problem_fixed p WHERE p.question_seq IN (" + inputProblem + ") ORDER BY RAND()) pp " +
                "ON pr.question_seq = pp.question_seq WHERE pr.question_seq ORDER BY pr.question_seq ASC, RAND();");

        List<TestFixedResultDto> list = jpaResultMapper.list(q, TestFixedResultDto.class);

        List<TestDto> result = new ArrayList<>();

        for(TestFixedResultDto nowTest:list){
            result.add(new TestDto(nowTest));
        }

        return result;
    }

    /**
     * 정보처리기사
     */
    public TestDto getFixedMultipleQuiz(String category){
        // 카테고리에서 questionNum 가져오는 로직(생략)
        int questionSeq = 4;

        ProblemFixed problem = problemFixedRepository.findOneByCategory(category);

        TestDto result = new TestDto();
        result.setQuestion(problem.getQuestion());
        result.setExamples(problem.getExamples());
        result.setAnswer(problem.getAnswer());
        result.setCategory(problem.getCategory());
        result.setCategoryChapter(problem.getCategoryChapter());

        return result;
    }


    public OXDto getSingleOX1(String category){

        Random random = new Random();
        int count = random.nextInt(2);

        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT c.*, (SELECT v.card_value FROM card v WHERE c.card_seq != v.card_seq ORDER BY RAND() LIMIT 1) AS wrong FROM " +
                "card c WHERE c.category = "+ "\'" +category + "\'"+" ORDER BY RAND()");

        List<OXResultDto> list = jpaResultMapper.list(q, OXResultDto.class);

        OXResultDto nowOXResult = list.get(0);
        OXDto oxDto = new OXDto();

        if(count == 0){
            oxDto.setAnswer(0);
            oxDto.setKey(nowOXResult.getCardKey());
            oxDto.setExplanation(nowOXResult.getCardValue());
        }else{
            oxDto.setAnswer(1);
            oxDto.setKey(nowOXResult.getCardKey());
            oxDto.setExplanation(nowOXResult.getWrongValue());
        }

        return oxDto;
    }

    public OXDto getSingleOX2(String category){

        Random random = new Random();
        int count = random.nextInt(2);
        
        ProblemOX problemOX = problemOXRepository.findSingle(category);

        if(problemOX == null) return null;

        OXDto oxDto = new OXDto();

        if(count == 0){
            oxDto.setAnswer(0);
            oxDto.setExplanation(problemOX.getAnswer());
        }else{
            oxDto.setAnswer(1);
            oxDto.setExplanation(problemOX.getWrong());
        }

        return oxDto;
    }

    public List<OXDto> getMultipleProblemOXCard(String category, int num){

        Random random = new Random();

        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("SELECT c.*, (SELECT v.card_value FROM card v WHERE c.card_seq != v.card_seq ORDER BY RAND() LIMIT 1) AS wrong FROM " +
                "card c WHERE c.category = "+ "\'" + category + "\'" +" ORDER BY RAND()");

        List<OXResultDto> list = jpaResultMapper.list(q, OXResultDto.class);

        List<OXDto> oxDtoList = new ArrayList<>();

        for(int i = 0 ; i < num; i++){
            int count = random.nextInt(2);
            OXResultDto nowOXResult = list.get(i);
            OXDto oxDto = new OXDto();
            if(count == 0){
                oxDto.setAnswer(0);
                oxDto.setCategory(nowOXResult.getCategory());
                oxDto.setKey(nowOXResult.getCardKey());
                oxDto.setExplanation(nowOXResult.getCardValue());
            }else{
                oxDto.setAnswer(1);
                oxDto.setCategory(nowOXResult.getCategory());
                oxDto.setKey(nowOXResult.getCardKey());
                oxDto.setExplanation(nowOXResult.getWrongValue());
            }
            oxDtoList.add(oxDto);
        }

        return oxDtoList;

    }

    public List<OXDto> getMultipleProblemOX(String category, int num){

        Random random = new Random();

        List<ProblemOX> resultOXList = problemOXRepository.findMultiple(category, num);

        List<OXDto> result = new ArrayList<>();

        for (ProblemOX nowProblemOX : resultOXList) {
            int count = random.nextInt(2);
            OXDto oxDto = new OXDto();
            if (count == 0) {
                oxDto.setAnswer(0);
                oxDto.setCategory(nowProblemOX.getCategory());
                oxDto.setExplanation(nowProblemOX.getAnswer());
            } else {
                oxDto.setAnswer(1);
                oxDto.setCategory(nowProblemOX.getCategory());
                oxDto.setExplanation(nowProblemOX.getWrong());
            }
            result.add(oxDto);
        }

        return result;

    }

    // 고정된 OX 문제 반환
    public List<OXDto> getMultipleProblemOXFixed(Long num){

        Random random = new Random();

        QuizFixedList quizFixedList = quizFixedRepository.findById(num).orElse(null);

        if(quizFixedList == null) return null;

        if(quizFixedList.getQuestionsOX() == null || quizFixedList.getQuestionsOX().size() == 0) return null;


        List<Long> numOX = quizFixedList.getQuestionsOX();

        List<ProblemOX> resultOXList = problemOXRepository.findMultipleFixed(numOX);

        List<OXDto> result = new ArrayList<>();

        for (ProblemOX nowProblemOX : resultOXList) {
            int count = random.nextInt(2);
            OXDto oxDto = new OXDto();
            if (count == 0) {
                oxDto.setAnswer(0);
                oxDto.setCategory(nowProblemOX.getCategory());
                oxDto.setExplanation(nowProblemOX.getAnswer());
            } else {
                oxDto.setAnswer(1);
                oxDto.setCategory(nowProblemOX.getCategory());
                oxDto.setExplanation(nowProblemOX.getWrong());
            }
            result.add(oxDto);
        }

        return result;

    }

    // 키워드 학습
    public List<KeywordDto> getKeywordStudy(String category, int num){

        List<Card> cards = cardRepository.findCardByCategoryLimit(category, num);

        List<KeywordDto> result = new ArrayList<>();

        for(Card nowCard : cards){
            result.add(new KeywordDto(nowCard));
        }

        return result;
    }

    // 카드 반환
    public List<Card> getKeywordCard(String category, int num){
        List<Card> cards = cardRepository.findCardByCategoryLimit(category, num);
        return cards;
    }

    // 모의고사 회차 받아오기
    public Long getRoundTest(Long userSeq){
        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);
        if(statistic == null) return 0L;
        return statistic.getExamCount();
    }

    // 모의고사 회차별 결과

    public TestRecent getTestRoundResult(int round, Long userSeq){

        return testRecentRepository.findByUserSeqAndRound(userSeq, round);

    }

    @Transactional
    public void updateTestResult(TestResultRequest testResultRequest, UserDto userDto){

        TestRecent testRecent = new TestRecent(testResultRequest, userDto);
        Statistic statistic = statisticsRepository.findByUserSeq(userDto.getUser_seq());
        int round = 1;

        if(statistic != null){
            round = statistic.getExamCount().intValue() + 1;
        }

        testRecent.setRound(round);

        testRecentRepository.save(testRecent);

    }

    public List<ResponseTestRecent> getTestResult(Long userSeq){

        Page<TestRecent> testRecents = testRecentRepository.findByUserSeqOrderByExamDoneDesc(userSeq, PageRequest.of(0, 5));

        if(testRecents == null) return null;

        List<TestRecent> testRecentList = testRecents.getContent();

        List<ResponseTestRecent> result = testRecentList.stream().map(ResponseTestRecent::new).collect(Collectors.toList());

        return result;

    }

    @Transactional
    public void updateExamCount(Long userSeq){

        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if(statistic == null){
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
            statistic.setExamCount(1L);
        } else{
            statistic.setExamCount(statistic.getExamCount() + 1);
        }

        badgeService.checkExamCount(userSeq, statistic.getExamCount());

        statisticsRepository.save(statistic);

    }

    @Transactional
    public List<Card> getKeywordStudySearch(String keyword) {
        return cardRepository.searchCardByKeyword(keyword);
    }

    @Transactional
    public void cardLikes(Long userSeq, Long cardSeq) {
        CardLikes cardLikes = cardLikesRepository.isLiked(userSeq, cardSeq);

        // 없으면 POST
        if (cardLikes == null) {
            cardLikes = new CardLikes();
            cardLikes.setCard(cardRepository.findById(cardSeq).orElse(null));
            cardLikes.setUserSeq(userSeq);
            cardLikesRepository.save(cardLikes);
        // 있으면 delete
        } else {
            cardLikesRepository.delete(cardLikes);

        }
    }

    public List<Card> getLikedCards(Long userSeq) {
        return cardRepository.findLikedCards(userSeq);
    }

    public CardLikes getCardLike(Long userSeq, Long cardSeq) {
        return cardLikesRepository.isLiked(userSeq, cardSeq);
    }
}
