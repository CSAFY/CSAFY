package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.request.TestResultRequest;
import csafy.csservice.dto.response.ResponseTestRecent;
import csafy.csservice.dto.test.KeywordDto;
import csafy.csservice.dto.test.OXDto;
import csafy.csservice.dto.test.TestDto;
import csafy.csservice.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
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
        List<TestDto> test = null;
        try {
            test = testService.getMultipleQuizList(category, 1);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if(test == null || test.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("문제가 존재하지 않습니다.");
        }

        return ResponseEntity.ok().body(test.get(0));

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

    // 모의고사 문제 보내주기
    @GetMapping("/test/mock")
    public ResponseEntity getMockTest(@RequestParam("category") String category,
                                      @RequestParam("questionNum") int questionNum){

        int newQuestionNum = Math.min(20, questionNum);
        int questionNumOX = newQuestionNum * 3 / 10;
        int questionNumMultiple = newQuestionNum - questionNumOX;

        List<Object> result = new ArrayList<>();

        if(category.equals("all")){
            int question = questionNum / 6;
            List<String> categories = new ArrayList<>();
            categories.add("네트워크");
            categories.add("운영체제");
            categories.add("자료구조");
            categories.add("기타");
            categories.add("데이터베이스");
            categories.add("컴퓨터구조");
            for(String nowCategory : categories){
                result.addAll(testService.getMultipleQuizList(nowCategory, question));
            }
        }else {
            result.addAll(testService.getMultipleProblemOX(category, questionNumOX));
            result.addAll(testService.getMultipleQuizList(category, questionNumMultiple));
        }
        if(result.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("문제가 존재하지않습니다");
        }

        Collections.shuffle(result);

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    // 모의고사 결과 저장
    @PostMapping("/test/result")
    public ResponseEntity updateTestResult(@RequestHeader(value = "Authorization") String token,
                                           @RequestBody TestResultRequest testResultRequest){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        testService.updateTestResult(testResultRequest, userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("Exam Result Saved");
    }

    // 모의고사 결과 보내주기 ( 최근 5개 )
    @GetMapping("/test/result")
    public ResponseEntity getTestResult(@RequestHeader(value = "Authorization") String token){


        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        List<ResponseTestRecent> result = testService.getTestResult(userDto.getUser_seq());

        if(result == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("null");
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
