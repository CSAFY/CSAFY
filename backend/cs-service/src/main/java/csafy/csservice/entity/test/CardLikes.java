package csafy.csservice.entity.test;

import csafy.csservice.entity.interview.Interview;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "card_likes")
@Getter
@Setter
@NoArgsConstructor
public class CardLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="card_seq")
    private Card card;

}
