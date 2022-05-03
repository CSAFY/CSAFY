import React, { useEffect, useState } from 'react';
// MUI
import MicIcon from '@mui/icons-material/Mic';
import { LinearProgress } from '@mui/material';

// STYLED
import styled from 'styled-components';
import VoiceRecord from '../components/VoiceRecord';

const InterviewResultWrapper = styled.div`
  width: 100%;
  height: 1500px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const InterviewResultContent = styled.div`
  width: 1232px;

  position: relative;
`;
const QuestionBox = styled.div`
  width: 840px;
  height: 530px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%);
`;
const Question = styled.div`
  width: 536px;
  height: 165px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #000;
`;
const Icon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d7e4ec;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 322px;
  left: 50%;
  transform: translate(-50%);

  cursor: pointer;
`;
const Progress = styled.div`
  width: 820px;
  height: 8px;

  background-color: #d7e4ec;
  border-radius: 5px;

  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
`;
const NextButton = styled.button`
  width: 100px;
  height: 32px;

  border-radius: 12px;
  border: solid 1px #000;
  background-color: #f5f5f5;

  position: absolute;
  top: 20px;
  right: 20px;

  cursor: pointer;
`;
const PrevButton = styled.button`
  width: 100px;
  height: 32px;

  border-radius: 12px;
  border: solid 1px #000;
  background-color: #f5f5f5;

  position: absolute;
  top: 20px;
  left: 20px;

  cursor: pointer;
`;
const MemoBox = styled.div`
  width: 840px;
  height: 394px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 750px;
  left: 50%;
  transform: translate(-50%);
`;
const Memo = styled.textarea`
  width: 790px;
  height: 154px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  border: none;

  font-size: 18px;
  font-weight: 600;

  padding: 50px;
`;
const MemoTtitle = styled.div`
  font-size: 18px;
  font-weight: 600;

  position: absolute;
  top: 30px;
  left: 10px;
`;
const SaveButton = styled.button`
  width: 100px;
  height: 32px;

  border-radius: 12px;
  border: solid 1px #000;
  background-color: #f5f5f5;

  position: absolute;
  bottom: 20px;
  right: 10px;

  cursor: pointer;
`;

function InterviewDetail() {
  // 질문
  const [question, setQuestion] = useState('http와 https의 차이는 무엇인가요?');

  // 테스트 관련
  // dummyData
  const [dummyData, setDummyData] = useState([
    { id: 1, question: '문제1' },
    { id: 2, question: '문제2' },
    { id: 3, question: '문제3' },
  ]);

  const [cnt, setCnt] = useState(0);
  // 다음 문제로 넘어가기
  const nextQuestion = () => {
    if (cnt === dummyData.length) {
      alert('test end');
    } else {
      setQuestion(dummyData[cnt]['question']);
      setCnt(prev => prev + 1);
    }
  };
  // progressbar
  const widthStyle = {
    height: '100%',
    width: `${(100 / dummyData.length) * cnt}%`,
    background: '#008ed0',
    borderRadius: '10px',
    transition: '1s ease 0.005s',
  };
  // const prevQuestion = () => {
  //   setQuestion(dummyData[cnt]['question']);
  //   console.log('3', cnt);
  //   setCnt(prev => prev - 1);
  //   console.log('4', cnt);
  // };

  const [memo, setMemo] = useState('');

  const handleSave = () => {
    console.log(memo);
  };

  ////// 녹음 관련 테스트

  return (
    <InterviewResultWrapper>
      <InterviewResultContent>
        <QuestionBox>
          {/* <PrevButton onClick={prevQuestion}>이전</PrevButton> */}
          <NextButton onClick={nextQuestion}>다음</NextButton>
          <Question>{question}</Question>
          <Icon>
            {/* <MicIcon fontSize="large" color="primary" /> */}
            <VoiceRecord />
          </Icon>
          <Progress>
            <div style={widthStyle}></div>
          </Progress>
        </QuestionBox>
        <MemoBox>
          <MemoTtitle>메모</MemoTtitle>
          <Memo value={memo} onChange={e => setMemo(e.target.value)} />
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </MemoBox>
      </InterviewResultContent>
    </InterviewResultWrapper>
  );
}

export default InterviewDetail;
