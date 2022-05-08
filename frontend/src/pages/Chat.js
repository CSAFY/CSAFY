import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resolvePath, useNavigate, useParams } from 'react-router-dom';
import { defaultAPI } from '../utils/api';

import RefreshIcon from '@mui/icons-material/Refresh';

// STYLED
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { fontSize } from '@mui/system';
import ChatRoom from './ChatRoom';
import TestChatRoom from '../components/TestChatRoom';

const Phone = styled.div`
  width: 426px;
  height: 800px;
  min-height: 750px;
  background: url('images/web-phone.webp') 0% 0% / 100% 100% no-repeat;

  position: absolute;
  top: 100px;
  right: 20px;
`;
const PhoneBG = styled.div`
  width: 380px;
  height: 755px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: #2f3132;
  overflow: hidden;
`;

const ChatWrapper = styled.div`
  width: 100%;
  height: 1000px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const ChatContent = styled.div`
  width: 1232px;
  height: 100%;
  position: relative;
`;
const ChatRoomList = styled.div`
  width: 500px;

  position: absolute;
  top: 100px;
  left: 20px;
`;
const ChatRoomTitle = styled.div`
  display: flex;
  align-items: center;
`;
const MakeChatRoom = styled.div`
  display: flex;

  margin-bottom: 30px;
`;
const ChatRooms = styled.div`
  font-size: 20px;
  height: 50px;
  padding-left: 20px;

  display: flex;
  align-items: center;

  &:hover {
    background-color: #009859;
    color: #d2fae2;
  }
  cursor: pointer;
`;

function Chat() {
  const [roomData, setRoomData] = useState({ room_name: '', chatRooms: [] });
  const [chatrooms, setChatrooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  // 모바일용
  const [chatRoomId, setChatRoomId] = useState('');

  // 채팅방 개설
  const createRoom = () => {
    // post query parameeters - **null값 추가 꼭 필요**
    axios
      .post(`${defaultAPI}/chat-service/chat/room`, null, {
        // name: 'asdf',
        params: { name: roomName },
      })
      .then(res => {
        console.log(res.data.name + '방 개설에 성공하였습니다.');
        setRoomName('');
        findAllRoom();
      })
      .catch(err => console.error(err));
  };

  // 채팅방 다 찾기
  const findAllRoom = () => {
    axios.get(`${defaultAPI}/chat-service/chat/rooms`).then(res => {
      setChatrooms(res.data);
    });
  };

  useEffect(() => {
    findAllRoom();
  }, []);

  // console.log('🎃', chatRoomId);
  // console.log(chatrooms);
  return (
    <ChatWrapper>
      <ChatContent>
        <Phone>
          <PhoneBG>
            {chatRoomId ? (
              <TestChatRoom chatRoomId={chatRoomId} />
            ) : (
              <>
                <img
                  src="images/csafy.png"
                  alt="G"
                  style={{
                    // height: '300px',
                    widht: '300px',
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                    marginLeft: '10px',
                  }}
                />
              </>
            )}
          </PhoneBG>
        </Phone>
        <ChatRoomList>
          <ChatRoomTitle>
            <h1>채팅방 리스트</h1>
            <RefreshIcon
              onClick={findAllRoom}
              // fontSize="medium"
              sx={{ ml: '20px', fontSize: 30 }}
              style={{ cursor: 'pointer' }}
            />
          </ChatRoomTitle>
          <MakeChatRoom>
            <TextField
              variant="outlined"
              placeholder="방 제목"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              sx={{ width: '250px' }}
            />
            <Button
              variant="dark"
              sx={{
                ml: '10px',
                width: '150px',
                textAlign: 'center',
                display: 'block',
                bgcolor: '#009859',
                color: '#d2fae2',
                ':hover': {
                  color: '#009859',
                  bgcolor: '#d2fae2',
                },

                fontSize: '16px',
                fontWeight: 'bold',
              }}
              onClick={createRoom}
            >
              채팅방 개설
            </Button>
          </MakeChatRoom>
          <hr />

          {chatrooms.map(chatroom => (
            <ChatRooms
              key={chatroom.roomId}
              onClick={() => {
                setChatRoomId(chatroom.roomId);
              }}
            >
              {chatroom.name}
            </ChatRooms>
          ))}
        </ChatRoomList>
      </ChatContent>
    </ChatWrapper>
  );
}

export default Chat;
