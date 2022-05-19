/* eslint-disable */
import React from 'react';

// STYLED
import styled from 'styled-components';

const BadgeForm = styled.div`
  height: 80px;
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  // border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MyBadge({ badgeSeq }) {
  return (
    <BadgeForm>
      <img
        src={`images/badgesNum/${badgeSeq}.png`}
        alt="Badge"
        style={{
          width: '70px',
          // boxShadow: '0 0 15px 0 rgba(0, 142, 208, 0.3)',
        }}
      />

      {/* <div style={{ fontSize: '12px', color: 'lightgray' }}>{getTime}</div> */}
    </BadgeForm>
  );
}

export default MyBadge;
