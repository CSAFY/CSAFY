package csafy.csservice.dto;

import csafy.csservice.entity.Interview;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class InterviewDto {

    private Long interviewSeq;
    private String category;
    private String question;

    public InterviewDto(Interview interview){
        this.interviewSeq = interview.getInterviewSeq();
        this.category = interview.getCategory();
        this.question = interview.getQuestion();

    }

}
