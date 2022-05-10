package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.response.zzz;
import csafy.csservice.service.testService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stack")
public class TestController {

    private final UserServiceClient userServiceClient;

    //private final;

    // 전체 CS 문제 모음집 - 분류 ( 난이도별, 랜덤 )


    // 과목별 문제집 GET
//    @GetMapping("/stack/get")
//    public ResponseEntity getStackList(@RequestHeader(value = "Authorization") String token){
//        // resultCode에 토큰 결과 저장
//        String resultCode = userServiceClient.checkTokenValidated(token);
//
//        // 대조 후 통과 못하면 상태 메시지 반환
//        if(!resultCode.equals("OK")){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
//        }
//
//        // 토큰에서 유저데이터, 문제 리스트 받아오기
//        UserDto userDto = userServiceClient.getTokenUser(token);
//        List<zzz> StackList = testService.getStackList(userDto.getUser_seq());
//
//        // 데이터 없으면 스테이터스에 널값 반환
//        if( StackList == null || StackList.size() == 0){
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
//        }
//
//        // 최종 반환
//        return ResponseEntity.status(HttpStatus.OK).body(StackList);
//    }

    // getMyStackList : 나만의 문제집 GET

    // getStackDetail : 상세페이지

    //





    // 여기부턴 뭔소린지 나중에 듣자
    // 문제 유형 ( 실전, 일반 ) POST

    // 문제 가지고 오기 GET

    // 실전 모의고사 채점 결과 POST

    // 실전 모의고사 채점 결과 불러오기 GET

    // 오답노트 불러오기 GET

}
