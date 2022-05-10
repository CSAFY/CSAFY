package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.interview.InterviewSeenDto;
import csafy.csservice.dto.request.RequestScores;
import csafy.csservice.dto.response.ResponseStatistic;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {

    private final UserServiceClient userServiceClient;

    private final ProfileService profileService;

    // 프리미엄 버전 구독 POST

    // HeatMap 데이터 GET

    // 학습 분석 데이터 GET

    // 즐겨찾기 한 학습 GET(토큰)
    @GetMapping("/study/favorites")
    public ResponseEntity getFavoriteStudy(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<VideoDto> videoDtoList = profileService.getFavoriteStudy(userDto.getUser_seq());

        if(videoDtoList == null || videoDtoList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(videoDtoList);
    }

    // 최근 본 강의 GET (토큰)
    @GetMapping("/study/seen")
    public ResponseEntity getLatestStudy(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<VideoDto> videoDtoList = profileService.getLatestStudy(userDto.getUser_seq());

        if(videoDtoList == null || videoDtoList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(videoDtoList);
    }

    // 최근 본 면접 질문 GET(토큰)
    @GetMapping("/interview/seen")
    public ResponseEntity getLatestInterview(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<InterviewSeenDto> result = profileService.getLatestInterview(userDto.getUser_seq());

        if(result == null || result.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }





    // 최근 푼 모의고사 GET



    // 유저 뱃지 관련

    // score 반환 (육각형 그래프 + 카드)
    @GetMapping("/my/scores/get")
    public ResponseEntity getScoresToken(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }
        UserDto userDto = userServiceClient.getTokenUser(token);

        ResponseStatistic result = profileService.getStatistics(userDto.getUser_seq());
        result.setUsername(userDto.getUsername());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // score 반환 (육각형 그래프 + 카드)
    @GetMapping("/scores/get")
    public ResponseEntity getScores(@RequestParam("email") String email){

        UserDto userDto = userServiceClient.getUserSeqOnEmail(email);
        ResponseStatistic result = profileService.getStatistics(userDto.getUser_seq());
        result.setUsername(userDto.getUsername());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 카드용 score 누적
    @PostMapping("/scores/update")
    public ResponseEntity updateScores(@RequestHeader(value = "Authorization") String token,
                                    @RequestBody RequestScores requestScores){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        profileService.updateScores(requestScores, userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }








}
