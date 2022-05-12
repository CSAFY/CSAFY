package csafy.csservice.service;

import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.interview.InterviewCreateDto;
import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.request.TestResultRequest;
import csafy.csservice.dto.response.ResponseTestRecent;
import csafy.csservice.dto.test.*;
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
    private final TestRecentRepository testRecentRepository;
    private final StatisticsRepository statisticsRepository;

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
                oxDto.setKey(nowOXResult.getCardKey());
                oxDto.setExplanation(nowOXResult.getCardValue());
            }else{
                oxDto.setAnswer(1);
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
                oxDto.setExplanation(nowProblemOX.getAnswer());
            } else {
                oxDto.setAnswer(1);
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

    @Transactional
    public void updateTestResult(TestResultRequest testResultRequest, UserDto userDto){

        TestRecent testRecent = new TestRecent(testResultRequest, userDto);

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

        statisticsRepository.save(statistic);

    }

}
