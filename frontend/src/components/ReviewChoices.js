/* eslint-disable */
import { useEffect, useRef, useState } from 'react';

import styled, { css } from 'styled-components';

import Box from '@mui/material/Box';

function ReviewChoices({ test, idx }) {
  // console.log(test);
  const [selectOne, setSelectOne] = useState(0);
  const [selectTwo, setSelectTwo] = useState(0);
  const [selectThree, setSelectThree] = useState(0);
  const [selectFour, setSelectFour] = useState(0);
  const onClickOne = () => {
    setSelectOne(1);
    setSelectTwo(0);
    setSelectThree(0);
    setSelectFour(0);
  };
  const onClickTwo = () => {
    setSelectOne(0);
    setSelectTwo(2);
    setSelectThree(0);
    setSelectFour(0);
  };
  const onClickThree = () => {
    setSelectOne(0);
    setSelectTwo(0);
    setSelectThree(3);
    setSelectFour(0);
  };
  const onClickFour = () => {
    setSelectOne(0);
    setSelectTwo(0);
    setSelectThree(0);
    setSelectFour(4);
  };

  // OX 퀴즈 관련
  const [oxData, setOXData] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [selectO, setSelectO] = useState(2);
  const [selectX, setSelectX] = useState(2);

  //  // 1이 O, 0이 X
  //  const onClickO = () => {
  //    setSelectO(1);
  //    setSelectX(0);
  //    if (fourWayData.answer === 1) {
  //      setCount(prev => prev + 1);
  //    }
  //  };
  //  const onClickX = () => {
  //    setSelectO(0);
  //    setSelectX(2);
  //    if (fourWayData.answer === 0) {
  //      setCount(prev => prev + 1);
  //    }
  //  };
  const onClickO = () => {
    setSelectO(0);
    setSelectX(2);
  };
  const onClickX = () => {
    setSelectO(2);
    setSelectX(1);
  };

  const OXCardPack = (
    <>
      {!test.examples ? (
        <FlexDiv style={{ height: '300px' }}>
          <CardCoverDiv>
            <OXCard
              onClick={onClickO}
              border={
                selectO === 2
                  ? 'solid 2px #ebeef4;'
                  : selectO === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectO === 2
                  ? '#fff;'
                  : selectO === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <O>O</O>
            </OXCard>
          </CardCoverDiv>
          <CardCoverDiv>
            <OXCard
              onClick={onClickX}
              border={
                selectX === 2
                  ? 'solid 2px #ebeef4;'
                  : selectX === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectX === 2
                  ? '#fff;'
                  : selectX === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <X>X</X>
            </OXCard>
          </CardCoverDiv>
        </FlexDiv>
      ) : (
        <FlexDiv>
          <CardCoverDiv>
            <OXCard
              onClick={onClickOne}
              border={
                selectOne === 0
                  ? 'solid 2px #ebeef4;'
                  : selectOne === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectOne === 0
                  ? '#fff;'
                  : selectOne === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <CardContent>{test.examples[0]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickTwo}
              border={
                selectTwo === 0
                  ? 'solid 2px #ebeef4;'
                  : selectTwo === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectTwo === 0
                  ? '#fff;'
                  : selectTwo === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <CardContent>{test.examples[1]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickThree}
              border={
                selectThree === 0
                  ? 'solid 2px #ebeef4;'
                  : selectThree === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectThree === 0
                  ? '#fff;'
                  : selectThree === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <CardContent>{test.examples[2]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickFour}
              border={
                selectFour === 0
                  ? 'solid 2px #ebeef4;'
                  : selectFour === test.answer
                  ? 'solid 2px #25b26d;'
                  : 'solid 2px  #e12e2e;'
              }
              backgroundColor={
                selectFour === 0
                  ? '#fff;'
                  : selectFour === test.answer
                  ? '#f2fbf6;'
                  : '#FFD5D2;'
              }
            >
              <CardContent>{test.examples[3]}</CardContent>
            </OXCard>
          </CardCoverDiv>
        </FlexDiv>
      )}
    </>
  );
  return (
    <>
      {/* Object.keys(test).includes('explanation') */}
      {Object.values(test) === null ? (
        <Box
          sx={{
            flexGrow: 1,
            // margin: '40px 20px 40px 20px',
            marginBottom: '40px',
            borderRadius: '20px',
            boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
            backgroundColor: '#fff',
          }}
        >
          <MeaningDiv>
            <div
              style={{
                width: '90%',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '600',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {test.explanation}
              {test.answer}
            </div>
          </MeaningDiv>
          {OXCardPack}
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            // margin: '40px 20px 40px 20px',
            marginBottom: '40px',
            borderRadius: '20px',
            boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
            backgroundColor: '#fff',
          }}
        >
          {/* <button onClick={() => setToggle(true)}>NEXT</button> */}
          <MeaningDiv>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '600',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {test.question}
              {test.answer}
            </div>
          </MeaningDiv>

          {OXCardPack}
        </Box>
      )}
    </>
  );
}
// }
export default ReviewChoices;

const MeaningDiv = styled.div`
  width: 90%;
  height: 150px;
  margin: 20px auto 0 auto;

  position: relative;
`;

const FlexDiv = styled.div`
  // padding-bottom: 10px;
  height: 380px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
`;

const CardCoverDiv = styled.div`
  // margin: 0 auto 0 auto;
  height: 180px;
`;

const OXCard = styled.div`
  width: 350px;
  height: 160px;
  flex-grow: 0;

  // padding-left: 20px;
  // padding-right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 11px;
  cursor: pointer;
  
  border: ${props => props.border}
  background-color: ${props => props.backgroundColor}
`;

const CardContent = styled.div`
  width: 280px;
  font-size: 18px;
  text-align: center;

  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const O = styled.span`
  width: 95px;
  height: 88px;

  font-family: SUIT;
  font-size: 96px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #e12e2e;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const X = styled.span`
  width: 95px;
  height: 88px;

  font-family: SUIT;
  font-size: 96px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c45d8;

  display: flex;
  justify-content: center;
  align-items: center;
`;
