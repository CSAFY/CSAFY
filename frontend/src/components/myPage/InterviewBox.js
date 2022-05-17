import React from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';

const Question = styled.div`
  width: 1020px;
  height: 80px;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;

  display: flex;
  align-items: center;

  position: relative;
`;
const Content = styled.div`
  font-size: 16px;

  position: absolute;
  top: 33px;
  left: 38px;
`;
const AttitudeCategory = styled.div`
  width: 58px;
  height: 21px;
  border-radius: 18px;
  background-color: #def9ff;
  font-size: 12px;
  // font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 10px;
  top: 10px;
`;
const TechCategory = styled.div`
  width: 58px;
  height: 21px;
  border-radius: 18px;
  background-color: #d2fae2;
  font-size: 12px;
  // font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 10px;
  top: 10px;
`;

function InterviewBox({ interview }) {
  const navigate = useNavigate();
  // 인터뷰 질문 가져오기
  const handleQuestion = () => {
    navigate(`/interviewDetail/${interview.interviewSeq}`, {
      state: interview,
    });
  };
  return (
    <>
      <Question onClick={handleQuestion} style={{ cursor: 'pointer' }}>
        <Content>Q. {interview.question}</Content>
        {interview.category === '인성' ? (
          <AttitudeCategory>{interview.category}</AttitudeCategory>
        ) : (
          <TechCategory>{interview.category}</TechCategory>
        )}
      </Question>
    </>
  );
}

export default InterviewBox;
