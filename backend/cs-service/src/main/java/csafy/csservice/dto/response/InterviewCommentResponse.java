package csafy.csservice.dto.response;

import csafy.csservice.dto.interview.InterviewCommentResponseDto;
import lombok.*;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.Objects;

@Data
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewCommentResponse {


    private BigInteger id;
    private String comment;
    private Timestamp createdAt;
    private BigInteger userSeq;
    private BigInteger interviewSeq;
    private String username;
    private BigInteger likesCount;
    private boolean liked;

    public InterviewCommentResponse(InterviewCommentResponseDto interviewCommentResponseDto){
        this.id = interviewCommentResponseDto.getId();
        this.comment = interviewCommentResponseDto.getComment();
        this.createdAt = interviewCommentResponseDto.getCreatedAt();
        this.userSeq = interviewCommentResponseDto.getUserSeq();
        this.interviewSeq = interviewCommentResponseDto.getInterviewSeq();
        this.username = interviewCommentResponseDto.getUsername();
        this.likesCount = interviewCommentResponseDto.getLikesCount();
        this.liked = Objects.equals(interviewCommentResponseDto.getLiked(), new BigInteger("1"));
    }

}
