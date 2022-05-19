package csafy.payservice.dto;

import csafy.payservice.dto.auth.ProviderType;
import csafy.payservice.dto.auth.RoleType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class UserDto {
    private Long user_seq;
    private String auth_key;
    private String user_id;
    private String email_verified_yn;
    private ProviderType provider_type;
    private RoleType role_type;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;
    private String username;
    private String nickname;
    private String password;
    private String email;
    private String profile_image;
    private String introduction;
    private String is_vip;
}
