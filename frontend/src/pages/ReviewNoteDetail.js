/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { defaultAPI } from '../utils/api';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// RECOIL
import { useRecoilValue } from 'recoil';
import { Token } from '../recoils/Token';

// COMPONENTS
import ReviewNoteResultBox from '../components/ReviewNoteResultBox';
import ReviewChoices from '../components/ReviewChoices';

// STYLED
import styled from 'styled-components';

const ReviewNoteDetailWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const ReviewNoteDetailContent = styled.div`
  width: 1232px;

  position: relative;
`;
const TestList = styled.div`
  width: 70%;
  position: absolute;
  top: 700px;
  left: 50%;
  transform: translate(-50%);
`;

function ReviewNoteDetail() {
  const { round } = useParams();

  // Recoil
  const token = useRecoilValue(Token);

  // 리뷰 정보 가져오기
  const [roundInfo, setRoundInfo] = useState([]);
  const getRoundReviewData = round => {
    axios
      .get(`${defaultAPI}/cs-service/study/problem/${round}/wrong`, {
        headers: { Authorization: token },
      })
      .then(res => {
        // console.log(res);
        setRoundInfo(res.data);
      })
      .catch(err => console.error(err));
  };
  // 테스트 정보 가져오기
  const [testResultInfo, setTestResultInfo] = useState({
    corrects: { 네트워크: 1 },
    totals: { 네트워크: 1 },
    examDone: '',
    id: '',
  });
  const getRoundTestInfo = round => {
    axios
      .get(`${defaultAPI}/cs-service/test/${round}/result`, {
        headers: { authorization: token },
      })
      .then(res => {
        // console.log(res);
        setTestResultInfo(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getRoundReviewData(round);
    getRoundTestInfo(round);
  }, []);

  // console.log(testResultInfo, roundInfo);

  const testHeight = 700 + roundInfo.length * 570;

  return (
    <ReviewNoteDetailWrapper style={{ height: testHeight }}>
      <ReviewNoteDetailContent>
        {/* <div>round: {round}</div>
        <div>{testResultInfo.examDone}</div> */}
        <ReviewNoteResultBox props={testResultInfo} />
        <TestList>
          {roundInfo &&
            roundInfo.map((test, idx) => (
              <ReviewChoices key={idx} test={test} idx={idx} />
            ))}
        </TestList>
      </ReviewNoteDetailContent>
    </ReviewNoteDetailWrapper>
  );
}

export default ReviewNoteDetail;
