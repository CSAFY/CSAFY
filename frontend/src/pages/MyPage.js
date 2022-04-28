import React from 'react';
import StudyAnalysis from '../components/myPage/StudyAnalysis';

// HEATMAP
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

// COMPONENTS
import InterviewBox from '../components/myPage/InterviewBox';
import TestBox from '../components/myPage/TestBox';
import VideoBox from '../components/myPage/VideoBox';

// STYLED
import styled from 'styled-components';
import { Button } from '@mui/material';

const MyPageWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f5f5f5;
`;
const MyPageContent = styled.div`
  width: 1232px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserInfo = styled.div`
  display: flex;
  height: 251px;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
const Profile = styled.div`
  margin-left: 27px;
`;
const HeatMap = styled.div`
  padding-top: 30px;
`;

const StudyAnalysisWrapper = styled.div`
  padding-top: 50px;
`;

const VideoWrapper = styled.div`
  padding-top: 100px;
`;

function MyPage() {
  // Heatmap
  const today = new Date();
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <>
      <MyPageWrapper>
        <MyPageContent>
          <UserInfoWrapper>
            <UserInfo>
              <ProfileImg src="images/google.png" alt="Profile" />
              <Profile>
                <div
                  style={{
                    width: '85px',
                    height: '23px',
                    margin: '0',
                    borderRadius: '6px',
                    backgroundColor: '#d2fae2',
                    fontSize: '10px',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  프리미엄 이용 중
                </div>
                <p
                  style={{
                    width: '179px',
                    height: '30px',
                    margin: '0 11px 0 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  Admin-CSAFY
                </p>
                <p
                  style={{
                    width: '140px',
                    height: '20px',
                    margin: '0',
                    fontSize: '16px',
                  }}
                >
                  admin@gmail.com
                </p>
              </Profile>
              <Button
                variant="contained"
                sx={{
                  width: '130px',
                  height: '40px',
                  textAlign: 'center',
                  display: 'block',
                  marginLeft: '20px',
                  border: '1px solid contained',
                  borderRadius: '7px',
                  backgroundColor: '#fff',

                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',

                  ':hover': {
                    color: '#008ed0',
                    bgcolor: 'white',
                  },
                }}
              >
                프로필 변경
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '213px',
                  height: '40px',
                  textAlign: 'center',
                  display: 'block',
                  marginLeft: '20px',
                  border: '1px solid contained',
                  borderRadius: '7px',
                  backgroundColor: '#fff',

                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',

                  ':hover': {
                    color: '#008ed0',
                    bgcolor: 'white',
                  },
                }}
              >
                Premium 버전 구독하기
              </Button>
            </UserInfo>
            <HeatMap>
              <CalendarHeatmap
                startDate={shiftDate(today, -250)}
                endDate={today}
                values={[
                  { date: '2022-04-19', count: 1 },
                  { date: '2022-04-20', count: 2 },
                ]}
                classForValue={value => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-github-${value.count}`;
                }}
                showWeekdayLabels={true}

                // tooltip 사라지게 하는 방법...
                // tooltipDataAttrs={(value) => {
                //   if (value.count) {
                //     return {
                //       'data-tip': `${value.count} Contributions on ${value.date}`,
                //     };
                //   } else {
                //     return {
                //       'data-tip': `No Contribution`,
                //     };
                //   }
                // }}
              />
              <ReactTooltip />
            </HeatMap>
          </UserInfoWrapper>
          <hr />
          <StudyAnalysisWrapper>
            <StudyAnalysis />
          </StudyAnalysisWrapper>

          <VideoWrapper>
            <h1 style={{ textAlign: 'center' }}>즐겨찾는 학습</h1>
            <div style={{ display: 'flex', justifyContent: 'between' }}>
              <VideoBox>1</VideoBox>
              <VideoBox>2</VideoBox>
              <VideoBox>3</VideoBox>
              <VideoBox>4</VideoBox>
            </div>
          </VideoWrapper>
          <VideoWrapper>
            <h1 style={{ textAlign: 'center' }}>최근 본 강의</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <VideoBox>1</VideoBox>
              <VideoBox>2</VideoBox>
              <VideoBox>3</VideoBox>
              <VideoBox>4</VideoBox>
            </div>
          </VideoWrapper>
          <div
            style={{
              paddingTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>최근 본 면접 질문</h1>
            <InterviewBox question={'Q1'} />
            <InterviewBox question={'Q2'} />
            <InterviewBox question={'Q3'} />
          </div>
          <div
            style={{
              paddingTop: '100px',
              paddingBottom: '100px',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>최근 푼 모의고사</h1>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TestBox />
              <TestBox />
              <TestBox />
              <TestBox />
            </div>
          </div>
        </MyPageContent>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
