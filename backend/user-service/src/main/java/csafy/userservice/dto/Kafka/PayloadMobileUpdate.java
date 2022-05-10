package csafy.userservice.dto.Kafka;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;


@Data
@Builder
public class PayloadMobileUpdate {
    private Long user_seq;
    private String username;
    private String profile_image_url;
    private Timestamp modified_at;
    private String introduction;
}
