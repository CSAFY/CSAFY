package csafy.userservice.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user-service/")
@RequiredArgsConstructor
public class UserApiController {

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }
}
