package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.test.KeywordDto;
import csafy.csservice.dto.test.OXDto;
import csafy.csservice.dto.test.TestDto;
import csafy.csservice.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TestController {

    private final TestService testService;
    private final UserServiceClient userServiceClient;

    // 4지선다 문제 하나 받아오기
    @GetMapping("/sample/multiple")
    public ResponseEntity getMultipleQuizSample(@RequestParam("category") String category) {
        TestDto test = null;
        try {
            test = testService.getMutipleQuiz(category);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if(test == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("문제가 존재하지 않습니다.");
        }

        return ResponseEntity.ok().body(test);

    }

    // 4지선다(고정) 문제 가져오기
    @GetMapping("/sample/multiple/fixed")
    public ResponseEntity getMultipleFixedQuizSample(@RequestParam("category") String category) {

        TestDto result = testService.getFixedMultipleQuiz(category);

        return ResponseEntity.ok().body(result);
    }

    // 4지 선다 여러문제 가져오기
    @GetMapping("/test/multiple")
    public ResponseEntity getMultipleQuiz(@RequestParam("category") String category,
                                          @RequestParam("questionNum") Integer questionNum) {

        Integer newQuestionNum = Math.min(20, questionNum);
        Integer questionNumfixed = newQuestionNum * 3 / 10;
        Integer questionNumNormal = newQuestionNum - questionNumfixed;

        List<TestDto> result = new ArrayList<>();

        result.addAll(testService.getMultipleQuizList(category, questionNum));
//        for (int i = 0; i < questionNumfixed; i++) {
//            result.add(testService.getFixedMultipleQuiz(category));
//        }
//        for (int i = 0; i < questionNumNormal ; i++) {
//            result.add(testService.getMutipleQuiz(category));
//        }

        return ResponseEntity.ok().body(result);
    }

    // 키워드 학습
    @GetMapping("/study/keyword")
    public ResponseEntity getKeywordStudy(@RequestParam("category") String category,
                                          @RequestParam("questionNum") Integer questionNum){

        List<KeywordDto> result = testService.getKeywordStudy(category, questionNum);

        if(result == null || result.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // OX 문제 하나
    @GetMapping("/study/single/ox")
    public ResponseEntity getSingleProblemOX(@RequestParam("category") String category){

        Random random = new Random();
        int count = random.nextInt(2);
        OXDto result = null;
        if(count == 0){
           // 카드 에서 뽑 기

            result = testService.getSingleOX1(category);

        } else{
            // JJAturi
            result = testService.getSingleOX2(category);
        }

        if(result == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // OX 문제 여러개
    @GetMapping("/study/multiple/ox")
    public ResponseEntity getMultipleProblemOX(@RequestParam("category") String category,
                                               @RequestParam("questionNum") Integer questionNum){
        Integer newQuestionNum = Math.min(20, questionNum);
        Integer problemOXNum = newQuestionNum * 2 / 10;
        Integer cardOXNum = newQuestionNum - problemOXNum;

        List<OXDto> oxDtoList = new ArrayList<>();

        oxDtoList.addAll(testService.getMultipleProblemOXCard(category, cardOXNum));
        oxDtoList.addAll(testService.getMultipleProblemOX(category, problemOXNum));

        return ResponseEntity.status(HttpStatus.OK).body(oxDtoList);
    }


//    // 문제 전체 GET
//    public ResponseEntity getTestList(@RequestParam(value = "category") String category){
//
//        List<TestDto> testList = testService.;
//
//        if(testList == null || testList.size() == 0){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("테스트 생성 오류");
//        }
//
//        return ResponseEntity.ok().body(null);
//    }

}
