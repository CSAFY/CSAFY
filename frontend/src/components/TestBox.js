/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';

const Box = styled.div`
  width: 340px;
  height: 184px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    color: black;
    transform: scale(1.05);
  }

  cursor: pointer;

  position: relative;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;

  position: absolute;
  top: 20px;
  left: 20px;
`;
const Exp = styled.div`
  font-size: 13px;
  color: #98a8b9;

  position: absolute;
  top: 50px;
  left: 20px;
`;
const ImageBox = styled.img`
  width: 100px;
  height: 100px;

  position: absolute;
  right: 20px;
  bottom: 20px;
`;

function TestBox({ title, exp, id, img }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (title === '전 과목') {
      navigate(`/csTestDetail/all`, { state: id });
    } else {
      navigate(`/csTestDetail/${title}`, { state: id });
    }
  };

  return (
    // <Box onClick={() => navigate(`/csTestDetail/${title}`, { state: id })}>
    <Box onClick={handleNavigate}>
      <Title>{title}</Title>
      <Exp>{exp}</Exp>
      <ImageBox src={img} alt="IMAGE" />
      {/* <img src={img} alt="IMAGE" /> */}
      {/* <InfoBox>
        <Infos>
          <InfoTitle>문제 수</InfoTitle>
          <div style={{ marginTop: '10px', color: '#8e8e8e' }}>0/163</div>
        </Infos>
        <Infos>
          <InfoTitle>문제 수</InfoTitle>
          <div style={{ marginTop: '10px', color: '#84c2ea' }}>0/163</div>
        </Infos>
        <Infos>
          <InfoTitle>정답률</InfoTitle>
          <div
            style={{
              marginTop: '10px',
              color: '#008ed0',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            88%
          </div>
        </Infos>
      </InfoBox> */}
    </Box>
  );
}

export default TestBox;
