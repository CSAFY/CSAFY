package csafy.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class KafkaJwtDto implements Serializable {
    private Schema schema;
    private Payload payload;
}
