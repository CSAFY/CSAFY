import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Userinfo } from '../recoils/Userinfo';
// STYLED
import styled from 'styled-components';
import CSTestResultBox from '../components/CSTestResultBox';
import { useRecoilValue } from 'recoil';

const TestResultWrapper = styled.div`
  width: 100%;
  height: 1200px;
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
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%);
`;

function CSTestResult() {
  const userInfo = useRecoilValue(Userinfo);
  const { testTitle } = useParams();
  const { state } = useLocation();

  console.log(state);
  return (
    <TestResultWrapper>
      <TestresultContent>
        <TitleBox>{userInfo.username}님의 실전 모의고사 결과</TitleBox>

        <ResultBox>
          <CSTestResultBox state={state} />
        </ResultBox>
      </TestresultContent>
    </TestResultWrapper>
  );
}

export default CSTestResult;
