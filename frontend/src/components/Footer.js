import styled from '@emotion/styled';
import React from 'react';

const FooterWrapper = styled.div`
  height: 30vh;
  background-color: black;
  color: white;

  padding-left: 3rem;
  padding-right: 3rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: space-evenly;
`;

function Footer() {
  return (
    <>
      <FooterWrapper>
        <div>
          <h1>C;SSAFY</h1>
          <p style={{ marginTop: '0' }}>개발자가 되기 위한 가장 빠른 방법</p>
        </div>
        <div>About Us</div>
        <div>Contact Info</div>
      </FooterWrapper>
    </>
  );
}

export default Footer;
