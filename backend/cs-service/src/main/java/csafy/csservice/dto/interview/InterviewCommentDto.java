package csafy.csservice.dto.interview;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.InterviewComment;
import csafy.csservice.entity.interview.InterviewCommentLikes;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
@RequiredArgsConstructor
public class InterviewCommentDto {

    private Long id;
    private Long userSeq;
    private String comment;
    private LocalDateTime createdAt;

    private boolean isLiked;

    private int commentLikesCount;

    public InterviewCommentDto(InterviewComment interviewComment, UserDto userDto){

        this.id = interviewComment.getId();
        this.userSeq = interviewComment.getUserSeq();
        this.comment = interviewComment.getComment();
        this.createdAt = interviewComment.getCreatedAt();
        if(interviewComment.getInterviewCommentLikes() == null){
            this.isLiked = false;
        }
        else{
            this.isLiked = false;
            for(InterviewCommentLikes nowInterviewCommentLikes : interviewComment.getInterviewCommentLikes()){
                if(Objects.equals(nowInterviewCommentLikes.getUserSeq(), userDto.getUser_seq())){
                    this.isLiked = true;
                    break;
                }
            }
        }
        this.commentLikesCount = interviewComment.getInterviewCommentLikes() != null ? interviewComment.getInterviewCommentLikes().size() : 0;


    }

}
