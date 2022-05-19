/* eslint-disable */
import React, { useState } from 'react';
import { Spin as SHamburger } from 'hamburger-react';
import { slide as Menu } from 'react-burger-menu';

// STYLED
import styled from 'styled-components';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CurrentPage } from '../recoils/CurrentPage';

const MenuItem = styled.div`
  width: 50px;
  height: 50px;
  // border: 1px solid black;
  border-radius: 50%;
  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

function ReactBurger(props) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPage);

  const handleHome = () => {
    setCurrentPage('/');
    navigate('/');
  };
  const handleScreenShot = () => {
    props.handleClickTakeScreenshot();
  };
  const handleFullScreen = () => {
    props.handleClickFullscreen();
  };

  return (
    <>
      <MenuItem style={{ backgroundColor: '#008ed0' }}>
        <SHamburger toggled={isOpen} toggle={setOpen} color="#f0f9fa" />
      </MenuItem>
      {isOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MenuItem
            style={{
              backgroundColor: '#84c2ea',
            }}
            onClick={handleHome}
          >
            <HomeOutlinedIcon
              sx={{
                width: '80%',
                height: '80%',
                // color: 'white'
              }}
            />
          </MenuItem>
          <MenuItem
            style={{
              backgroundColor: '#def9ff',
            }}
          >
            <ScreenshotMonitorIcon
              sx={{
                width: '80%',
                height: '80%',
              }}
              onClick={handleScreenShot}
            />
          </MenuItem>
          <MenuItem
            style={{
              backgroundColor: '#f0f9fa',
            }}
          >
            <FullscreenIcon
              sx={{
                width: '80%',
                height: '80%',
              }}
              onClick={handleFullScreen}
            />
          </MenuItem>
        </div>
      )}
    </>
  );
}

export default ReactBurger;
