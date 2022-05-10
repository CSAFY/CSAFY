import React, { useState } from 'react';

// STYLED
import styled from 'styled-components';
import axios from 'axios';
import TestBox from '../components/TestBox';
import { Grid } from '@mui/material';
import CompanyBox from '../components/companyClassification/CompanyBox';

const CSTestWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CSTestContent = styled.div`
  width: 1232px;

  position: relative;
`;
const TestBoxWrapper = styled.div`
  width: 1080px;

  position: absolute;
  top: 400px;
  left: 50%;
  left: 50%;
  transform: translate(-50%);
`;
const ContentTitle = styled.div`
  width: 1080px;
  height: 200px;

  border-radius: 21px;
  background-color: #f1fcff;

  position: absolute;
  top: 100px;
  left: 50%;
  left: 50%;
  transform: translate(-50%);
`;

function CSTest() {
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      img: 'images/google.png',
      title: '입문자를 위한 문제',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 2,
      img: 'images/google.png',
      title: '네이버 대비',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 3,
      img: 'images/google.png',
      title: '단답형 모음',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 4,
      img: 'images/google.png',
      title: '컴퓨터 구조',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 5,
      img: 'images/google.png',
      title: '서술형 모음',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
  ]);

  return (
    <CSTestWrapper>
      <CSTestContent>
        <ContentTitle>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '800',
              position: 'absolute',
              left: '20px',
              top: '30px',
              color: '#008ed0',
            }}
          >
            CS 실력 테스트
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#008ed0',
              position: 'absolute',
              left: '20px',
              top: '90px',
            }}
          >
            실력을 테스트해보세요
          </div>
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY( -50%)',
            }}
          >
            <img
              src="images/react.png"
              alt="CSAFY"
              style={{
                width: '191px',
                height: '191px',
              }}
            />
          </div>
        </ContentTitle>

        <TestBoxWrapper>
          <Grid container>
            {dummyData.map(v => (
              <Grid item xs={4}>
                <TestBox key={v.id} {...v} />
              </Grid>
            ))}
          </Grid>
        </TestBoxWrapper>
      </CSTestContent>
    </CSTestWrapper>
  );
}

export default CSTest;