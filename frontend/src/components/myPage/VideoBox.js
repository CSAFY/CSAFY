import React, { useState } from 'react';

// STYLED
import styled from 'styled-components';

const Video = styled.div`
  width: 300px;
  height: 226px;
  flex-grow: 0;

  border-radius: 14px;
  box-shadow: 0 0 10px 0 #d7e4ec;
  background-color: #fff;
  // background-color: black;

  margin-left: 10px;
  margin-right: 10px;

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
const Thumbnail = styled.img`
  width: 274px;
  height: 154px;
  // border: 1px solid black;

  position: absolute;
  top: 35px;
  left: 50%;
  transform: translate(-50%);
`;
const Title = styled.div`
  // width: 57px;
  height: 16px;
  font-size: 13px;
  // font-weight: 600;
  color: #000;

  position: absolute;
  left: 15px;
  bottom: 10px;
`;

function VideoBox({ categoryId, category2Id, title, videoId }) {
  // console.log(categoryId, category2Id, title, videoId);

  return (
    <>
      <Video>
        <Category>{category2Id}</Category>
        <div>
          <Thumbnail
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt="youtube"
          />
        </div>
        <Title>{title}</Title>
      </Video>
    </>
  );
}

export default VideoBox;
