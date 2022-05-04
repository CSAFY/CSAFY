import React from 'react';

// STYLED
import styled from 'styled-components';

const Box = styled.div`
  width: 349px;
  height: 184px;

  border: 1px solid black;
`;

function TestBox() {
  return <Box>TestBox</Box>;
}

export default TestBox;
