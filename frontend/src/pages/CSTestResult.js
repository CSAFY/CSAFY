/* eslint-disable */
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// RECOIL
import { useRecoilValue } from 'recoil';
import { Userinfo } from '../recoils/Userinfo';

// COMPONENTS
import CSTestResultBox from '../components/CSTestResultBox';

// STYLED
import styled from 'styled-components';
import { Button } from '@mui/material';

const TestResultWrapper = styled.div`
  width: 100%;
  // height: 900px;
  height: 100vh;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const TestresultContent = styled.div`
  width: 1232px;

  position: relative;
`;
const TitleBox = styled.div`
  font-size: 24px;
  font-weight: 600;

  position: absolute;
  top: 100px;
  left: 120px;
`;
const ResultBox = styled.div`
  width: 840px;
  height: 547px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  font-size: 18px;
  // font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%);
`;
const ButtonBox = styled.div`
  position: absolute;
  top: 800px;
  left: 50%;
  transform: translate(-50%);
`;

function CSTestResult() {
  const navigate = useNavigate();
  const { testTitle } = useParams();
  const { state } = useLocation();
  // Recoil
  const userInfo = useRecoilValue(Userinfo);

  const handleReviewClick = () => {
    navigate('/reviewnote');
  };

  console.log(state);
  return (
    <TestResultWrapper>
      <TestresultContent>
        <TitleBox>{userInfo.username}님의 실전 모의고사 결과</TitleBox>
        <ResultBox>
          <CSTestResultBox state={state} />
        </ResultBox>
        <ButtonBox>
          <Button
            sx={{
              width: '150px',
              height: '50px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              bgcolor: '#008ED0',
              ':hover': {
                color: '#006D9F',
                bgcolor: '#D5F2FC',
              },
            }}
            onClick={handleReviewClick}
          >
            오답노트 가기
          </Button>
        </ButtonBox>
      </TestresultContent>
    </TestResultWrapper>
  );
}

export default CSTestResult;
