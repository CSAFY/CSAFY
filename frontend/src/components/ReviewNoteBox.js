/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';

const Test = styled.div`
  width: 285px;
  height: 400px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.12);
  margin: 10px;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    transform: scale(1.05);
  }

  cursor: pointer;

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

function ReviewNoteBox({ examDone, id, corrects, totals, round }) {
  // console.log(examDone);
  const navigate = useNavigate();
  const getSum = corrects => Object.values(corrects).reduce((a, b) => a + b);
  const getScore = data => {
    return Math.ceil((data.rightQuestions / data.totalQuestions) * 100);
  };

  const testInfo = {
    testName: id,
    rightQuestions: getSum(corrects),
    totalQuestions: getSum(totals),
    corrects,
    totals,
  };

  return (
    <>
      <Test onClick={() => navigate(`/reviewNote/${round}`)}>
        <Date>{examDone}</Date>
        {testInfo.testName === 'all' ? (
          <TestName>??? ??????</TestName>
        ) : (
          <TestName>{testInfo.testName}</TestName>
        )}

        <ScoreBox>
          <TestScore>{getScore(testInfo)}???</TestScore>
          <div>
            ({testInfo.rightQuestions} / {testInfo.totalQuestions})
          </div>
        </ScoreBox>
        <ResultBox>
          <ResultTitle>????????? ??????</ResultTitle>
          {/* <ul>
            <li>????????????</li>
          </ul> */}
          <ul style={{ paddingLeft: '20px' }}>
            <ResultScore>
              {/* <div>????????????</div> */}
              ????????????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.???????????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.???????????? /
                          testInfo.totals.????????????) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.????????????} / {testInfo.totals.????????????})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              ????????????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.???????????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.???????????? /
                          testInfo.totals.????????????) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.????????????} / {testInfo.totals.????????????})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              ????????????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.???????????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.???????????? /
                          testInfo.totals.????????????) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.????????????} / {testInfo.totals.????????????})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              ??????????????????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.?????????????????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.?????????????????? /
                          testInfo.totals.??????????????????) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.??????????????????} /{' '}
                    {testInfo.totals.??????????????????})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              ????????? ??????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.??????????????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.??????????????? /
                          testInfo.totals.???????????????) *
                          100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.???????????????} /{' '}
                    {testInfo.totals.???????????????})
                  </span>
                )}
              </div>
            </ResultScore>
            <ResultScore>
              ??????
              <div style={{ position: 'absolute', right: '10px' }}>
                {testInfo.totals.?????? === 0 ? (
                  <span style={{ color: '#008ed0' }}>0% </span>
                ) : (
                  <span>
                    <span style={{ color: '#008ed0' }}>
                      {Math.ceil(
                        (testInfo.corrects.?????? / testInfo.totals.??????) * 100,
                      )}
                      %
                    </span>{' '}
                    ({testInfo.corrects.??????} / {testInfo.totals.??????})
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

export default ReviewNoteBox;
