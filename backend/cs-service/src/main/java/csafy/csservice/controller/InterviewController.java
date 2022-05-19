package csafy.csservice.controller;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.interview.*;
import csafy.csservice.dto.request.CommentRequest;
import csafy.csservice.dto.request.MemoRequest;
import csafy.csservice.dto.request.RequestCreateInterview;
import csafy.csservice.dto.response.InterviewCommentResponse;
import csafy.csservice.dto.response.ResponseInterviewCommentLikes;
import csafy.csservice.dto.response.ResponseInterviewLikes;
import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewComment;
import csafy.csservice.entity.interview.InterviewMemo;
import csafy.csservice.service.BadgeService;
import csafy.csservice.service.InterviewService;
import feign.FeignException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    private final UserServiceClient userServiceClient;

    private final BadgeService badgeService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/welcome")
    public String welcome(){

        logger.info(" request URL : {} , request Method : {} ", "cs-service/interview/welcome", "GET");
        return "welcome";
    }

    // 면접 질문 리스트 받아오기 GET < 이거부터 ㄱㄱ 인성, 기술, 인성 + 기술
    @GetMapping("/list/get")
    public ResponseEntity getInterviewList(@RequestHeader(value = "Authorization") String token,
            @RequestParam(value = "category") String category){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
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

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        List<InterviewCreateDto> interviewList = interviewService.createInterviewList(createInterview, userDto.getUser_seq());


        if(interviewList == null || interviewList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        interviewService.updateInterviewCount(userDto.getUser_seq());

        return ResponseEntity.status(HttpStatus.OK).body(interviewList);
    }

    // 사용자가 원하는 면접 유형, 문제 수, 시간 모드 여부 POST ( 토큰 X )
    @PostMapping("/simple/create")
    public ResponseEntity createSimpleInterviewList(@RequestBody RequestCreateInterview createInterview){


        List<InterviewCreateSimpleDto> interviewList = interviewService.createSimpleInterviewList(createInterview);


        if(interviewList == null || interviewList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }


        return ResponseEntity.status(HttpStatus.OK).body(interviewList);
    }


    @GetMapping("/{interviewSeq}/info")
    public ResponseEntity interviewLikesCount(@RequestHeader(value = "Authorization") String token,
                                                @PathVariable("interviewSeq") Long interviewSeq){
        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        Interview interview = interviewService.getInterview(interviewSeq);
        if(interview == null){

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewDto(interview, userDto));
    }

    // 면접 좋아요 카운트 받기
    @GetMapping("/{interviewSeq}/likes")
    public ResponseEntity interviewLikesCount(@PathVariable("interviewSeq") Long interviewSeq){
        int interviewLikes = interviewService.interviewLikesCount(interviewSeq);
        ResponseInterviewLikes responseInterviewLikes = new ResponseInterviewLikes();
        responseInterviewLikes.setInterviewLikes(interviewLikes);
        responseInterviewLikes.setInterviewSeq(interviewSeq);
        return ResponseEntity.status(HttpStatus.OK).body(responseInterviewLikes);
    }


    // 면접 좋아요 / 좋아요 취소
    @PostMapping("/{interviewSeq}/likes")
    public ResponseEntity interviewLikes(@RequestHeader(value = "Authorization") String token,
                                     @PathVariable("interviewSeq") Long interviewSeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        interviewService.interviewLikes(userDto.getUser_seq(), interviewSeq);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

    @GetMapping("/{interviewSeq}/memo")
    public ResponseEntity createMemo(@RequestHeader(value = "Authorization") String token,
                                     @PathVariable("interviewSeq") Long interviewSeq) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        InterviewMemo interviewMemo = interviewService.getMemo(userDto.getUser_seq(), interviewSeq);

        if(interviewMemo == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(interviewMemo.getMemo());
    }

    // 메모 등록 , 업데이트
    @PostMapping("/{interviewSeq}/memo/create")
    public ResponseEntity createMemo(@RequestHeader(value = "Authorization") String token,
                                     @PathVariable("interviewSeq") Long interviewSeq,
                                              @RequestBody MemoRequest memo) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        System.out.println("유저유저 : " + userDto.getUser_seq());
        System.out.println("유저유저 : " + userDto.getEmail());

        InterviewMemo interviewMemo = interviewService.createMemo(userDto.getUser_seq(), interviewSeq, memo.getMemo());

        if (interviewMemo == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        InterviewMemoDto result = new InterviewMemoDto(interviewMemo, userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);

    }

    // 메모 삭제?? (필요??)

    // 댓글 리스트 받기
    @GetMapping("/{interviewSeq}/comment")
    public ResponseEntity getComment(@PathVariable("interviewSeq") Long interviewSeq){

        List<InterviewCommentResponseDto> interviewComments = interviewService.getComment(interviewSeq);

        if(interviewComments == null || interviewComments.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        List<InterviewCommentResponse> result =
                interviewComments.stream().map(InterviewCommentResponse::new).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{commentId}/comment/info")
    public ResponseEntity getInterviewCommentInfo(@RequestHeader(value = "Authorization") String token,
                                              @PathVariable("commentId") Long commentId){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if(!resultCode.equals("OK")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);

        InterviewComment interviewComment = interviewService.getCommentInfo(commentId);
        if(interviewComment == null){

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewCommentDto(interviewComment, userDto));
    }

    // 댓글 등록
    @PostMapping("/{interviewSeq}/comment")
    public ResponseEntity createComment(@RequestHeader(value = "Authorization") String token,
                                              @PathVariable("interviewSeq") Long interviewSeq,
                                              @RequestBody CommentRequest comment){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if(!resultCode.equals("OK")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.createComment(userDto.getUser_seq(), interviewSeq, comment.getComment());
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewCommentDto(interviewComment, userDto));

    }


    // 댓글 수정
    @PutMapping("/{commentId}/comment")
    public ResponseEntity updateComment(@RequestHeader(value = "Authorization") String token,
                                        @PathVariable("commentId") Long commentId,
                                        @RequestBody CommentRequest comment){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if(!resultCode.equals("OK")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.updateComment(commentId, userDto.getUser_seq(), comment.getComment());
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new InterviewCommentDto(interviewComment, userDto));

    }


    // 댓글 삭제
    @DeleteMapping("/{commentId}/comment")
    public ResponseEntity deleteComment(@RequestHeader(value = "Authorization") String token,
                                        @PathVariable("commentId") Long commentId){

        String resultCode = userServiceClient.checkTokenValidated(token);
        if(!resultCode.equals("OK")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        InterviewComment interviewComment = interviewService.deleteComment(commentId, userDto.getUser_seq());
        if(interviewComment == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body("ok");

    }


    // 댓글 좋아요 카운트 추가
    @GetMapping("/{commentId}/comment/likes")
    public ResponseEntity interviewCommentLikesCount(@PathVariable("commentId") Long commentId){
        int commentLikes = interviewService.interviewCommentLikesCount(commentId);
        ResponseInterviewCommentLikes responseInterviewCommentLikes = new ResponseInterviewCommentLikes();
        responseInterviewCommentLikes.setCommentLikes(commentLikes);
        responseInterviewCommentLikes.setId(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(responseInterviewCommentLikes);
    }

    // 댓글 좋아요 / 좋아요 취소
    @PostMapping("/{commentId}/comment/likes")
    public ResponseEntity interviewCommentLikes(@RequestHeader(value = "Authorization") String token,
                                         @PathVariable("commentId") Long commentId) {

        String resultCode = userServiceClient.checkTokenValidated(token);
        if (!resultCode.equals("OK")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalidated Token");
        }

        UserDto userDto = userServiceClient.getTokenUser(token);
        interviewService.interviewCommentLikes(userDto.getUser_seq(), commentId);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }



    // 인성, 기술, 인성+기술
    // 사용자가 원하는 것에 따른 선별된 면접 질문들 GET

    // (면접 결과 페이지) 해당 질문에 대한 유저의 메모 POST 저장 가능 POST ( 답변 )

    // 답변 유저 -> 답변 list 다른 저장 ( 유저 1 -> 질문 1, 질문 2 ) << 쿼리~

    // 댓글 및 좋아요?
}
