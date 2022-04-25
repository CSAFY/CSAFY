package csafy.userservice.dto;

import csafy.userservice.entity.User;
import csafy.userservice.entity.auth.RoleType;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class UserDto {

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



    public UserDto(User user) {
        this.userSeq = user.getUserSeq();
        this.roleType = user.getRoleType();
        this.createdAt = user.getCreatedAt();
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        if (user.getProfileImage() == null || user.getProfileImage().equals("")) {
            this.profileImage = null;
        } else {
            this.profileImage = user.getProfileImage();
        }
        this.introduction = user.getIntroduction();
        this.is_vip = user.getIs_vip();

    }
}
