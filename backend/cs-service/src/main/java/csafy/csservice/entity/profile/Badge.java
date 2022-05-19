package csafy.csservice.entity.profile;

import csafy.csservice.entity.interview.InterviewMemo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "badge")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Badge {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "badge", cascade = {CascadeType.REMOVE})
    private List<UserBadge> userBadges = new ArrayList<>();

}
