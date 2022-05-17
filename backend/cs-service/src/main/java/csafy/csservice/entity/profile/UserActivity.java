package csafy.csservice.entity.profile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "User_activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserActivity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "activity_time")
    private LocalDate activityTime;

    private Long activityCount;


}
