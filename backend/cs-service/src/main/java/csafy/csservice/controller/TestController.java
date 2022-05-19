package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.request.TestResultRequest;
import csafy.csservice.dto.response.ResponseTestRecent;
import csafy.csservice.dto.test.KeywordDto;
import csafy.csservice.dto.test.OXDto;
import csafy.csservice.dto.test.TestDto;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.entity.test.Card;
import csafy.csservice.entity.test.CardLikes;
import csafy.csservice.entity.test.TestRecent;
import csafy.csservice.service.BadgeService;
import csafy.csservice.service.ProfileService;
import csafy.csservice.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TestController {

    private final TestService testService;
    private final UserServiceClient userServiceClient;

    private final ProfileService profileService;

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

    // 4지 선다 여러문제 가져오기
    @GetMapping("/test/multiple")
    public ResponseEntity getMultipleQuiz(@RequestParam("category") String category,
                                          @RequestParam("questionNum") Integer questionNum,
                                          HttpServletRequest request){
        String token = request.getHeader("Authorization");
        String resultCode = null;
        if(token != null) resultCode = userServiceClient.checkTokenValidated(token);

        int newQuestionNum = Math.min(20, questionNum);
        int questionNumfixed = newQuestionNum * 3 / 10;
        int questionNumNormal = newQuestionNum - questionNumfixed;

        // 비회원이거나 토큰이 유효하지 않음
        if (token == null || token.equals("") || !resultCode.equals("OK")) {
            List<TestDto> result = new ArrayList<>();

            result.addAll(testService.getMultipleQuizList(category, questionNum));
            if(result.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        // 회원이고 토큰이 유효함
        UserDto userDto = userServiceClient.getTokenUser(token);
        List<TestDto> result = new ArrayList<>();

        result.addAll(testService.getMultipleQuizList(category, questionNum));
        if(result.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        profileService.updateMultipleCount(userDto.getUser_seq(), questionNum);

        return ResponseEntity.ok().body(result);
    }

    // 키워드 학습 (회원 + 비회원)
    @GetMapping("/study/keyword")
    public ResponseEntity getKeywordStudy(@RequestParam("category") String category,
                                          @RequestParam("questionNum") Integer questionNum,
                                          HttpServletRequest request){
        String token = request.getHeader("Authorization");
        String resultCode = null;
        if(token != null) resultCode = userServiceClient.checkTokenValidated(token);

        // 비회원이거나 토큰이 유효하지 않음
        if (token == null || token.equals("") || !resultCode.equals("OK")) {
            List<KeywordDto> result = testService.getKeywordStudy(category, questionNum);
            if(result == null || result.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        // 회원이고 토큰이 유효함
        UserDto userDto = userServiceClient.getTokenUser(token);
        List<Card> cards = testService.getKeywordCard(category, questionNum);
        if(cards == null || cards.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        List<KeywordDto> result = cards.stream().map(c -> new KeywordDto(c, userDto)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 키워드 검색 = 백과사전
    @GetMapping("/study/keyword/search")
    public ResponseEntity searchKeywordStudy(@RequestParam("keyword") String keyword) {

        List<Card> cards = testService.getKeywordStudySearch(keyword);
        if (cards == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        List<KeywordDto> result = cards.stream().map(c -> new KeywordDto(c)).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /**
     * 카드 좋아요 여부 확인
     * @param token
     * @param cardSeq
     * @return
     */
    @GetMapping("/study/keyword/{cardSeq}/likes")
    public ResponseEntity getCardLike(@RequestHeader(value = "Authorization") String token,
                                      @PathVariable("cardSeq") Long cardSeq) {
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }
        UserDto userDto = userServiceClient.getTokenUser(token);

        CardLikes cardLikes = testService.getCardLike(userDto.getUser_seq(), cardSeq);
        if (cardLikes == null) return ResponseEntity.ok().body(null);
        return ResponseEntity.ok().body("ok");
    }

    /**
     * 카드 좋아요/ 좋아요 취소
     * @param token
     * @param cardSeq
     * @return
     */
    @PostMapping("/study/keyword/{cardSeq}/likes")
    public ResponseEntity cardLikes(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("cardSeq") Long cardSeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }
        UserDto userDto = userServiceClient.getTokenUser(token);

        testService.cardLikes(userDto.getUser_seq(), cardSeq);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

    /**
     * 내가 좋아요 한 모든 카드 반환
     * @param token
     * @return
     */
    @GetMapping("/study/keyword/likes/all")
    public ResponseEntity cardLikesAll(@RequestHeader(value = "Authorization") String token) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }
        UserDto userDto = userServiceClient.getTokenUser(token);

        List<Card> cards = testService.getLikedCards(userDto.getUser_seq());
        List<KeywordDto> result = cards.stream().map(c -> new KeywordDto(c)).collect(Collectors.toList());

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
                                               @RequestParam("questionNum") Integer questionNum,
                                               HttpServletRequest httpServletRequest){

        String token = httpServletRequest.getHeader("Authorization");

        String resultCode = null;
        if(token != null) resultCode = userServiceClient.checkTokenValidated(token);

        int newQuestionNum = Math.min(20, questionNum);
        int problemOXNum = newQuestionNum * 2 / 10;
        int cardOXNum = newQuestionNum - problemOXNum;

        // 비회원이거나 토큰이 유효하지 않음
        if (token == null || token.equals("") || !resultCode.equals("OK")) {
            List<OXDto> oxDtoList = new ArrayList<>();

            oxDtoList.addAll(testService.getMultipleProblemOXCard(category, cardOXNum));
            oxDtoList.addAll(testService.getMultipleProblemOX(category, problemOXNum));
            if(oxDtoList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(oxDtoList);
        }
        // 회원이고 토큰이 유효함
        UserDto userDto = userServiceClient.getTokenUser(token);

        List<OXDto> oxDtoList = new ArrayList<>();

        oxDtoList.addAll(testService.getMultipleProblemOXCard(category, cardOXNum));
        oxDtoList.addAll(testService.getMultipleProblemOX(category, problemOXNum));
        if(oxDtoList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        profileService.updateOXCount(userDto.getUser_seq(), questionNum);

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

    // FIXED 모의고사 문제 보내주기 ( 모의고사 번호 지정 ) 4지선다
    @GetMapping("/fixed/mock")
    public ResponseEntity getFixedMockTest(@RequestParam("examNum") Long examNum){

        List<Object> result = new ArrayList<>();
        result.addAll(testService.getMultipleQuizFixedList(examNum));
        result.addAll(testService.getMultipleProblemOXFixed(examNum));

        if(result.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        Collections.shuffle(result);

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

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

        testService.updateExamCount(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.CREATED).body("Exam Result Saved");
    }

    // 모의고사 회차 별 결과
    @GetMapping("/test/{round}/result")
    public ResponseEntity getTestRoundResult(@RequestHeader(value = "Authorization") String token,
                                           @PathVariable("round") int round){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        TestRecent testRecent = testService.getTestRoundResult(round, userDto.getUser_seq());

        if(testRecent == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("null");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseTestRecent(testRecent));
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
