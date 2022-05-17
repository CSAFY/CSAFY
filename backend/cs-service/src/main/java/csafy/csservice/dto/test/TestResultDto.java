package csafy.csservice.dto.test;

import lombok.*;

import java.math.BigInteger;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDto {

    private BigInteger questionSeq;
    private String answer;
    private String category;
    private String categoryChapter;
    private String question;
    private Integer questionNum;
    private Integer relatedSeq;
    private String wrong;
    private Integer wrongNum;


}
