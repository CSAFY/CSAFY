package csafy.csservice.entity.Video;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "video_favorites")
@Getter
@Setter
@NoArgsConstructor
public class VideoFavorites {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_SEQ")
    private Long userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="video_seq")
    private Video video;
}
