package csafy.userservice.service.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import csafy.userservice.dto.Field;
import csafy.userservice.dto.Kafka.KafkaUserMobileUpdateDto;
import csafy.userservice.dto.Kafka.KafkaUserUpdateDto;
import csafy.userservice.dto.Kafka.PayloadMobileUpdate;
import csafy.userservice.dto.Kafka.PayloadUpdate;
import csafy.userservice.dto.Schema;
import csafy.userservice.dto.TimeField;
import csafy.userservice.dto.request.MobileUpdateRequest;
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
public class UserMobileUpdateProducer {

    List<Object> fields = Arrays.asList(
            new Field("int64", true, "user_seq"),
            new TimeField("int64", true, "org.apache.kafka.connect.data.Timestamp", 1,"modified_at"),
            new Field("string", true, "username"),
            new Field("string", true, "profile_image_url"),
            new Field("string", true, "introduction"));

    Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("user")
            .build();

    private final KafkaTemplate<String, String> kafkaTemplate;

    public Long send(String kafkaTopic, String s3url, String introduction, String username, Long userSeq){
        PayloadMobileUpdate payload = PayloadMobileUpdate.builder()
                .user_seq(userSeq)
//                .user_seq(22L)
                .modified_at(Timestamp.valueOf(LocalDateTime.now()))
                .username(username)
                .profile_image_url(s3url)
                .introduction(introduction)
                .build();
        KafkaUserMobileUpdateDto kafkaUserUpdateDto = new KafkaUserMobileUpdateDto(schema, payload);
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
        log.info("User Mobile Update Producer to DB: " + s3url);
        log.info("User Mobile Update Producer to DB: " + introduction);
        log.info("User Mobile Update Producer to DB: " + username);

        return userSeq;
    }
}
