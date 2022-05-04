import React, { useState } from 'react';

// STYLED
import styled from 'styled-components';
import axios from 'axios';
import TestBox from '../components/TestBox';
import { Grid } from '@mui/material';

const CSTestWrapper = styled.div`
  width: 100%;
  height: 1500px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CSTestContent = styled.div`
  width: 1232px;
  height: 100%;

  display: flex;
  justify-content: center;

  position: relative;
`;
const TestBoxWrapper = styled.div`
  width: 1080px;
  height: 1500px;

  border: 1px solid black;

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
    <CSTestWrapper>
      <CSTestContent>
        <ContentTitle />
        <TestBoxWrapper>
          <Grid container>
            {dummyData.map(v => (
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TestBox />
                {/* <CompanyBox key={v.id} {...v} /> */}
              </Grid>
            ))}
          </Grid>
        </TestBoxWrapper>
      </CSTestContent>
    </CSTestWrapper>
  );
}

export default CSTest;
