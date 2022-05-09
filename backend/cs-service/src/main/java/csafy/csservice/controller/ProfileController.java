package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {

    private final UserServiceClient userServiceClient;

    private final ProfileService profileService;

    // 프리미엄 버전 구독 POST

    // HeatMap 데이터 GET

    // 학습 분석 데이터 GET

    // 즐겨찾기 한 학습 GET
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

    // 최근 본 강의 GET
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

    // 최근 본 면접 질문 GET

    // 최근 푼 모의고사 GET

}
