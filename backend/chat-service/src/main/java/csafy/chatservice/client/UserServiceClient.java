package csafy.chatservice.client;

import csafy.chatservice.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

@FeignClient(name="user-service")
public interface UserServiceClient {

    @GetMapping("/user-service/tokenvalidated")
    ResponseEntity<?> checkTokenValidated(String inputToken);

    @GetMapping("/token/user")
    UserDto getTokenUser(String inputToken);

}
