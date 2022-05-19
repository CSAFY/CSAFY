package csafy.csservice.dto.response;

import csafy.csservice.entity.test.TestRecent;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ResponseTestRecent {

    private Long testSeq;
    private String id;
    private Long userSeq;
    private LocalDate examDone;

    private ConcurrentHashMap<String, Integer> Corrects = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, Integer> Totals = new ConcurrentHashMap<>();


    public ResponseTestRecent(TestRecent testRecent){
        this.testSeq = testRecent.getTestSeq();
        this.id = testRecent.getId();
        this.userSeq = testRecent.getUserSeq();
        this.examDone = testRecent.getExamDone().toLocalDate();
        this.Corrects = testRecent.getCorrects();
        this.Totals = testRecent.getTotals();


    }




}
