package csafy.userservice.api;

import csafy.userservice.dto.UserDto;
import csafy.userservice.dto.response.ErrorResponse;
import csafy.userservice.entity.User;
import csafy.userservice.entity.auth.ProviderType;
import csafy.userservice.entity.auth.RoleType;
import csafy.userservice.repository.UserRepository;
import csafy.userservice.service.UserService;
import csafy.userservice.service.producer.UserProducer;
import csafy.userservice.service.token.JwtTokenProvider;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserApiController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MessageSource messageSource;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    private final UserRepository userRepository;

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

    /**
     * 회원 가입
     * @param request
     * @param bindingResult
     * @return
     * 반환 코드 : 201/ 404
     */
    @PostMapping("/signup")
    public ResponseEntity signup(@Validated @RequestBody CreateUserRequest request,
                                 BindingResult bindingResult) {
        System.out.println("들어오냐??");
        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(bindingResult.getAllErrors().get(0).getDefaultMessage()));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setNickname(request.getNickname());
        user.setProviderType(ProviderType.LOCAL);
        user.setEmailVerifiedYn("N");
        user.setCreatedAt(LocalDateTime.now());
        user.setModifiedAt(LocalDateTime.now());
        user.setRoleType(RoleType.USER);
        user.setIs_vip("N");

        try {
            Long id = userService.join(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        }
        catch (IllegalStateException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource
                            .getMessage("error.same.id", null, LocaleContextHolder.getLocale())));
        }
    }

    @Data
    static class CreateUserRequest {
        //        @Size(min=3, max=128, message = "{error.size.username}")
        private String username;
        //        @Size(min=3, max=128, message = "{error.size.email}")
        @Email(message = "{error.format.email}", regexp = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
        @NotNull(message = "{email.notempty}")
        private String email;
        private String nickname;
        @Size(min=4, max=12, message = "{error.size.password}")
//        @Length(min=3, max=128, message = "비밀번호 길이 불일치")
        private String password;
        @Size(max = 64) String userId;
        //        @Size(max = 1) String emailVerifiedYn;
//        @Size(max = 512) String profileImageUrl;
//        ProviderType providerType;
//        RoleType roleType;
        LocalDateTime createdAt;
        LocalDateTime modifiedAt;
    }

    /**
     * 회원 탈퇴
     * @param token
     * @return
     */
    @DeleteMapping("/withdraw")
    public ResponseEntity<?> signout(@RequestHeader(value = "Authorization") String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())));
        }
        Long userSeq = jwtTokenProvider.getUserSeq(token);

        userService.deleteUser(userSeq);

        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


    /**
     * token 유효 확인, 자동 로그아웃 등에 활용
     * @param request (token)
     * @return
     */
    @GetMapping("/tokenvalidate")
    public ResponseEntity<?> checkTokenValidate(HttpServletRequest request){

        // 인증 확인후 돌리기
        String token = request.getHeader("Authorization");

        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.
                            getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())) {
                    });
        }

        return ResponseEntity.ok().body(null);
    }



    /**
     * token으로 user 받는 함수 feignclient
     * @param inputToken (token)
     * @return
     */
    @GetMapping("/token/user")
    public UserDto getTokenUser(@RequestParam("inputToken") String inputToken){

        // 인증 확인후 돌리기
        String token = inputToken;

        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return null;
        }

        User user = jwtTokenProvider.getUser(token);

        return new UserDto(user);
    }

    /**
     * token 유효 확인, feignclient
     * @param inputToken (token)
     * @return
     */
    @GetMapping("/tokenvalidated")
    public ResponseEntity<?> checkTokenValidated(@RequestParam("inputToken") String inputToken){

        // 인증 확인후 돌리기
        String token = inputToken;

        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.
                            getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())) {
                    });
        }

        return ResponseEntity.ok().body(null);
    }


    /**
     * 로그인 JWT 발급
     * @param userInfo {email, password}
     * @return
     */
    @PostMapping("/account/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userInfo) {
        User user = userRepository.findByEmail(userInfo.get("email"));
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(messageSource.getMessage("error.none.user", null, LocaleContextHolder.getLocale())));
        }

        if (!passwordEncoder.matches(userInfo.get("password"), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(messageSource.getMessage("error.wrong.password", null, LocaleContextHolder.getLocale())));
        }


        String token = jwtTokenProvider.createToken(user.getUsername(), user.getUserSeq());

        return ResponseEntity.ok(new LoginUserResponse(token));
    }


    @Data
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public class LoginUserResponse {
        private String token;
        public LoginUserResponse(String accessToken) {
            this.token = accessToken;
        }
    }


}
