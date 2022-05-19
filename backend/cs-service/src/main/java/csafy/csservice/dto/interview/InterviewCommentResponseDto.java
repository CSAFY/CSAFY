package csafy.csservice.dto.interview;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.InterviewComment;
import csafy.csservice.entity.interview.InterviewCommentLikes;
import lombok.*;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCommentResponseDto {

    private BigInteger id;
    private String comment;
    private Timestamp createdAt;
    private BigInteger userSeq;
    private BigInteger interviewSeq;
    private String username;
    private BigInteger likesCount;
    private BigInteger liked;

}
