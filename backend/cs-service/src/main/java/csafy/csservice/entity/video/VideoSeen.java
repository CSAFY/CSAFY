package csafy.csservice.entity.video;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "video_seen")
@Getter
@Setter
@NoArgsConstructor
public class VideoSeen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="video_seq")
    private Video video;

    @Column(name ="seen_at")
    private LocalDateTime seenAt;
}