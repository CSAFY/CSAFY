package csafy.csservice.dto.interview;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewLikes;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Data
@RequiredArgsConstructor
public class InterviewDto {

    private Long interviewSeq;
    private String category;
    private String question;

    private int interviewLikes;
    private boolean isLiked;

    public InterviewDto(Interview interview, UserDto userDto){
        this.interviewSeq = interview.getInterviewSeq();
        this.category = interview.getCategory();
        this.question = interview.getQuestion();
        this.interviewLikes = interview.getInterviewLikes() != null ? interview.getInterviewLikes().size() : 0;
        if(interview.getInterviewLikes() == null){
            this.isLiked = false;
        }
        else{
            this.isLiked = false;
            for(InterviewLikes nowInterviewLikes : interview.getInterviewLikes()){
                if(Objects.equals(nowInterviewLikes.getUserSeq(), userDto.getUser_seq())){
                    this.isLiked = true;
                    break;
                }
            }
        }
    }

    public InterviewDto(Interview interview){
        this.interviewSeq = interview.getInterviewSeq();
        this.category = interview.getCategory();
        this.question = interview.getQuestion();
        this.interviewLikes = interview.getInterviewLikes() != null ? interview.getInterviewLikes().size() : 0;
    }

}
