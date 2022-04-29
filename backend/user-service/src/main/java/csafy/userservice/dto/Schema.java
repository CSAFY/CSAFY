package csafy.userservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Schema {
    private String type;
//    private List<Field> fields;
    private List<Object> fields;
    private boolean optional;
    private String name;
}
