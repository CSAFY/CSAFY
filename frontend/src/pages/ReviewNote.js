/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

// RECOIL
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { NavToggle } from '../recoils/NavToggle';

// COMPONENTS
import ReviewNoteBox from '../components/ReviewNoteBox';
import NeedLogin from './handler/NeedLogin';

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
  // Recoil
  const token = useRecoilValue(Token);
  const isLoggedIn = useRecoilValue(LoginState);
  const setToggle = useSetRecoilState(NavToggle);
  // 본 모의고사 갯수(라운드)
  const [round, setRound] = useState(0);
  // 모의고사 정답 정보 가져오기 - 라운드 별
  const [roundTestData, setRoundTestData] = useState([]);
  // 모의고사 오답 정보 가져오기 - 라운드 별
  const [roundInfo, setRoundInfo] = useState([]);

  // // 테스트 정보 가져오기
  // const [testResultInfo, setTestResultInfo] = useState({
  //   corrects: { 네트워크: 1 },
  //   totals: { 네트워크: 1 },
  //   examDone: '',
  //   id: '',
  // });

  // 본 모의고사 갯수(라운드)
  const getReviewCount = () => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/wrongCount`, {
        headers: { Authorization: token },
      })
      .then(res => {
        setRound(res.data);
      })
      .catch(err => console.error(err));
  };
  // 모의고사 갯수만큼 정보 담기
  useEffect(() => {
    for (var i = 1; i <= round; i++) {
      getRoundTestInfo(i);
      getRoundReviewData(i);
    }
  }, [round]);

  // 모의고사 정답 정보 가져오기 - 라운드 별
  const getRoundTestInfo = round => {
    axios
      .get(`${defaultAPI}/cs-service/test/${round}/result`, {
        headers: { authorization: token },
      })
      .then(res => {
        // console.log(res.data);
        setRoundTestData(prev => [
          ...prev,
          {
            id: res.data.id,
            examDone: res.data.examDone,
            corrects: res.data.corrects,
            totals: res.data.totals,
            round,
          },
        ]);
      })
      .catch(err => console.error(err));
  };

  // 모의고사 오답 정보 가져오기 - 라운드 별
  const getRoundReviewData = round => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/${round}/wrong`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        setRoundInfo(res.data);
      })
      .catch(err => console.error(err));
  };
  // console.log(roundTestData, roundInfo);

  useEffect(() => {
    getReviewCount();
    setToggle(true);
  }, []);

  const testHeight = 250 + parseInt(roundTestData.length / 4) * 400;

  return (
    <>
      {/* 카테고리 분류 버전 */}
      {isLoggedIn ? (
        <>
          {round !== 0 ? (
            <>
              {' '}
              <ReviewNoteWrapper style={{ height: `${testHeight}px` }}>
                <ReviewNoteContent>
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
                    {roundTestData &&
                      roundTestData.map((data, idx) => (
                        <Grid item xs={3} key={idx}>
                          <ReviewNoteBox {...data} />
                        </Grid>
                      ))}
                  </Grid>
                </ReviewNoteContent>
              </ReviewNoteWrapper>
            </>
          ) : (
            <>
              <ReviewNoteWrapper style={{ height: `100vh` }}>
                <ReviewNoteContent>
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
                    {roundTestData &&
                      roundTestData.map((data, idx) => (
                        <Grid item xs={3} key={idx}>
                          <ReviewNoteBox {...data} />
                        </Grid>
                      ))}
                  </Grid>
                </ReviewNoteContent>
              </ReviewNoteWrapper>
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ height: '100vh' }}>
            <NeedLogin />
          </div>
        </>
      )}
    </>
  );
}

export default ReviewNote;
