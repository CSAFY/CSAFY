import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { defaultAPI } from '../../utils/api';
import BarChart from '../BarChart';

import RadarChart from '../RadarChart';

const AnalysisWrapper = styled.div`
  height: 821px;
`;

const DataWrapper = styled.div`
  display: flex;
  padding-top: 50px;
`;

function StudyAnalysis({ userInfo, analysisData }) {
  return (
    <AnalysisWrapper>
      <h1 style={{ textAlign: 'center' }}>
        {userInfo.username}님의 학습 분석 데이터
      </h1>
      <DataWrapper>
        {analysisData.scores && <RadarChart analysisData={analysisData} />}

        <div style={{ flexGrow: '1', marginLeft: '100px' }}>
          <h1>학습 포인트 분석</h1>
          <p>총 CS 학습 포인트: {analysisData.exp} 포인트</p>
          {analysisData.scores && (
            <div>
              <p>과목별 학습 포인트</p>
              <ul>
                <li>네트워크: {analysisData.scores.네트워크} 포인트</li>
                <li>운영체제: {analysisData.scores.운영체제} 포인트</li>
                <li>자료구조: {analysisData.scores.자료구조} 포인트</li>
                <li>기타: {analysisData.scores.기타} 포인트</li>
                <li>데이터베이스: {analysisData.scores.데이터베이스} 포인트</li>
                <li>컴퓨터구조: {analysisData.scores.컴퓨터구조} 포인트</li>
              </ul>
            </div>
          )}
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
