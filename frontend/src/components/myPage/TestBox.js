import React, { useEffect, useState } from 'react';

// STYLED
import styled from 'styled-components';

const Test = styled.div`
  width: 285px;
  height: 400px;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px;

  position: relative;
`;
const Date = styled.div`
  width: 60px;
  height: 14px;
  font-size: 11px;
  font-weight: 600;
  color: #000;

  position: absolute;
  top: 15px;
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
  top: 80px;
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
  width: 80%;
  position: absolute;
  bottom: 40px;
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

  margin-bottom: 5px;

  display: flex;
  // align-items: center;
`;
const LogoImg = styled.img`
  width: 28px;
  height: 14px;

  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
`;

function TestBox({ examDone, id, corrects, totals }) {
  const getSum = corrects => Object.values(corrects).reduce((a, b) => a + b);
  // 점수
  const score = Math.ceil((getSum(corrects) / getSum(totals)) * 100);

  return (
    <>
      <Test>
        <Date>{examDone}</Date>
        {id === 'all' ? (
          <TestName>전 과목</TestName>
        ) : (
          <TestName>{id}</TestName>
        )}

        <ScoreBox>
          {/* <TestScore>{getScore(testInfo)}점</TestScore> */}
          <TestScore>{score}점</TestScore>
          <div>
            ({getSum(corrects)} / {getSum(totals)})
          </div>
        </ScoreBox>
        <ResultBox>
          <ResultTitle>과목별 결과</ResultTitle>
          {/* <ul>
            <li>네트워크</li>
          </ul> */}
          <ul style={{ paddingLeft: '20px' }}>
            <ResultScore>
              {/* <div>네트워크</div> */}
              네트워크
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.네트워크 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil((corrects.네트워크 / totals.네트워크) * 100)}%
                    </span>{' '}
                    ({corrects.네트워크} / {totals.네트워크})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              운영체제
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.운영체제 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil((corrects.운영체제 / totals.운영체제) * 100)}%
                    </span>{' '}
                    ({corrects.운영체제} / {totals.운영체제})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              자료구조
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.자료구조 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil((corrects.자료구조 / totals.자료구조) * 100)}%
                    </span>{' '}
                    ({corrects.자료구조} / {totals.자료구조})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              데이터베이스
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.데이터베이스 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (corrects.데이터베이스 / totals.데이터베이스) * 100,
                      )}
                      %
                    </span>{' '}
                    ({corrects.데이터베이스} / {totals.데이터베이스})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              컴퓨터 구조
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.컴퓨터구조 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (corrects.컴퓨터구조 / totals.컴퓨터구조) * 100,
                      )}
                      %
                    </span>{' '}
                    ({corrects.컴퓨터구조} / {totals.컴퓨터구조})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              기타
              <div style={{ position: 'absolute', right: '10px' }}>
                {totals.기타 === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil((corrects.기타 / totals.기타) * 100)}%
                    </span>{' '}
                    ({corrects.기타} / {totals.기타})
                  </span>
                )}
              </div>
            </ResultScore>
          </ul>
        </ResultBox>
        <LogoImg src="images/csafy.png" alt="CSAFY" />
      </Test>
    </>
  );
}

export default TestBox;
