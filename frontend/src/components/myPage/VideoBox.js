import React, { useState } from 'react';

// STYLED
import styled from 'styled-components';

const Video = styled.div`
  width: 300px;
  height: 226px;
  border: 1px solid black;
  margin-left: 5px;
  margin-right: 5px;

  position: relative;
`;
const Category = styled.div`
  width: 54px;
  height: 16px;
  border-radius: 48px;
  background-color: #84c2ea;
  font-size: 8px;
  font-weight: 500;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 10px;
  top: 10px;
`;
const Thumbnail = styled.div`
  width: 274px;
  height: 154px;
  border: 1px solid black;

  position: absolute;
  top: 35px;
  left: 50%;
  transform: translate(-50%);
`;
const Title = styled.div`
  width: 57px;
  height: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #000;

  position: absolute;
  left: 10px;
  bottom: 10px;
`;

function VideoBox() {
  // 더미 데이터
  const [videoInfo, setVideoInfo] = useState({
    category: '컴퓨터 구조',
    url: 'https://youtube.com',
    title: 'OSI 7계층',
  });

  return (
    <>
      <Video>
        <Category>{videoInfo.category}</Category>
        <Thumbnail>{videoInfo.url}</Thumbnail>
        <Title>{videoInfo.title}</Title>
      </Video>
    </>
  );
}

export default VideoBox;
