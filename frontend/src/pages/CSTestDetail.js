/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { defaultAPI } from '../utils/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// RECOIL
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Token } from '../recoils/Token';
import { Count } from '../recoils/Count';
import {
  ChoiceArray,
  Right1Count,
  Right2Count,
  Right3Count,
  Right4Count,
  Right5Count,
  Right6Count,
  TestArray,
  ReviewNote,
} from '../recoils/TestData';

// COMPONENTS
import Progress from '../components/Progress';

// STYLED
import styled from 'styled-components';
import Choices from '../components/Choices';
import SpentTime from './SpentTime';
// import Temp from '../components/Temp';
// import swal from 'sweetalert2';

const TestDetailWrapper = styled.div`
  width: 100%;
  // height: 1200px;
  height: 100vh;

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
const QuestionBox = styled.div`
  width: 543px;
  height: 180px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // position: absolute;
  // top: 249px;
  // left: 50%;
  // transform: translate(-50%);
`;
const TestList = styled.div`
  width: 70%;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
`;

const SubmitButton = styled.div`
  width: 305px;
  height: 56px;
  border-radius: 77px;
  font-size: 18px;
  font-weight: 600;
  // background-color: #008ed0;
  // color: #fff;
  background-color: #fff;
  color: #000;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);

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

  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const TimerBox = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
