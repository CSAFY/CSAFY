package csafy.userservice.dto.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MobileUpdateRequest {
    private String username;
    private String profileImg;
    private String introduction;
}