package csafy.payservice.client;

import csafy.payservice.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="user-service", url = "http://localhost:8000/user-service")
public interface UserServiceClient {

    @GetMapping("/tokenvalidated")
    String checkTokenValidated(@RequestParam("inputToken") String inputToken);

    @GetMapping("/token/user")
    UserDto getTokenUser(@RequestParam("inputToken") String inputToken);

    @GetMapping("/rankup")
    void rankUpPremium(@RequestParam("token") String token);


}
