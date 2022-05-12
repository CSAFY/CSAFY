import React from 'react';

import styled from 'styled-components';
import BarChart from '../BarChart';

import RadarChart from '../RadarChart';

const AnalysisWrapper = styled.div`
  height: 821px;
`;

const DataWrapper = styled.div`
  display: flex;
  padding-top: 50px;
`;

function StudyAnalysis({ userInfo }) {
  return (
    <AnalysisWrapper>
      <h1 style={{ textAlign: 'center' }}>
        {userInfo.username}님의 학습 분석 데이터
      </h1>
      <DataWrapper>
        <RadarChart />
        <div style={{ flexGrow: '1', marginLeft: '100px' }}>
          <p>학습 시간 분석</p>
          <p>총 CS 학습 시간: 154시간</p>
          <div>
            <p>과목별 학습 시간</p>
            <ul>
              <li>네트워크: 65시간</li>
              <li>운영체제: 59시간</li>
              <li>자료구조: 90시간</li>
              <li>기타: 81시간</li>
              <li>데이터베이스: 56시간</li>
              <li>컴퓨터구조: 55시간</li>
              <li>운영체제론: 40시간</li>
            </ul>
          </div>
        </div>
      </DataWrapper>
      <DataWrapper>
        <div style={{ flexGrow: '1', marginLeft: '50px' }}>
          <p>최근 5개 모의고사 분석 결과</p>
          <p>평균 점수: 86점</p>
          <div>
            <p>과목별 점수</p>
            <ul>
              <li>네트워크: 65점</li>
              <li>운영체제: 59점</li>
              <li>자료구조: 90점</li>
              <li>기타: 81점</li>
              <li>데이터베이스: 56점</li>
              <li>컴퓨터구조: 55점</li>
              <li>운영체제론: 40점</li>
            </ul>
          </div>
        </div>
        {/* <BarGraph src="images/graph2.png" alt="Bar" /> */}
        <BarChart />
      </DataWrapper>
    </AnalysisWrapper>
  );
}

export default StudyAnalysis;
