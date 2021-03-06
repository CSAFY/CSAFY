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

  // ?????? ??????
  const [toggleStart, setToggleStart] = useState(false);
  const handleStart = () => {
    setToggleStart(true);
    getTestData();
  };
  const handleAttClick = () => {
    setToggleQuestionBox(true);
    // ??????
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
    // 1~5 ?????? ??????
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
                ???????????? ?????? <br />
                ?????? ?????? ????????? ????????? ??? ?????????.
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
                      ?????? ?????? ????????? ???????????????? ???
                    </div>
                  ) : (
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>
                      ?????? ?????? ????????? ????????????????
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
                      ?????? ??????
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleAttClick}>?????? ??????</TypeButton>
                  )}

                  {interviewCat === 'tech' ? (
                    <TypeButton
                      onClick={handleTechClick}
                      style={{
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                    >
                      ?????? ??????
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleTechClick}>?????? ??????</TypeButton>
                  )}

                  {interviewCat === 'all' ? (
                    <TypeButton
                      style={{
                        backgroundColor: '#008ed0',
                        color: '#fff',
                      }}
                      onClick={handleRandomClick}
                    >
                      ????????? ????????????
                    </TypeButton>
                  ) : (
                    <TypeButton onClick={handleRandomClick}>
                      ????????? ????????????
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
                    ?????? ????????? ?????? ?????????
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
                        ??? ?????? ?????? ????????? ????????????????
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
                              3??????!
                            </TypeButton>
                          </>
                        ) : (
                          <>
                            <TypeButton
                              style={{ marginRight: '15px' }}
                              onClick={handleQuestionCount}
                            >
                              3??????!
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
                              ????????? ????????????
                            </TypeButton>
                          </>
                        ) : (
                          <>
                            <TypeButton onClick={handleRandomCount}>
                              ????????? ????????????
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
                        ?????? ????????????
                      </TypeButton>
                    )}
                  </>
                ) : (
                  <>
                    <TypeBox style={{ height: '230px' }}>
                      <div>????????? ?????? ????????????.</div>
                      <div>????????? ????????? ?????????.</div>
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
                ???????????? ?????? <br />
                ?????? ?????? ????????? ????????? ??? ?????????.
              </ToolTipInput>
            </div>
            <SwitchBox>
              <MuiSwitch />
            </SwitchBox>
            {!toggleQuestionBox && (
              <TypeBox>
                <div>?????? ?????? ????????? ????????????????</div>
                {interviewCat === 'character' ? (
                  <TypeButton
                    onClick={handleAttClick}
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                  >
                    ?????? ??????
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleAttClick}>?????? ??????</TypeButton>
                )}

                {interviewCat === 'tech' ? (
                  <TypeButton
                    onClick={handleTechClick}
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                  >
                    ?????? ??????
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleTechClick}>?????? ??????</TypeButton>
                )}

                {interviewCat === 'all' ? (
                  <TypeButton
                    style={{
                      backgroundColor: '#008ed0',
                      color: '#fff',
                    }}
                    onClick={handleRandomClick}
                  >
                    ????????? ????????????
                  </TypeButton>
                ) : (
                  <TypeButton onClick={handleRandomClick}>
                    ????????? ????????????
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
                  ?????? ????????? ?????? ?????????
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
                  ??? ?????? ?????? ????????? ????????????????
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
                        3??????!
                      </TypeButton>
                    </>
                  ) : (
                    <>
                      <TypeButton
                        style={{ marginRight: '15px' }}
                        onClick={handleQuestionCount}
                      >
                        3??????!
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
                        ????????? ????????????
                      </TypeButton>
                    </>
                  ) : (
                    <>
                      <TypeButton onClick={handleRandomCount}>
                        ????????? ????????????
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
                    ?????? ????????????
                  </TypeButton>
                )}
              </TypeBox>
            ) : (
              <>
                {toggleStart && (
                  <TypeBox>
                    <div>????????? ?????? ????????????.</div>
                    <div>????????? ????????? ?????????.</div>
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
