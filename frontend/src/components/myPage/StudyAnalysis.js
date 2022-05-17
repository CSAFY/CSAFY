import React from 'react';

// COMPONENTS
import BarChart from '../BarChart';
import RadarChart from '../RadarChart';

// STYLED
import styled from 'styled-components';

const AnalysisWrapper = styled.div`
  height: 1000px;
`;
const DataWrapper = styled.div`
  display: flex;
  padding-top: 50px;
`;
const Scores = styled.li`
  margin-top: 5px;
  margin-bottom: 5px;
`;

function StudyAnalysis({ userInfo, analysisData, recentTest }) {
  // 합, 평균 구하는 함수
  const getSum = dic => Object.values(dic).reduce((a, b) => a + b);
  const getAvg = array => {
    var sum = 0.0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return (sum / array.length).toFixed(1);
  };
  // 점수
  const scores = recentTest.map(test =>
    Math.ceil((getSum(test.corrects) / getSum(test.totals)) * 100),
  );

  // console.log(recentTest, scores, getAvg(scores));
  // console.log(analysisData);
  return (
    <AnalysisWrapper>
      <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: '600' }}>
        {userInfo.username}님의 학습 분석 데이터
      </div>
      <DataWrapper>
        {analysisData.scores && <RadarChart analysisData={analysisData} />}

        <div style={{ flexGrow: '1', marginLeft: '150px' }}>
          <div style={{ fontSize: '28px', fontWeight: '600' }}>
            과목별 학습 분석
          </div>
          <p style={{ fontSize: '20px' }}>
            총 CS 학습 포인트: {analysisData.exp} 포인트
          </p>
          {analysisData.scores && (
            <div style={{ fontSize: '18px' }}>
              <p>과목별 학습 포인트</p>
              <ul>
                <Scores>네트워크: {analysisData.scores.네트워크} 포인트</Scores>
                <Scores>운영체제: {analysisData.scores.운영체제} 포인트</Scores>
                <Scores>자료구조: {analysisData.scores.자료구조} 포인트</Scores>
                <Scores>기타: {analysisData.scores.기타} 포인트</Scores>
                <Scores>
                  데이터베이스: {analysisData.scores.데이터베이스} 포인트
                </Scores>
                <Scores>
                  컴퓨터구조: {analysisData.scores.컴퓨터구조} 포인트
                </Scores>
              </ul>
            </div>
          )}
        </div>
      </DataWrapper>
      <DataWrapper style={{ marginBottom: '50px' }}>
        <div style={{ flexGrow: '1', marginLeft: '50px' }}>
          <div style={{ fontSize: '28px', fontWeight: '600' }}>
            최근 5개 모의고사 분석 결과
          </div>
          {getAvg(scores) === 'NaN' ? (
            <p style={{ fontSize: '20px' }}>평균 점수: 0점</p>
          ) : (
            <p style={{ fontSize: '20px' }}>평균 점수: {getAvg(scores)}점</p>
          )}

          <div style={{ fontSize: '18px' }}>
            <p>과목별 점수</p>
            <ul>
              {recentTest.map((test, idx) => (
                <Scores>
                  {test.id} : {scores[idx]}점
                </Scores>
              ))}
            </ul>
          </div>
        </div>
        {/* <BarGraph src="images/graph2.png" alt="Bar" /> */}
        <BarChart recentTest={recentTest} />
      </DataWrapper>
    </AnalysisWrapper>
  );
}

export default StudyAnalysis;
