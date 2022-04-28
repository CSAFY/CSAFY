// import { Button } from '@mui/material';
import React from 'react';
import BeforeLogin from '../components/Home/BeforeLogin';

// STYLED
import styled from 'styled-components';

const HomeWrapper = styled.div`
  background-color: #d5f2fc;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  return (
    <HomeWrapper>
      <BeforeLogin />
    </HomeWrapper>
  );
}

export default Home;
