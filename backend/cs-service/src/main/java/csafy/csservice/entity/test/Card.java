package csafy.csservice.entity.test;

import lombok.*;

import javax.persistence.*;

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

}
