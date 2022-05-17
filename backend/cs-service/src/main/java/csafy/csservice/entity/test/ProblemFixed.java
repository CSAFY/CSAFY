package csafy.csservice.entity.test;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PROBLEM_FIXED")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class ProblemFixed {


    @Id
    @Column(name = "QUESTION_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionSeq;

    private int answer;

    private String category;

    private String categoryChapter;

    private String question;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<String> examples = new ArrayList<>();

}
