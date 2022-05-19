package csafy.userservice.api;

import csafy.userservice.config.auth.AppProperties;
import csafy.userservice.dto.auth.AuthReqModel;
import csafy.userservice.dto.response.ApiResponse;
import csafy.userservice.entity.auth.UserPrincipal;
import csafy.userservice.service.token.AuthToken;
import csafy.userservice.service.token.AuthTokenProvider;
import csafy.userservice.service.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthApiController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final MessageSource messageSource;

    @PostMapping("/auth/login")
    public ApiResponse login(
            @RequestBody AuthReqModel authReqModel
    )
        {
            System.out.println("제발!!!!!!!!!@#!@#!@#");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authReqModel.getId(),
                        authReqModel.getPassword()
                )
        );

        String userId = authReqModel.getId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // jwt 토큰 발급
        return ApiResponse.success("token", accessToken.getToken());
    }

}