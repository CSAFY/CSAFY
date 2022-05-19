/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { defaultAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// RECOIL
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Token } from '../recoils/Token';
import { Username } from '../recoils/Username';
import { Userinfo } from '../recoils/Userinfo';

// COMPONENTS
import AuthModal from '../components/AuthModal';

// STYLED
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { Box, Button, Modal } from '@mui/material';
import swal from 'sweetalert2';

const loginStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '517px',
  height: '697px',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};
const signupStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '517px',
  height: '834px',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};

const HomeWrapper = styled.div`
  // background-image: url(/images/main-background.png);
  background-image: url(/images/back-tmp.png);
  background-size: contain;
  // background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  // min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroWrapper = styled.section`
  height: 100%;
  width: 100%;
  padding-top: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeroContent = styled.div`
  width: 1232px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const HeroMain = styled.div``;
const HeroImage = styled.img`
  width: 1202px;
  height: 747px;
  // box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  flex-grow: 0;
`;

const DataWrapper = styled.section`
  height: 800px;
  width: 100%;

  padding-top: 200px;

  display: flex;
  justify-content: center;
`;
const DataContent = styled.div`
  width: 1232px;

  position: relative;
`;

const InfoWrapper = styled.section`
  width: 100%;
  height: 1000px;
  background-color: #f1fcff;

  display: flex;
  justify-content: center;
`;
const InfoContent = styled.div`
  width: 1232px;

  position: relative;
`;

const MetaWrapper = styled.section`
  width: 100%;
  height: 800px;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const MetaContent = styled.div`
  width: 1232px;

  display: flex;
  align-items: center;
`;
const MetaImage = styled.img`
  width: 663px;
  height: 453px;
  border-radius: 15px;
  // border: 1px solid black;
`;

const PlusWrapper = styled.section`
  width: 100%;
  height: 1000px;

  background-color: #d4effa;
  padding-top: 100px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlusContent = styled.div`
  width: 1232px;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const MockImage = styled.img`
  width: 80vw;
  // height: 550px;

  margin-top: 5rem;
`;
const ButtonBox = styled.div`
  display: flex;

  margin-top: 2rem;
`;

