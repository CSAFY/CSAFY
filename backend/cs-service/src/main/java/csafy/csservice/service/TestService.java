package csafy.csservice.service;

import csafy.csservice.dto.interview.InterviewCreateDto;
import csafy.csservice.dto.test.*;
import csafy.csservice.entity.test.Card;
import csafy.csservice.entity.test.Problem;
import csafy.csservice.entity.test.ProblemFixed;
import csafy.csservice.entity.test.ProblemOX;
import csafy.csservice.repository.test.*;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final ProblemRepository problemRepository;
    private final ProblemFixedRepository problemFixedRepository;
    private final ProblemOXRepository problemOXRepository;
    private final CardRepository cardRepository;

    @PersistenceContext
    EntityManager em;

    public TestDto getMutipleQuiz(String category) {
        // 카테고리에서 questionNum 가져오는 로직(생략)
        int questionNum = 1;

        // questionNum이 같은 모든 question 가져오기
        List<Problem> problems = problemRepository.findAllByQuestionNum(questionNum);
        int pSize = problems.size();

        // 문제오류
        if (problems.size() < 4) {
            throw new IllegalArgumentException("이 문제로는 4지선다를 만들 수 없습니다.");
        }

        // 4개 초과일때, 4개만 불러내야 하므로 랜덤셔플 후 앞에서부터 4개를 잘라낸다.
        problems = problems.subList(0,4);

        // 틀림 후보 길이가 0보다 큼 = 틀린 문제 후보가 될 수 있음
        List<Long> answerIdxList = new ArrayList<>();
        List<Long> Idxs = new ArrayList<>();
        for (int i = 0; i < problems.size(); i++) {
            Idxs.add(problems.get(i).getQuestionSeq());
            if (problems.get(i).getWrongNum() > 0) {
                answerIdxList.add(problems.get(i).getQuestionSeq());
            }
        }
        String question = problems.get(0).getQuestion();
        String categoryId = problems.get(0).getCategory();
        String categoryChapter = problems.get(0).getCategoryChapter();

        // 틀린 문제 후보 중에 하나(인덱스)를 고름
        Random random = new Random();
        int randomIdx = random.nextInt(answerIdxList.size());
        Long answerIdx = answerIdxList.get(randomIdx);
        // 정답이 쓰일 문제의 인덱스 확보. answerIdx
        // Idxs에 전체 인덱스 저장. 크기는 pSize

        // 랜덤배치
        Collections.shuffle(Idxs);

        // 정답의 번째 기록
        int answer = Idxs.indexOf(answerIdx);

        // answer번째 를 제외하면 오답에서 불러와 저장
        // testDto에 맞게 examples 내용 구성 및 정답 설정
        List<String> examples = new ArrayList<>();
        for (int i = 0; i < pSize; i++) {
            if ( i == answer) {
                examples.add(problems.get(0).getAnswer());
            }
            else {
                examples.add(problems.get(0).getWrong().get(0));
            }
        }


        // 반환용 testDto 추가
        TestDto result = new TestDto();
        result.setTestSeq(null);
        result.setQuestion(question);
        result.setExamples(examples);
        result.setAnswer(answer);
        result.setCategory(categoryId);
        result.setCategoryChapter(categoryChapter);

        return result;
    }

    public List<TestDto> getMultipleQuizList(String category, int questionNum){

        Random random = new Random();

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


}
