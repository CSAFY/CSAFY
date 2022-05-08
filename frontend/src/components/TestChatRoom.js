import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

// STYLED
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

const PhoneContent = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

const ChatRoomName = styled.div`
  font-size: 35px;
  font-weight: 600;

  position: absolute;
  top: 35px;
  left: 45px;
`;
const SendMessage = styled.div`
  font-size: 20px;

  display: flex;

  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
`;
const MessageBox = styled.div`
  height: 530px;

  text-align: right;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;

  position: absolute;
  bottom: 120px;
  right: 30px;
  left: 140px;
`;
const Message = styled.div`
  min-height: 30px;

  margin-bottom: 20px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  color: black;
  overflow: hidden;
`;

let sock;
let ws;

function TestChatRoom({ chatRoomId }) {
  // console.log('🐸', chatRoomId);
  const navigate = useNavigate();
  const [chatRoomInfo, setChatRoomInfo] = useState({
    roomName: '',
    roomStartTime: '',
    roomCount: 0,
    roomId: '',
  });
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  // const { roomName } = useParams();
  // const [roomName, setRoomName] = useState('');
  // const [roomStartTime, setRoomStartTime] = useState('');
  // const [roomCount, setRoomCount] = useState(0);

  useEffect(() => {
    roomInfo();
    initRoom();
    getMessages();
  }, [chatRoomId]);
  console.log('🐕', messages, chatRoomId);

  const roomInfo = () => {
    axios
      .get(`${defaultAPI}/chat-service/chat/room/` + chatRoomId)
      .then(res => {
        setChatRoomInfo({
          roomName: res.data.name,
          roomStartTime: new Date(),
          roomCount: res.data.userCount,
        });
      });
  };
  const initRoom = () => {
    const token = localStorage.getItem('jwt');
    sock = new SockJS(`${defaultAPI}/chat-service/ws-stomp`);
    ws = Stomp.over(sock);

    if (token) {
      ws.connect(
        { Authorization: token },
        // 성공했을 때
        function() {
          ws.subscribe(
            '/sub/chat/room/' + chatRoomId,
            function(message) {
              var recv = JSON.parse(message.body);
              recvMessage(recv);
            },
            { Authorization: token },
          );
        },
        // 실패했을 때
        function() {
          alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
          navigate('/'); // 홈으로
        },
      );
      // console.log('🐸', token);
      return function cleanup() {
        ws.disconnect();
      };
    }
  };

  const sendMessage = type => {
    if (!chatMessage) return;
    const token = localStorage.getItem('jwt');
    ws.send(
      '/pub/chat/message',
      JSON.stringify({ type: type, roomId: chatRoomId, message: chatMessage }),
      { Authorization: token },
    );
    setChatMessage('');
  };

  const recvMessage = recv => {
    setMessages(prev => [
      ...prev,
      { type: recv.type, sender: recv.sender, message: recv.message },
    ]);
  };

  const getMessages = () => {
    axios
      .get(`${defaultAPI}/chat-service/chat/room/message/${chatRoomId}`)
      .then(res => {
        setMessages(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <PhoneContent>
      <ChatRoomName>{chatRoomInfo.roomName}</ChatRoomName>
      <SendMessage>
        <TextField
          value={chatMessage}
          onChange={e => setChatMessage(e.target.value)}
          sx={{
            width: '250px',
            borderRadius: '5px',
            bgcolor: '#fff',
            color: '#000',
          }}
        />
        <Button
          variant="dark"
          sx={{
            width: '85px',
            textAlign: 'center',
            display: 'block',
            bgcolor: '#009859',
            ':hover': {
              color: '#006D9F',
              bgcolor: '#D5F2FC',
            },

            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
          }}
          onClick={() => sendMessage('TALK')}
        >
          Send
        </Button>
      </SendMessage>

      <MessageBox>
        {messages.map((message, i) => (
          <>
            {message.message.includes('님이 방에 입장했습니다.') ? (
              <>
                <Message
                  key={i}
                  style={{
                    height: '20px',
                    backgroundColor: '#2f3132',
                    color: '#fff',
                    // margin: '0',
                    padding: '0',
                    overflow: 'hidden',
                  }}
                >
                  {message.message}
                </Message>
              </>
            ) : (
              <>
                <Message key={i}>{message.message}</Message>
              </>
            )}
          </>
        ))}
      </MessageBox>

      {/* <p>{roomStartTime}에 시작</p> */}
    </PhoneContent>
  );
}

export default TestChatRoom;
