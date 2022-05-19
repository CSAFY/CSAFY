package csafy.csservice.dto.response;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigInteger;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseVideo {

    private BigInteger id;
    private String categoryId;
    private String category2Id;
    private String title;
    private String videoId;
    private BigInteger seen;
    private BigInteger favorites;

}
