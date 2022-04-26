package csafy.userservice.service.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import csafy.userservice.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserProducer {

    List<Field> fields = Arrays.asList(new Field("int32", true, "user_seq"),
            new Field("string", true, "role_type"),
            new Field("string", true, "created_at"),
            new Field("string", true, "username"),
            new Field("string", true, "nickname"),
            new Field("string", true, "email"),
            new Field("string", true, "profile_image"),
            new Field("string", true, "introduction"),
            new Field("string", true, "is_vip"));
    Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("users")
            .build();

    private final KafkaTemplate<String, String> kafkaTemplate;

    public UserDto send(String kafkaTopic, UserDto userDto){
        Payload payload = Payload.builder()
                .userSeq(userDto.getUserSeq())
                .roleType(userDto.getRoleType())
                .createdAt(userDto.getCreatedAt())
                .username(userDto.getUsername())
                .nickname(userDto.getNickname())
                .email(userDto.getEmail())
                .profileImage(userDto.getProfileImage())
                .introduction(userDto.getIntroduction())
                .is_vip(userDto.getIs_vip())
                .build();
        KafkaUserDto kafkaUserDto = new KafkaUserDto(schema, payload);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString ="";
        try{
            jsonInString = mapper.writeValueAsString(kafkaUserDto);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        kafkaTemplate.send(kafkaTopic, jsonInString);
        log.info("User Producer to DB: " + userDto);

        return userDto;
    }
}
