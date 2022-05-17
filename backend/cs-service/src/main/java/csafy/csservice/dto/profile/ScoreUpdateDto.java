package csafy.csservice.dto.profile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class ScoreUpdateDto {

    private int prevScore;
    private int nowScore;
}
