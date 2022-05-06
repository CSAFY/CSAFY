package csafy.userservice.dto.request;

import lombok.*;

@Data
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRequest {
    private String username;
    private String profileImg;
}
