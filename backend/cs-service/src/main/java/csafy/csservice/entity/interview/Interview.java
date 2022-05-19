package csafy.csservice.entity.interview;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Size(max = 30)
    private String category;

    @Size(max = 512)
    private String question;

    @OneToMany(mappedBy = "interview", cascade = {CascadeType.REMOVE})
    private List<InterviewLikes> interviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "interview", cascade = {CascadeType.REMOVE})
    private List<InterviewComment> interviewComments = new ArrayList<>();

    @OneToMany(mappedBy = "interview", cascade = {CascadeType.REMOVE})
    private List<InterviewMemo> interviewMemos = new ArrayList<>();

    @OneToMany(mappedBy = "interview", cascade = {CascadeType.REMOVE})
    private List<InterviewSeen> interviewSeens = new ArrayList<>();

}
