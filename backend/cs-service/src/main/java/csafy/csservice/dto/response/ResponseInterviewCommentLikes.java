package csafy.csservice.dto.response;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ResponseInterviewCommentLikes {

    private Long id;
    private int commentLikes;

}
