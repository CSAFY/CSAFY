package csafy.userservice.service.auth;

import csafy.userservice.client.CsServiceClient;
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

    private final CsServiceClient csServiceClient;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
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
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
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
        User nowUser = userRepository.findByEmail(savedUser.getEmail());
        csServiceClient.updateDailyCheck(nowUser.getUserSeq());
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
            user.setProfileImage("default/default_1.PNG");
        }

        return userRepository.saveAndFlush(user);
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
