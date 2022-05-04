import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
import VoiceRecord from '../components/VoiceRecord';
// MUI
import MicIcon from '@mui/icons-material/Mic';
import { LinearProgress } from '@mui/material';

// STYLED
import styled from 'styled-components';

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
  position: absolute;
  top: 322px;
  left: 50%;
  transform: translate(-50%);

  cursor: pointer;
`;
const Record = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
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
const StepBox = styled.div`
  width: 50px;
  height: 50px;

  position: absolute;
  top: 20px;
  left: 20px;
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
const StudyBox = styled.div`
  width: 840px;
  height: 394px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 1150px;
  left: 50%;
  transform: translate(-50%);
`;
const MyMemo = styled.div`
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

function InterviewTest() {
  // API data
  const { state } = useLocation();
  const [testData, setTestData] = useState([]);
  const [seq, setSeq] = useState(0);
  useEffect(() => {
    setTestData(state);
    setQuestion(state[0]['question']);
    setSeq(state[0]['interviewSeq']);
  }, []);
  // console.log(testData);
  // console.log('🐸', seq);

  // 테스트 관련
  const [cnt, setCnt] = useState(1);
  // 질문
  const [question, setQuestion] = useState('');
  // 다음 문제로 넘어가기
  const nextQuestion = () => {
    if (cnt === testData.length) {
      alert('test end');
    } else {
      setQuestion(testData[cnt]['question']);
      setSeq(testData[cnt]['interviewSeq']);
      setCnt(prev => prev + 1);
      setMemo('');
    }
  };
  // progressbar
  const widthStyle = {
    height: '100%',
    width: `${(100 / testData.length) * cnt}%`,
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
  const handleMemo = e => {
    setMemo(e.target.value);
  };

  const handleSave = () => {
    const token = localStorage.getItem('jwt');
    // console.log(memo);
    axios
      .post(
        `${defaultAPI}/cs-service/interview/${seq}/memo/create`,
        { memo },
        { headers: { authorization: token } },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  // const [myMemo, setMyMemo] = useState('');
  const getMyMemo = () => {
    const token = localStorage.getItem('jwt');
    if (seq !== 0) {
      axios
        .get(`${defaultAPI}/cs-service/interview/${seq}/memo`, {
          headers: { authorization: token },
        })
        .then(res => {
          // console.log(res);
          // setMyMemo(res.data);
          setMemo(res.data);
        })
        .catch(err => console.error(err));
    }
  };
  useEffect(() => {
    getMyMemo();
  }, [seq]);
  // console.log('🎃', myMemo);

  return (
    <InterviewResultWrapper>
      <InterviewResultContent>
        <QuestionBox>
          {/* <PrevButton onClick={prevQuestion}>이전</PrevButton> */}
          <StepBox>
            {cnt}/{testData.length}
          </StepBox>
          {cnt !== testData.length ? (
            <NextButton onClick={nextQuestion}>다음</NextButton>
          ) : (
            <NextButton onClick={nextQuestion}>결과 보기</NextButton>
          )}
          {/* <Question>{testData[cnt]['question']}</Question> */}
          <Question>{question}</Question>
          {/* <Icon>
            <MicIcon fontSize="large" color="primary" />
          </Icon> */}
          <Icon>
            <VoiceRecord />
          </Icon>
          {/* <Record>
            <VoiceRecord />
          </Record> */}
          <Progress>
            <div style={widthStyle}></div>
          </Progress>
        </QuestionBox>
        <MemoBox>
          <MemoTtitle>메모</MemoTtitle>
          <Memo value={memo} onChange={handleMemo} />
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </MemoBox>
        {/* <StudyBox>
          <MemoTtitle>나의 메모</MemoTtitle>
          <MyMemo>{myMemo}</MyMemo>
        </StudyBox> */}
      </InterviewResultContent>
    </InterviewResultWrapper>
  );
}

export default InterviewTest;
