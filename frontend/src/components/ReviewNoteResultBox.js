/* eslint-disable */
import React, { useEffect, useState } from 'react';

// STYLED
import styled from 'styled-components';

const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 600;

  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
`;
const SubTitleBox = styled.div`
  font-size: 14px;
  color: #000;

  position: absolute;
  top: 110px;
  left: 50%;
  transform: translate(-50%);
`;

const Test = styled.div`
  height: 550px;
  width: 70%;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  // margin: 10px;

  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
`;
const Date = styled.div`
  width: 53px;
  height: 14px;
  font-size: 11px;
  font-weight: 600;
  color: red;

  position: absolute;
  top: 25px;
  left: 15px;
`;
const TestName = styled.div`
  width: 121px;
  height: 30px;
  font-size: 15px;
  font-weight: 500;
  text-align: center;

  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
`;
const ScoreBox = styled.div`
  width: 100px;
  height: 50px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 180px;
  left: 50%;
  transform: translate(-50%);
`;
const TestScore = styled.div`
  width: 100px;
  height: 30px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const ResultBox = styled.div`
  width: 40%;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ResultTitle = styled.div`
  width: 56px;
  height: 15px;
  font-size: 12px;
  font-weight: 600;
  color: #a4a4a4;
`;
const ResultScore = styled.li`
  // height: 18px;
  // width: 100%;
  // font-size: 14px;
  // color: #000;

  margin-bottom: 10px;

  display: flex;
  // align-items: center;
`;
const LogoImg = styled.img`
  width: 50px;
  height: 20px;

  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
`;

function ReviewNoteResultBox({ props }) {
  // console.log(props);
  const getSum = corrects => Object.values(corrects).reduce((a, b) => a + b);
  const getScore = data => {
    return Math.ceil((data.rightQuestions / data.totalQuestions) * 100);
  };

  const testInfo = {
    // data: props.examDone,
    // testName: id,
    rightQuestions: getSum(props.corrects),
    totalQuestions: getSum(props.totals),
    corrects: props.corrects,
    totals: props.totals,
  };
  // console.log(testInfo);
  // console.log(rightQuestions);

  return (
    <>
      <Test>
        {getScore(testInfo) > 90 ? (
          <>
            <TitleBox>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                🎉
              </div>{' '}
              <div>정말 열심히 공부하셨군요!</div>
            </TitleBox>
            <SubTitleBox>
              조금만 더 노력하면 완벽한 CS 마스터가 되실 것 같아요!
            </SubTitleBox>
          </>
        ) : (
          <>
            <TitleBox>
              {' '}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                🎉
              </div>
              <div>열심히 공부하셨군요!</div>
            </TitleBox>
            <SubTitleBox>C;SAFY가 여러분의 꿈을 응원합니다.</SubTitleBox>
          </>
        )}
        <Date>{testInfo.date}</Date>
        <ScoreBox>
          <div style={{ marginBottom: '10px' }}>결과</div>
          <TestScore>{getScore(testInfo)}점</TestScore>
          <div>
            ({testInfo.rightQuestions} / {testInfo.totalQuestions})
          </div>
        </ScoreBox>
        <ResultBox>
          <ResultTitle>과목별 결과</ResultTitle>

          <ul style={{ paddingLeft: '20px' }}>
            <ResultScore>
              {/* <div>네트워크</div> */}
              네트워크
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.네트워크 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.네트워크 /
                          testInfo.totals.네트워크) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.네트워크} / {testInfo.totals.네트워크})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              운영체제
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.운영체제 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.운영체제 /
                          testInfo.totals.운영체제) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.운영체제} / {testInfo.totals.운영체제})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              자료구조
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.자료구조 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.자료구조 /
                          testInfo.totals.자료구조) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.자료구조} / {testInfo.totals.자료구조})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              데이터베이스
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.데이터베이스 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.데이터베이스 /
                          testInfo.totals.데이터베이스) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.데이터베이스} /{' '}
                    {testInfo.totals.데이터베이스})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              컴퓨터 구조
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.컴퓨터구조 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.컴퓨터구조 /
                          testInfo.totals.컴퓨터구조) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.컴퓨터구조} /{' '}
                    {testInfo.totals.컴퓨터구조})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              기타
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.기타 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.기타 / testInfo.totals.기타) * 100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.기타} / {testInfo.totals.기타})
                  </span>
                )}
              </div>
            </ResultScore>
          </ul>
        </ResultBox>
        <LogoImg
          src="https://csafy-profile.s3.amazonaws.com/logo/logo_test.png"
          alt="CSAFY"
        />
      </Test>
    </>
  );
}

export default ReviewNoteResultBox;
