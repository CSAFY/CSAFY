package csafy.userservice.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="cs-service", url = "http://localhost:8000/cs-service")
public interface CsServiceClient {



}
