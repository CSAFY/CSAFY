/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
// // Recoil
// import { useRecoilState } from 'recoil';
// import { LoginState } from '../recoils/LoginState';
// import { Token } from '../recoils/Token';

// COMPONENTS
import TestChatRoom from '../components/TestChatRoom';

// STYLED
import styled from 'styled-components';
import swal from 'sweetalert2';
import { Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Galaxy = styled.div`
  width: 426px;
  height: 800px;
  min-height: 750px;
  background: url('images/galaxyFrame.png') 0% 0% / 100% 100% no-repeat;

  position: absolute;
  top: 100px;
  right: 20px;
`;
const GalaxyBG = styled.div`
  width: 364px;
  height: 682px;
  position: relative;
  // top: 50%;
  top: 55px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 10px;
  background-color: #2f3132;
  overflow: hidden;
`;

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

///

function Chat() {
  // // Recoil
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  // const [token, setToken] = useRecoilState(Token);

  // 채팅 관련 데이터
  const [chatrooms, setChatrooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  // 핸드폰 화면 채팅용
  const [chatRoomId, setChatRoomId] = useState('');

  // console.log(chatrooms);
  // 채팅방 개설
  const createRoom = () => {
    // post query parameters - **null값 추가 꼭 필요**
    axios
      .post(`${defaultAPI}/chat-service/chat/room`, null, {
        params: { name: roomName },
      })
      .then(res => {
        // alert(`${res.data.name}방 개설 성공`);
        swal.fire({
          icon: 'success',
          position: 'middle',
          title: `${res.data.name}방 개설 성공`,

          // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '확인', // confirm 버튼 텍스트 지정
          // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        });
        // console.log(res.data.name + '방 개설에 성공하였습니다.');
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

  return (
    <ChatWrapper>
      <ChatContent>
        <Galaxy>
          <GalaxyBG>
            {chatRoomId ? (
              <TestChatRoom chatRoomId={chatRoomId} />
            ) : (
              <>
                <img
                  src="images/csafy.png"
                  alt="G"
                  style={{
                    // height: '300px',
                    width: '280px',

                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                    marginLeft: '10px',
                  }}
                />
              </>
            )}
          </GalaxyBG>
        </Galaxy>
        <ChatRoomList>
          <ChatRoomTitle>
            <h1>채팅방 리스트</h1>
            <RefreshIcon
              onClick={findAllRoom}
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
                // width: '150px',
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
