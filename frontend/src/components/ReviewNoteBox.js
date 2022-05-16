import React from 'react';
// STYLED
import styled from 'styled-components';

const Box = styled.div`
  width: 390px;
  height: 181px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;

  position: relative;
`;
const CategoryInfo = styled.div`
  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 33px;
  left: 100px;
`;
const QuestionInfo = styled.div`
  height: 34px;

  display: flex;
  align-items: center;

  position: absolute;
  top: 120px;
  left: 33px;
`;
function ReviewNoteBox({ category, question }) {
  return (
    <Box>
      <CategoryInfo>{category}</CategoryInfo>
      <QuestionInfo>{question}</QuestionInfo>
    </Box>
  );
}

export default ReviewNoteBox;
