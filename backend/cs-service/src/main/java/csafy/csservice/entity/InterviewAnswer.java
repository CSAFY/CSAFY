package csafy.csservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "INTERVIEW_ANSWER")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewAnswer {

    @Id
    @Column(name = "ANSWER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerSeq;



}
