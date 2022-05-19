package csafy.userservice.dto.Kafka;

import csafy.userservice.dto.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class KafkaUserUpdateDto implements Serializable {
    private Schema schema;
    private PayloadUpdate payload;
}
