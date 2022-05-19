/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { TimeLimit } from '../recoils/TimeLimit';

// COMPONENT
import Progress from '../components/Progress';
import NeedLogin from './handler/NeedLogin';

// STYLED
import styled from 'styled-components';
import MuiSwitch from '../components/MuiSwitch';

const InterviewDetailWrapper = styled.div`
  width: 100%;
  // height: 1100px;
  height: 100vh;
  // width: 100vw;
  // height: 100%

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

  &:hover {
    background-color: #008ed0;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    color: #fff;
    // transform: scale(1.05);
  }

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
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
const ToolTip = styled.img`
  width: 231px;
  height: 62px;
  // border-radius: 34px;
  // background-color: #d7e4ec;
  // font-size: 14px;
  // font-weight: 600;

  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;

  position: absolute;
  right: 0;
  top: 70px;
`;
const ToolTipInput = styled.div`
  width: 231px;
  height: 62px;
  font-size: 14px;
  // font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  top: 68px;
`;

function Interview() {
  const navigate = useNavigate();
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const timeLimit = useRecoilValue(TimeLimit);

  // API
  const [interviewCat, setInterviewCat] = useState('');
  const [questionNum, setQuestionNum] = useState('');
  // console.log(interviewCat, questionNum);
  const getTestData = () => {
    axios
      .post(
        `${defaultAPI}/cs-service/interview/create`,
        {
          category: interviewCat,
          question: questionNum,
        },
        { headers: { Authorization: token } },
      )
      .then(res => {
        setTimeout(() => {
          navigate('/InterviewTest', { state: res.data });
        }, 2000);
      })
      .catch(err => console.error(err));
  };

  // 면접 시작
  const [toggleStart, setToggleStart] = useState(false);
  const handleStart = () => {
    setToggleStart(true);
    getTestData();
  };
  const handleAttClick = () => {
    setToggleQuestionBox(true);
    // 인성
    setInterviewCat('character');
  };
  const handleTechClick = () => {
    setToggleQuestionBox(true);
    setInterviewCat('tech');
  };
  const handleRandomClick = () => {
    setToggleQuestionBox(true);
    setInterviewCat('all');
  };
  const handleQuestionCount = () => {
    setToggleStartBox(true);
    setQuestionNum('3');
  };
  const handleRandomCount = () => {
    // 1~5 사이 랜덤
    const randomNum = Math.floor(Math.random() * 5 + 1);
    setToggleStartBox(true);
    if (randomNum !== 3) {
      setQuestionNum(`${randomNum}`);
    } else {
      setQuestionNum('6');
    }
  };
  const [toggleQuestionBox, setToggleQuestionBox] = useState(false);
  const [toggleStartBox, setToggleStartBox] = useState(false);

  // console.log(toggleQuestionBox, toggleStart);
  // console.log(questionNum);
  return (
    <InterviewDetailWrapper>
      <InterviewDetailContent>
        {isLoggedIn ? (
          <>
            <div>
              <ToolTip
                src="images/talk.png"
                alt="talk"
                style={{ width: '231px', height: '62px' }}
              />
              <ToolTipInput>
                스위치를 눌러 <br />
                시간 제한 모드로 변경할 수 있어요.
              </ToolTipInput>
            </div>
            <SwitchBox>
              <MuiSwitch />
            </SwitchBox>

            {!toggleQuestionBox ? (
              <>
                <TypeBox>
                  {timeLimit ? (
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>
                      어떤 질문 유형을 원하시나요? ⏱
                    </div>
                  ) : (
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>
                      어떤 질문 유형을 원하시나요?
                    </div>
                  )}

                  {interviewCat === 'character' ? (
                    <TypeButton
                      onClick={handleAttClick}
                      style={{
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                    >
                      인성 면접
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleAttClick}>인성 면접</TypeButton>
                  )}

                  {interviewCat === 'tech' ? (
                    <TypeButton
                      onClick={handleTechClick}
                      style={{
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                    >
                      기술 면접
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleTechClick}>기술 면접</TypeButton>
                  )}

                  {interviewCat === 'all' ? (
                    <TypeButton
                      style={{
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                      onClick={handleRandomClick}
                    >
                      알아서 해주세요
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleRandomClick}>
                      알아서 해주세요
                    </TypeButton>
                  )}

                  <div
                    onClick={() => navigate('/interviewList')}
                    style={{
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '300',
                      marginBottom: '12px',
                    }}
                  >
                    면접 질문만 보고 싶어요
                  </div>
                </TypeBox>
              </>
            ) : (
              <>
                {!toggleStart ? (
                  <>
                    <TypeBox style={{ height: '230px' }}>
                      <div
                        style={{
                          fontWeight: '600',

                          position: 'absolute',
                          top: '50px',
                          left: '50%',
                          transform: 'translate(-50%)',
                        }}
                      >
                        몇 가지 면접 질문을 원하시나요?
                      </div>
                      <ButtonBox
                        style={{
                          position: 'absolute',
                          top: '100px',
                          left: '50%',
                          transform: 'translate(-50%)',
                        }}
                      >
                        {questionNum === '3' ? (
                          <>
                            <TypeButton
                              style={{
                                marginRight: '15px',
                                backgroundColor: '#008ed0',
                                color: '#fff',
                              }}
                              onClick={handleQuestionCount}
                            >
                              3개요!
                            </TypeButton>
                          </>
                        ) : (
                          <>
                            <TypeButton
                              style={{ marginRight: '15px' }}
                              onClick={handleQuestionCount}
                            >
                              3개요!
                            </TypeButton>
                          </>
                        )}
                        {questionNum !== '3' && questionNum !== '' ? (
                          <>
                            <TypeButton
                              style={{
                                backgroundColor: '#008ed0',
                                color: '#fff',
                              }}
                              onClick={handleRandomCount}
                            >
                              알아서 해주세요
                            </TypeButton>
                          </>
                        ) : (
                          <>
                            <TypeButton onClick={handleRandomCount}>
                              알아서 해주세요
                            </TypeButton>
                          </>
                        )}
                      </ButtonBox>
                    </TypeBox>
                    {toggleStartBox && (
                      <TypeButton
                        style={{
                          position: 'absolute',
                          top: '400px',
                          left: '50%',
                          transform: 'translate(-50%)',
                        }}
                        onClick={handleStart}
                      >
                        면접 시작하기
                      </TypeButton>
                    )}
                  </>
                ) : (
                  <>
                    <TypeBox style={{ height: '230px' }}>
                      <div>문제를 선별 중입니다.</div>
                      <div>잠시만 기다려 주세요.</div>
                      <Progress />
                    </TypeBox>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <NeedLogin />
          </>
        )}

        {/* {isLoggedIn ? (
          <>
            <div>
              <ToolTip
                src="images/talk.png"
                alt="talk"
                style={{ width: '231px', height: '62px' }}
              />
              <ToolTipInput>
                스위치를 눌러 <br />
                시간 제한 모드로 변경할 수 있어요.
              </ToolTipInput>
            </div>
            <SwitchBox>
              <MuiSwitch />
            </SwitchBox>
            {!toggleQuestionBox && (
              <TypeBox>
                <div>어떤 질문 유형을 원하시나요?</div>
                {interviewCat === 'character' ? (
                  <TypeButton
                    onClick={handleAttClick}
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                  >
                    인성 면접
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleAttClick}>인성 면접</TypeButton>
                )}

                {interviewCat === 'tech' ? (
                  <TypeButton
                    onClick={handleTechClick}
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                  >
                    기술 면접
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleTechClick}>기술 면접</TypeButton>
                )}

                {interviewCat === 'all' ? (
                  <TypeButton
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                    onClick={handleRandomClick}
                  >
                    알아서 해주세요
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleRandomClick}>
                    알아서 해주세요
                  </TypeButton>
                )}

                <div
                  onClick={() => navigate('/interviewList')}
                  style={{
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '300',
                  }}
                >
                  면접 질문만 보고 싶어요
                </div>
              </TypeBox>
            )}

            {toggleQuestionBox && !toggleStart ? (
              <TypeBox style={{ display: 'block', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50px',
                    left: '50%',
                    transform: 'translate(-50%)',
                  }}
                >
                  몇 가지 면접 질문을 원하시나요?
                </div>
                <ButtonBox
                  style={{
                    position: 'absolute',
                    top: '100px',
                    left: '50%',
                    transform: 'translate(-50%)',
                  }}
                >
                  {questionNum === '3' ? (
                    <>
                      <TypeButton
                        style={{
                          marginRight: '15px',
                          backgroundColor: '#008ed0',
                          color: '#fff',
                        }}
                        onClick={handleQuestionCount}
                      >
                        3개요!
                      </TypeButton>
                    </>
                  ) : (
                    <>
                      <TypeButton
                        style={{ marginRight: '15px' }}
                        onClick={handleQuestionCount}
                      >
                        3개요!
                      </TypeButton>
                    </>
                  )}
                  {questionNum !== '3' && questionNum !== '' ? (
                    <>
                      <TypeButton
                        style={{
                          backgroundColor: '#008ed0',
                          color: '#fff',
                        }}
                        onClick={handleRandomCount}
                      >
                        알아서 해주세요
                      </TypeButton>
                    </>
                  ) : (
                    <>
                      <TypeButton onClick={handleRandomCount}>
                        알아서 해주세요
                      </TypeButton>
                    </>
                  )}
                </ButtonBox>
                {toggleStartBox && (
                  <TypeButton
                    style={{
                      position: 'absolute',
                      bottom: '50px',
                      left: '50%',
                      transform: 'translate(-50%)',
                    }}
                    onClick={handleStart}
                  >
                    면접 시작하기
                  </TypeButton>
                )}
              </TypeBox>
            ) : (
              <>
                {toggleStart && (
                  <TypeBox>
                    <div>문제를 선별 중입니다.</div>
                    <div>잠시만 기다려 주세요.</div>
                    <Progress />
                  </TypeBox>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <NeedLogin />
          </>
        )} */}
      </InterviewDetailContent>
    </InterviewDetailWrapper>
  );
}

export default Interview;
