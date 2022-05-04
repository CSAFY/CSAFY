import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resolvePath, useNavigate, useParams } from 'react-router-dom';
import { defaultAPI } from '../utils/api';

function Test() {
  const [roomData, setRoomData] = useState({ room_name: '', chatRooms: [] });
  const [chatrooms, setChatrooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

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

  return (
    <div>
      <div>
        <div>
          <h3>채팅방 리스트</h3>
        </div>
        <span>
          <button onClick={findAllRoom}>새로고침</button>
        </span>
      </div>
      <div>
        <div>
          <label>방제목</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={createRoom}
          >
            채팅방 개설
          </button>
        </div>
      </div>
      <ul className="list-group">
        {chatrooms.map(chatroom => (
          <li key={chatroom.roomId}>
            <div
              onClick={() => {
                navigate(`/test/${chatroom.name}`, { state: chatroom.roomId });
              }}
              style={{ cursor: 'pointer' }}
            >
              {chatroom.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
