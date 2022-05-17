package csafy.csservice.entity.test;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "TEST")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Test {

//    private Long TestSeq;
//    private String categoryId;
//    private String categoryChapter;
//    private String question;
//    private String answer;
//    private int wrongNum;
//    private List<String> wrongAnswer;


    @Id
    @Column(name = "TEST_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testSeq;

    @Column(name = "test_num")
    private Long testNum;

    private Long relatedRawSeq;

    @Size(max = 10)
    private String category;

    @Size(max = 50)
    private String categoryChapter;

    private String question;
    private String answer;
    private int wrongNum;

}
