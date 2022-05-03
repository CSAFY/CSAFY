import React from 'react';

// STYLED
import styled from 'styled-components';

const InterviewResultWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const InterviewResultContent = styled.div`
  width: 1232px;

  position: relative;
`;

function InterviewResult() {
  return (
    <InterviewResultWrapper>
      <InterviewResultContent>hello</InterviewResultContent>
    </InterviewResultWrapper>
  );
}

export default InterviewResult;
