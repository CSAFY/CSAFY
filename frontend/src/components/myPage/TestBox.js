import React, { useState } from 'react';

// STYLED
import styled from 'styled-components';

const Test = styled.div`
  width: 285px;
  height: 400px;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px;

  position: relative;
`;
const Date = styled.div`
  width: 53px;
  height: 14px;
  font-size: 11px;
  font-weight: 600;
  color: #000;

  position: absolute;
  top: 15px;
  left: 15px;
`;
const TestName = styled.div`
  width: 121px;
  height: 18px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
`;
const ScoreBox = styled.div`
  width: 86px;
  height: 50px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 110px;
  left: 50%;
  transform: translate(-50%);
`;
const TestScore = styled.div`
  width: 55px;
  height: 30px;
  font-size: 24px;
  font-weight: bold;
`;
const ResultBox = styled.div`
  width: 80%;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ResultTitle = styled.div`
  width: 56px;
  height: 15px;
  font-size: 12px;
  font-weight: 600;
  color: #a4a4a4;

  margin-bottom: 10px;
`;
const ResultScore = styled.div`
  height: 18px;
  font-size: 14px;
  color: #000;

  margin-bottom: 10px;
`;
const LogoImg = styled.img`
  width: 28px;
  height: 14px;

  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
`;

function TestBox({ info }) {
  const [testInfo, setTestInfo] = useState({
    date: '2022.01.11',
    testName: '모의고사 이름',
    rightQuestions: 19,
    totalQuestions: 20,
    result: {
      computer: 4,
      data: 4,
      os: 4,
      db: 3,
      etc: 4,
    },
  });

  const getScore = data => {
    return (data.rightQuestions / data.totalQuestions) * 100;
  };

  return (
    <>
      <Test>
        <Date>{testInfo.date}</Date>
        <TestName>{testInfo.testName}</TestName>
        <ScoreBox>
          <TestScore>{getScore(testInfo)}점</TestScore>
          <div>
            ({testInfo.rightQuestions} / {testInfo.totalQuestions})
          </div>
        </ScoreBox>
        <ResultBox>
          <ResultTitle>과목별 결과</ResultTitle>
          <ResultScore>컴퓨터 구조</ResultScore>
          <ResultScore>데이터 구조</ResultScore>
          <ResultScore>운영체제</ResultScore>
          <ResultScore>데이터베이스</ResultScore>
          <ResultScore>기타</ResultScore>
        </ResultBox>
        <LogoImg src="images/csafy.png" alt="CSAFY" />
      </Test>
    </>
  );
}

export default TestBox;
