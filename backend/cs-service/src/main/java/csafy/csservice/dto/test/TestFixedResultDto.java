package csafy.csservice.dto.test;

import lombok.*;

import java.math.BigInteger;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestFixedResultDto {

    private BigInteger questionSeq;
    private Integer answer;
    private String category;
    private String categoryChapter;
    private String examples;
    private String question;

}