`;

function CSTestDetail() {
  const navigate = useNavigate();
  const { testTitle } = useParams();
  const { state } = useLocation();
  // Recoil
  const token = useRecoilValue(Token);
  const setCount = useSetRecoilState(Count);
  const setChoiceArray = useSetRecoilState(ChoiceArray);
  const [testArray, setTestArray] = useRecoilState(TestArray);
  const [reviewNote, setReviewNote] = useRecoilState(ReviewNote);
  const [right1Count, setRight1Count] = useRecoilState(Right1Count);
  const [right2Count, setRight2Count] = useRecoilState(Right2Count);
  const [right3Count, setRight3Count] = useRecoilState(Right3Count);
  const [right4Count, setRight4Count] = useRecoilState(Right4Count);
  const [right5Count, setRight5Count] = useRecoilState(Right5Count);
  const [right6Count, setRight6Count] = useRecoilState(Right6Count);
  // 초기화
  useEffect(() => {
    setChoiceArray({
      0: 9,
      1: 9,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 9,
      8: 9,
      9: 9,
      10: 9,
      11: 9,
    });
    setTestArray([]);
    setReviewNote([]);
    setCount(0);
    setRight1Count(0);
    setRight2Count(0);
    setRight3Count(0);
    setRight4Count(0);
    setRight5Count(0);
    setRight6Count(0);
  }, []);
  // 모의고사 시작 여부 - true면 시작
  const [testStart, setTestStart] = useState(false);
  // 모의고사 종류 - 실전 / 일반
  const [testType, setTestType] = useState('');
  // '모의고사 시작하기' 버튼 보이기 여부
  const [toggleStartBox, setToggleStartBox] = useState(false);
  // 시험으로 넘어가기 위한 progress바 보이기 여부
  const [toggleStart, setToggleStart] = useState(false);
  // 모의고사 문제
  const [testData, setTestData] = useState([]);
  // 결과 데이터 db로 보내기
  const [getResult, setGetResult] = useState(false);

  // console.log(testArray);
  // '제출하기' 버튼 클릭
  const checkAnswers = () => {
    for (var i = 0; i < testData.length; i++) {
      // 정답 비교
      if (testArray[i].choice === testData[i].answer) {
        if (testArray[i].category === '네트워크') {
          setRight1Count(prev => prev + 1);
        } else if (testArray[i].category === '운영체제') {
          setRight2Count(prev => prev + 1);
        } else if (testArray[i].category === '자료구조') {
          setRight3Count(prev => prev + 1);
        } else if (testArray[i].category === '기타') {
          setRight4Count(prev => prev + 1);
        } else if (testArray[i].category === '데이터베이스') {
          setRight5Count(prev => prev + 1);
        } else {
          setRight6Count(prev => prev + 1);
        }
      } else {
        // 오답노트
        setReviewNote(prev => [...prev, testData[i]]);
      }
    }
    setGetResult(true);
  };

  // 모의고사 문제 가져오기 - 12개
  const getTestData = () => {
    if (testTitle === '입문자를 위한 문제') {
      // console.log('입문자');
      axios
        .get(`${defaultAPI}/cs-service/fixed/mock`, {
          params: {
            examNum: 1,
          },
        })
        .then(res => {
          // console.log(res);
          setTestData(res.data);
        })
        .catch(err => console.error(err));
    } else if (testTitle === '중급자를 위한 문제') {
      // console.log('중급자');
      axios
        .get(`${defaultAPI}/cs-service/fixed/mock`, {
          params: {
            examNum: 2,
          },
        })
        .then(res => {
          // console.log(res);
          setTestData(res.data);
        })
        .catch(err => console.error(err));
    } else {
      axios
        .get(`${defaultAPI}/cs-service/test/mock`, {
          params: {
            category: testTitle,
            questionNum: 12,
          },
        })
        .then(res => {
          // console.log(res);
          setTestData(res.data);
        })
        .catch(err => console.error(err));
    }
  };

  // '모의고사 시작하기' 버튼 클릭
  const handleStart = () => {
    getTestData();
    setToggleStart(true);

    setTimeout(() => {
      setTestStart(true);
    }, 2000);
  };
  // console.log(testData);

  // '실전 모의고사' 버튼 클릭
  const handleActual = () => {
    setTestType('actual');
    setToggleStartBox(true);
  };
  // '일반 모의고사' 버튼 클릭
  const handleNormal = () => {
    setTestType('normal');
    setToggleStartBox(true);
  };
  const [testResultInfo, setTestResultInfo] = useState({
    id: '',
    right1: 0,
    right2: 0,
    right3: 0,
    right4: 0,
    right5: 0,
    right6: 0,
    total1: 0,
    total2: 0,
    total3: 0,
    total4: 0,
    total5: 0,
    total6: 0,
  });

  // 초기값 설정
  useEffect(() => {
    if (state === 1) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right1: right1Count,
        total1: 12,
      });
    } else if (state === 2) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right2: right2Count,
        total2: 12,
      });
    } else if (state === 3) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right3: right3Count,
        total3: 12,
      });
    } else if (state === 4) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right4: right4Count,
        total4: 12,
      });
    } else if (state === 5) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right5: right5Count,
        total5: 12,
      });
    } else if (state === 6) {
      setTestResultInfo({
        ...testResultInfo,
        id: testTitle,
        right6: right6Count,
        total6: 12,
      });
    } else {
      setTestResultInfo({
        id: testTitle,
        right1: right1Count,
        right2: right2Count,
        right3: right3Count,
        right4: right4Count,
        right5: right5Count,
        right6: right6Count,
        total1: 2,
        total2: 2,
        total3: 2,
        total4: 2,
        total5: 2,
        total6: 2,
      });
    }
  }, [getResult]);

  // 히트맵 카운트 1 추가
  const sendHeatmapData = () => {
    axios
      .post(`${defaultAPI}/cs-service/profile/heatmap`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        navigate(`/CSTestResult/${testTitle}`, {
          state: testResultInfo,
        });
      })
      .catch(err => console.error(err));
  };
  // 오답노트 보내기
  const sendReviewData = () => {
    // console.log('🐸', reviewNote);
    axios
      .post(
        `${defaultAPI}/cs-service/study/problem/wrong`,
        { requestWrongProblems: reviewNote },
        { headers: { Authorization: token } },
        // reviewNote,
        // {
        //   headers: { Authorization: token },
        // },
      )
      .then(res => {
        console.log('🐸', res);
        // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
      })
      .catch(err => console.error(err));
  };
  // '결과 확인하기' 버튼 클릭
  const handleSubmit = () => {
    axios
      .post(`${defaultAPI}/cs-service/test/result`, testResultInfo, {
        headers: { authorization: token },
      })
      .then(res => {
        // console.log(res);
        sendReviewData();
        sendHeatmapData();
      })
      .catch(err => console.error(err));
    // }
  };

  // const getFixedTest = () => {
  //   axios
  //     .get(`${defaultAPI}/cs-service/fixed/mock`, {
  //       params: { examNum: 1 },
  //     })
  //     .then(res => {
  //       console.log('🎃', res);
  //       // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
  //     })
  //     .catch(err => console.error(err));
  // };
  // const getReviewData = () => {
  //   axios
  //     .get(`${defaultAPI}/cs-service/study/problem/wrong`, {
  //       headers: { Authorization: token },
  //     })
  //     .then(res => {
  //       console.log('🎃', res);
  //       // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
  //     })
  //     .catch(err => console.error(err));
  // };

  // // console.log(testData, testArray);
  // console.log(testData, testArray, testResultInfo);
  // 초기에 카테고리값 넣어두기
  useEffect(() => {
    for (var i = 0; i < testData.length; i++) {
      setTestArray(prev => [
        ...prev,
        {
          id: i,
          choice: 9,
          category: testData[i].category,
        },
      ]);
    }
  }, [testData]);

  // 타이머 모드 - 종료 시간 일단 3초
  const endTime = 3;

  const testHeight = 550 + testData.length * 550;

  return (
    <>
      {!testStart ? (
        <TestDetailWrapper>
          <TestDetailContent>
            <DetailBox>
              {!toggleStartBox && (
                <>
                  <Content>
                    <p style={{ margin: '0' }}>
                      <span style={{ marginRight: '10px' }}>✅</span>
                      일반 모의고사와 실전 모의고사 중 원하시는 것을
                      선택해주세요.
                    </p>
                    <p
                      style={{
                        color: '#7f898f',
                        fontSize: '14px',
                      }}
                    >
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
                          style={{
                            marginRight: '20px',
                          }}
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
                </>
              )}

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
        <>
          {testType === 'actual' ? (
            <TestDetailWrapper style={{ height: `${testHeight}px` }}>
              <TestDetailContent>
                <TimerBox>
                  <SpentTime
                    mm={'00'}
                    ss={`${endTime}`}
                    message={'모의고사가 종료되었습니다.'}
                  />
                </TimerBox>
                <TestList>
                  {testData.map((test, idx) => (
                    <Choices key={idx} test={test} idx={idx} />
                  ))}
                  {!getResult && (
                    <SubmitButton
                      style={{ marginTop: '40px' }}
                      // onClick={handleSubmit}
                      onClick={checkAnswers}
                      // onClick={() => navigate(`/CSTestResult/${testTitle}`)}
                    >
                      제출하기
                    </SubmitButton>
                  )}

                  {getResult && (
                    <SubmitButton
                      style={{ marginTop: '40px' }}
                      onClick={handleSubmit}
                    >
                      결과 확인하기
                    </SubmitButton>
                  )}
                </TestList>
              </TestDetailContent>
            </TestDetailWrapper>
          ) : (
            <TestDetailWrapper style={{ height: `${testHeight}px` }}>
              <TestDetailContent>
                <TestList>
                  {testData.map((test, idx) => (
                    <Choices key={idx} test={test} idx={idx} />
                  ))}

                  {!getResult && (
                    <SubmitButton
                      style={{ marginTop: '40px' }}
                      // onClick={handleSubmit}
                      onClick={checkAnswers}
                      // onClick={() => navigate(`/CSTestResult/${testTitle}`)}
                    >
                      제출하기
                    </SubmitButton>
                  )}
                  {getResult && (
                    <SubmitButton
                      style={{ marginTop: `40px` }}
                      onClick={handleSubmit}
                    >
                      결과 확인하기
                    </SubmitButton>
                  )}
                </TestList>
              </TestDetailContent>
            </TestDetailWrapper>
          )}
        </>
      )}
      {/* <button onClick={sendReviewData}>test</button>
      <button onClick={getFixedTest}>fixedtest</button>
      <button onClick={getReviewData}>getreview</button> */}
    </>
  );
}

export default React.memo(CSTestDetail);
