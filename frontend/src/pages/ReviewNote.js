import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
import { Navigate, useNavigate } from 'react-router-dom';
// Components
import ReviewNoteBox from '../components/ReviewNoteBox';
import Choices from '../components/Choices';
import ReviewChoices from '../components/ReviewChoices';
import NeedLogin from './handler/NeedLogin';
// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
// STYLED
import styled from 'styled-components';
import { Grid } from '@mui/material';

const ReviewNoteWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const ReviewNoteContent = styled.div`
  width: 1232px;

  position: relative;
`;
const PageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 40px;
  padding-bottom: 30px;
`;
const TestList = styled.div`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
`;

function ReviewNote() {
  const navigate = useNavigate();
  // Recoil
  const [token, setToken] = useRecoilState(Token);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  // 회차 상관없이 오답노트 전체
  const [reviewData, setReviewData] = useState([]);
  const getReviewData = () => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/wrong`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🎃', res);
        setReviewData(res.data);
      })
      .catch(err => console.error(err));
  };
  // 본 모의고사 회차 갯수
  const getReviewCount = () => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/wrongCount`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🐸', res.data);
      })
      .catch(err => console.error(err));
  };
  // 회차 모의고사 갯수
  const [roundReviewData, setRoundReviewData] = useState([]);
  const getRoundReviewCount = () => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/0/wrong`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('🐕', res.data);
        setRoundReviewData(res.data);
      })
      .catch(err => console.error(err));
  };
  console.log(reviewData);

  useEffect(() => {
    getReviewData();
    getReviewCount();
    getRoundReviewCount();
  }, []);

  const testHeight = 250 + reviewData.length * 550;

  return (
    <ReviewNoteWrapper style={{ height: `${testHeight}px` }}>
      <ReviewNoteContent>
        {/* 카테고리 분류 버전 */}
        {isLoggedIn ? (
          <>
            {' '}
            <PageTitle>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                }}
              >
                오답노트
              </div>
            </PageTitle>
            <Grid container>
              {roundReviewData &&
                roundReviewData.map((data, idx) => (
                  <Grid item xs={4}>
                    <ReviewNoteBox key={idx} {...data} />
                  </Grid>
                ))}
            </Grid>
          </>
        ) : (
          <>
            <NeedLogin />
          </>
        )}

        {/* 분류 없이 계속 쌓는 버전 */}
        {/* <PageTitle>
          <div>오답노트</div>
        </PageTitle>
        <TestList>
          {reviewData &&
            reviewData.map((test, idx) => (
              <ReviewChoices key={idx} test={test} idx={idx} />
            ))}
        </TestList> */}
      </ReviewNoteContent>
    </ReviewNoteWrapper>
  );
}

export default ReviewNote;
