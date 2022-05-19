/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { Userinfo } from '../recoils/Userinfo';

// STYLED
import styled from 'styled-components';
import swal from 'sweetalert2';
import { Button, TextField } from '@mui/material';

const PhoneContent = styled.div`
  width: 100%;
  // height: 100%;
  height: 500px;
  color: white;
`;

const ChatRoomName = styled.div`
  font-size: 35px;
  font-weight: 600;

  position: absolute;
  top: 35px;
  left: 45px;
`;
const SendMessage = styled.form`
  font-size: 20px;

  display: flex;

  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
`;
const MessageBox = styled.div`
  height: 480px;

  text-align: right;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // overflow: scroll;
  overflow: auto;

  position: absolute;
  bottom: 120px;
  left: 30px;
  right: 30px;
`;
const Message = styled.div`
  min-height: 30px;
  min-width: 120px;

  display: flex;
  align-items: center;

  margin-bottom: 20px;
  padding-top: 30px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  color: black;
  overflow: hidden;

  position: relative;
`;
let sock;
let ws;

function TestChatRoom({ chatRoomId }) {
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const [userinfo, setUserinfo] = useRecoilState(Userinfo);
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

  useEffect(() => {
    roomInfo();
    initRoom();
    getMessages();
  }, [chatRoomId]);

  // console.log('🐕', messages, chatRoomId);

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
    // e.preventDefault();
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
          swal
            .fire({
              icon: 'warning',
              position: 'middle',
              title: '서버 연결에 실패 하였습니다. 다시 접속해 주십시요.',

              // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
              confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
              // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
              confirmButtonText: '확인', // confirm 버튼 텍스트 지정
              // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            })
            .then(result => {
              // 만약 Promise리턴을 받으면,
              if (result.isConfirmed) {
                // 만약 모달창에서 confirm 버튼을 눌렀다면
                navigate('/');
              }
            });
          //  alert(
          //    '서버 연결에 실패 하였습니다. 다시 접속해 주십시요.',
          //  );
          //  navigate('/'); // 홈으로
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
    ws.send(
      '/pub/chat/message',
      JSON.stringify({
        type: type,
        roomId: chatRoomId,
        message: chatMessage,
      }),
      { Authorization: token },
    );
    setChatMessage('');
  };

  const recvMessage = recv => {
    setMessages(prev => [
      ...prev,
      {
        type: recv.type,
        sender: recv.sender,
        message: recv.message,
      },
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

  // // scroll test
  const myRef = useRef();
  const [scrollLocation, setScrollLocation] = useState(0);
  // const lastScroll = useSelector(state=> state.review.current_scroll);
  const scroll = e => {
    setScrollLocation(e.target.scrollTop);
  };

  return (
    <PhoneContent>
      <ChatRoomName>{chatRoomInfo.roomName}</ChatRoomName>
      <SendMessage
        onSubmit={e => {
          e.preventDefault();
          sendMessage('TALK');
        }}
      >
        <TextField
          value={chatMessage}
          onChange={e => setChatMessage(e.target.value)}
          sx={{
            width: '240px',
            marginRight: '15px',
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

      {/* <MessageBox ref={myRef} onScroll={scroll}> */}
      <MessageBox>
        {messages.map((message, idx) => (
          <>
            {message.message.includes('님이 방에 입장했습니다.') ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Message
                  key={idx}
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
              </div>
            ) : (
              <>
                {message.sender === userinfo.email ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      position: 'relative',
                    }}
                  >
                    <Message key={idx} style={{ justifyContent: 'flex-end' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '10px',
                          fontSize: '12px',
                        }}
                      >
                        {userinfo.username}
                      </div>
                      {message.message}
                    </Message>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      position: 'relative',
                    }}
                  >
                    <Message key={idx}>
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '10px',
                          fontSize: '12px',
                        }}
                      >
                        {message.sender}
                      </div>
                      {message.message}
                    </Message>
                  </div>
                )}
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
