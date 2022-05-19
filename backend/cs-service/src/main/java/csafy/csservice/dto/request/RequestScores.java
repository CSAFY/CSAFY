package csafy.csservice.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RequestScores {
    private String subject;
    private int score;
}
