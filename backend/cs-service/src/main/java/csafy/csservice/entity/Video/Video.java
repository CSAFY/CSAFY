package csafy.csservice.entity.Video;

import csafy.csservice.entity.interview.InterviewLikes;
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
    private int categoryId;

    private String title;

    @Column(name = "video_id")
    private String videoId;

    @OneToMany(mappedBy = "video")
    private List<VideoLikes> videoLikes = new ArrayList<>();

}
