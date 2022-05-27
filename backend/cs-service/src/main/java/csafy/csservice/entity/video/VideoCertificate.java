package csafy.csservice.entity.video;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "video_certificate")
@Getter
@Setter
@NoArgsConstructor
public class VideoCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    private String category;

    @Column(name = "certificated_at")
    private LocalDate certificatedAt;
}

