/* eslint-disable */
import styled from '@emotion/styled';
import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FeedIcon from '@mui/icons-material/Feed';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';

const FooterWrapper = styled.footer`
  height: 260px;
  width: 100vw;
  background-color: #f8f8f8;
  color: #7f898f;

  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // align-content: space-evenly;
`;
const FirstDiv = styled.div`
  height: 230px;
  width: 25%;
  position: absolute;
`;
const LogoImg = styled.img`
  width: 200px;
  position: absolute;
  top: 30px;
  left: 50px;
`;
const Explain = styled.div`
  position: absolute;
  top: 110px;
  left: 50px;
`;
const SecondDiv = styled.div`
  height: 230px;
  width: 35%;
  position: absolute;
  left: 25%;
`;
const AboutUs = styled.div`
  width: 100%;
  position: absolute;
  top: 10px;
  left: 50px;
`;
const Developer = styled.div`
  width: 100%;
  position: absolute;
  top: 130px;
  left: 50px;
`;
const Name = styled.div`
  height: 30px;

  cursor: pointer;
  // border: 1px solid black;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;
const ThirdDiv = styled.div`
  height: 230px;
  width: 30%;

  position: absolute;
  left: 60%;
`;

const IconBox = styled.div`
  display: flex;
`;
const Icons = styled.div`
  position: absolute;
  right: 50px;
  bottom: 0px;
`;

function Footer() {
  const location = useLocation();

  const handleKMin9 = () => {
    window.open('https://github.com/k-min9', '_blank');
  };
  const handleOnwWay = () => {
    window.open('https://github.com/Oneway-2', '_blank');
  };
  const handleRuwan9 = () => {
    window.open('https://github.com/ruwan9', '_blank');
  };
  const handleDahunIm = () => {
    window.open('https://github.com/DahunIm', '_blank');
  };
  const handleChoiYoungUn = () => {
    window.open('https://github.com/Choi-YoungUn', '_blank');
  };
  const handleDevhapeng = () => {
    window.open('https://github.com/devhapeng', '_blank');
  };

  if (location.pathname === '/community') return null;
  return (
    <>
      <FooterWrapper>
        <FirstDiv>
          <LogoImg
            src="https://csafy-profile.s3.amazonaws.com/logo/logo_test.png"
            alt="Csafy"
          />
          <Explain>???????????? ?????? ?????? ?????? ?????? ??????</Explain>
        </FirstDiv>
        <SecondDiv>
          <AboutUs>
            <h3 style={{ marginBottom: '5px' }}>About Us</h3>
            <hr style={{ width: '100%' }} />
            <div>
              <p
                style={{
                  fontSize: '13px',
                  marginTop: '5px',
                  marginBottom: '0',
                }}
              >
                ?????? ?????? ??????????????? ????????????(SSAFY)??? ????????? ?????? ?????? ?????????
                ??????????????????.
              </p>
              <p style={{ fontSize: '13px', margin: '0' }}>
                CS ????????? ???????????? ?????? ????????? ????????? ?????? ?????????????????????.
              </p>
              <p style={{ fontSize: '13px', margin: '0' }}>
                ?????? ????????? ???????????? ?????? ????????? ????????? ????????? ?????? ??? ?????????
                ??????????????? ????????????????????????.
              </p>
            </div>
          </AboutUs>
          <Developer>
            <h3 style={{ marginBottom: '5px' }}>Developer</h3>
            <hr style={{ width: '100%' }} />
            <Box
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              <Name onClick={handleKMin9}>?????????</Name>
              <Name onClick={handleOnwWay}>?????????</Name>
              <Name onClick={handleRuwan9}>?????????</Name>
              <Name onClick={handleDahunIm}>?????????</Name>
              <Name onClick={handleChoiYoungUn}>?????????</Name>
              <Name onClick={handleDevhapeng}>?????????</Name>
            </Box>
          </Developer>
        </SecondDiv>
        <ThirdDiv>
          <IconBox>
            <Icons>
              <GitHubIcon
                style={{
                  color: '#7F898F',
                  cursor: 'pointer',
                  height: '40px',
                  width: '40px',
                }}
                onClick={() => {
                  window.open('https://lab.ssafy.com/s06-final/S06P31A102');
                }}
              />
              <FeedIcon
                style={{
                  color: '#7F898F',
                  cursor: 'pointer',
                  height: '40px',
                  width: '40px',
                  marginLeft: '20px',
                  marginRight: '20px',
                }}
                onClick={() => {
                  window.open(
                    'https://www.notion.so/C-SAFY-a3dfb36514524af9b758d76de9a2ed2c',
                  );
                }}
              />
              <YouTubeIcon
                style={{
                  color: '#7F898F',
                  cursor: 'pointer',
                  height: '40px',
                  width: '40px',
                }}
                onClick={() => {
                  window.open('https://www.youtube.com/');
                }}
              />
            </Icons>
          </IconBox>
        </ThirdDiv>
      </FooterWrapper>
      {/* <FooterWrapper>
        <div style={{ paddingLeft: '3rem' }}>
          <img
            src="https://csafy-profile.s3.amazonaws.com/logo/logo_test.png"
            alt="Csafy"
            style={{ width: '150px' }}
          />
          <p style={{ marginTop: '0' }}>???????????? ?????? ?????? ?????? ?????? ??????</p>
        </div>
        <div>
          <div>
            <h2>About Us</h2>
            <hr />
            <p>
              ?????? ?????? ??????????????? ????????????(SSAFY)??? ????????? ?????? ?????? ?????????
              ??????????????????.
            </p>
          </div>
          <div>
            <h2>Developer</h2>
            <hr />
          </div>
        </div>
        <IconBox>
          <Icons>
            <GitHubIcon
              style={{
                color: '#7F898F',
                cursor: 'pointer',
                height: '40px',
                width: '40px',
              }}
              onClick={() => {
                window.open('https://lab.ssafy.com/s06-final/S06P31A102');
              }}
            />
            <FeedIcon
              style={{
                color: '#7F898F',
                cursor: 'pointer',
                height: '40px',
                width: '40px',
                marginLeft: '20px',
                marginRight: '20px',
              }}
              onClick={() => {
                window.open(
                  'https://www.notion.so/C-SAFY-a3dfb36514524af9b758d76de9a2ed2c',
                );
              }}
            />
            <YouTubeIcon
              style={{
                color: '#7F898F',
                cursor: 'pointer',
                height: '40px',
                width: '40px',
              }}
              onClick={() => {
                window.open('https://www.youtube.com/');
              }}
            />
          </Icons>
        </IconBox>
      </FooterWrapper> */}
    </>
  );
}

export default Footer;
