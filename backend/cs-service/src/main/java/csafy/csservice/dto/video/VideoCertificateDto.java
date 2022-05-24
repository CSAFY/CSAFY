package csafy.csservice.dto.video;

import csafy.csservice.entity.video.VideoCertificate;
import lombok.*;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class VideoCertificateDto {

    private Long id;
    private Long userSeq;
    private String category;
    private LocalDate certificatedAt;

    public VideoCertificateDto(VideoCertificate videoCertificate){
        this.id = videoCertificate.getId();
        this.userSeq = videoCertificate.getUserSeq();
        this.category = videoCertificate.getCategory();
        this.certificatedAt = videoCertificate.getCertificatedAt();
    }
}

