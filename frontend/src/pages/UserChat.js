/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { defaultAPI } from '../utils/api';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import swal from 'sweetalert2';

// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { Username } from '../recoils/Username';
import { Userinfo } from '../recoils/Userinfo';
import { CurrentPage } from '../recoils/CurrentPage';

// COMPONENTS
import TestChatRoom from '../components/TestChatRoom';

// STYLED
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Phone = styled.div`
  width: 426px;
  height: 800px;
  min-height: 750px;
  background: url('images/web-phone.webp') 0% 0% / 100% 100% no-repeat;

  position: absolute;
  top: 50%;
  // left: 50%;
  right: 20%;
  transform: translate(20%, -50%);
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
const PhoneContent = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;

const ChatRoomName = styled.div`
  color: #fff;
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
const StartBox = styled.form`
  font-size: 20px;

  display: flex;

  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
`;
const StartButton = styled.div`
  font-size: 20px;
  width: 95%;

  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
`;
const Galaxy = styled.div`
  width: 426px;
  height: 800px;
  min-height: 750px;
  background: url('images/galaxyFrame.png') 0% 0% / 100% 100% no-repeat;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

let sock;
let ws;

function UserChat() {
  const navigate = useNavigate();
  // Recoil
  const [username, setUserName] = useRecoilState(Username);
  const [token, setToken] = useRecoilState(Token);
  const [userinfo, setUserinfo] = useRecoilState(Userinfo);
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPage);

  //
  const [toggleStart, setToggleStart] = useState(false);
  const [enableStart, setEnableStart] = useState(false);
  const [chatRoomName, setChatRoomName] = useState('');

  const handleRoomName = e => {
    e.preventDefault();
    if (chatRoomName) {
      createRoom();
      setEnableStart(true);
    } else {
      // alert('주제를 입력해주세요.');
      swal.fire({
        icon: 'warning',
        position: 'middle',
        title: '주제를 입력해주세요.',

        // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      });
    }
  };
  const handleStart = () => {
    if (chatRoomName) {
      setToggleStart(true);
      roomInfo();
      initRoom();
      getMessages();
    } else {
      // alert('주제를 입력해주세요.');
      swal.fire({
        icon: 'warning',
        position: 'middle',
        title: '주제를 입력해주세요.',

        // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      });
    }
  };
  // 핸드폰 화면 채팅용
  const [chatRoomId, setChatRoomId] = useState('');
  console.log('🐕', chatRoomId);

  // 채팅방 개설
  const createRoom = () => {
    // post query parameters - **null값 추가 꼭 필요**
    axios
      .post(`${defaultAPI}/chat-service/chat/room`, null, {
        params: { name: `${username} - ${chatRoomName}` },
      })
      .then(res => {
        console.log(res);
        // alert(`${res.data.name}방 개설 성공`);
        console.log(`${res.data.name}방 개설 성공`);
        setChatRoomId(res.data.roomId);
      })
      .catch(err => console.error(err));
  };

  // 채팅방 내용 관련
  const [chatRoomInfo, setChatRoomInfo] = useState({
    roomName: '',
    roomStartTime: '',
    roomCount: 0,
    roomId: '',
  });
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [owner, setOwner] = useState('');

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

  // useEffect(() => {
  //   // createRoom();
  //   roomInfo();

  //   getMessages();
  // }, []);
  // useEffect(() => {
  //   initRoom();
  //   createRoom();
  // }, [token]);

  // useEffect(() => {
  //   roomInfo();
  //   initRoom();
  //   getMessages();
  // }, [chatRoomId]);
  useEffect(() => {
    setCurrentPage('/usechat');
  }, []);

  return (
    <ChatWrapper>
      <ChatContent>
        <Galaxy>
          <GalaxyBG>
            {toggleStart ? (
              <>
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

                <MessageBox>
                  {messages.map((message, idx) => (
                    <>
                      {message.message.includes('님이 방에 입장했습니다.') ||
                      message.message.includes('님이 방에서 나갔습니다.') ? (
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
                              <Message
                                key={idx}
                                style={{ justifyContent: 'flex-end' }}
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
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
              </>
            ) : (
              <>
                <img
                  src="images/csafy.png"
                  alt="G"
                  style={{
                    // height: '300px',
                    width: '280px',
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                    marginLeft: '10px',
                  }}
                />
                <StartBox onSubmit={handleRoomName}>
                  <TextField
                    value={chatRoomName}
                    onChange={e => setChatRoomName(e.target.value)}
                    placeholder="상담하고싶은 주제를 입력하세요."
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
                      bgcolor: '#008ed0',
                      ':hover': {
                        color: '#006D9F',
                        bgcolor: '#D5F2FC',
                      },

                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                    onClick={handleRoomName}
                  >
                    입력
                  </Button>
                </StartBox>
                {enableStart && (
                  <StartButton>
                    <Button
                      variant="dark"
                      sx={{
                        width: '100%',
                        height: '70px',
                        textAlign: 'center',
                        display: 'block',
                        bgcolor: '#008ed0',

                        ':hover': {
                          color: '#006D9F',
                          bgcolor: '#D5F2FC',
                        },

                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                      onClick={handleStart}
                    >
                      시작하기
                    </Button>
                  </StartButton>
                )}
              </>
            )}
          </GalaxyBG>
        </Galaxy>
      </ChatContent>
    </ChatWrapper>
  );
}

export default UserChat;
