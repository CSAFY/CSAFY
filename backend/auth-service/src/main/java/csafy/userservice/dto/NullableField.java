package csafy.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NullableField {
    private List<String> type;
    private boolean optional;
    private String field;
}
