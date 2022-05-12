package csafy.csservice.dto.profile;


import csafy.csservice.entity.profile.UserActivity;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
public class UserActivityDto {

    private LocalDate activityDate;
    private Long activityCount;

    public UserActivityDto(UserActivity userActivity){
        this.activityCount = userActivity.getActivityCount();
        this.activityDate = userActivity.getActivityTime();
    }

}
