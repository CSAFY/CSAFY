import { Button } from '@mui/material';
import React from 'react';

// STYLED
import styled from 'styled-components';

const HomeWrapper = styled.div``;

const HeroWrapper = styled.div`
  background-color: #d5f2fc;
  display: flex;
  height: 100vh;
`;
const HeroMain = styled.div`
  color: #008ed0;
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
`;
const HeroImage = styled.img`
  width: 80%;
`;

const ExplainWrapper = styled.div`
  background-color: #008ed0;
  display: flex;
  height: 100vh;
`;
const ExplainMain = styled.div`
  color: #ffffff;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
`;
const ExplainImage = styled.img`
  width: 80%;
`;

const FeatureWrapper = styled.div`
  background-color: #84c2ea;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: space-evenly;
`;
const FeatureMain = styled.div`
  color: #016d9f;
  font-size: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding-right: 3rem;
  padding-left: 3rem;
`;
const FeatureImage = styled.img`
  width: 80%;
  height: 80vh;
`;

const GuideWrapper = styled.div`
  background-color: #f0f9fa;
  height: 100vh;
`;
const GuideHeader = styled.div`
  color: #008ecf;
  font-size: 1.5rem;

  text-align: center;
  padding-top: 2rem;
`;
const GuideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: space-evenly;
  height: 80%;
`;
const GuideMain = styled.div`
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  height: 60vh;

  margin-left: 3rem;
  padding-left: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const InputForm = styled.input`
  height: 35px;
  width: 75%;

  border: 1px solid #008ed0;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  padding-left: 15px;
`;

function Home() {
  return (
    <>
      <HomeWrapper>
        <HeroWrapper>
          <HeroMain style={{ paddingLeft: '50px' }}>
            <div>
              <h1 style={{ margin: 'auto', fontSize: '4rem' }}>
                CS / 기술면접 완전 정복
              </h1>
              <p style={{ paddingTop: '2rem', marginBottom: '0' }}>
                신입 개발자 전공 지식 & 기술 면접 백과사전
              </p>
              <p style={{ marginTop: '0' }}>
                다양한 학습 방법을 통해 빠르게 CS 마스터가 될 수 있습니다.
              </p>
              <LoginForm>
                <InputForm type="text" placeholder="Email Address" />
                <InputForm type="password" placeholder="Password" />
                <Button
                  variant="contained"
                  sx={{
                    width: '78%',
                    textAlign: 'center',
                    display: 'block',
                    mt: '1rem',
                    border: '1px solid contained',
                    // ':hover': {
                    //   color: '#008ed0',
                    //   bgcolor: 'white',
                    // },
                  }}
                >
                  로그인
                </Button>
              </LoginForm>
            </div>
          </HeroMain>
          <HeroMain style={{ paddingRight: '50px' }}>
            <HeroImage src="images/logo.ico" alt="Hero Image"></HeroImage>
          </HeroMain>
        </HeroWrapper>

        <ExplainWrapper>
          <ExplainMain>
            <ExplainImage src="images/logo.ico"></ExplainImage>
          </ExplainMain>
          <ExplainMain>
            <div>
              <h1 style={{ margin: 'auto' }}>C;SAFY 서비스의 특징</h1>
              <h2>다른 서비스와 차별화 된 장점</h2>
              <p style={{ marginBottom: '0.5rem' }}>
                1. 신입 개발자 전공 지식 & 기술 면접 백과사전
              </p>
              <p style={{ marginTop: '0', marginBottom: '0.5rem' }}>
                2. 신입 개발자 전공 지식 & 기술 면접 백과사전
              </p>
              <p style={{ marginTop: '0', marginBottom: '0' }}>
                3. 신입 개발자 전공 지식 & 기술 면접 백과사전
              </p>
            </div>
          </ExplainMain>
        </ExplainWrapper>

        <FeatureWrapper>
          <FeatureMain style={{ alignItems: 'flex-end' }}>
            <div>메타버스</div>
            <div>면접</div>
          </FeatureMain>
          <FeatureMain style={{ padding: '0' }}>
            <FeatureImage src="images/logo.ico"></FeatureImage>
          </FeatureMain>
          <FeatureMain style={{ alignItems: 'flex-start' }}>
            <div>학습</div>
            <div>테스트 - 분석 데이터 제공</div>
          </FeatureMain>
        </FeatureWrapper>

        <GuideWrapper>
          <GuideHeader>
            <h1>기술면접 합격을 위한 커리어 가이드</h1>
          </GuideHeader>
          <GuideGrid>
            <GuideMain style={{ backgroundColor: '#DEF9FF' }}>
              <h1
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translate(-50%)',
                  color: '#008ECF',
                }}
              >
                CS
              </h1>
              <p>자료구조</p>
              <p>운영체제론</p>
              <p>컴퓨터구조</p>
              <p>네트워크</p>
              <p>데이터베이스</p>
            </GuideMain>
            <GuideMain style={{ backgroundColor: '#DCFFF3' }}>
              <h1
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translate(-50%)',
                  color: '#008ECF',
                }}
              >
                기초
              </h1>
              <p>이산수학</p>
              <p>프로그래밍 언어</p>
            </GuideMain>
            <GuideMain
              style={{ backgroundColor: '#D4EFFA', marginRight: '3rem' }}
            >
              <h1
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translate(-50%)',
                  color: '#008ECF',
                }}
              >
                etc
              </h1>
              <p>언어</p>
              <p>해쉬</p>
              <p>면접</p>
            </GuideMain>
          </GuideGrid>
        </GuideWrapper>
      </HomeWrapper>
    </>
  );
}

export default Home;
