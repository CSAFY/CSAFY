package csafy.csservice.dto.interview;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCreateSimpleDto {

    private BigInteger interviewSeq;
    private String category;
    private String question;

}
