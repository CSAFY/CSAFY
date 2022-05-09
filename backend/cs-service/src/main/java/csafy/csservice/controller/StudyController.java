package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.response.ResponseVideo;
import csafy.csservice.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyController {

    private final UserServiceClient userServiceClient;

    private final VideoService videoService;

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

        return ResponseEntity.status(HttpStatus.OK).body(null);
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

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    // 일반 학습 페이지

    // 카테고리별 강의 선택 ( +썸네일 ) GET



    // 선택한 강의의 관련 모의고사(문제) 키워드에 따른 검색 GET

    // 선택한 강의의 관련 질문 GET

    // 학습 완료한 강의 서버에 체크 POST



    // 집중 학습 페이지

    // 키워드 학습 GET

    // 학습 확인 문제 GET

    // 단답형 문제 GET

    // OX퀴즈 GET



}
