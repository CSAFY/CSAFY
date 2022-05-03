import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import MuiSwitch from '../components/MuiSwitch';

// STYLED
import styled from 'styled-components';
import Progress from '../components/Progress';

const InterviewDetailWrapper = styled.div`
  width: 100%;
  height: 1500px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const InterviewDetailContent = styled.div`
  width: 1232px;
  height: 100%;
  position: relative;
`;

const TypeBox = styled.div`
  width: 543px;
  height: 333px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%);
`;
const TypeButton = styled.div`
  width: 166px;
  height: 44px;
  border-radius: 60px;
  border: solid 1px #008ed0;
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const QuestionBox = styled.div`
  width: 543px;
  height: 151px;
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
  top: 549px;
  left: 50%;
  transform: translate(-50%);
`;
const ButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
`;
const SwitchBox = styled.div`
  position: absolute;
  right: 0;
  top: 135px;
`;
const ToolTip = styled.div`
  width: 231px;
  height: 62px;
  border-radius: 34px;
  background-color: #d7e4ec;
  font-size: 14px;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  top: 70px;
`;

function Interview() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const toggleTime = () => {
    console.log(toggle);
    setToggle(!toggle);
  };
  const [toggleStart, setToggleStart] = useState(false);
  const handleStart = () => {
    setToggleStart(true);

    setTimeout(() => {
      navigate('/interviewDetail');
    }, 2000);
  };

  return (
    <InterviewDetailWrapper>
      <InterviewDetailContent>
        <ToolTip>
          스위치를 눌러 <br />
          시간 제한 모드로 변경할 수 있어요.
        </ToolTip>
        <SwitchBox>
          <MuiSwitch toggleTime={toggleTime} />
        </SwitchBox>
        <TypeBox>
          <div>어떤 질문 유형을 원하시나요?</div>
          <TypeButton>인성 면접</TypeButton>
          <TypeButton>기술 면접</TypeButton>
          <TypeButton style={{ backgroundColor: '#008ed0', color: '#fff' }}>
            알아서 해주세요
          </TypeButton>
          <div
            onClick={() => navigate('/interviewList')}
            style={{ cursor: 'pointer', fontSize: '13px', fontWeight: '300' }}
          >
            면접 질문만 보고 싶어요
          </div>
        </TypeBox>
        <QuestionBox>
          <div>몇 가지 면접 질문을 원하시나요?</div>
          <ButtonBox>
            <TypeButton style={{ marginRight: '15px' }}>3개요!</TypeButton>
            <TypeButton style={{ backgroundColor: '#008ed0', color: '#fff' }}>
              알아서 해주세요
            </TypeButton>
          </ButtonBox>
        </QuestionBox>
        {toggleStart ? (
          <QuestionBox style={{ top: '789px' }}>
            <div>문제를 선별 중입니다.</div>
            <div>잠시만 기다려 주세요.</div>
            <Progress />
          </QuestionBox>
        ) : (
          <QuestionBox style={{ top: '789px' }}>
            <TypeButton onClick={handleStart}>면접 시작하기</TypeButton>
          </QuestionBox>
        )}
      </InterviewDetailContent>
    </InterviewDetailWrapper>
  );
}

export default Interview;
