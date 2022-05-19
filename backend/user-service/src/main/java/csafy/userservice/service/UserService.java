package csafy.userservice.service;

import csafy.userservice.dto.Kafka.PayloadUpdate;
import csafy.userservice.dto.UserDto;
import csafy.userservice.dto.request.MobileUpdateRequest;
import csafy.userservice.dto.request.UpdateRequest;
import csafy.userservice.entity.User;
import csafy.userservice.repository.UserRepository;
import csafy.userservice.service.S3.S3Uploader;
import csafy.userservice.service.producer.UserMobileUpdateProducer;
import csafy.userservice.service.producer.UserProducer;
import csafy.userservice.service.producer.UserUpdateProducer;
import csafy.userservice.service.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserProducer userProducer;
    private final UserUpdateProducer userUpdateProducer;
    private final UserMobileUpdateProducer userMobileUpdateProducer;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3Uploader s3Uploader;

    private final UserRepository userRepository;

    @Transactional
    public Long join(User user) {
        validateDuplicateUser(user);
        user.setPassword(user.getPassword());
        user.encodePassword(passwordEncoder);
//        int randNum = (int)(Math.random()*20) + 1;
//        user.setProfileImage("*" + randNum);
        user.setProfileImage("default/default_1.PNG");
        userProducer.send("user",new UserDto(user));
//        userRepository.save(user);

        return user.getUserSeq();
    }

    public User getUser(Long userSeq){
        return userRepository.findById(userSeq).orElse(null);
    }

    public MobileUpdateRequest updateMobileUser(Long userSeq, String s3url, String introduction, String username){

        Long result = userMobileUpdateProducer.send("userUpdate", s3url, introduction, username, userSeq);

        if(result == null){
            return null;
        }

        MobileUpdateRequest updateRequest = new MobileUpdateRequest();
        updateRequest.setIntroduction(introduction);
        updateRequest.setUsername(username);
        updateRequest.setProfileImg(s3url);

        return updateRequest;
    }

    private void validateDuplicateUser(User user) {
        User findUsers = userRepository.findByEmail(user.getEmail());
        if (findUsers != null) {
            throw new IllegalStateException("일치하는 아이디가 존재합니다.");
        }
    }

    public UpdateRequest updateUser(Long userSeq, String username, String s3url){

        Long result = userUpdateProducer.send("userUpdate", username, s3url, userSeq);

        if(result == null){
            return null;
        }

        UpdateRequest updateRequest = new UpdateRequest();
        updateRequest.setUsername(username);
        updateRequest.setProfileImg(s3url);
        return updateRequest;
    }

    @Transactional
    public void deleteUser(Long userSeq) {

        userRepository.deleteByUserSeq(userSeq);

    }

    @Transactional
    public void rankUpPremium(String token) {
        User user = jwtTokenProvider.getUser(token);
        user.setIs_vip("Y");
        userRepository.save(user);
    }

    public User getUserSeqOnEmail(String email){
        return userRepository.findByEmail(email);
    }

}
