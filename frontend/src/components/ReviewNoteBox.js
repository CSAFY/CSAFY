import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  cursor: pointer;
`;
const CategoryInfo = styled.div`
  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 50px;
  left: 30px;
`;
const QuestionInfo = styled.div`
  height: 34px;
  width: 80%;

  display: flex;
  align-items: center;

  position: absolute;
  top: 100px;
  left: 33px;
`;
const RoundInfo = styled.div`
  height: 34px;

  display: flex;
  align-items: center;

  position: absolute;
  top: 20px;
  left: 30px;
`;
function ReviewNoteBox({ category, question, round }) {
  const navigate = useNavigate();
  return (
    <Box onClick={() => navigate(`/reviewNote/${round}`)}>
      <CategoryInfo>분류: {category}</CategoryInfo>
      <QuestionInfo>Q: {question}</QuestionInfo>
      <RoundInfo>round: {round}</RoundInfo>
    </Box>
  );
}

export default ReviewNoteBox;
