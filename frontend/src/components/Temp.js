/* eslint-disable */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ChoiceArray, TestArray } from '../recoils/TestData';

import styled from 'styled-components';

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
const Box = styled.div`
  width: 340px;
  height: 184px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;

  cursor: pointer;

  position: relative;
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
`;
const CardContent = styled.div`
  width: 280px;
  font-size: 18px;
  text-align: center;
`;

function Temp({ test, idx }) {
  const [choiceArray, setChoiceArray] = useRecoilState(ChoiceArray);
  const [testArray, setTestArray] = useRecoilState(TestArray);

  const selectOne = () => {
    setChoiceArray({ ...choiceArray, [idx]: 1 });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? { ...array, choice: 1, category: test.category }
          : array,
      ),
    );
  };
  const selectTwo = () => {
    setChoiceArray({ ...choiceArray, [idx]: 2 });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? { ...array, choice: 2, category: test.category }
          : array,
      ),
    );
  };
  const selectThree = () => {
    setChoiceArray({ ...choiceArray, [idx]: 3 });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? { ...array, choice: 3, category: test.category }
          : array,
      ),
    );
  };
  const selectFour = () => {
    setChoiceArray({ ...choiceArray, [idx]: 4 });
    setTestArray(
      testArray.map(array =>
        array.id === idx
          ? { ...array, choice: 4, category: test.category }
          : array,
      ),
    );
  };
  const selectO = () => {
    console.log('O');
    setChoiceArray({ ...choiceArray, [idx]: 1 });
  };
  const selextX = () => {
    console.log('X');
    setChoiceArray({ ...choiceArray, [idx]: 0 });
  };

  return (
    <div style={{ border: '1px solid black' }}>
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
          {test.question}
          {test.answer}
        </div>
      </MeaningDiv>
      {'explanation' in test ? (
        <div></div>
      ) : (
        <FlexDiv>
          <OXCard onClick={selectOne} style={{ border: '1px solid black' }}>
            <CardContent>{test.examples[0]}</CardContent>
          </OXCard>
          <OXCard onClick={selectTwo} style={{ border: '1px solid black' }}>
            <CardContent>{test.examples[1]}</CardContent>
          </OXCard>
          <OXCard onClick={selectThree} style={{ border: '1px solid black' }}>
            <CardContent>{test.examples[2]}</CardContent>
          </OXCard>
          <OXCard onClick={selectFour} style={{ border: '1px solid black' }}>
            <CardContent>{test.examples[3]}</CardContent>
          </OXCard>
        </FlexDiv>
      )}
    </div>
  );
}

export default React.memo(Temp);
