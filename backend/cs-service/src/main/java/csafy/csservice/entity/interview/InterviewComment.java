package csafy.csservice.entity.interview;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "interview_comment")
@Getter
@Setter
@NoArgsConstructor
public class InterviewComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="interview_seq")
    private Interview interview;

    @OneToMany(mappedBy = "interviewComment")
    private List<InterviewCommentLikes> interviewCommentLikes = new ArrayList<>();


}
