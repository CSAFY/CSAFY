package csafy.chatservice.client;

import csafy.chatservice.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@FeignClient(name="user-service", url = "http://localhost:8000/user-service")
public interface UserServiceClient {

    @GetMapping("/tokenvalidated")
    String checkTokenValidated(@RequestParam("inputToken") String inputToken);

    @GetMapping("/token/user")
    UserDto getTokenUser(@RequestParam("inputToken") String inputToken);

}
