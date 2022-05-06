package csafy.userservice.service.auth;

import csafy.userservice.dto.UserDto;
import csafy.userservice.entity.User;
import csafy.userservice.entity.auth.ProviderType;
import csafy.userservice.entity.auth.RoleType;
import csafy.userservice.entity.auth.UserPrincipal;
import csafy.userservice.exception.OAuthProviderMissMatchException;
import csafy.userservice.info.OAuth2UserInfo;
import csafy.userservice.info.OAuth2UserInfoFactory;
import csafy.userservice.repository.UserRepository;
import csafy.userservice.service.producer.UserProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final UserProducer userProducer;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("제발!!!!!!!!좀!!!!!@#!@#!@#");
        OAuth2User user = super.loadUser(userRequest);
        System.out.println("LoadUser 까지 되나");
        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        System.out.println("오냐???????????????????1111111");
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        System.out.println("오냐???????????????????22222222");
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        System.out.println("오냐???????????????????333333");
        User savedUser = userRepository.findByUserId(userInfo.getId());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                                " account. Please use your " + savedUser.getProviderType() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);

        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LocalDateTime now = LocalDateTime.now();
        User user = new User(
                userInfo.getId(),
                userInfo.getName(),
                userInfo.getEmail(),
                "Y",
                userInfo.getImageUrl(),
                providerType,
                RoleType.USER,
                now,
                now,
                null
        );
        user.setNickname(userInfo.getName());
        user.setIs_vip("N");
        if(user.getProfileImage() == null || user.getProfileImage().trim().equals("")){
            int randNum = (int)(Math.random()*20) + 1;
            user.setProfileImage("*" + randNum); // 일단 *으로 받음 나중에 교체
        }


        userProducer.send("user", new UserDto(user)); // $$$ Test 필요!!
        return user;
//        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            user.setUsername(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !user.getProfileImage().equals(userInfo.getImageUrl())) {
            user.setProfileImage(userInfo.getImageUrl());
        }

        return user;
    }
}
