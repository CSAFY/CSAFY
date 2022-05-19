package csafy.csservice.entity.test;

import com.vladmihalcea.hibernate.type.json.JsonType;
import csafy.csservice.dto.UserDto;
import csafy.csservice.dto.request.TestResultRequest;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Entity
@Table(name = "TEST_RECENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class TestRecent {

    @Id
    @Column(name = "TEST_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testSeq;

    // 카테고리
    private String id;

    private Long userSeq;

    private LocalDateTime examDone;

    // 모의고사 맞은 갯수
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private ConcurrentHashMap<String, Integer> Corrects = new ConcurrentHashMap<>();

    // 모의고사 전체 갯수
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private ConcurrentHashMap<String, Integer> Totals = new ConcurrentHashMap<>();

    private int round;

    public TestRecent(TestResultRequest testResultRequest, UserDto userDto){
        this.id = testResultRequest.getId();
        this.userSeq = userDto.getUser_seq();
        this.examDone = LocalDateTime.now();


        ConcurrentHashMap<String, Integer> inputCorrects = new ConcurrentHashMap<>();
        ConcurrentHashMap<String, Integer> inputTotals = new ConcurrentHashMap<>();

        inputCorrects.put("네트워크",testResultRequest.getRight1());
        inputCorrects.put("운영체제",testResultRequest.getRight2());
        inputCorrects.put("자료구조",testResultRequest.getRight3());
        inputCorrects.put("기타",testResultRequest.getRight4());
        inputCorrects.put("데이터베이스",testResultRequest.getRight5());
        inputCorrects.put("컴퓨터구조",testResultRequest.getRight6());

        this.Corrects = inputCorrects;

        inputTotals.put("네트워크",testResultRequest.getTotal1());
        inputTotals.put("운영체제",testResultRequest.getTotal2());
        inputTotals.put("자료구조",testResultRequest.getTotal3());
        inputTotals.put("기타",testResultRequest.getTotal4());
        inputTotals.put("데이터베이스",testResultRequest.getTotal5());
        inputTotals.put("컴퓨터구조",testResultRequest.getTotal6());

        this.Totals = inputTotals;

    }

}
