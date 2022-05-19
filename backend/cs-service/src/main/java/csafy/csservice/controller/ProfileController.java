package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.interview.InterviewSeenDto;
import csafy.csservice.dto.profile.BadgeDto;
import csafy.csservice.dto.profile.Petdto;
import csafy.csservice.dto.profile.ScoreUpdateDto;
import csafy.csservice.dto.profile.UserActivityDto;
import csafy.csservice.dto.request.RequestScores;
import csafy.csservice.dto.response.ResponseStatistic;
import csafy.csservice.dto.video.VideoDto;
import csafy.csservice.entity.profile.UserBadge;
import csafy.csservice.service.BadgeService;
import csafy.csservice.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {

    private final UserServiceClient userServiceClient;

    private final ProfileService profileService;

    private final BadgeService badgeService;

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
//
//    // 최근 다 본 강의 GET (토큰)
//    @GetMapping("/study/seen")
//    public ResponseEntity getLatestStudy(@RequestHeader(value = "Authorization") String token){
//
//        String resultCode = userServiceClient.checkTokenValidated(token);
//        if (!resultCode.equals("OK")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
//        }
//
//        UserDto userDto = userServiceClient.getTokenUser(token);
//        List<VideoDto> videoDtoList = profileService.getLatestStudy(userDto.getUser_seq());
//
//        if(videoDtoList == null || videoDtoList.size() == 0){
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(videoDtoList);
//    }


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


    @GetMapping("/heatmap")
    public ResponseEntity getHeatmap(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<UserActivityDto> result = profileService.getHeatmap(userDto.getUser_seq());

        if(result == null || result.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/heatmap")
    public ResponseEntity updateHeatmap(@RequestHeader(value = "Authorization") String token){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        profileService.updateHeatmap(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }




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
        int prevScore = profileService.getCategoryStatistics(requestScores.getSubject(), userDto.getUser_seq());
        profileService.updateScores(requestScores, userDto.getUser_seq());

        int nowScore = prevScore + requestScores.getScore();
        ScoreUpdateDto scoreUpdateDto = new ScoreUpdateDto();
        scoreUpdateDto.setNowScore(nowScore);
        scoreUpdateDto.setPrevScore(prevScore);

        switch (requestScores.getSubject()){
            case "운영체제":
                badgeService.checkCategoryOS(userDto.getUser_seq(), nowScore);
                break;
            case "데이터베이스":
                badgeService.checkCategoryDB(userDto.getUser_seq(), nowScore);
                break;
            case "네트워크":
                badgeService.checkCategoryNetwork(userDto.getUser_seq(), nowScore);
                break;
            case "자료구조":
                badgeService.checkCategoryStructure(userDto.getUser_seq(), nowScore);
                break;
            case "컴퓨터구조":
                badgeService.checkCategoryComputer(userDto.getUser_seq(), nowScore);
                break;
            case "기타":
                badgeService.checkCategoryEtc(userDto.getUser_seq(), nowScore);
                break;
            default:
                break;
        }

        return ResponseEntity.status(HttpStatus.OK).body(scoreUpdateDto);
    }

    @GetMapping("/pet/test")
    public ResponseEntity petTest(){

        List<String> pets = new ArrayList<>();
        pets.add("Pet11");
        pets.add("Pet13");

        Petdto petdto = new Petdto();
        petdto.setPetType(pets);

        return ResponseEntity.status(HttpStatus.OK).body(petdto);
    }

    /**
     * 펫 등록하기
     * @param token
     * @param petType
     * @return
     */
    @PostMapping("/pet/change/{petType}")
    public ResponseEntity petChange(@RequestHeader(value = "Authorization") String token,
                                    @PathVariable("petType") String petType){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        profileService.petChange(userDto.getUser_seq(), petType);

        return ResponseEntity.ok().body(null);
    }

    /**
     * 펫 정보 가져오기
     * @param token
     * @return
     */
    @GetMapping("/pet")
    public ResponseEntity petChange(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        String petType = profileService.petGet(userDto.getUser_seq());

        return ResponseEntity.ok().body(petType);
    }



    // 유저의 뱃지 리스트 받아오기
    @GetMapping("/badge")
    public ResponseEntity getBadgeList(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<UserBadge> badgeList = profileService.getBadgeList(userDto.getUser_seq());
        if(badgeList == null || badgeList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        List<BadgeDto> result = badgeList.stream().map(BadgeDto::new).collect(Collectors.toList());

        return ResponseEntity.ok().body(result);
    }

    // 앱 유저 뱃지 업데이트
    @PostMapping("/badge/app")
    public ResponseEntity updateAppUser(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        profileService.updateApp(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body("ok");

    }
    // 프리미엄 유저 뱃지 업데이트
    @PostMapping("/badge/vip")
    public ResponseEntity updateVipUser(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        profileService.updateVip(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body("ok");

    }

    // OX 서바이벌 1등 뱃지 업데이트
    @PostMapping("/badge/ox")
    public ResponseEntity updateOXWinner(@RequestHeader(value = "Authorization") String token){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        profileService.updateOX(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body("ok");

    }


    // FeignClient 전용

    @GetMapping("/statistic/dailycheck")
    public void updateDailyCheck(@RequestParam("userSeq") Long userSeq){

        profileService.updateDailyCheck(userSeq);

    }




}
