package csafy.userservice.service.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import csafy.userservice.dto.*;
import csafy.userservice.dto.Kafka.KafkaUserDto;
import csafy.userservice.dto.Kafka.KafkaUserUpdateDto;
import csafy.userservice.dto.Kafka.Payload;
import csafy.userservice.dto.Kafka.PayloadUpdate;
import csafy.userservice.dto.request.UpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserUpdateProducer {

    List<Object> fields = Arrays.asList(
            new Field("int64", true, "user_seq"),
            new TimeField("int64", true, "org.apache.kafka.connect.data.Timestamp", 1,"modified_at"),
            new Field("string", true, "username"),
            new Field("string", true, "profile_image_url"));

    Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("user")
            .build();

    private final KafkaTemplate<String, String> kafkaTemplate;

    public Long send(String kafkaTopic, String username, String s3url, Long userSeq){
        PayloadUpdate payload = PayloadUpdate.builder()
                .user_seq(userSeq)
                .modified_at(Timestamp.valueOf(LocalDateTime.now()))
                .username(username)
                .profile_image_url(s3url)
                .build();
        KafkaUserUpdateDto kafkaUserUpdateDto = new KafkaUserUpdateDto(schema, payload);
        System.out.println("asdasd " + kafkaUserUpdateDto.getPayload().getModified_at());
        System.out.println("asdasd " + kafkaUserUpdateDto.getPayload().getUser_seq());
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        String jsonInString ="";
        try{
            jsonInString = mapper.writeValueAsString(kafkaUserUpdateDto);
        } catch (JsonProcessingException e){
            e.printStackTrace();
            return null;
        }
        System.out.print(jsonInString);
        kafkaTemplate.send(kafkaTopic, jsonInString);
        log.info("User Update Producer to DB: " + username);
        log.info("User Update Producer to DB: " + s3url);

        return userSeq;
    }
}
