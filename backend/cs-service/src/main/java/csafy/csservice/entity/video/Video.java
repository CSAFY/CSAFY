package csafy.csservice.entity.video;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "VIDEO")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "category2_id")
    private String category2Id;

    private String title;

    @Column(name = "video_id")
    private String videoId;

    @OneToMany(mappedBy = "video", cascade = {CascadeType.REMOVE})
    private List<VideoLikes> videoLikes = new ArrayList<>();

    @OneToMany(mappedBy = "video", cascade = {CascadeType.REMOVE})
    private List<VideoFavorites> videoFavorites = new ArrayList<>();

    @OneToMany(mappedBy = "video", cascade = {CascadeType.REMOVE})
    private List<VideoSeen> videoSeens = new ArrayList<>();

}
