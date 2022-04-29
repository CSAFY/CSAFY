package csafy.userservice.dto;

import csafy.userservice.entity.User;
import csafy.userservice.entity.auth.ProviderType;
import csafy.userservice.entity.auth.RoleType;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
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



//    public UserDto(User user) {
//        this.userSeq = user.getUserSeq();
//        this.roleType = user.getRoleType();
//        this.createdAt = user.getCreatedAt();
//        this.username = user.getUsername();
//        this.nickname = user.getNickname();
//        this.email = user.getEmail();
//        if (user.getProfileImage() == null || user.getProfileImage().equals("")) {
//            this.profileImage = null;
//        } else {
//            this.profileImage = user.getProfileImage();
//        }
//        this.introduction = user.getIntroduction();
//        this.is_vip = user.getIs_vip();
//
//    }

    public UserDto(User user) {
        this.user_id = user.getUserId();
        this.username = user.getUsername();
        this.password = user.getPassword() != null ? user.getPassword() : "NO_PASS";
        this.email = user.getEmail() != null ? user.getEmail() : "NO_EMAIL";
        this.email_verified_yn = user.getEmailVerifiedYn() != null ? user.getEmailVerifiedYn() :"N";
        this.profile_image = user.getProfileImage() != null ? user.getProfileImage() : "";
        this.provider_type = user.getProviderType() != null ? user.getProviderType() : ProviderType.LOCAL;
        this.role_type = user.getRoleType() != null ? user.getRoleType() : RoleType.USER;
        this.created_at = user.getCreatedAt();
        this.modified_at = user.getModifiedAt();
        this.nickname = user.getNickname();
        this.introduction = user.getIntroduction();
        if (user.getProfileImage() == null || user.getProfileImage().equals("")) {
            this.profile_image = null;
        } else {
            this.profile_image = user.getProfileImage();
        }
        this.auth_key = user.getAuthKey();
        this.is_vip = user.getIs_vip();
    }
}
