package csafy.csservice.dto.test;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class TestDto {
    /**
     * {
     * question : "이 질문의 답은 4번이다",
     * examples : ["1번보기", "2번보기", "3번보기", "4번보기"],
     * answer : 4,
     * categoryId : "운영체제론",
     * categoryChapter : "쓰레드",
     * }
     */
    private Long TestSeq;
//    private Long relatedRawSeq;
    private String question;
    private List<String> examples;
    private Integer answer;
    private String category;
    private String categoryChapter;


    public TestDto(TestFixedResultDto testFixedResultDto){
        this.TestSeq = testFixedResultDto.getQuestionSeq().longValue();
        this.question = testFixedResultDto.getQuestion();
        this.answer = testFixedResultDto.getAnswer();
        this.category = testFixedResultDto.getCategory();
        this.categoryChapter = testFixedResultDto.getCategoryChapter();
        List<String> testExamples = new ArrayList<>();
        String[] tmp = testFixedResultDto.getExamples().split("\"");
        for(int i = 1 ; i < 8; i+=2) {
            testExamples.add(tmp[i]);
        }
        examples = testExamples;
    }



}
