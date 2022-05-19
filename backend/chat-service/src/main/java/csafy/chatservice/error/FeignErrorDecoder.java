package csafy.chatservice.error;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        switch (response.status()){
            case 400:
                break;
            case 500:
                if(methodKey.contains("jwtException")){
                    return new ResponseStatusException(HttpStatus.BAD_REQUEST, "JWT EXPIRED");
                }
                break;
            default:
                return new Exception(response.reason());
        }
        return null;
    }
}
