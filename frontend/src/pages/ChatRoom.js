/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

let sock;
let ws;

function ChatRoom() {
  // sockJS 설정
  // const sock = new SockJS(`${defaultAPI}/chat-service/ws-stomp`);
  // const ws = Stomp.over(sock);

  const { state } = useLocation(); // 나중에 roomId로 바꿔주세요!
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
  }, []);

  const roomInfo = () => {
    axios.get(`${defaultAPI}/chat-service/chat/room/` + state).then(res => {
      console.log('room', res);
      console.log('roomData', res.data);
      setChatRoomInfo({
        roomName: res.data.name,
        roomStartTime: new Date(),
        roomCount: res.data.userCount,
      });
    });
  };
  const initRoom = () => {
    console.log('시작');
    const token = localStorage.getItem('jwt');

    sock = new SockJS(`${defaultAPI}/chat-service/ws-stomp`);
    ws = Stomp.over(sock);

    if (token) {
      ws.connect(
        { Authorization: token },
        // 성공했을 때
        function() {
          ws.subscribe(
            '/sub/chat/room/' + state,
            function(message) {
              var recv = JSON.parse(message.body);
              console.log('recv', recv);
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
    }
  };

  const sendMessage = type => {
    if (!chatMessage) return;
    const token = localStorage.getItem('jwt');
    ws.send(
      '/pub/chat/message',
      JSON.stringify({ type: type, roomId: state, message: chatMessage }),
      { Authorization: token },
    );
    setChatMessage('');
  };

  const recvMessage = recv => {
    // console.log('recv', recv);
    // this.messages.unshift({
    //   type: recv.type,
    //   sender: recv.sender,
    //   message: recv.message,
    // });
    setMessages(prev => [
      ...prev,
      { type: recv.type, sender: recv.sender, message: recv.message },
    ]);
  };

  const getMessages = () => {
    console.log('룸?', state);
    axios
      .get(`${defaultAPI}/chat-service/chat/room/message/${state}`)
      .then(res => {
        console.log('res🎃', res.data);
        setMessages(res.data);
      })
      .catch(err => console.error(err));
    // http.get('/chat-service/chat/room/message/' + state)
    // .then(res => {
    //   // console.log('res', res.data)
    //   for (const message of res.data) {
    //     console.log(message)
    //     this.messages.unshift({"type":message.type,"sender":message.sender,"message":message.message})
    //   }
    // })
  };

  // console.log('🎃', messages);
  // console.log('???', messages);

  return (
    <div>
      <h1>{chatRoomInfo.roomName}</h1>
      <p>{chatRoomInfo.roomName}의 채팅방</p>

      <div>
        <label>채팅 메시지</label>
        <input
          type="text"
          className="form-control"
          value={chatMessage}
          onChange={e => setChatMessage(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        type="button"
        onClick={() => sendMessage('TALK')}
      >
        메시지 보내기
      </button>

      <ul className="list-group">
        {messages.map((message, i) => (
          // 적당한 키가 없는데
          <li key={i}>
            <div>{message.message}</div>
          </li>
        ))}
      </ul>

      {/* <p>{roomStartTime}에 시작</p> */}
    </div>
  );
}

export default ChatRoom;
