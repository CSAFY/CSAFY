package csafy.chatservice.api;

import csafy.chatservice.dto.ChatMessage;
import csafy.chatservice.dto.ChatRoom;
import csafy.chatservice.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * STOMP 라이브러리를 이용해서 subscribe(구독자) 구현
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    // 전체 그룹 채팅방 조회
    @GetMapping("/chat/room")
    public ResponseEntity room() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllRoom();
        chatRooms.stream().forEach(room -> room.setUserCount(chatRoomRepository.getUserCount(room.getRoomId())));

        return ResponseEntity.ok().body(chatRooms);
    }


    // 모든 채팅방 목록 반환
    @GetMapping("/chat/rooms")
    public List<ChatRoom> rooms() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllRoom();
        chatRooms.stream().forEach(room -> room.setUserCount(chatRoomRepository.getUserCount(room.getRoomId())));
        return chatRooms;
    }

    // 채팅방 생성
    @PostMapping("/chat/room")
    public ChatRoom createRoom(@RequestParam String name) {
        return chatRoomRepository.createChatRoom(name);
    }

    // 채팅방 파괴
    @DeleteMapping("/chat/room/{roomId}")
    public ResponseEntity deleteRoom(@PathVariable String roomId) {
        chatRoomRepository.deleteChatRoom(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
    
    // 특정 채팅방 들어갔을때 채팅방 관련 정보를 전달
    @GetMapping("/chat/room/{roomId}")
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }

    // 해당 채팅방에 저장된 최신 메시지 받기
    @GetMapping("/chat/room/message/{roomId}")
    @ResponseBody
    public List<ChatMessage> getMessages(@PathVariable String roomId) {
        return chatRoomRepository.getMessages(roomId);
    }

}