import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

// Recoil
import { useRecoilState } from 'recoil';

import { Token } from '../recoils/Token';
import { TimeLimit } from '../recoils/TimeLimit';

// STYLED
import styled from 'styled-components';
import SpentTime from './SpentTime';
import AudioRecorder from '../components/AudioRecorder';

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
const TimerBox = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
`;
const Icon = styled.div`
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
// const PrevButton = styled.button`
//   width: 100px;
//   height: 32px;

//   border-radius: 12px;
//   border: solid 1px #000;
//   background-color: #f5f5f5;

//   position: absolute;
//   top: 20px;
//   left: 20px;

//   cursor: pointer;
// `;
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
  // Recoil
  const [timeLimit, setTimeLimit] = useRecoilState(TimeLimit);
  const [token, setToken] = useRecoilState(Token);
  // API data
  const { state } = useLocation();
  // console.log('🐕', state);
  const [testData, setTestData] = useState([]);
  const [seq, setSeq] = useState(0);
  // const [timeLimit, setTimeLimit] = useState(false);
  useEffect(() => {
    setTestData(state);
    setQuestion(state[0]['question']);
    setSeq(state[0]['interviewSeq']);
  }, []);
  // console.log(testData);
  // console.log('🐸', seq);
  // console.log(timeLimit);

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
  // 처음 문제로 돌아가기
  const toStart = () => {
    setCnt(1);
    setQuestion(testData[0]['question']);
    setSeq(testData[0]['interviewSeq']);
  };
  // const prevQuestion = () => {
  //   setQuestion(dummyData[cnt]['question']);
  //   console.log('3', cnt);
  //   setCnt(prev => prev - 1);
  //   console.log('4', cnt);
  // };
  // console.log(testData);

  const [memo, setMemo] = useState('');
  const handleMemo = e => {
    e.preventDefault();
    setMemo(e.target.value);
  };

  const handleSave = () => {
    axios
      .post(
        `${defaultAPI}/cs-service/interview/${seq}/memo/create`,
        { memo },
        { headers: { authorization: token } },
      )
      .then(res => {
        console.log(res);
        alert('저장 완료');
      })
      .catch(err => console.error(err));
  };

  // const [myMemo, setMyMemo] = useState('');
  const getMyMemo = () => {
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

  // 타이머 관련 - 일단 3초로 설정
  // const endTime = (state.length - 1) * 60;
  const endTime = 3;

  //
  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: '',
  });

  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: '',
  });

  const chunks = useRef([]);

  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(mic => {
        let mediaRecorder;

        try {
          mediaRecorder = new MediaRecorder(mic, {
            mimeType: 'audio/webm',
          });
        } catch (err) {
          console.log(err);
        }

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log('ended');

        mediaRecorder.onstart = function() {
          setRecording({
            active: true,
            available: false,
            url: '',
          });
        };

        mediaRecorder.ondataavailable = function(e) {
          console.log('data available');
          chunks.current.push(e.data);
        };

        mediaRecorder.onstop = async function() {
          console.log('stopped');

          const url = URL.createObjectURL(chunks.current[0]);
          chunks.current = [];

          setRecording({
            active: false,
            available: true,
            url,
          });
        };

        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder,
        });
      })
      .catch(error => {
        console.log(error);
        setStream({ ...stream, error });
      });
  }
  useEffect(() => {
    getAccess();
  }, []);

  return (
    <InterviewResultWrapper>
      <InterviewResultContent>
        {timeLimit && (
          <TimerBox>
            <SpentTime
              mm={'00'}
              ss={`${endTime}`}
              message="면접 시간이 종료되었습니다."
            />
          </TimerBox>
        )}
        <QuestionBox>
          {/* <PrevButton onClick={prevQuestion}>이전</PrevButton> */}
          <StepBox>
            {cnt}/{testData.length}
          </StepBox>
          {cnt !== testData.length ? (
            <NextButton onClick={nextQuestion}>다음</NextButton>
          ) : (
            <NextButton onClick={toStart}>처음으로</NextButton>
          )}

          <Question>{question}</Question>

          <Icon>
            <AudioRecorder cnt={cnt} />
          </Icon>

          <Progress>
            <div style={widthStyle}></div>
          </Progress>
        </QuestionBox>
        <MemoBox>
          <MemoTtitle>메모</MemoTtitle>
          <Memo value={memo} onChange={handleMemo} />
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </MemoBox>
      </InterviewResultContent>
    </InterviewResultWrapper>
  );
}

export default InterviewTest;
