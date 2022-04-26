package csafy.userservice.dto;

import csafy.userservice.entity.auth.RoleType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Payload {
    private Long userSeq;
    //    private String userId;
//    private String emailVerifiedYn;
//    private ProviderType providerType;
    private RoleType roleType;
    private LocalDateTime createdAt;
    //    private LocalDateTime modifiedAt;
    private String username;
    private String nickname;
    //    private String password;
    private String email;
    private String profileImage;
    private String introduction;
    private String is_vip;
}
