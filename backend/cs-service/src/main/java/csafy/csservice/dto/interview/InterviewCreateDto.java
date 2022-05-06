package csafy.csservice.dto.interview;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewLikes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCreateDto {

    private BigInteger interviewSeq;
    private String category;
    private String question;
    private String memo;

}
