package csafy.csservice.controller;

import csafy.csservice.dto.InterviewDto;
import csafy.csservice.entity.Interview;
import csafy.csservice.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    // 면접 질문 리스트 받아오기 GET < 이거부터 ㄱㄱ
    @GetMapping("/list/get")
    public ResponseEntity getInterviewList(){
        List<Interview> interviewList = interviewService.getInterviewList();
        if(interviewList == null || interviewList.size() == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        List<InterviewDto> result = interviewList.stream().map(InterviewDto::new).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    // 사용자가 원하는 면접 유형, 문제 수, 시간 모드 여부 POST

    // 사용자가 원하는 것에 따른 선별된 면접 질문들 GET

    // (면접 결과 페이지) 해당 질문에 대한 유저의 메모 저장 가능 POST ( 답변 )

    // 답변 유저 -> 답변 list 다른 저장 ( 유저 1 -> 질문 1, 질문 2 ) << 쿼리~

    // 댓글 및 좋아요?
}