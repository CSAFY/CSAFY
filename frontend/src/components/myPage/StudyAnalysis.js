import React from 'react';

import styled from 'styled-components';

const AnalysisWrapper = styled.div`
  height: 821px;
`;

const DataWrapper = styled.div`
  display: flex;
  padding-top: 50px;
`;
const PiGraph = styled.img`
  width: 346px;
  height: 346px;
  margin-left: 37px;
`;
const BarGraph = styled.img`
  width: 596px;
  height: 298px;
  margin-right: 83px;
`;

function StudyAnalysis({ userInfo }) {
  return (
    <AnalysisWrapper>
      <h1 style={{ textAlign: 'center' }}>
        {userInfo.username}님의 학습 분석 데이터
      </h1>
      <DataWrapper>
        <PiGraph src="images/graph1.png" alt="Pi" />
        <div style={{ flexGrow: '1', marginLeft: '50px' }}>
          <p>학습 시간 분석</p>
          <p>총 CS 학습 시간: 154시간</p>
          <div>
            <p>과목별 학습 시간</p>
          </div>
        </div>
      </DataWrapper>
      <DataWrapper>
        <div style={{ flexGrow: '1', marginLeft: '50px' }}>
          <p>최근 5개 모의고사 분석 결과</p>
          <p>평균 점수: 86점</p>
          <div>
            <p>과목별 점수</p>
          </div>
        </div>
        <BarGraph src="images/graph2.png" alt="Bar" />
      </DataWrapper>
    </AnalysisWrapper>
  );
}

export default StudyAnalysis;
