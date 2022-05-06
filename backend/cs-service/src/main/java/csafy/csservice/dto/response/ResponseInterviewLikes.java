package csafy.csservice.dto.response;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ResponseInterviewLikes {
    private Long interviewSeq;
    private int interviewLikes;
}
