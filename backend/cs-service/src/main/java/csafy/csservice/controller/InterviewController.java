package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.interview.InterviewCommentDto;
import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.interview.InterviewMemoDto;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.request.RequestCreateInterview;
import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewComment;
import csafy.csservice.entity.interview.InterviewMemo;
import csafy.csservice.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    private final UserServiceClient userServiceClient;

    // 면접 질문 리스트 받아오기 GET < 이거부터 ㄱㄱ 인성, 기술, 인성 + 기술
    @GetMapping("/list/get")
    public ResponseEntity getInterviewList(@RequestHeader(value = "Authorization") String token,
            @RequestParam(value = "category") String category){

        if (userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<Interview> interviewList = interviewService.getInterviewList(category);

        if(interviewList == null || interviewList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        List<InterviewDto> result = interviewList.stream().map(i -> new InterviewDto(i, userDto)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    // 사용자가 원하는 면접 유형, 문제 수, 시간 모드 여부 POST
    @PostMapping("/create")
    public ResponseEntity createInterviewList(@RequestHeader(value = "Authorization") String token,
            @RequestBody RequestCreateInterview createInterview){

        if (userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<InterviewDto> interviewList = interviewService.createInterviewList(createInterview, userDto.getUserSeq());


        if(interviewList == null || interviewList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(interviewList);
    }

    // 면접 좋아요 / 좋아요 취소
    @PostMapping("/{interviewSeq}/likes")
    public ResponseEntity interviewLikes(@RequestHeader(value = "Authorization") String token,
                                     @PathVariable("interviewSeq") Long interviewSeq) {
        if (userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        interviewService.interviewLikes(userDto.getUserSeq(), interviewSeq);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 메모 등록 , 업데이트
    @PostMapping("/{interviewSeq}/memo/create")
    public ResponseEntity createMemo(@RequestHeader(value = "Authorization") String token,
                                     @PathVariable("interviewSeq") Long interviewSeq,
                                              @RequestBody String memo) {

        if (userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewMemo interviewMemo = interviewService.createMemo(userDto.getUserSeq(), interviewSeq, memo);

        if (interviewMemo == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        InterviewMemoDto result = new InterviewMemoDto(interviewMemo, userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);

    }

    // 메모 삭제?? (필요??)



    // 댓글 등록
    @PostMapping("/{interviewSeq}/comment/create")
    public ResponseEntity createComment(@RequestHeader(value = "Authorization") String token,
                                              @PathVariable("interviewSeq") Long interviewSeq,
                                              @RequestBody String comment){
        if(userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.createComment(userDto.getUserSeq(), interviewSeq, comment);
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewCommentDto(interviewComment, userDto));

    }


    // 댓글 수정
    @PostMapping("/{commentId}/comment/update")
    public ResponseEntity updateComment(@RequestHeader(value = "Authorization") String token,
                                        @PathVariable("commentId") Long commentId,
                                        @RequestBody String comment){
        if(userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.updateComment(userDto.getUserSeq(), commentId, comment);
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewCommentDto(interviewComment, userDto));

    }


    // 댓글 삭제
    @DeleteMapping("/{commentId}/comment/delete")
    public ResponseEntity deleteComment(@RequestHeader(value = "Authorization") String token,
                                        @PathVariable("commentId") Long commentId){
        if(userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.deleteComment(commentId, userDto.getUserSeq());
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(null);

    }

    // 댓글 좋아요 / 좋아요 취소
    @PostMapping("/{commentId}/comment/likes")
    public ResponseEntity interviewCommentLikes(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("commentId") Long commentId) {
        if (userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 500 ||
                userServiceClient.checkTokenValidated(token).getStatusCodeValue() == 403) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        interviewService.interviewCommentLikes(userDto.getUserSeq(), commentId);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    // 인성, 기술, 인성+기술
    // 사용자가 원하는 것에 따른 선별된 면접 질문들 GET

    // (면접 결과 페이지) 해당 질문에 대한 유저의 메모 POST 저장 가능 POST ( 답변 )

    // 답변 유저 -> 답변 list 다른 저장 ( 유저 1 -> 질문 1, 질문 2 ) << 쿼리~

    // 댓글 및 좋아요?
}
