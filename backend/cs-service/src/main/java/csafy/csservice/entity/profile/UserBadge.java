package csafy.csservice.entity.profile;

import csafy.csservice.entity.interview.Interview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_badge")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserBadge {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="badge_seq")
    private Badge badge;

    private LocalDate getTime;



}
