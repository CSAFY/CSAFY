/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { defaultAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// RECOIL
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { Token } from '../recoils/Token';
import { Username } from '../recoils/Username';
import { Userinfo } from '../recoils/Userinfo';
// 로그아웃 관련
// RECOIL
import { LoginState } from '../recoils/LoginState';
import {
  keyWordData,
  fourWayRaceData,
  oxquizData,
  videoData,
  studyData,
} from '../recoils';
import { CurrentPage } from '../recoils/CurrentPage';
import { NavToggle } from '../recoils/NavToggle';

// COMPONENTS
import StudyAnalysis from '../components/myPage/StudyAnalysis';
import InterviewBox from '../components/myPage/InterviewBox';
import TestBox from '../components/myPage/TestBox';
import VideoBox from '../components/myPage/VideoBox';
// HEATMAP
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

// STYLED
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import swal from 'sweetalert2';
import MyBadge from '../components/MyBadge';

const MyPageWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f5f5f5;
  // background-color: white;
`;
const MyPageContent = styled.div`
  width: 1232px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;
const ColorBox = styled.div`
  display: flex;

  position: absolute;
  right: 0px;
  bottom: 90px;
`;
const Color = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  color: grey;

  padding-right: 30px;
`;

const GreenBox = styled.div`
  width: 18px;
  height: 18px;

  border-radius: 5px;

  margin-left: 10px;
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

const StudyAnalysisWrapper = styled.div`
  padding-top: 50px;
`;

const VideoWrapper = styled.div`
  // padding-top: 50px;
`;
const BadgeWrapper = styled.div`
  height: 380px;

  position: relative;
`;

const Badges = styled.div`
  fontsize: 28px;
  // border: 1px solid black;
  width: 985px;
  // height: 160px;
  background: #fff;
  border-radius: 10px;

  display: flex;
  // justifycontent: center;
  align-items: center;

  position: absolute;
  top: 100px;
  left: 150px;
`;

function MyPage() {
  const navigate = useNavigate();
  // 로그아웃 관련
  // Recoil
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const setToggle = useSetRecoilState(NavToggle);
  //reset용 recoil
  const resetKeyWordData = useResetRecoilState(keyWordData);
  const resetFourWayRaceData = useResetRecoilState(fourWayRaceData);
  const resetOXQuizData = useResetRecoilState(oxquizData);
  const resetVideoData = useResetRecoilState(videoData);
  const resetStudyData = useResetRecoilState(studyData);
  const setUserName = useSetRecoilState(Username);
  const [userInfo, setUserInfo] = useRecoilState(Userinfo);
  const setCurrentPage = useSetRecoilState(CurrentPage);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('study_data_token');
    localStorage.removeItem('four_way_Race_data_token');
    localStorage.removeItem('keyWord_data_token');
    localStorage.removeItem('oxquiz_data_token');
    localStorage.removeItem('video_data_token');
    // Recoil
    setIsLoggedIn(false);
    setToken('');
    setUserInfo({});
    setUserName('');
    resetKeyWordData();
    resetFourWayRaceData();
    resetOXQuizData();
    resetVideoData();
    resetStudyData();
    // 이동
    navigate('/');
    setCurrentPage('/');
    setToggle(false);
  };

  // State
  // 프로필 변경 관련
  const [editToggle, setEditToggle] = useState(false);
  // 히트맵 데이터
  const [heatmapData, setHeatmapData] = useState([
    { date: '1994-03-22', count: 0 },
  ]);
  const today = new Date();
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
  // 최근 본 면접 질문
  const [recentInterview, setRecentInterview] = useState([]);
  // 최근 본 강의
  const [recentStudy, setRecentStudy] = useState([]);
  // 즐겨찾기 한 강의
  const [favorites, setFavorites] = useState([]);
  // 최근 본 모의고사
  const [recentTest, setRecentTest] = useState([]);
  // 학습 분석 데이터
  const [analysisData, setAnalysisData] = useState({});
  // 뱃지 데이터
  const [badges, setBadges] = useState([]);

  // 사용자 정보 가져오기
  // console.log(userInfo);
  const getInfo = () => {
    axios
      .get(`${defaultAPI}/user-service/token/user`, {
        params: {
          inputToken: token,
        },
      })
      .then(res => {
        // console.log('🎃', res);
        setUserName(res.data.username);
        setUserInfo({
          email: res.data.email,
          username: res.data.username,
          is_vip: res.data.is_vip,
          profile_image: `https://csafy-profile.s3.amazonaws.com/${res.data.profile_image}`,
        });
      })
      .catch(err => console.error(err));
  };

  // 히트맵 데이터 api
  const getHeatmapData = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/heatmap`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log('히트맵 데이터 --->', res);
        if (res.data) {
          setHeatmapData(res.data);
        }
      })
      .catch(err => console.error(err));
  };
  // 최근 본 면접 질문
  const getRecentInterviewInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/interview/seen`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log('최근 본 면접 질문 --->', res);
        setRecentInterview(res.data);
      })
      .catch(err => console.error(err));
  };
  // 최근 본 강의
  const getRecentStudyInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/study/seen`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log('최근 본 강의 --->', res);
        setRecentStudy(res.data);
      })
      .catch(err => console.error(err));
  };
  // 즐겨찾기 한 강의
  const getFavorites = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/study/favorites`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log('즐겨찾기 한 강의 --->', res);
        setFavorites(res.data);
      })
      .catch(err => console.error(err));
  };
  // 최근 본 모의고사
  const getTests = () => {
    axios
      .get(`${defaultAPI}/cs-service/test/result`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log('최근 본 모의고사 --->', res);
        setRecentTest(res.data);
      })
      .catch(err => console.error(err));
  };
  // 학습 분석 데이터
  const getAnalysisData = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/my/scores/get`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        setAnalysisData(res.data);
      })
      .catch(err => console.error(err));
  };
  // 뱃지
  const getBadge = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/badge`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        setBadges(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getInfo();
    getHeatmapData();
    getRecentInterviewInfo();
    getRecentStudyInfo();
    getFavorites();
    getTests();
    getAnalysisData();
    getBadge();
  }, []);

  // --- 프로필 변경 관련 ---
  const [editUserInfo, setEditUserInfo] = useState({
    username: '',
    profile_image: '',
  });
  // 이미지 업로드
  const [imageSrc, setImageSrc] = useState('');
  const [state, setState] = useState({});
  const handleFile = e => {
    e.preventDefault();
    let reader = new FileReader();
    const file = e.target.files[0];
    // console.log(e.target.files[0]);
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setState({ image: file });
    };
    reader.readAsDataURL(file);
  };
  // console.log(editUserInfo, state);

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  };
  const handleEditInput = e => {
    setEditUserInfo({
      ...editUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditButton = () => {
    setEditToggle(!editToggle);
    const formData = new FormData();
    formData.append('username', editUserInfo.username);
    // if (state.image) {
    formData.append('image', state.image);
    // } else {
    //   formData.append(
    //     'image',
    //     `https://csafy-profile.s3.amazonaws.com/default/default_1.PNG`,
    //   );
    // }

    // console.log('🐸', state.image);

    axios
      .put(` https://csafy.com/api/v1/user-service/update`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        // console.log(res);
        setUserName(res.data.username);
        setUserInfo({
          ...userInfo,
          username: res.data.username,
        });
        setEditUserInfo({
          username: res.data.username,
          // profile_image: res.data.profileImg,
          profile_image: `https://csafy-profile.s3.amazonaws.com/${res.data.profileImg}`,
        });
        setUserInfo({
          ...userInfo,
          username: res.data.username,
          // profile_image: res.data.profileImg,
          profile_image: `https://csafy-profile.s3.amazonaws.com/${res.data.profileImg}`,
        });
      })
      .catch(err => {
        console.error(err);
        // alert('프로필 사진을 등록해 주세요.');
        swal.fire({
          icon: 'warning',
          position: 'middle',
          title: '프로필 사진을 등록해 주세요.',

          // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '확인', // confirm 버튼 텍스트 지정
          // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        });
      });
  };

  // console.log(editUserInfo);

  useEffect(() => {
    setEditUserInfo({
      username: userInfo.username,
      profile_image: userInfo.profile_image,
    });
  }, [editToggle]);

  // 프리미엄 결제
  const buyPremium = () => {
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
  // 챗봇 상담
  const handleChat = () => {
    navigate('/chat');
  };

  const badgeWrapperHeight = 300 + parseInt(badges.length / 10) * 80;

  // console.log(badgeWrapperHeight);
  // console.log(analysisData);
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
                        // onChange={e => encodeFileToBase64(e.target.files[0])}
                        // onChange={uploadFile}
                        onChange={handleFile}
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
                <>
                  {userInfo.is_vip === 'Y' ? (
                    <ProfileImg
                      src={userInfo.profile_image}
                      alt="Profile"
                      style={{
                        boxShadow: '0 0 20px 2px rgba(0, 142, 208, 1)',
                      }}
                    />
                  ) : (
                    <ProfileImg src={userInfo.profile_image} alt="Profile" />
                  )}
                </>
              )}

              <Profile>
                {/* is_vip === 'Y'일대만 `프리미엄 이용중` 보이기 */}
                {userInfo.is_vip === 'Y' && (
                  <div
                    style={{
                      width: '85px',
                      height: '23px',
                      margin: '0',
                      marginBottom: '5px',
                      borderRadius: '6px',
                      background:
                        'linear-gradient(to right bottom, #008ed0, #b5fcca)',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: 'white',

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
                      border: 'none',
                      borderRadius: '10px',
                      marginBottom: '4px',
                    }}
                    value={editUserInfo.username}
                    onChange={handleEditInput}
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
                  onClick={handleEditButton}
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
              {userInfo.email === 'admin@csafy.com' && (
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
                  onClick={handleChat}
                >
                  채팅
                </Button>
              )}
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

                  position: 'absolute',
                  right: '10px',
                }}
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </UserInfo>
          </UserInfoWrapper>
          <hr style={{ color: '#D7E4EC' }} />
          <StudyAnalysisWrapper>
            <StudyAnalysis
              userInfo={userInfo}
              analysisData={analysisData}
              recentTest={recentTest}
            />
          </StudyAnalysisWrapper>
          <div
            style={{
              width: '80%',
              height: '380px',
              // border: '1px solid black',
              position: 'relative',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                marginLeft: '30px',
                marginBottom: '10px',
              }}
            >
              나의 학습일지
            </h2>
            {heatmapData && (
              <>
                <CalendarHeatmap
                  startDate={shiftDate(today, -250)}
                  endDate={today}
                  values={heatmapData}
                  classForValue={value => {
                    if (!value) {
                      return 'color-empty';
                    } else {
                      if (value.count === 1) {
                        return `color-github-1`;
                      } else if (value.count <= 3) {
                        return `color-github-2`;
                      } else if (value.count <= 6) {
                        return `color-github-3`;
                      } else {
                        return `color-github-4`;
                      }
                    }
                    // return `color-github-${value.count}`;
                  }}
                  showWeekdayLabels={true}
                  // tooltip 사라지게 하는 방법...
                  tooltipDataAttrs={value => {
                    if (value.count) {
                      return {
                        'data-tip': `${value.count} Contributions on ${value.date}`,
                      };
                    } else {
                      return {
                        'data-tip': `No Contribution`,
                      };
                    }
                  }}
                />
                <ReactTooltip />
              </>
            )}
            <ColorBox>
              <Color>
                <div>1문제</div>
                <GreenBox
                  style={{
                    backgroundColor: '#D6E685',
                    border: '1px solid #D6E685',
                  }}
                />
              </Color>
              <Color>
                <div>2-3문제</div>
                <GreenBox
                  style={{
                    backgroundColor: '#8CC665',
                    border: '1px solid #8CC665',
                  }}
                />
              </Color>
              <Color>
                <div>4-6문제</div>
                <GreenBox
                  style={{
                    backgroundColor: '#44A340',
                    border: '1px solid #44A340',
                  }}
                />
              </Color>
              <Color style={{ paddingRight: '0' }}>
                <div>7-10문제</div>
                <GreenBox
                  style={{
                    backgroundColor: '#1E6823',
                    border: '1px solid #1E6823',
                  }}
                />
              </Color>
            </ColorBox>
          </div>
          <BadgeWrapper style={{ height: `${badgeWrapperHeight}px` }}>
            <h2
              style={{
                fontSize: '28px',

                position: 'absolute',
                top: '25px',
                left: '150px',
              }}
            >
              나의 뱃지
            </h2>
            <Badges>
              <Box
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)' }}
              >
                {badges.map(badge => (
                  <MyBadge key={badge.badgeSeq} {...badge} />
                ))}
              </Box>
            </Badges>
          </BadgeWrapper>
          <VideoWrapper>
            <h1 style={{ textAlign: 'center' }}>즐겨찾는 학습</h1>
            <div
              style={{
                display: 'flex',
                paddingTop: '20px',
                // justifyContent: 'center',
              }}
            >
              {favorites &&
                favorites.map(favorite => (
                  <VideoBox key={favorite.id} {...favorite} />
                ))}
            </div>
          </VideoWrapper>
          <VideoWrapper style={{ marginTop: '100px' }}>
            <h1 style={{ textAlign: 'center' }}>최근 본 강의</h1>
            <div
              style={{
                display: 'flex',
                paddingTop: '20px',
                // justifyContent: 'center',
              }}
            >
              {recentStudy &&
                recentStudy.map(recent => (
                  <VideoBox key={recent.id} {...recent} />
                ))}
            </div>
          </VideoWrapper>
          <div
            style={{
              paddingTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              position: 'relative',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>최근 본 면접 질문</h1>
            <div
              style={{
                position: 'absolute',
                top: '135px',
                right: '105px',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/interview')}
            >
              면접 연습하러 가기
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{
                  marginLeft: '4px',
                  marginBottom: '2px',
                }}
              />
            </div>
            {recentInterview &&
              recentInterview.map(info => (
                <InterviewBox key={info.id} {...info} />
                // <QuestionBox key={info.interviewSeq} {...info} />
              ))}
          </div>
          <div
            style={{
              paddingTop: '100px',
              paddingBottom: '100px',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>내가 푼 모의고사</h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {recentTest &&
                recentTest
                  .slice(0, 4)
                  .map(test => <TestBox key={test.testSeq} {...test} />)}
            </div>
          </div>
        </MyPageContent>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
