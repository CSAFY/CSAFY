package csafy.csservice.dto.response;

import csafy.csservice.entity.test.WrongProblem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class ResponseWrongProblem {

    private int answer;
    private String category;
    private String categoryChapter;
    private List<String> examples;
    private String question;
    private Long testSeq;
    private Long userSeq;
    private String key;
    private int round;

    public ResponseWrongProblem(WrongProblem wrongProblem, Long userSeq){

        if(wrongProblem.getExamples() == null || wrongProblem.getExamples().size() == 0) {
            this.answer = wrongProblem.getAnswerOX();
            this.userSeq = userSeq;
            this.question = wrongProblem.getQuestionOX();
            this.testSeq = wrongProblem.getTestSeq();
            this.key = wrongProblem.getKeyOX();
            this.category = wrongProblem.getCategoryOX();
        }else {
            this.answer = wrongProblem.getAnswer();
            this.userSeq = userSeq;
            this.category = wrongProblem.getCategory();
            this.categoryChapter = wrongProblem.getCategoryChapter();
            this.examples = wrongProblem.getExamples();
            this.question = wrongProblem.getQuestion();
            this.testSeq = wrongProblem.getTestSeq();
        }
        this.round = wrongProblem.getRound();
    }

}
