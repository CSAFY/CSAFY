import React from 'react';
// STYLED
import styled from 'styled-components';

const ReviewNoteWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReviewNoteContent = styled.div`
  width: 1232px;

  position: relative;
`;

function ReviewNote() {
  return (
    <ReviewNoteWrapper>
      <ReviewNoteContent>
        <h1>오답노트</h1>
      </ReviewNoteContent>
    </ReviewNoteWrapper>
  );
}

export default ReviewNote;
