import React from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';

const Box = styled.div`
  width: 340px;
  height: 184px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;

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
const InfoBox = styled.div`
  width: 258px;
  height: 44px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
`;
const Infos = styled.div`
  width: 86px;
`;
const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #008ed0;
`;

function TestBox({ title, exp, id }) {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(`/csTestDetail/${id}`)}>
      <Title>{title}</Title>
      <Exp>{exp}</Exp>
      <InfoBox>
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
      </InfoBox>
    </Box>
  );
}

export default TestBox;
