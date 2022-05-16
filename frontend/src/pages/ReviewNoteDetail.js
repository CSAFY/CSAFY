import React from 'react';
import { useParams } from 'react-router-dom';
// STYLED
import styled from 'styled-components';
const ReviewNoteDetailWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReviewNoteDetailContent = styled.div`
  width: 1232px;

  position: relative;
`;

function ReviewNoteDetail() {
  const { noteNum } = useParams();
  return (
    <ReviewNoteDetailWrapper>
      <ReviewNoteDetailContent>ReviewDetail</ReviewNoteDetailContent>
    </ReviewNoteDetailWrapper>
  );
}

export default ReviewNoteDetail;
