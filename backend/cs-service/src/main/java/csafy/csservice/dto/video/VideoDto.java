package csafy.csservice.dto.video;

import csafy.csservice.entity.video.Video;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class VideoDto {

    private Long id;
    private String categoryId;
    private String category2Id;
    private String title;
    private String videoId;

    public VideoDto(Video video){
        this.id = video.getId();
        this.categoryId = video.getCategoryId();
        this.category2Id = video.getCategory2Id();
        this.title = video.getTitle();
        this.videoId = video.getVideoId();
    }

}
