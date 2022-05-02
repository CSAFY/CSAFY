package csafy.csservice.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "INTERVIEW")
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @Column(name = "INTERVIEW_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewSeq;

    @Size(max = 20)
    private String category;

    @Size(max = 200)
    private String question;


}