package csafy.csservice.repository.video;

import csafy.csservice.entity.video.VideoCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoCertificateRepository extends JpaRepository<VideoCertificate, Long> {

    VideoCertificate findByUserSeqAndCategory(Long userSeq, String category);
}
