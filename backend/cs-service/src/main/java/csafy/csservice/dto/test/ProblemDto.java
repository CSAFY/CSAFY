package csafy.csservice.dto.test;

import lombok.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDto {

    private BigInteger questionSeq;
    private String answer;
    private String category;
    private String categoryChapter;
    private String question;
    private Integer questionNum;
    private Integer relatedSeq;
    private List<String> wrong;
    private Integer wrongNum;

    public ProblemDto(TestResultDto testResultDto){
        this.questionSeq = testResultDto.getQuestionSeq();
        this.answer = testResultDto.getAnswer();
        this.category = testResultDto.getCategory();
        this.categoryChapter = testResultDto.getCategoryChapter();
        this.question = testResultDto.getQuestion();
        this.questionNum = testResultDto.getQuestionNum();
        this.relatedSeq = testResultDto.getRelatedSeq();
        this.wrongNum = testResultDto.getWrongNum();
        List<String> wrongList = new ArrayList<>();
        if(testResultDto.getWrongNum() == 0){
            this.wrong = wrongList;
        } else if(testResultDto.getWrongNum() == 1){
            wrongList.add(testResultDto.getWrong().substring(2,testResultDto.getWrong().length()-2));
            this.wrong = wrongList;
        } else{
            String[] tmp = testResultDto.getWrong().split("\"");
            List<String> list = new ArrayList<>();
            for(int i = 1; i < tmp.length; i+=2){
                list.add(tmp[i]);
            }
            this.wrong = list;
        }
    }

    public ProblemDto(TestFixedResultDto testFixedResultDto){
        this.questionSeq = testFixedResultDto.getQuestionSeq();
        this.answer = testFixedResultDto.getAnswer().toString();
        this.category = testFixedResultDto.getCategory();
        this.categoryChapter = testFixedResultDto.getCategoryChapter();
        this.question = testFixedResultDto.getQuestion();
        this.questionNum = testFixedResultDto.getQuestionSeq().intValue();

    }

}