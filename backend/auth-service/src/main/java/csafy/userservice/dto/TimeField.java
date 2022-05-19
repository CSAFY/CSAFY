package csafy.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TimeField {
    private String type;
    private boolean optional;
    private String name;
    private int version;
    private String field;
}