function Home() {
  const navigate = useNavigate();

  // Recoil
  const token = useRecoilValue(Token);
  const setUserName = useSetRecoilState(Username);
  const setUserinfo = useSetRecoilState(Userinfo);
  // State
  const [modal, setModal] = useState(false);
  const [state, setState] = useState('signup');

  // 모달 닫기
  const handleModalClose = () => {
    setModal(false);
  };
  // '바로 시작하기' 버튼 클릭
  const handleStart = () => {
    if (token) {
      navigate('/studyframepage');
    } else {
      setModal(true);
    }
  };
  // '학습 시작하기' 버튼
  const handleStudy = () => {
    if (token) {
      navigate('/intensivepage');
    } else {
      swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다.',
        text: '로그인이 필요합니다. 회원가입 또는 로그인을 진행해주세요.',
      });
    }
  };
  // '메타버스 체험하기' 버튼
  const handleMeta = () => {
    navigate('/community');
  };
  // '모바일 버전' 버튼
  const handleMobile = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.csafy.csafy_android',
      '_blank',
    );
  };

  // 사용자 정보 리코일 저장 - for google login
  const getInfo = () => {
    axios
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
          is_vip: res.data.is_vip,
          profile_image: `https://csafy-profile.s3.amazonaws.com/${res.data.profile_image}`,
        });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getInfo();
  }, [token]);

  return (
    <HomeWrapper>
      <HeroWrapper>
        <Modal
          open={modal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {state === 'login' ? (
            <Box sx={loginStyle}>
              <AuthModal
                state={state}
                setState={setState}
                setModal={setModal}
              />
            </Box>
          ) : (
            <Box sx={signupStyle}>
              <AuthModal
                state={state}
                setState={setState}
                setModal={setModal}
              />
            </Box>
          )}
        </Modal>
        <HeroContent>
          <HeroMain>
            <div
              style={{
                height: '140px',
                fontSize: '56px',
                fontWeight: 'bold',
                margin: '0 0 39px',
              }}
            >
              <p style={{ margin: 'auto' }}>막막한 CS 공부</p>
              <p style={{ margin: 'auto' }}>학습부터 면접까지 한 번에!</p>
            </div>
            <div
              style={{
                height: '92px',
                margin: '39px 128px 0 129px',
                fontSize: '18px',
              }}
            >
              <p style={{ margin: 'auto' }}>
                개발자들의 필수 관문, CS 면접 준비
              </p>
              <p style={{ margin: 'auto' }}>
                어디서부터 어떻게 시작해야할 지 모르겠다면?
              </p>
              <br />
              <p style={{ margin: 'auto' }}>
                시험부터 면접까지{' '}
                <strong
                  style={{
                    color: '#008ED0',
                    fontWeight: '800',
                  }}
                >
                  C;SAFY
                </strong>
                에서 준비했습니다.
              </p>
            </div>
          </HeroMain>
          <Button
            variant="contained"
            sx={{
              width: '200px',
              height: '53px',
              textAlign: 'center',
              display: 'block',
              margin: '51px 74px 52px 37px',
              border: '1px solid contained',
              borderRadius: '100px',
              backgroundColor: '#008ed0',

              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              // ':hover': {
              //   color: '#008ed0',
              //   bgcolor: 'white',
              // },
            }}
            onClick={handleStart}
          >
            바로 시작하기
          </Button>
          <HeroImage src="images/hero.png" alt="Img" />
        </HeroContent>
      </HeroWrapper>
      <DataWrapper>
        <DataContent>
          <div style={{ position: 'absolute', top: '100px' }}>
            <p
              style={{
                margin: '0',
                color: '#008ED0',
                // width: '198px',
                height: '23px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              맞춤 분석 학습 솔루션
            </p>
            <p
              style={{
                // width: '343px',
                height: '50px',
                fontSize: '40px',
                fontWeight: '800',

                margin: '7px 147px 14px 0',
              }}
            >
              개인 분석 데이터 제공
            </p>
            <div
              style={{
                // width: '490px',
                height: '46px',
                fontSize: '18px',
                color: '#a7a8a9',
              }}
            >
              <p style={{ margin: 'auto' }}>
                개개인의 학습 진도와 모의고사 결과를 통해 분석된 데이터를
                바탕으로
              </p>
              <p style={{ margin: 'auto' }}>
                강의 등을 추천받아 보다 효과적인 학습을 할 수 있습니다.
              </p>
            </div>
          </div>
          <Fade right>
            <img
              src="images/radar.png"
              alt="Graph1"
              style={{
                position: 'absolute',
                right: '74px',
                width: '375px',
                height: '375px',
              }}
            />
            <img
              src="images/bar.png"
              alt="Graph2"
              style={{
                position: 'absolute',
                top: '300px',
                left: '219px',
                width: '686px',
                height: '311px',
              }}
            />
            <img
              src="images/csafy-github.png"
              alt="Card1"
              style={{
                position: 'absolute',
                top: '450px',
                right: '91px',
                width: '362px',
                height: '188px',
              }}
            />
          </Fade>
        </DataContent>
      </DataWrapper>

      <InfoWrapper>
        <InfoContent>
          <Fade left>
            <img
              src="images/home/keyword.png"
              alt="Study1"
              style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
                width: '627px',
                height: '431px',
                borderRadius: '10px',
              }}
            />
            <img
              src="images/home/testresult.png"
              alt="Info3"
              style={{
                width: '550px',
                height: '550px',
                position: 'absolute',
                top: '400px',
                right: '100px',
                borderRadius: '10px',
              }}
            />
            <img
              src="images/home/quizes.png"
              alt="Info2"
              style={{
                position: 'absolute',
                top: '400px',
                left: '100px',
                width: '550px',
                height: '400px',
              }}
            />
          </Fade>
          <div
            style={{
              position: 'absolute',
              top: '100px',
              right: '10px',
            }}
          >
            <p
              style={{
                // width: '198px',
                height: '23px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#008ED0',
                margin: '0 249px 6px 0',
              }}
            >
              실전 기반 모의고사 제공
            </p>
            <div
              style={{
                // width: '264px',
                height: '100px',
                fontSize: '40px',
                fontWeight: '800',
              }}
            >
              <p style={{ margin: '0' }}>기억에 남는 학습</p>
              <p style={{ margin: '0' }}>실전에 강한 시험</p>
            </div>
            <div
              style={{
                // width: '447px',
                height: '69px',
                margin: '13px 0 0',
                fontSize: '18px',
                color: '#9d9d9d',
              }}
            >
              <p style={{ margin: 'auto' }}>
                단기 기억력을 높여주는 방식을 통해 빠르게 습득할 수 있습니다.
              </p>
              <p style={{ margin: 'auto' }}>
                학습한 내용을 바탕으로 진행 가능한 모의고사를 통해
              </p>
              <p style={{ margin: 'auto' }}>
                확실한 학습 효과를 얻을 수 있습니다.
              </p>
            </div>
          </div>
        </InfoContent>
      </InfoWrapper>
      <MetaWrapper>
        <MetaContent>
          <div style={{ width: '50%' }}>
            <p
              style={{
                // width: '198px',
                height: '23px',
                margin: '0 249px 8px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#008ED0',
              }}
            >
              온라인 + 오프라인 면접 환경
            </p>
            <div
              style={{
                // width: '334px',
                height: '100px',
                margin: '8px 113px 13px 0',
                fontSize: '40px',
                fontWeight: '800',
              }}
            >
              <p style={{ margin: 'auto' }}>메타버스 환경을 통한</p>
              <p style={{ margin: 'auto' }}>실전 면접 역량 강화</p>
            </div>
            <div
              style={{
                // width: '447px',
                height: '69px',
                margin: '13px 0 0 ',
                fontSize: '18px',
                color: '#9d9d9d',
              }}
            >
              <p style={{ margin: 'auto' }}>
                메타버스를 통해 친구들과 함께 학습하고,
              </p>
              <p style={{ margin: 'auto' }}>
                실제 면접을 연습하며 면접을 대비할 수 있습니다.
              </p>
              {/* <p style={{ margin: 'auto' }}>
                확실한 학습 효과를 얻을 수 있습니다.
              </p> */}
            </div>
          </div>
          <Fade right>
            <MetaImage src="images/meta.gif" alt="Meta" />
          </Fade>
        </MetaContent>
      </MetaWrapper>
      <PlusWrapper>
        <PlusContent>
          <div>
            <p
              style={{
                // width: '567px',
                height: '69px',
                margin: '0 112px 25px 111px',
                fontSize: '55px',
                fontWeight: '800',
                color: '#008ecf',
              }}
            >
              언제 어디서나, CS 공부를
            </p>
            <div
              style={{
                // width: '790px',
                height: '50px',
                margin: '25px 0 0',
                fontSize: '20px',
                color: ' #008ecf',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 'auto' }}>
                C;SAFY는 PC, 메타버스, 모바일이 서로 연동되어 있어 언제 어디서든
                학습을 이어나갈 수 있습니다.
              </p>
              <p style={{ margin: 'auto' }}>
                시간과 공간의 제약 없이 원하는 곳에서, 편하게 공부하세요.
              </p>
            </div>
          </div>
          <Fade bottom>
            <MockImage src="images/mock.png" alt="Mock" />
          </Fade>
          <ButtonBox>
            <Button
              variant="contained"
              sx={{
                width: '220px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={handleStudy}
            >
              학습 시작하기
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '220px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={handleMeta}
            >
              메타버스 체험하기
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '220px',
                height: '53px',
                textAlign: 'center',
                display: 'block',
                margin: '0 38px',
                border: '1px solid contained',
                borderRadius: '100px',
                // ':hover': {
                //   color: '#008ed0',
                //   bgcolor: 'white',
                // },
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={handleMobile}
            >
              모바일 버전 시작하기
            </Button>
          </ButtonBox>
        </PlusContent>
      </PlusWrapper>
    </HomeWrapper>
  );
}

export default Home;
