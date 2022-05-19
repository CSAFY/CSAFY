package csafy.csservice.entity.test;


import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PROBLEM")
@Builder
@Getter @Setter
@TypeDef(name = "json", typeClass = JsonType.class)
@NoArgsConstructor
@AllArgsConstructor
public class Problem {

//    private Long TestSeq;
//    private String categoryId;
//    private String categoryChapter;
//    private String question;
//    private String answer;
//    private int wrongNum;
//    private List<String> wrongAnswer;


    @Id
    @Column(name = "QUESTION_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionSeq;

    @Column(name = "question_num")
    private int questionNum;

    private int relatedRawSeq;

    private String category;

    private String categoryChapter;

    private String question;
    private String answer;
    private int wrongNum;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<String> wrong = new ArrayList<>();
}
