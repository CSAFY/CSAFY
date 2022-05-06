import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Progress from '../components/Progress';

// STYLED
import styled from 'styled-components';

const TestDetailWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const TestDetailContent = styled.div`
  width: 1232px;

  position: relative;
`;
const DetailBox = styled.div`
  width: 543px;
  height: 180px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%);
`;
const Content = styled.div`
  font-size: 18px;
  font-weight: 600;

  text-align: center;
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
  top: 249px;
  left: 50%;
  transform: translate(-50%);
`;
const TestList = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
`;
const TestBox = styled.div`
  width: 840px;
  height: 564px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  margin-top: 58px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.div`
  width: 305px;
  height: 56px;
  border-radius: 77px;
  background-color: #008ed0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

function CSTestDetail() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [testType, setTestType] = useState('normal');
  const [toggleStartBox, setToggleStartBox] = useState(false);
  const [toggleStart, setToggleStart] = useState(false);
  const [testStart, setTestStart] = useState(false);

  const [dummyData, setDummyData] = useState([
    {
      questionId: 1,
      content: '문제 1',
    },
    {
      questionId: 2,
      content: '문제 2',
    },
    {
      questionId: 3,
      content: '문제 3',
    },
    {
      questionId: 4,
      content: '문제 4',
    },
  ]);
  const testHeight = 100 + dummyData.length * 650;

  const handleStart = () => {
    setToggleStart(true);

    setTimeout(() => {
      setTestStart(true);
    }, 2000);
  };

  const handleActual = () => {
    setTestType('actual');
    setToggleStartBox(true);
  };
  const handleNormal = () => {
    setTestType('normal');
    setToggleStartBox(true);
  };

  return (
    <>
      {!testStart ? (
        <TestDetailWrapper>
          <TestDetailContent>
            <DetailBox>
              <Content>
                <p style={{ margin: '0' }}>
                  일반 모의고사와 실전 모의고사 중 원하시는 것을 선택해주세요.
                </p>
                <p style={{ color: '#7f898f', fontSize: '14px' }}>
                  (실전 모의고사는 시간 제한이 있으며, 시험 결과와 분석이
                  이루어집니다)
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginTop: '30px',
                  }}
                >
                  {testType === 'actual' ? (
                    <TypeButton
                      style={{
                        marginRight: '20px',
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                      onClick={handleActual}
                    >
                      실전 모의고사
                    </TypeButton>
                  ) : (
                    <TypeButton
                      style={{ marginRight: '20px' }}
                      onClick={handleActual}
                    >
                      실전 모의고사
                    </TypeButton>
                  )}
                  {testType === 'normal' ? (
                    <TypeButton
                      onClick={handleNormal}
                      style={{
                        marginRight: '20px',
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                    >
                      일반 모의고사
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleNormal}>
                      일반 모의고사
                    </TypeButton>
                  )}
                </div>
              </Content>
              {toggleStartBox ? (
                <>
                  {toggleStart ? (
                    <QuestionBox>
                      <div>문제를 선별 중입니다.</div>
                      <div>잠시만 기다려 주세요.</div>
                      <Progress />
                    </QuestionBox>
                  ) : (
                    <QuestionBox>
                      <TypeButton onClick={handleStart}>
                        모의고사 시작하기
                      </TypeButton>
                    </QuestionBox>
                  )}
                </>
              ) : (
                <></>
              )}
            </DetailBox>
          </TestDetailContent>
        </TestDetailWrapper>
      ) : (
        <TestDetailWrapper style={{ height: `${testHeight}px` }}>
          <TestDetailContent>
            <TestList>
              {dummyData.map(test => (
                // <div>{test.content}</div>
                <TestBox key={test.id}>{test.content}</TestBox>
              ))}
            </TestList>
            <SubmitButton
              style={{ top: `${testHeight - 40}px` }}
              onClick={() => navigate(`/CSTestResult/${testId}`)}
            >
              제출하기
            </SubmitButton>
          </TestDetailContent>
        </TestDetailWrapper>
      )}
    </>
  );
}

export default CSTestDetail;
