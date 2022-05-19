package csafy.csservice.entity.interview;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "INTERVIEW_SEEN")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSeen {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="interview_seq")
    private Interview interview;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "seen_at")
    private LocalDateTime seenAt;

}
