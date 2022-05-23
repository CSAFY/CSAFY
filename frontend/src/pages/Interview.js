/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

// RESPONSIVE
import { useMediaQuery } from 'react-responsive';

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
import swal from 'sweetalert2';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  return isMobile ? children : null;
};

const MobileWrapper = styled.div`
  background-image: url(/images/back-tmp.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StoreBox = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  width: 90vw;
`;

const InterviewDetailWrapper = styled.div`
  width: 100%;
  // height: 1100px;
  height: 100vh;
  // width: 100vw;
  // height: 100%

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  background-color: #f6f7fb;
`;
const InterviewDetailContent = styled.div`
  max-width: 1232px;
  min-width: 992px;
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
    transform: scale(1.05);
  }

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const OnlyButton = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 10px;
  &:hover {
    border-radius: 10px;
    background-color: #008ed0;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    color: #fff;
    transform: scale(1.1);
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  padding-top: 15px;
`;
const SwitchBox = styled.div`
  position: absolute;
  right: 0px;
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
  right: 0px;
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
  right: 0px;
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

  const handleAppStore = () => {
    swal.fire({
      icon: 'info',
      position: 'middle',
      title: 'Appstore 심사 중입니다.',
      // width: '80%',
      // height: '300px',

      // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
      // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    });
  };
  // '모바일 버전' 버튼
  const handleMobile = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.csafy.csafy_android',
      '_blank',
    );
  };
  return (
    <>
      <Desktop>
        <InterviewDetailWrapper>
          <InterviewDetailContent>
            {isLoggedIn ? (
              <>
                <ToolTip
                  src="images/talk.png"
                  alt="talk"
                  style={{
                    width: '231px',
                    height: '62px',
                  }}
                />
                <ToolTipInput>
                  스위치를 눌러 <br />
                  시간 제한 모드로 변경할 수 있어요.
                </ToolTipInput>

                <SwitchBox>
                  <MuiSwitch />
                </SwitchBox>

                {!toggleQuestionBox ? (
                  <>
                    <TypeBox>
                      {timeLimit ? (
                        <div
                          style={{
                            fontSize: '20px',
                            fontWeight: '600',
                          }}
                        >
                          어떤 질문 유형을 원하시나요? ⏱
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: '20px',
                            fontWeight: '600',
                          }}
                        >
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
                        <TypeButton onClick={handleAttClick}>
                          인성 면접
                        </TypeButton>
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
                        <TypeButton onClick={handleTechClick}>
                          기술 면접
                        </TypeButton>
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

                      <OnlyButton onClick={() => navigate('/interviewList')}>
                        면접 질문만 보고 싶어요
                      </OnlyButton>
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
                                  style={{
                                    marginRight: '15px',
                                  }}
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
          </InterviewDetailContent>
        </InterviewDetailWrapper>
      </Desktop>
      <Mobile>
        <MobileWrapper>
          <div
            style={{
              // height: '140px',
              width: '90vw',
              fontSize: '30px',
              fontWeight: 'bold',
              margin: '0 0 39px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 'auto' }}>막막한 CS 공부</p>
            <p style={{ margin: 'auto' }}>학습부터 면접까지 한 번에!</p>
          </div>

          <div
            style={{
              // height: '92px',
              // margin: '39px 128px 0 129px',
              // width: '80vw',
              fontSize: '16px',
              textAlign: 'center',

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p style={{ margin: 'auto' }}>개발자들의 필수 관문, CS 면접 준비</p>
            <p style={{ margin: 'auto' }}>
              어디서부터 어떻게 시작해야할 지 모르겠다면?
            </p>
            <br />
            <p style={{ margin: 'auto' }}>
              시험부터 면접까지{' '}
              <strong
                style={{
                  color: '#008ED0',
                  fontWeight: '800',
                }}
              >
                C;SAFY
              </strong>
              에서 준비했습니다.
            </p>
            <div style={{ marginTop: '3rem' }}>
              모바일 환경에 최적화된{' '}
              <strong
                style={{
                  color: '#008ED0',
                  fontWeight: '800',
                }}
              >
                앱
              </strong>
              을 통해 만나보세요!
            </div>
          </div>

          <StoreBox>
            <img
              src="images/app.png"
              alt="Appstore"
              style={{ width: '40%' }}
              onClick={handleAppStore}
            />
            <img
              src="images/play.png"
              alt="Playstore"
              style={{ width: '40%' }}
              onClick={handleMobile}
            />
          </StoreBox>
        </MobileWrapper>
      </Mobile>
    </>
  );
}

export default Interview;
