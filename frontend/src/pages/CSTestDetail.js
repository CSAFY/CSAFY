import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Progress from '../components/Progress';
import swal from 'sweetalert2';

// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
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

// STYLED
import styled from 'styled-components';
import Choices from '../components/Choices';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
import SpentTime from './SpentTime';
import Temp from '../components/Temp';

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

const TimerBox = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
`;

function CSTestDetail() {
  const navigate = useNavigate();
  // Recoil
  const [token, setToken] = useRecoilState(Token);
  const [count, setCount] = useRecoilState(Count);
  const [choiceArray, setChoiceArray] = useRecoilState(ChoiceArray);
  const [testArray, setTestArray] = useRecoilState(TestArray);
  const [reviewNote, setReviewNote] = useRecoilState(ReviewNote);
  const [right1Count, setRight1Count] = useRecoilState(Right1Count);
  const [right2Count, setRight2Count] = useRecoilState(Right2Count);
  const [right3Count, setRight3Count] = useRecoilState(Right3Count);
  const [right4Count, setRight4Count] = useRecoilState(Right4Count);
  const [right5Count, setRight5Count] = useRecoilState(Right5Count);
  const [right6Count, setRight6Count] = useRecoilState(Right6Count);
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

  console.log(testArray);
  const checkAnswers = () => {
    // 체크 안한부분이 남아있으면 alert
    // if (!isChecked) {
    //   alert('문제를 모두 풀어주세요.');
    // } else {
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
        // console.log(testData[i]);
        // 오답노트
        setReviewNote(prev => [...prev, testData[i]]);
      }
    }
    setGetResult(true);
  };
  console.log(reviewNote);
  const { testTitle } = useParams();
  const { state } = useLocation();

  const [testType, setTestType] = useState('');
  const [toggleStartBox, setToggleStartBox] = useState(false);
  const [toggleStart, setToggleStart] = useState(false);
  const [testStart, setTestStart] = useState(false);

  // console.log(testTitle);
  const [testData, setTestData] = useState([]);
  const getTestData = () => {
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
  };
  // console.log('testData', testData);

  const handleStart = () => {
    getTestData();
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
  const [getResult, setGetResult] = useState(false);
  // const calculateResult = () => {
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

  const handleSubmit = () => {
    // if (testTitle === 'all') {
    //   axios
    //     .post(`${defaultAPI}/cs-service/test/result`, testResultInfo, {
    //       headers: { authorization: token },
    //     })
    //     .then(res => {
    //       // console.log(res);
    //       sendHeatmapData();
    //       // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
    //     })
    //     .catch(err => console.error(err));
    // } else {
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
  const sendHeatmapData = () => {
    axios
      .post(`${defaultAPI}/cs-service/profile/heatmap`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
      })
      .catch(err => console.error(err));
  };

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
  const getFixedTest = () => {
    axios
      .get(`${defaultAPI}/cs-service/fixed/mock`, { params: { examNum: 1 } })
      .then(res => {
        console.log('🎃', res);
        // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
      })
      .catch(err => console.error(err));
  };
  const getReviewData = () => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/wrong`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🎃', res);
        // navigate(`/CSTestResult/${testTitle}`, { state: testResultInfo });
      })
      .catch(err => console.error(err));
  };

  // console.log(testData, testArray);
  console.log(testArray, testResultInfo);
  // 초기에 카테고리값 넣어두기
  useEffect(() => {
    for (var i = 0; i < testData.length; i++) {
      setTestArray(prev => [
        ...prev,
        { id: i, choice: 9, category: testData[i].category },
      ]);
    }
  }, [testData]);

  // 타이머 모드 - 종료 시간 일단 3초
  const endTime = 3;
  const testHeight = 250 + testData.length * 550;

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
                  {/* {dummyData.map((test, idx) => (
                // <div>{test.content}</div>
                // <TestBox key={test.id}>{test.content}</TestBox>
                <Choices key={idx} test={test} />
              ))} */}
                </TestList>
                <SubmitButton
                  style={{ top: `${testHeight - 40}px` }}
                  // onClick={handleSubmit}
                  onClick={checkAnswers}
                  // onClick={() => navigate(`/CSTestResult/${testTitle}`)}
                >
                  제출하기
                </SubmitButton>
                {getResult && (
                  <SubmitButton
                    style={{ top: `${testHeight + 20}px` }}
                    onClick={handleSubmit}
                  >
                    결과 확인하기
                  </SubmitButton>
                )}
              </TestDetailContent>
            </TestDetailWrapper>
          ) : (
            <TestDetailWrapper style={{ height: `${testHeight}px` }}>
              <TestDetailContent>
                <TestList>
                  {testData.map((test, idx) => (
                    <Choices key={idx} test={test} idx={idx} />
                    // <Temp key={idx} test={test} idx={idx} />
                  ))}
                  {/* {dummyData.map((test, idx) => (
                // <div>{test.content}</div>
                // <TestBox key={test.id}>{test.content}</TestBox>
                <Choices key={idx} test={test} />
              ))} */}
                  <SubmitButton
                    style={{ marginTop: '40px' }}
                    // style={{ top: `${testHeight - 80}px` }}
                    // onClick={handleSubmit}
                    onClick={checkAnswers}
                    // onClick={() => navigate(`/CSTestResult/${testTitle}`)}
                  >
                    제출하기
                  </SubmitButton>
                  {getResult && (
                    <SubmitButton
                      style={{ marginTop: `120px` }}
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
