package csafy.csservice.entity.profile;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Entity
@Table(name = "statistic")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class Statistic {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_seq")
    private Long userSeq;

    // 유저 점수 분석
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private ConcurrentHashMap<String, Integer> Scores = new ConcurrentHashMap<>();

    private Long dailyCheck = 0L;

    private String isLogin = "N";

    private Long studyCount = 0L;

    private Long interviewCount = 0L;

    private Long examCount = 0L;

    private Long oxCount = 0L;

    private Long multipleCount = 0L;

    private Long isApp = 0L;

    private Long isWinner = 0L;

    private String petType = "";





}
