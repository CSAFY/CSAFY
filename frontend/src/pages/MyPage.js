import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    is_vip: '',
    username: '',
    profile_image: '',
  });
  // 정보 가져오기
  const getInfo = () => {
    // 사용자 토큰
    const token = localStorage.getItem('jwt');
    if (token) {
      axios
        .get(`https://k6a102.p.ssafy.io/api/v1/user-service/token/user`, {
          params: {
            inputToken: token,
          },
        })
        .then(res => {
          console.log(res);
          setUserInfo({
            email: res.data.email,
            is_vip: res.data.is_vip,
            username: res.data.username,
            profile_image: res.data.profile_image,
          });
        })
        .catch(err => console.error(err));
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  // Heatmap
  const today = new Date();
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  // 프로필 변경 관련
  const [editToggle, setEditToggle] = useState(false);
  const handleEdit = () => {
    setEditToggle(!editToggle);
  };
  const editProfileImage = () => {
    // 이미지 수정용
  };
  const [editUserInfo, setEditUserInfo] = useState({
    username: '',
    profile_image: '',
  });
  useEffect(() => {
    setEditUserInfo({
      username: userInfo.username,
      profile_image: userInfo.profile_image,
    });
  }, [editToggle]);

  return (
    <>
      <MyPageWrapper>
        <MyPageContent>
          <UserInfoWrapper>
            <UserInfo>
              {editToggle ? (
                <div style={{ position: 'relative' }}>
                  <ProfileImg
                    src="images/google.png"
                    alt="Profile"
                    style={{ filter: 'blur(4px)' }}
                  />
                  <button
                    style={{
                      width: '115px',
                      height: '22px',
                      fontSize: '13px',
                      fontWeight: '600',
                      // color: '#fff',
                      border: 'none',
                      backgroundColor: 'transparent',

                      cursor: 'pointer',

                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={editProfileImage}
                  >
                    프로필 사진 바꾸기
                  </button>
                </div>
              ) : (
                <ProfileImg src="images/google.png" alt="Profile" />
              )}
              {/* {userInfo.profile_image ? (
                <ProfileImg src={userInfo.profile_image} alt="Profile" />
              ) : (
                <ProfileImg src="images/google.png" alt="Profile" />
              )} */}

              <Profile>
                {/* is_vip === 'T'일대만 `프리미엄 이용중` 보이기 */}
                {userInfo.is_vip === 'T' && (
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
                )}

                {editToggle ? (
                  <input
                    type="text"
                    name="username"
                    style={{ height: '30px', width: '179px', fontSize: '24px' }}
                    value={editUserInfo.username}
                    onChange={e =>
                      setEditUserInfo({
                        ...editUserInfo,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p
                    style={{
                      width: '179px',
                      height: '30px',
                      margin: '0 11px 0 0',
                      fontSize: '24px',
                      fontWeight: 'bold',
                    }}
                  >
                    {userInfo.username}
                  </p>
                )}

                <p
                  style={{
                    width: '140px',
                    height: '20px',
                    margin: '0',
                    fontSize: '16px',
                  }}
                >
                  {userInfo.email}
                </p>
              </Profile>
              {editToggle ? (
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
                  onClick={handleEdit}
                >
                  변경 완료
                </Button>
              ) : (
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
                  onClick={handleEdit}
                >
                  프로필 변경
                </Button>
              )}

              {/* is_vip === 'N'일때만 ` Premium 버전 구독하기` 보이기 */}
              {userInfo.is_vip === 'N' && (
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
              )}
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
            <StudyAnalysis userInfo={userInfo} />
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
