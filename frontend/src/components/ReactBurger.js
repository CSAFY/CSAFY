import React, { useState } from 'react';
import { Spin as SHamburger } from 'hamburger-react';
import { slide as Menu } from 'react-burger-menu';
// STYLED
import styled from 'styled-components';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
// import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const MenuItem = styled.div`
  width: 50px;
  height: 50px;
  // border: 1px solid black;
  border-radius: 50%;
  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function ReactBurger() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <SHamburger toggled={isOpen} toggle={setOpen} color="#009859" />
      </MenuItem>
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MenuItem style={{ backgroundColor: '#b5fcca' }}>
            <HomeOutlinedIcon sx={{ width: '80%', height: '80%' }} />
          </MenuItem>
          <MenuItem style={{ backgroundColor: '#d2fae2' }}>
            <QuizOutlinedIcon sx={{ width: '80%', height: '80%' }} />
          </MenuItem>
          <MenuItem style={{ backgroundColor: '#dcfff3' }}>
            <ExitToAppOutlinedIcon sx={{ width: '80%', height: '80%' }} />
          </MenuItem>
        </div>
      )}
    </>
  );
}

export default ReactBurger;
