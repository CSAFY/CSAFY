/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { defaultAPI } from '../utils/api';

// Recoil
import { useRecoilState } from 'recoil';

import { Token } from '../recoils/Token';
import { TimeLimit } from '../recoils/TimeLimit';

// STYLED
import styled from 'styled-components';
import swal from 'sweetalert2';
import SpentTime from './SpentTime';
import AudioRecorder from '../components/AudioRecorder';

const InterviewResultWrapper = styled.div`
  width: 100%;
  height: 1200px;
  // width: 100%;
  // height: 100vh;
  // padding-bottom: 100px;

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
  top: 50px;
  left: 50%;
  transform: translate(-50%);
`;
const Question = styled.div`
  // width: 600px;
  width: 80%;
  height: 165px;
  font-size: 28px;
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
  background-color: #fff;
  border: none;

  &:hover {
    background-color: #008ed0;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    color: #fff;
    // transform: scale(1.05);
  }

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
  left: 30px;
`;
const MemoBox = styled.div`
  width: 840px;
  height: 394px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 660px;
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
  height: 38px;

  border-radius: 12px;
  // border: solid 1px #000;
  // background-color: #f5f5f5;
  border: none;
  background-color: #fff;
  font-weight: 600;

  &:hover {
    background-color: #008ed0;
    box-shadow: 0 0 15px 0 rgba(0, 142, 208, 0.3);
    color: #fff;
    // transform: scale(1.05);
  }

  position: absolute;
  bottom: 20px;
  right: 0px;

  cursor: pointer;
`;

function InterviewTest() {
  const navigate = useNavigate();
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
  const [toggleSave, setToggleSave] = useState(false);
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
    setCnt(0);
    setQuestion(testData[0]['question']);
    setSeq(testData[0]['interviewSeq']);

    // navigate('/interviewList');
  };
  // console.log(toggleSave);
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
        // console.log(res);
        // alert('저장 완료');
        swal.fire({
          icon: 'success',
          position: 'middle',
          title: '저장 완료',

          // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '확인', // confirm 버튼 텍스트 지정
          // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        });
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
            {cnt} / {testData.length}
          </StepBox>
          {cnt !== testData.length ? (
            <NextButton onClick={nextQuestion}>다음</NextButton>
          ) : (
            <NextButton onClick={toStart}>처음으로</NextButton>
          )}
          {/* {cnt !== testData.length && (
            <NextButton onClick={nextQuestion}>다음</NextButton>
          )} */}

          <Question>{question}</Question>

          <Icon>
            <AudioRecorder cnt={cnt} />
          </Icon>

          <Progress>
            <div style={widthStyle}></div>
          </Progress>
        </QuestionBox>

        {cnt === testData.length && (
          <NextButton
            style={{
              height: '40px',
              position: 'absolute',
              top: '600px',
              left: '50%',
              transform: 'translate(-50%)',
            }}
            onClick={() => navigate('/interviewList')}
          >
            면접 종료
          </NextButton>
        )}

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
