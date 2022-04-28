import React from 'react';

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
  left: 38px;
`;
const Category = styled.div`
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

function QuestionBox(props) {
  return (
    <Question>
      <Content>Q. {props.question}</Content>
      <Category>{props.category}</Category>
    </Question>
  );
}

export default QuestionBox;
