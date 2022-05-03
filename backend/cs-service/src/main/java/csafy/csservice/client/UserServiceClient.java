package csafy.csservice.client;

import csafy.csservice.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="user-service", url = "https://k6a102.p.ssafy/api/v1/user-service")
public interface UserServiceClient {

    @GetMapping("/tokenvalidated")
    ResponseEntity<?> checkTokenValidated(@RequestParam("inputToken") String inputToken);

    @GetMapping("/token/user")
    UserDto getTokenUser(@RequestParam("inputToken") String inputToken);

}
