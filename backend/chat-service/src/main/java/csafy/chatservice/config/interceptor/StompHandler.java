package csafy.chatservice.config.interceptor;

import csafy.chatservice.client.UserServiceClient;
import csafy.chatservice.dto.ChatMessage;
import csafy.chatservice.dto.ChatUserInfo;
import csafy.chatservice.dto.UserDto;
import csafy.chatservice.repository.ChatRoomRepository;
import csafy.chatservice.service.ChatService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * Websocket 연결 시 요청 header의 jwt token 유효성을 검증하는 코드를 다음과 같이 추가
 * 유효하지 않을 경우 예외 처리
 *
 * 퇴장, 입장 안내 메시지는 공통적인 부분이므로 클라이언트가 메시지를 보내기보단 서버에서 일괄적으로 처리
 * 입장시 이벤트 : StompCommand.SUBSCRIBE ; 인원수를 +1 갱신하여 캐시에 저장. 정보(sessionId와 roomId)를 조합하여 캐시를 남김.
 * 퇴장시 이벤트 : StompCommand.DISCONNECT ; 캐시에 저장된 정보로 채팅방 정보를 얻어, 인원수를 -1 갱신하여 캐시에 저장
 */

@Slf4j
@RequiredArgsConstructor
@Configuration
@Component
public class StompHandler implements ChannelInterceptor {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;
    private final UserServiceClient userServiceClient;

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청
            String jwtToken = accessor.getFirstNativeHeader("Authorization");
            System.out.println("인증인증인증~");
            // 회원일 경우, Header의 jwt token 검증
            if (jwtToken != null) {
                // 회원 token 받음
//                try {

                String resultCode = userServiceClient.checkTokenValidated(jwtToken);
                    if(!resultCode.equals("OK")) log.error("여기로 들어와야함");
//                } catch (FeignException ex){
//                    log.error(ex.getMessage());
//                }
            } else {
                // 비회원 : id, password 받음
            }
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
//            System.out.println("구독요청");
            // header정보에서 구독 destination정보를 얻고, roomId를 추출한다.
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            System.out.println("여기오쇼?????");
            // 채팅방의 인원수를 +1한다.
            chatRoomRepository.plusUserCount(roomId);
            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
            // OAuth가 이것저것 principal 건드리고 다녀서 user_id가 출력됨. 미가입자나 익명의 유저 처리 고민 (강민구)
            String jwtToken = accessor.getFirstNativeHeader("Authorization");
            String name = "익명의 유저";
            String img = null;
            String userSeq = null;
            if (jwtToken != null) {
                // 회원일 경우 이름 변경
                try {
                    UserDto user = userServiceClient.getTokenUser(jwtToken);
                    name = user.getNickname();
                    // 보험
                    if (name == null) {
                        name = user.getEmail();
                    }
                    img = user.getProfileImage();
                    userSeq = String.valueOf(user.getUserSeq());
                }
                catch (FeignException ex){
                    log.error(ex.getMessage());
                    chatRoomRepository.setUserEnterInfo(sessionId, ChatUserInfo.builder().sender(name).roomId(roomId).userSeq(userSeq).build());
                    chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.ENTER).roomId(roomId).sender(name).img(img).build());
                    log.info("SUBSCRIBED {}, {}", name, roomId);
                }
            }
            // 채팅방에 들어온 클라이언트 정보를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            chatRoomRepository.setUserEnterInfo(sessionId, ChatUserInfo.builder().sender(name).roomId(roomId).userSeq(userSeq).build());
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.ENTER).roomId(roomId).sender(name).img(img).build());
            log.info("SUBSCRIBED {}, {}", name, roomId);
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            // 퇴장한 클라이언트의 sessionId로 roomId를 얻고, roomId 맵핑 정보를 삭제한다.
            System.out.println("세션ID : " + sessionId);
            ChatUserInfo chatUserInfo = chatRoomRepository.getUserEnterRoomId(sessionId);
            String name = chatUserInfo.getSender();
            String roomId = chatUserInfo.getRoomId().replaceFirst("playroom-", "");
            String userSeq = chatUserInfo.getUserSeq();

            chatRoomRepository.removeUserEnterInfo(sessionId);
            // 채팅방의 인원수를 -1한다.
            chatRoomRepository.minusUserCount(roomId);
            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
//            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("익명의 유저");
            // Enter와 마찬가지로 UserDetail 이슈, 미가입자나 익명의 유저 처리 고민
//            String name = jwtTokenProvider.getUser(accessor.getFirstNativeHeader("Authorization")).getEmail();  // 나중에 닉네임으로 변경
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.QUIT).roomId(roomId).sender(name).build());
            log.info("DISCONNECTED {}, {}", sessionId, roomId);
            // 참가자 제거 보험 코드
//            playroomService.deleteGuest(Long.valueOf(userSeq), Long.valueOf(roomId));
        }
        return message;
    }
}
