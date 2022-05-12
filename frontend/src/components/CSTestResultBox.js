import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 600;

  position: absolute;
  top: 94px;
  left: 50%;
  transform: translate(-50%);
`;
const SubTitleBox = styled.div`
  font-size: 14px;
  color: #000;

  position: absolute;
  top: 129px;
  left: 50%;
  transform: translate(-50%);
`;
const ResultBox = styled.div`
  height: 300px;
  width: 300px;

  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%);
`;
const ScoreBox = styled.div`
  height: 110px;
  width: 130px;

  position: absolute;

  left: 50%;
  transform: translate(-50%);
`;
const TimeBox = styled.div`
  height: 110px;
  width: 150px;

  position: absolute;
  top: 10px;
  right: 0;
`;
const Result = styled.div`
  height: 170px;
  width: 200px;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;
const Score = styled.div`
  font-size: 12px;
  position: absolute;
  top: 30px;
  right: 0;
`;
const ScoreList = styled.li``;

function CSTestResultBox({ state }) {
  const rightNum =
    state.right1 +
    state.right2 +
    state.right3 +
    state.right4 +
    state.right5 +
    state.right6;
  const totalNum =
    state.total1 +
    state.total2 +
    state.total3 +
    state.total4 +
    state.total5 +
    state.total6;

  const result = {
    testName: state.id,
    rightQuestions: rightNum,
    totalQuestions: totalNum,
    corrects: {
      네트워크: state.right1,
      운영체제: state.right2,
      자료구조: state.right3,
      기타: state.right4,
      데이터베이스: state.right5,
      컴퓨터구조: state.right6,
    },
    totals: {
      네트워크: state.total1,
      운영체제: state.total2,
      자료구조: state.total3,
      기타: state.total4,
      데이터베이스: state.total5,
      컴퓨터구조: state.total6,
    },
  };
  console.log(result);

  const getScore = data => {
    return Math.ceil((data.rightQuestions / data.totalQuestions) * 100);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {getScore(result) > 90 ? (
        <>
          <TitleBox>정말 열심히 공부하셨군요!</TitleBox>
          <SubTitleBox>
            조금만 더 노력하면 완벽한 CS 마스터가 되실 것 같아요!
          </SubTitleBox>
        </>
      ) : (
        <>
          <TitleBox>열심히 공부하셨군요!</TitleBox>
          <SubTitleBox>C;SAFY가 여러분의 꿈을 응원합니다.</SubTitleBox>
        </>
      )}

      <ResultBox>
        <ScoreBox>
          <div
            style={{
              fontSize: '14px',
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            결과
          </div>
          <div
            style={{
              fontSize: '24px',
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            {getScore(result)}점
          </div>
          <div
            style={{
              fontSize: '20px',
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            ({result.rightQuestions} / {result.totalQuestions})
          </div>
        </ScoreBox>

        <Result>
          <Score>
            {result.totals.네트워크 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil(
                  (result.corrects.네트워크 / result.totals.네트워크) * 100,
                )}
                %{' '}
              </span>
            )}
            ({result.corrects.네트워크} / {result.totals.네트워크})
          </Score>
          <Score style={{ top: '57px' }}>
            {result.totals.운영체제 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil(
                  (result.corrects.운영체제 / result.totals.운영체제) * 100,
                )}
                %{' '}
              </span>
            )}{' '}
            ({result.corrects.운영체제} / {result.totals.운영체제})
          </Score>
          <Score style={{ top: '84px' }}>
            {result.totals.자료구조 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil(
                  (result.corrects.자료구조 / result.totals.자료구조) * 100,
                )}
                %{' '}
              </span>
            )}
            ({result.corrects.자료구조} / {result.totals.자료구조})
          </Score>
          <Score style={{ top: '111px' }}>
            {result.totals.기타 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil((result.corrects.기타 / result.totals.기타) * 100)}%{' '}
              </span>
            )}{' '}
            ({result.corrects.기타} / {result.totals.기타})
          </Score>
          <Score style={{ top: '138px' }}>
            {result.totals.데이터베이스 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil(
                  (result.corrects.데이터베이스 / result.totals.데이터베이스) *
                    100,
                )}
                %{' '}
              </span>
            )}{' '}
            ({result.corrects.데이터베이스} / {result.totals.데이터베이스})
          </Score>
          <Score style={{ top: '165px' }}>
            {result.totals.컴퓨터구조 === 0 ? (
              <span>0% </span>
            ) : (
              <span>
                {Math.ceil(
                  (result.corrects.컴퓨터구조 / result.totals.컴퓨터구조) * 100,
                )}
                %{' '}
              </span>
            )}{' '}
            ({result.corrects.컴퓨터구조} / {result.totals.컴퓨터구조})
          </Score>
          <div
            style={{ fontSize: '12px', fontWeight: '600', color: '#a4a4a4' }}
          >
            과목별 결과
          </div>
          <ul
            style={{
              fontSize: '14px',
              fontWeight: '600',
              paddingLeft: '20px',
            }}
          >
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              네트워크
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              운영체제
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              자료구조
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              기타
            </li>
            <li
              style={{
                marginBottom: '10px',
              }}
            >
              데이터베이스
            </li>
            <li>컴퓨터구조</li>
          </ul>
        </Result>
      </ResultBox>
    </div>
  );
}

export default CSTestResultBox;
