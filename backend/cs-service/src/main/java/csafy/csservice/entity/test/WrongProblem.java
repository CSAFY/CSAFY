package csafy.csservice.entity.test;

import com.vladmihalcea.hibernate.type.json.JsonType;
import csafy.csservice.dto.request.RequestWrongProblem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "WRONG_PROBLEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class WrongProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int answer;

    private Long userSeq;

    private String category;

    private String categoryChapter;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<String> examples;

    private String question;

    private Long testSeq;

    // 키워드
    private String keyOX;

    // 카테고리
    private String categoryOX;

    // 정답 / 오답
    private String questionOX;

    // O = 0, X = 1
    private int answerOX;

    // 회차
    private int round;


    public WrongProblem(RequestWrongProblem requestWrongProblem, Long userSeq){

        if(requestWrongProblem.getExamples() == null || requestWrongProblem.getExamples().size() == 0){
            this.answerOX = requestWrongProblem.getAnswer();
            this.userSeq = userSeq;
            this.categoryOX = requestWrongProblem.getCategory();
            this.keyOX = requestWrongProblem.getKey();
            this.questionOX = requestWrongProblem.getExplanation();
        }
        else {
            this.answer = requestWrongProblem.getAnswer();
            this.userSeq = userSeq;
            this.category = requestWrongProblem.getCategory();
            this.categoryChapter = requestWrongProblem.getCategoryChapter();
            this.examples = requestWrongProblem.getExamples();
            this.question = requestWrongProblem.getQuestion();
        }
        this.testSeq = requestWrongProblem.getTestSeq();

    }

    public WrongProblem(RequestWrongProblem requestWrongProblem, Long userSeq, int round){

        if(requestWrongProblem.getExamples() == null || requestWrongProblem.getExamples().size() == 0){
            this.answerOX = requestWrongProblem.getAnswer();
            this.userSeq = userSeq;
            this.categoryOX = requestWrongProblem.getCategory();
            this.keyOX = requestWrongProblem.getKey();
            this.questionOX = requestWrongProblem.getExplanation();
        }
        else {
            this.answer = requestWrongProblem.getAnswer();
            this.userSeq = userSeq;
            this.category = requestWrongProblem.getCategory();
            this.categoryChapter = requestWrongProblem.getCategoryChapter();
            this.examples = requestWrongProblem.getExamples();
            this.question = requestWrongProblem.getQuestion();
        }
        this.testSeq = requestWrongProblem.getTestSeq();
        this.round = round;

    }


}
