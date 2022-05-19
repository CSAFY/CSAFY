package csafy.csservice.dto.interview;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.InterviewMemo;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class InterviewMemoDto {

    private Long memoSeq;
    private String memo;
    private Long interviewSeq;
    private Long userSeq;

    public InterviewMemoDto(InterviewMemo interviewMemo, UserDto userDto){
        this.memoSeq = interviewMemo.getMemoSeq();
        this.interviewSeq = interviewMemo.getInterview().getInterviewSeq();
        this.memo = interviewMemo.getMemo();
        this.userSeq = userDto.getUser_seq();

    }
}
