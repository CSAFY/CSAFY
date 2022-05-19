package csafy.csservice.dto.interview;

import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewSeen;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class InterviewSeenDto {

    private Long id;
    private InterviewDto interview;
    private Long userSeq;
    private LocalDateTime seenAt;

    public InterviewSeenDto(InterviewSeen interviewSeen){
        this.id = interviewSeen.getId();
        this.interview = new InterviewDto(interviewSeen.getInterview());
        this.userSeq = interviewSeen.getUserSeq();
        this.seenAt = interviewSeen.getSeenAt();
    }
}
