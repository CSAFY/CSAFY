package csafy.userservice.api.dev;

import csafy.userservice.dto.response.ErrorResponse;
import csafy.userservice.entity.User;
import csafy.userservice.service.UserService;
import csafy.userservice.service.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 관리자 API : 기본
 * 쓰기전에 꼭 확인!!!!!
 */

@RestController
@RequiredArgsConstructor
public class DevApiController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MessageSource messageSource;

    private final UserService userService;

    @GetMapping("/admin")
    public ResponseEntity checkAdmin(HttpServletRequest request) {
        // 회원, 비회원(유효하지 않은 토큰) 구분
        String token = request.getHeader("Authorization");
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.
                            getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())));
        }

        Long userSeq = jwtTokenProvider.getUserSeq(token);

        User user = userService.getUser(userSeq);

        if (user.getEmail().trim().equals("hotsixturtles@gmail.com")) {
            return ResponseEntity.ok(null);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    /**
     * 유저 강제 탈퇴
     *
     * @param id
     * @param request
     * @return
     */
    @DeleteMapping("/admin/user/{id}")
    public ResponseEntity userDeleteAdmin(@PathVariable("id") Long id,
                                          HttpServletRequest request) {
        // 회원, 비회원(유효하지 않은 토큰) 구분
        String token = request.getHeader("Authorization");
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.
                            getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())));
        }
        Long userSeq = jwtTokenProvider.getUserSeq(token);
        User user = userService.getUser(userSeq);
        if (user.getEmail().trim().equals("hotsixturtles@gmail.com")) {

            userService.deleteUser(userSeq);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}

