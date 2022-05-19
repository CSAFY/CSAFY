package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.request.RequestWrongProblem;
import csafy.csservice.dto.request.RequestWrongProblemList;
import csafy.csservice.dto.response.ResponseVideo;
import csafy.csservice.dto.response.ResponseWrongProblem;
import csafy.csservice.entity.test.WrongProblem;
import csafy.csservice.service.ProfileService;
import csafy.csservice.service.TestService;
import csafy.csservice.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyController {

    private final UserServiceClient userServiceClient;

    private final VideoService videoService;

    private final ProfileService profileService;

    private final TestService testService;

    // 강의 리스트 받아오기
    @GetMapping("/list/get")
    public ResponseEntity getStudyList(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<ResponseVideo> videoList = videoService.getStudyList(userDto.getUser_seq());

        if(videoList == null || videoList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(videoList);

    }


    // 강의 즐겨찾기 여부 받기
    @GetMapping("/{studySeq}/favorites")
    public ResponseEntity studyFavoritesCheck(@RequestHeader(value = "Authorization") String token,
                                              @PathVariable("studySeq") Long studySeq){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        int studyFavorites = videoService.studyFavoritesCheck(userDto.getUser_seq(), studySeq);

        return ResponseEntity.status(HttpStatus.OK).body(studyFavorites);
    }

    // 강의 즐겨찾기 / 즐겨찾기 취소
    @PostMapping("/{studySeq}/favorites")
    public ResponseEntity studyFavorites(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("studySeq") Long studySeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        videoService.studyFavorites(userDto.getUser_seq(), studySeq);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

    // 강의 본 여부 받기
    @GetMapping("/{studySeq}/seen")
    public ResponseEntity studySeenCheck(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("studySeq") Long studySeq){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        int studySeen = videoService.studySeenCheck(userDto.getUser_seq(), studySeq);

        return ResponseEntity.status(HttpStatus.OK).body(studySeen);
    }

    // 본 강의 체크
    @PostMapping("/{studySeq}/seen")
    public ResponseEntity studySeens(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("studySeq") Long studySeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        videoService.studySeens(userDto.getUser_seq(), studySeq);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

    // 최근 본 강의 체크
    @PostMapping("/{studySeq}/play")
    public ResponseEntity studyPlay(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("studySeq") Long studySeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        videoService.studyPlays(userDto.getUser_seq(), studySeq);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

    // 오답 노트 받아오기
    @GetMapping("/problem/wrong")
    public ResponseEntity getWrongProblem(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        List<WrongProblem> wrongs = profileService.getWrongProblem(userDto.getUser_seq());

        if(wrongs == null || wrongs.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        List<ResponseWrongProblem> result = wrongs.stream().map(r -> new ResponseWrongProblem(r, userDto.getUser_seq())).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 오답 노트 저장
    @PostMapping("/problem/wrong")
    public ResponseEntity updateWrongProblem(@RequestHeader(value = "Authorization") String token,
                            @RequestBody RequestWrongProblemList requestWrongProblems){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        profileService.updateWrongProblem(requestWrongProblems, userDto.getUser_seq());


        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    // 유저가 본 모의고사 회차 갯수
    @GetMapping("/problem/wrongCount")
    public ResponseEntity getRoundWrongProblem(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        Long result = testService.getRoundTest(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 회차 별 오답 노트
    @GetMapping("/problem/{round}/wrong")
    public ResponseEntity getRoundWrongProblem(@RequestHeader(value = "Authorization") String token,
                                               @PathVariable("round") int round){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        List<WrongProblem> wrongProblems = profileService.getWrongProblemRound(round, userDto.getUser_seq());

        List<ResponseWrongProblem> result = wrongProblems.stream().map(r -> new ResponseWrongProblem(r, userDto.getUser_seq())).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }






}
