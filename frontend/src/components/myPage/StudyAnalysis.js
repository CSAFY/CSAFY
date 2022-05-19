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
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
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

        <div
          style={{
            flexGrow: '1',
            marginLeft: '100px',
            // border: '1px solid black',
          }}
        >
          <div style={{ fontSize: '28px', fontWeight: '600' }}>
            학습 경험치 분석
          </div>
          <p style={{ fontSize: '24px' }}>
            총 CS 학습 포인트{' '}
            <span style={{ fontWeight: '600' }}>{analysisData.exp}</span>
          </p>
          {analysisData.scores && (
            <div style={{ fontSize: '18px' }}>
              <ul>
                <Scores>
                  <div style={{ width: '300px' }}> 네트워크 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.네트워크}
                  </span>
                </Scores>
                <Scores>
                  <div style={{ width: '300px' }}> 운영체제 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.운영체제}
                  </span>
                </Scores>
                <Scores>
                  <div style={{ width: '300px' }}> 자료구조 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.자료구조}
                  </span>
                </Scores>
                <Scores>
                  <div style={{ width: '300px' }}> 데이터베이스 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.데이터베이스}
                  </span>
                </Scores>
                <Scores>
                  <div style={{ width: '300px' }}> 컴퓨터구조 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.컴퓨터구조}
                  </span>
                </Scores>
                <Scores>
                  <div style={{ width: '300px' }}> 기타 </div>
                  <span style={{ fontWeight: '600' }}>
                    {analysisData.scores.기타}
                  </span>
                </Scores>
              </ul>
            </div>
          )}
        </div>
      </DataWrapper>
      <DataWrapper style={{ marginTop: '30px', marginBottom: '50px' }}>
        <div style={{ flexGrow: '1', marginLeft: '50px' }}>
          <div style={{ fontSize: '28px', fontWeight: '600' }}>
            최근 5개 모의고사 분석 결과
          </div>
          {getAvg(scores) === 'NaN' ? (
            <p style={{ fontSize: '24px' }}>
              평균 점수:
              <span style={{ fontWeight: '600' }}> 0점</span>
            </p>
          ) : (
            <p style={{ fontSize: '24px' }}>
              평균 점수:{' '}
              <span style={{ fontWeight: '600' }}>{getAvg(scores)}점</span>
            </p>
          )}

          <div style={{ fontSize: '18px' }}>
            <p>과목별 점수</p>
            <ul>
              {recentTest.map((test, idx) => (
                <div key={test.testSeq}>
                  {test.id === 'all' ? (
                    <Scores>
                      <div style={{ width: '250px' }}> 전 과목 </div>
                      <span style={{ fontWeight: '600' }}>{scores[idx]}점</span>
                    </Scores>
                  ) : (
                    <Scores>
                      <div style={{ width: '250px' }}> {test.id} </div>
                      <span style={{ fontWeight: '600' }}>{scores[idx]}점</span>
                    </Scores>
                  )}
                </div>
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
