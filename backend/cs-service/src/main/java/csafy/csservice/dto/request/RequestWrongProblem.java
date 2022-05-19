package csafy.csservice.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class RequestWrongProblem {

    private int answer;
    private String category;
    private String categoryChapter;
    private List<String> examples;
    private String question;
    private Long testSeq;
    private String key;
    private String explanation;

}
