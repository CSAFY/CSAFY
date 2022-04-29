package csafy.userservice.service.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import csafy.userservice.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserProducer {

    List<Object> fields = Arrays.asList(
            new Field("int64", true, "user_seq"),
            new Field("string", true, "auth_key"),
            new Field("string", true, "user_id"),
            new Field("string", true, "email_verified_yn"),
            new Field("string", true, "provider_type"),
            new Field("string", true, "role_type"),
            new TimeField("int64", true, "org.apache.kafka.connect.data.Timestamp", 1, "created_at"),
            new TimeField("int64", true, "org.apache.kafka.connect.data.Timestamp", 1,"modified_at"),
            new Field("string", true, "username"),
            new Field("string", true, "nickname"),
            new Field("string", true, "password"),
            new Field("string", true, "email"),
            new Field("string", true, "profile_image"),
            new Field("string", true, "introduction"),
            new Field("string", true, "is_vip"));

    Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("user")
            .build();

    private final KafkaTemplate<String, String> kafkaTemplate;

    public UserDto send(String kafkaTopic, UserDto userDto){
        Payload payload = Payload.builder()
                .user_seq(userDto.getUser_seq())
//                .user_seq(22L)
                .auth_key(userDto.getAuth_key())
                .user_id(userDto.getUser_id())
                .email_verified_yn(userDto.getEmail_verified_yn())
                .provider_type(userDto.getProvider_type())
                .role_type(userDto.getRole_type())
                .created_at(Timestamp.valueOf(userDto.getCreated_at()))
                .modified_at(Timestamp.valueOf(userDto.getModified_at()))
                .username(userDto.getUsername())
                .nickname(userDto.getNickname())
                .password(userDto.getPassword())
                .email(userDto.getEmail())
                .profile_image(userDto.getProfile_image())
                .introduction(userDto.getIntroduction())
                .is_vip(userDto.getIs_vip())
                .build();
        KafkaUserDto kafkaUserDto = new KafkaUserDto(schema, payload);
        System.out.println("asdasd " + kafkaUserDto.getPayload().getCreated_at());
        System.out.println("asdasd " + kafkaUserDto.getPayload().getRole_type());
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        String jsonInString ="";
        try{
            jsonInString = mapper.writeValueAsString(kafkaUserDto);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }
        System.out.print(jsonInString);
        System.out.println("aaaaa");
        kafkaTemplate.send(kafkaTopic, jsonInString);
        log.info("User Producer to DB: " + userDto);

        return userDto;
    }
}
