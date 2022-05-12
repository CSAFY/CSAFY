import styled from '@emotion/styled';
import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FeedIcon from '@mui/icons-material/Feed';
import { useLocation } from 'react-router-dom';

const FooterWrapper = styled.footer`
  height: 347px;
  width: 100vw;
  background-color: #f8f8f8;
  color: #7f898f;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: space-evenly;
`;
const IconBox = styled.div`
  display: flex;
  position: relative;
`;
const Icons = styled.div`
  position: absolute;
  right: 50px;
  bottom: 0px;
`;

function Footer() {
  const location = useLocation();

  if (location.pathname === '/community') return null;
  return (
    <>
      <FooterWrapper>
        <div style={{ paddingLeft: '3rem' }}>
          <img
            src="https://csafy-profile.s3.amazonaws.com/logo/logo_long.png"
            alt="Csafy"
            style={{ width: '150px' }}
          />
          <p style={{ marginTop: '0' }}>개발자가 되기 위한 가장 빠른 방법</p>
        </div>
        <div>
          <div>
            <h2>About Us</h2>
            <hr />
            <p>
              삼성 청년 소프트웨어 아카데미(SSAFY)의 지원을 받아 직접 제작한
              서비스입니다.
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
      </FooterWrapper>
    </>
  );
}

export default Footer;
