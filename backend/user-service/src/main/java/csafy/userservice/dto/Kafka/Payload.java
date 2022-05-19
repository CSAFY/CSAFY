package csafy.userservice.dto.Kafka;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import csafy.userservice.entity.auth.ProviderType;
import csafy.userservice.entity.auth.RoleType;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
public class Payload {
    private Long user_seq;
    private String auth_key;
    private String user_id;
    private String email_verified_yn;
    private ProviderType provider_type;
    private RoleType role_type;
    private Timestamp created_at;
    private Timestamp modified_at;
    private String username;
    private String nickname;
    private String password;
    private String email;
    private String profile_image_url;
    private String introduction;
    private String is_vip;
}
