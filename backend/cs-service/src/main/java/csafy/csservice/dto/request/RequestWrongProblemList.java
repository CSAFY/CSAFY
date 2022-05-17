package csafy.csservice.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class RequestWrongProblemList {

    List<RequestWrongProblem> requestWrongProblems;

}
