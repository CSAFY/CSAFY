package csafy.userservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="cs-service", url = "http://localhost:8000/cs-service/profile")
public interface CsServiceClient {

    @GetMapping("/statistic/dailycheck")
    void updateDailyCheck(@RequestParam("userSeq") Long userSeq);

}
