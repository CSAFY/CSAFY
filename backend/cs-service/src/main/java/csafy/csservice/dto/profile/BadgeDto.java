package csafy.csservice.dto.profile;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.profile.Badge;
import csafy.csservice.entity.profile.UserBadge;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class BadgeDto {

    private Long userSeq;

    private Long badgeSeq;

    private String badgeName;

    private LocalDate getTime;

    public BadgeDto(UserBadge badge){
        this.userSeq = badge.getUserSeq();
        this.badgeSeq = badge.getBadge().getId();
        this.badgeName = badge.getBadge().getName();
        this.getTime = badge.getGetTime();
    }
}
