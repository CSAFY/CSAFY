/* eslint-disable */
import React, { useEffect } from 'react';

// RECOIL
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { NavToggle } from '../recoils/NavToggle';

// COMPONENTS
import TestBox from '../components/TestBox';
import NeedLogin from './handler/NeedLogin';

// STYLED
import styled from 'styled-components';
import { Grid } from '@mui/material';

const CSTestWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;
  // border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px inset rgba(0, 0, 0, 0.1);

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
  top: 350px;
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
  top: 50px;
  left: 50%;
  left: 50%;
  transform: translate(-50%);
`;

function CSTest() {
  // Recoil
  const isLoggedIn = useRecoilValue(LoginState);
  const setToggle = useSetRecoilState(NavToggle);

  // 네브바 toggle처리
  useEffect(() => {
    setToggle(true);
  }, []);

  const categoryData = [
    {
      id: 1,
      img: 'images/subject_network.png',
      title: '네트워크',
      exp: '네트워크에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 2,
      img: 'images/subject_operatingsystem.png',
      title: '운영체제',
      exp: '운영체제에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 3,
      img: 'images/subject_datastructure.png',
      title: '자료구조',
      exp: '자료구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 4,
      img: 'images/subject_extra.png',
      title: '기타',
      exp: '',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 5,
      img: 'images/subject_database.png',
      title: '데이터베이스',
      exp: '데이터베이스에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 6,
      img: 'images/subject_computerarchitecture.png',
      title: '컴퓨터구조',
      exp: '컴퓨터 구조에 대해 알아봅시다.',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 7,
      img: 'https://csafy-profile.s3.amazonaws.com/logo/logo_short.png',
      title: '전 과목',
      exp: '',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 8,
      img: 'https://csafy-profile.s3.amazonaws.com/logo/logo_short.png',
      title: '입문자를 위한 문제',
      exp: '',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
    {
      id: 9,
      img: 'https://csafy-profile.s3.amazonaws.com/logo/logo_short.png',
      title: '중급자를 위한 문제',
      exp: '',
      stacks: ['images/github.png', 'images/react.png', 'images/swift.png'],
    },
  ];

  return (
    <CSTestWrapper>
      <CSTestContent>
        {isLoggedIn ? (
          <>
            <ContentTitle>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  position: 'absolute',
                  left: '40px',
                  top: '50px',
                  color: '#008ed0',
                }}
              >
                CS 실력 테스트
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#008ed0',
                  position: 'absolute',
                  left: '40px',
                  top: '105px',
                }}
              >
                자신의 실력을 평가해보고 부족한 부분을 학습해보세요.
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#008ed0',
                  position: 'absolute',
                  left: '40px',
                  top: '130px',
                }}
              >
                C;SAFY에서 직접 선별한 문제들만 쏙쏙 모아 출제해드립니다.
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: '60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <img
                  src="https://csafy-profile.s3.amazonaws.com/logo/logo_short.png"
                  alt="CSAFY"
                  style={{
                    width: '180px',
                    height: '150px',
                  }}
                />
              </div>
            </ContentTitle>

            <TestBoxWrapper>
              <Grid container>
                {categoryData.map(test => (
                  <Grid item xs={4} key={test.id}>
                    <TestBox {...test} />
                  </Grid>
                ))}
              </Grid>
            </TestBoxWrapper>
          </>
        ) : (
          <>
            <NeedLogin />
          </>
        )}
      </CSTestContent>
    </CSTestWrapper>
  );
}

export default CSTest;
