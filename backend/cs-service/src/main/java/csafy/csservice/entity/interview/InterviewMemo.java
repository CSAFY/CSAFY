package csafy.csservice.entity.interview;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "INTERVIEW_MEMO")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewMemo {

    @Id
    @Column(name = "MEMO_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memoSeq;

    @Column(name = "memo")
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="interview_seq")
    private Interview interview;

    @Column(name = "USER_SEQ")
    private Long userSeq;



}
