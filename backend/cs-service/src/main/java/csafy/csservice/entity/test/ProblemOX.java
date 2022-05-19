package csafy.csservice.entity.test;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "PROBLEM_OX")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemOX {

    @Id
    @Column(name = "QUESTION_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionSeq;

    private int relatedRawSeq;

    private String category;

    private String categoryChapter;

    private String question;
    private String answer;
    private int wrongNum;

    private String wrong;
}
