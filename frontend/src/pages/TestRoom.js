import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import axios from 'axios';

function TestRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [chatRoomInfo, setChatRoomInfo] = useState({
    roomName: '',
    roomStartTime: '',
    roomCount: 0,
  });
  // const { roomName } = useParams();
  // const [roomName, setRoomName] = useState('');
  // const [roomStartTime, setRoomStartTime] = useState('');
  // const [roomCount, setRoomCount] = useState(0);

  useEffect(() => {
    roomInfo();
  }, []);

  const roomInfo = () => {
    axios
      .get('https://k6a102.p.ssafy.io/api/v1/chat-service/chat/room/' + state)
      .then(res => {
        console.log('room', res);
        console.log('roomData', res.data);
        setChatRoomInfo({
          roomName: res.data.name,
          roomStartTime: new Date(),
          roomCount: res.data.userCount,
        });
        // setRoomName(res.data.name); // 방 이름
        // setRoomCount(res.data.userCount); // 방 인원 숫자??
        // setRoomStartTime(new Date());
      });
  };
  console.log(chatRoomInfo);

  /////
  // var sock = new SockJS(`https://k6a102.p.ssafy.io/api/v1/chat-service`);
  // let client = Stomp.over(sock);
  /////

  const initRoom = () => {
    const token = localStorage.getItem('jwt');

    const sock = new SockJS(
      'https://k6a102.p.ssafy.io/api/v1/chat-service/ws-stomp',
    );
    // const ws = Stomp.over(sock);
    // roomID받아올 때 오류가 뜬다.
    // 퇴장한 클라이언트의 sessionId로 roomId를 얻고(여기서 얻는게 안된다...) roomId 맵핑 정보를 삭제한다 - 여기서 에러.

    if (token) {
      // ws.connect({Authorization:token})
      console.log('🐸', token);
    }
  };
  useEffect(() => {
    initRoom();
    // const token = localStorage.getItem('jwt');
    // console.log(token);
  }, []);

  //   var _this = this; // 순서 변경 금지 (강민구)

  //   _this.sock = new SockJS(
  //     'https://k6a102.p.ssafy.io/api/v1/chat-service/ws-stomp',
  //   ); // _this.sock = new SockJS("http://localhost:8080/ws-stomp");
  //   _this.ws = Stomp.over(_this.sock);
  //   if (token) {
  //     _this.ws.connect(
  //       { Authorization: token },
  //       function() {
  //         _this.ws.subscribe(
  //           '/sub/chat/room/' + _this.roomId,
  //           function(message) {
  //             var recv = JSON.parse(message.body);
  //             console.log('recv', recv);
  //             _this.recvMessage(recv);
  //           },
  //           { Authorization: token },
  //         );
  //       },
  //       function() {
  //         alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
  //         navigate('/'); // 홈으로
  //       },
  //     );
  //   } else {
  //     _this.ws.connect(
  //       'id',
  //       'password',
  //       function() {
  //         _this.ws.subscribe('/sub/chat/room/' + _this.roomId, function(
  //           message,
  //         ) {
  //           var recv = JSON.parse(message.body);
  //           console.log('recv', recv);
  //           _this.recvMessage(recv);
  //         });
  //       },
  //       function() {
  //         alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
  //         navigate('/'); // 홈으로
  //       },
  //     );
  //   }
  // };

  return (
    <div>
      <h1>{chatRoomInfo.roomName}</h1>
      <p>{chatRoomInfo.roomName}의 채팅방</p>
      {/* <p>{roomStartTime}에 시작</p> */}
    </div>
  );
}

export default TestRoom;
