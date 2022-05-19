package csafy.csservice.dto.profile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class Petdto {
    private List<String> petType;
}
