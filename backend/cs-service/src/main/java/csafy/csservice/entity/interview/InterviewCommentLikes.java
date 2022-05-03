package csafy.csservice.entity.interview;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "interview_comment_likes")
@Getter
@Setter
@NoArgsConstructor
public class InterviewCommentLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="interview_comment_id")
    private InterviewComment interviewComment;
}
