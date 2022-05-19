package csafy.csservice.entity.test;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "quiz_fixed_list")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class QuizFixedList {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Long> questions;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Long> questionsOX;

}
