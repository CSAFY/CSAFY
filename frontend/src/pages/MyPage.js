import React, { useEffect, useState } from 'react';
import StudyAnalysis from '../components/myPage/StudyAnalysis';
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { defaultAPI } from '../utils/api';
// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { Username } from '../recoils/Username';
import { Userinfo } from '../recoils/Userinfo';

// HEATMAP
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

// COMPONENTS
import InterviewBox from '../components/myPage/InterviewBox';
import TestBox from '../components/myPage/TestBox';
import VideoBox from '../components/myPage/VideoBox';
// import QuestionBox from '../components/QuestionBox';

// STYLED
import styled from 'styled-components';
import { Button } from '@mui/material';
import Hamburger from '../components/Hamburger';

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

  position: relative;
`;
const ColorBox = styled.div`
  display: flex;

  position: absolute;
  right: 20px;
  bottom: 45px;
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
  padding-top: 100px;
`;

function MyPage() {
  // 히트맵 데이터 관련
  const handleTest = () => {
    axios
      .post(`${defaultAPI}/cs-service/profile/heatmap`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };
  const handleGet = () => {
    axios
      .get(`${defaultAPI}/cs-service/profile/heatmap`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };
  //
  const navigate = useNavigate();
  // Recoil
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  // const [token, setToken] = useRecoilState(Token);
  const token = useRecoilValue(Token);
  // const [username, setUserName] = useRecoilState(Username);
  const setUserName = useSetRecoilState(Username);
  const [userinfo, setUserinfo] = useRecoilState(Userinfo);
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
        setUserName(res.data.username);
        setUserinfo({
          email: res.data.email,
          username: res.data.username,
        });
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
            profile_image: `https://csafy-profile.s3.amazonaws.com/${res.data.profile_image}`,
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
  // 최근 본 모의고사
  const [recentTest, setRecentTest] = useState([]);
  const getTests = () => {
    axios
      .get(`${defaultAPI}/cs-service/test/result`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log('최근 본 모의고사 --->', res);
        setRecentTest(res.data);
      })
      .catch(err => console.error(err));
  };

  // 학습 분석 데이터
  const [analysisData, setAnalysisData] = useState({});
  const getAnalysisData = () => {
    axios
      // .get(`${defaultAPI}/cs-service/profile/my/scores/get`, {
      .get(`${defaultAPI}/cs-service/profile/scores/get`, {
        params: {
          email: 'mingu49699@gmail.com',
          // email: 'test@naver.com',
        },
      })
      .then(res => {
        // console.log(res);
        setAnalysisData(res.data);
      })
      .catch(err => console.error(err));
  };
  // console.log(analysisData.scores['네트워크']);
  // console.log(recentStudy);
  useEffect(() => {
    getInfo();
    getRecentInterviewInfo();
    getRecentStudyInfo();
    getFavorites();
    getTests();
    getAnalysisData();
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

    //
    const formData = new FormData();
    formData.append('username', editUserInfo.username);
    formData.append('image', state.image);

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
          ...userinfo,
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
  }, [editToggle, userInfo.profile_image, userInfo.username]);
  // console.log(editUserInfo);
  // 이미지 업로드 관련
  const [imageSrc, setImageSrc] = useState('');
  const [state, setState] = useState({});
  const handleFile = e => {
    e.preventDefault();

    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setState({ image: file });
    };
    reader.readAsDataURL(file);
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
            {/* <Hamburger /> */}
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
            <CalendarHeatmap
              startDate={shiftDate(today, -250)}
              endDate={today}
              values={[
                { date: '2022-04-19', count: 1 },
                { date: '2022-04-20', count: 2 },
                { date: '2022-05-02', count: 3 },
                { date: '2022-05-04', count: 4 },
                { date: '2022-05-05', count: 5 },
                { date: '2022-05-06', count: 6 },
                { date: '2022-05-07', count: 7 },
                { date: '2022-05-08', count: 8 },
              ]}
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
          </UserInfoWrapper>
          <hr />
          <StudyAnalysisWrapper>
            <StudyAnalysis userInfo={userInfo} analysisData={analysisData} />
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

              position: 'relative',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>최근 본 면접 질문</h1>
            <Button
              style={{
                position: 'absolute',
                top: '125px',
                right: '105px',
              }}
              sx={{
                textAlign: 'center',
                display: 'block',
                bgcolor: '#008ED0',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },

                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={() => navigate('/interview')}
            >
              면접 연습하러 가기
            </Button>
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
                recentTest.map(test => (
                  <TestBox key={test.testSeq} {...test} />
                ))}
            </div>
          </div>
          {/* <button onClick={handleTest}>테스트</button>
          <button onClick={handleGet}>가져오기</button> */}
        </MyPageContent>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
