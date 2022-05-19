/* eslint-disable */
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
  width: 880px;
  font-size: 16px;

  position: absolute;
  left: 38px;
`;
const AttitudeCategory = styled.div`
  width: 58px;
  height: 21px;
  border-radius: 18px;
  background-color: #def9ff;
  font-size: 12px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 10px;
`;
const TechCategory = styled.div`
  width: 58px;
  height: 21px;
  border-radius: 18px;
  background-color: #d2fae2;
  font-size: 12px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 10px;
`;

function QuestionBox(props) {
  const navigate = useNavigate();
  const handleQuestion = () => {
    // console.log(props.interviewSeq);
    navigate(`/interviewDetail/${props.interviewSeq}`, { state: props });
  };
  return (
    <Question
      // onClick={() => navigate(`/interviewDetail/${props.interviewSeq}`)}
      onClick={handleQuestion}
      style={{ cursor: 'pointer' }}
    >
      <Content>Q. {props.question}</Content>
      {props.category === '인성' ? (
        <AttitudeCategory>{props.category}</AttitudeCategory>
      ) : (
        <TechCategory>{props.category}</TechCategory>
      )}
    </Question>
  );
}

export default QuestionBox;
