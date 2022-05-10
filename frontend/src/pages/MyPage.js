import React, { useEffect, useState } from 'react';
import StudyAnalysis from '../components/myPage/StudyAnalysis';
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { defaultAPI } from '../utils/api';
// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';

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
import QuestionBox from '../components/QuestionBox';

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
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  // 개인정보
  const [userInfo, setUserInfo] = useState({
    email: '',
    is_vip: '',
    username: '',
    profile_image: '',
  });
  // 사용자 정보 가져오기
  const getInfo = () => {
    axios
      // .get(`${defaultAPI}/user-service/userInfo`, {
      //   headers: { Authorization: token },
      // })
      .get(`${defaultAPI}/user-service/token/user`, {
        params: {
          inputToken: token,
        },
      })
      .then(res => {
        console.log('🎃', res);
        if (res.data.profile_image === null) {
          setUserInfo({
            email: res.data.email,
            is_vip: res.data.is_vip,
            username: res.data.username,
            profile_image: 'images/google.png',
            user_seq: res.data.user_seq,
          });
        } else {
          setUserInfo({
            email: res.data.email,
            is_vip: res.data.is_vip,
            username: res.data.username,
            profile_image: res.data.profile_image,
            user_seq: res.data.user_seq,
          });
        }
      })
      .catch(err => console.error(err));
  };
  // 최근 본 면접 질문
  const [recentInterview, setRecentInterview] = useState([]);
  const getRecentInterviewInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/interview/seen`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('최근 본 면접 질문 --->', res);
        setRecentInterview(res.data);
      })
      .catch(err => console.error(err));
  };
  // 최근 본 강의
  const [recentStudy, setRecentStudy] = useState([]);
  const getRecentStudyInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/study/seen`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('최근 본 강의 --->', res);
        setRecentStudy(res.data);
      })
      .catch(err => console.error(err));
  };
  // 즐겨찾기 한 강의
  const [favorites, setFavorites] = useState([]);
  const getFavorites = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/study/favorites`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('즐겨찾기 한 강의 --->', res);
        setFavorites(res.data);
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getInfo();
    getRecentInterviewInfo();
    getRecentStudyInfo();
    getFavorites();
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
    const token = localStorage.getItem('jwt');
    setEditToggle(!editToggle);
    axios
      .put(
        ` https://csafy.com/api/v1/user-service/update`,
        {
          username: editUserInfo.username,
          profileImg: editUserInfo.profile_image,
          // profileImg:
          //   'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg',
        },
        {
          headers: { Authorization: token },
        },
      )
      .then(res => {
        console.log(res);
        setEditUserInfo({
          username: res.data.username,
          profile_image: res.data.profileImg,
        });
        setUserInfo({
          ...userInfo,
          username: res.data.username,
          profile_image: res.data.profileImg,
        });
      })
      .catch(err => console.error(err));
  };

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  };
  const [editUserInfo, setEditUserInfo] = useState({
    username: '',
    profile_image: '',
  });
  // console.log(editUserInfo);
  useEffect(() => {
    setEditUserInfo({
      username: userInfo.username,
      profile_image: userInfo.profile_image,
    });
  }, [editToggle]);

  // 이미지 업로드 관련
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result);
        setEditUserInfo({
          ...editUserInfo,
          profile_image: reader.result,
        });
        resolve();
      };
    });
  };

  // 프리미엄 결제
  const buyPremium = () => {
    // 실제 적용시, 이미 프리미엄 유저인지 확인하는 것 필요 - 버튼 없앨꺼니까 괜찮
    axios({
      method: 'GET',
      url: defaultAPI + '/pay-service/kakaoPay/',
      headers: { Authorization: token },
    })
      .then(res => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: '결제 실패',
          text: '서버가 혼잡합니다. 다시 시도해 주세요.',
        });
      });
  };

  return (
    <>
      <MyPageWrapper>
        <MyPageContent>
          <UserInfoWrapper>
            <UserInfo>
              {editToggle ? (
                <div style={{ position: 'relative' }}>
                  <div className="preview">
                    {imageSrc ? (
                      <ProfileImg src={imageSrc} alt="Profile" />
                    ) : (
                      // <img
                      //   src={imageSrc}
                      //   alt="preview-img"
                      //   style={{
                      //     width: '120px',
                      //     height: '120px',
                      //     borderRadius: '50%',
                      //   }}
                      // />
                      <>
                        <ProfileImg
                          // src="images/google.png"
                          src={userInfo.profile_image}
                          alt="Profile"
                          style={{ filter: 'blur(4px)' }}
                        />
                      </>
                    )}
                    <label
                      htmlFor="upload-photo"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={e => encodeFileToBase64(e.target.files[0])}
                      />
                      <Button
                        component="span"
                        sx={{
                          textAlign: 'center',
                          color: 'black',
                          display: 'block',
                          width: '120px',
                        }}
                      >
                        Edit Photo
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <ProfileImg src={userInfo.profile_image} alt="Profile" />
              )}

              <Profile>
                {/* is_vip === 'T'일대만 `프리미엄 이용중` 보이기 */}
                {userInfo.is_vip === 'Y' && (
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
                    style={{
                      height: '30px',
                      width: '179px',
                      fontSize: '24px',
                    }}
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
                    // width: '130px',
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
                  onClick={handleEditToggle}
                >
                  프로필 변경
                </Button>
              )}

              {/* is_vip === 'N'일때만 ` Premium 버전 구독하기` 보이기 */}
              {userInfo.is_vip === 'N' && (
                <Button
                  variant="contained"
                  sx={{
                    // width: '213px',
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
                  onClick={buyPremium}
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'between',
              }}
            >
              <VideoBox>1</VideoBox>
              <VideoBox>2</VideoBox>
              <VideoBox>3</VideoBox>
              <VideoBox>4</VideoBox>
            </div>
          </VideoWrapper>
          <VideoWrapper>
            <h1 style={{ textAlign: 'center' }}>최근 본 강의</h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
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
            {recentInterview.map(info => (
              <InterviewBox key={info.id} {...info} />
              // <QuestionBox key={info.interviewSeq} {...info} />
            ))}
            {/* <InterviewBox question={'Q1'} />
            <InterviewBox question={'Q2'} />
            <InterviewBox question={'Q3'} /> */}
          </div>
          <div
            style={{
              paddingTop: '100px',
              paddingBottom: '100px',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>최근 푼 모의고사</h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
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
