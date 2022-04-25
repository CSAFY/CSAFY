package csafy.userservice.service;

import csafy.userservice.entity.User;
import csafy.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Transactional
    public Long join(User user) {
        validateDuplicateUser(user);
        user.setPassword(user.getPassword());
        user.encodePassword(passwordEncoder);
        int randNum = (int)(Math.random()*20) + 1;
        user.setProfileImage("#" + randNum);
        userRepository.save(user);

        return user.getUserSeq();
    }

    private void validateDuplicateUser(User user) {
        User findUsers = userRepository.findByEmail(user.getEmail());
        if (findUsers != null) {
            throw new IllegalStateException("일치하는 아이디가 존재합니다.");
        }
    }

    @Transactional
    public void deleteUser(Long userSeq) {

        userRepository.deleteByUserSeq(userSeq);

    }

}
