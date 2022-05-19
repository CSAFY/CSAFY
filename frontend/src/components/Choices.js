/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
// Recoil
import { Count } from '../recoils/Count';
import {
  Right1Count,
  Right2Count,
  Right3Count,
  Right4Count,
  Right5Count,
  Right6Count,
  ChoiceArray,
  TestArray,
} from '../recoils/TestData';

import styled, { css } from 'styled-components';

import Box from '@mui/material/Box';

import { useRecoilState } from 'recoil';
import { oxquizData } from '../recoils';

function Choices({ test, idx }) {
  // Recoil
  const [choiceArray, setChoiceArray] = useRecoilState(ChoiceArray);
  const [testArray, setTestArray] = useRecoilState(TestArray);
  // const [count, setCount] = useRecoilState(Count);
  // const [right1Count, setRight1Count] = useRecoilState(Right1Count);
  // const [right2Count, setRight2Count] = useRecoilState(Right2Count);
  // const [right3Count, setRight3Count] = useRecoilState(Right3Count);
  // const [right4Count, setRight4Count] = useRecoilState(Right4Count);
  // const [right5Count, setRight5Count] = useRecoilState(Right5Count);
  // const [right6Count, setRight6Count] = useRecoilState(Right6Count);
  // 4지선다 퀴즈 관련
  const [selectOne, setSelectOne] = useState(0);
  const [selectTwo, setSelectTwo] = useState(0);
  const [selectThree, setSelectThree] = useState(0);
  const [selectFour, setSelectFour] = useState(0);
  const onClickOne = () => {
    setSelectOne(1);
    setSelectTwo(0);
    setSelectThree(0);
    setSelectFour(0);
    setChoiceArray({
      ...choiceArray,
      [idx]: 1,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 1,
              // category: test.category,
            }
          : array,
      ),
    );
  };
  const onClickTwo = () => {
    setSelectOne(0);
    setSelectTwo(2);
    setSelectThree(0);
    setSelectFour(0);
    setChoiceArray({
      ...choiceArray,
      [idx]: 2,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 2,
              // category: test.category,
            }
          : array,
      ),
    );
  };
  const onClickThree = () => {
    setSelectOne(0);
    setSelectTwo(0);
    setSelectThree(3);
    setSelectFour(0);
    setChoiceArray({
      ...choiceArray,
      [idx]: 3,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 3,
              // category: test.category,
            }
          : array,
      ),
    );
  };
  const onClickFour = () => {
    setSelectOne(0);
    setSelectTwo(0);
    setSelectThree(0);
    setSelectFour(4);
    setChoiceArray({
      ...choiceArray,
      [idx]: 4,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 4,
              // category: test.category,
            }
          : array,
      ),
    );
  };

  // OX 퀴즈 관련
  const [oxData, setOXData] = useRecoilState(oxquizData);
  const [activeStep, setActiveStep] = useState(0);
  const [selectO, setSelectO] = useState(0);
  const [selectX, setSelectX] = useState(0);

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
    setSelectO(1);
    setSelectX(0);
    setChoiceArray({
      ...choiceArray,
      [idx]: 0,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 0,
              // category: test.category,
            }
          : array,
      ),
    );
  };
  const onClickX = () => {
    setSelectO(0);
    setSelectX(2);
    setChoiceArray({
      ...choiceArray,
      [idx]: 1,
    });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? {
              ...array,
              choice: 1,
              // category: test.category,
            }
          : array,
      ),
    );
  };

  const OXCardPack = (
    <>
      {'explanation' in test ? (
        <FlexDiv style={{ height: '300px' }}>
          <CardCoverDiv>
            <OXCard
              onClick={onClickO}
              border={
                selectO === 0
                  ? 'solid 2px #ebeef4;'
                  : selectO === oxData[activeStep].answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectO === 0
                  ? '#fff;'
                  : selectO === oxData[activeStep].answer
                  ? '#def9ff;'
                  : '#def9ff;'
              }
            >
              <O>O</O>
            </OXCard>
          </CardCoverDiv>
          <CardCoverDiv>
            <OXCard
              onClick={onClickX}
              border={
                selectX === 0
                  ? 'solid 2px #ebeef4;'
                  : selectX === oxData[activeStep].answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectX === 0
                  ? '#fff;'
                  : selectX === oxData[activeStep].answer
                  ? '#def9ff;'
                  : '#def9ff;'
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
              // onClick={e => onClickNum(e, 1)}
              border={
                selectOne === 0
                  ? 'solid 2px #ebeef4;'
                  : selectOne === test.answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectOne === 0
                  ? '#fff;'
                  : selectOne === test.answer
                  ? '#def9ff;'
                  : '#def9ff;'
              }
            >
              <CardContent>{test.examples[0]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickTwo}
              // onClick={onClickNumTwo}
              // onClick={e => onClickNum(e, 2)}
              border={
                selectTwo === 0
                  ? 'solid 2px #ebeef4;'
                  : selectTwo === test.answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectTwo === 0
                  ? '#fff;'
                  : selectTwo === test.answer
                  ? '#def9ff;'
                  : '#def9ff;'
              }
            >
              <CardContent>{test.examples[1]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickThree}
              // onClick={onClickNumThree}
              // onClick={e => onClickNum(e, 3)}
              border={
                selectThree === 0
                  ? 'solid 2px #ebeef4;'
                  : selectThree === test.answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectThree === 0
                  ? '#fff;'
                  : selectThree === test.answer
                  ? '#def9ff;'
                  : '#def9ff;'
              }
            >
              <CardContent>{test.examples[2]}</CardContent>
            </OXCard>
          </CardCoverDiv>

          <CardCoverDiv>
            <OXCard
              onClick={onClickFour}
              // onClick={onClickNumFour}
              // onClick={e => onClickNum(e, 4)}
              border={
                selectFour === 0
                  ? 'solid 2px #ebeef4;'
                  : selectFour === test.answer
                  ? 'solid 2px #008ed0;'
                  : 'solid 2px  #008ed0;'
              }
              backgroundColor={
                selectFour === 0
                  ? '#fff;'
                  : selectFour === test.answer
                  ? '#def9ff;'
                  : '#def9ff;'
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
      {Object.keys(test).includes('explanation') ? (
        <Box
          sx={{
            flexGrow: 1,
            margin: '40px 20px 40px 20px',
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
            margin: '40px 20px 40px 20px',
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
export default Choices;

const MeaningDiv = styled.div`
  width: 90%;
  height: 150px;
  margin: 20px auto 0 auto;

  position: relative;
`;

const FlexDiv = styled.div`
  height: 380px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
`;

const CardCoverDiv = styled.div`
  margin: 0 auto 0 auto;
  // margin-bottom: 20px;
  height: 180px;
`;

const OXCard = styled.div`
  width: 350px;
  height: 160px;
  flex-grow: 0;

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
