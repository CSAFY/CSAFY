import React from 'react';
import styled from 'styled-components';

const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 600;

  position: absolute;
  top: 94px;
  left: 50%;
  transform: translate(-50%);
`;
const SubTitleBox = styled.div`
  font-size: 14px;
  color: #000;

  position: absolute;
  top: 129px;
  left: 50%;
  transform: translate(-50%);
`;
const ResultBox = styled.div`
  height: 300px;
  width: 300px;

  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%);
`;
const ScoreBox = styled.div`
  height: 110px;
  width: 130px;

  position: absolute;
  top: 10px;
  left: 0;
`;
const TimeBox = styled.div`
  height: 110px;
  width: 150px;

  position: absolute;
  top: 10px;
  right: 0;
`;
const Result = styled.div`
  height: 170px;
  width: 200px;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;
const Score = styled.div`
  font-size: 12px;
  position: absolute;
  top: 30px;
  right: 0;
`;
const ScoreList = styled.li``;

function CSTestResultBox() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <TitleBox>정말 열심히 공부하셨군요!</TitleBox>
      <SubTitleBox>
        조금만 더 노력하면 완벽한 CS 마스터가 되실 것 같아요!
      </SubTitleBox>
      <ResultBox>
        <ScoreBox>
          <div
            style={{
              fontSize: '14px',
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            결과
          </div>
          <div
            style={{
              fontSize: '24px',
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            95점
          </div>
          <div
            style={{
              fontSize: '20px',
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            (19/20)
          </div>
        </ScoreBox>
        <TimeBox>
          <div
            style={{
              fontSize: '14px',
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            시간
          </div>
          <div
            style={{
              fontSize: '17px',
              fontWeight: '600',
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            10분 31초
          </div>
        </TimeBox>
        <Result>
          <Score>100% ( 4 / 4 )</Score>
          <Score style={{ top: '57px' }}>100% ( 4 / 4 )</Score>
          <Score style={{ top: '84px' }}>100% ( 4 / 4 )</Score>
          <Score style={{ top: '111px' }}>100% ( 4 / 4 )</Score>
          <Score style={{ top: '138px' }}>100% ( 4 / 4 )</Score>
          <div
            style={{ fontSize: '12px', fontWeight: '600', color: '#a4a4a4' }}
          >
            과목별 결과
          </div>
          <ul
            style={{
              fontSize: '14px',
              fontWeight: '600',
              paddingLeft: '20px',
            }}
          >
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              컴퓨터 구조
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              데이터 구조
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              운영체제
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              데이터베이스
            </li>
            <li>기타</li>
          </ul>
        </Result>
      </ResultBox>
    </div>
  );
}

export default CSTestResultBox;
