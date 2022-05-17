package csafy.csservice.dto.test;

import lombok.*;

import java.math.BigInteger;
import java.sql.Timestamp;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OXResultDto {

    private BigInteger cardSeq;
    private String cardKey;
    private String cardValue;
    private String category;
    private String categoryChapter;
    private Integer relatedSeq;
    private String wrongValue;

}
