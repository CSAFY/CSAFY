import React from 'react';

// STYLED
import styled from 'styled-components';

const Question = styled.div`
  width: 1020px;
  height: 80px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  padding-left: 20px;

  display: flex;
  align-items: center;
`;

function InterviewBox({ question }) {
  return (
    <>
      <Question>{question}</Question>
    </>
  );
}

export default InterviewBox;
