package csafy.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class KafkaUserDto implements Serializable {
    private Schema schema;
    private Payload payload;
}
