package csafy.csservice.entity.test;

import csafy.csservice.entity.interview.InterviewLikes;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CARD")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @Column(name = "card_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardSeq;

    private int relatedRawSeq;

    private String category;

    private String categoryChapter;

    private String cardKey;

    private String cardValue;

    // 연결
    @OneToMany(mappedBy = "card", cascade = {CascadeType.REMOVE})
    private List<CardLikes> cardLikes = new ArrayList<>();

}
