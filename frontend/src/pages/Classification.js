/* eslint-disable */
import React, { useState } from 'react';

import { Grid } from '@mui/material';

// STYLED
import styled from 'styled-components';
import CompanyBox from '../components/companyClassification/CompanyBox';

const StackWrapper = styled.div`
  width: 100%;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const StackContent = styled.div`
  width: 1232px;
`;
const PageTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-top: 40px;
  padding-bottom: 30px;
`;

function Classification() {
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      img: 'images/google.png',
      company: '네이버',
      location: '경기도 성남시',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 2,
      img: 'images/google.png',
      company: '카카오',
      location: '경기도 성남시',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 3,
      img: 'images/google.png',
      company: '라인',
      location: '경기도 성남시',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 4,
      img: 'images/google.png',
      company: '쿠팡',
      location: '서울특별시 송파구',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 5,
      img: 'images/google.png',
      company: '우아한형제들',
      location: '서울특별시 송파구',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
  ]);

  return (
    <StackWrapper>
      <StackContent>
        <PageTitle>
          <div style={{ fontSize: '24px', fontWeight: '600' }}>기업별 스택</div>
          {/* <div
            style={{
              marginLeft: '50px',
              marginRight: '50px',
              color: '#8a8888',
            }}
          >
            |
          </div>
          <div
            style={{ fontSize: '16px', fontWeight: '300', color: '#8a8888' }}
          >
            총 215개의 기업
          </div> */}
        </PageTitle>
        <Grid container>
          {dummyData.map(v => (
            <Grid item xs={4}>
              <CompanyBox key={v.id} {...v} />
            </Grid>
          ))}
        </Grid>
      </StackContent>
    </StackWrapper>
  );
}

export default Classification;
