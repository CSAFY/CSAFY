import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { defaultAPI } from '../utils/api';
import QuestionBox from '../components/QuestionBox';

// STYLED
import styled from 'styled-components';

const InterviewWrapper = styled.div`
  width: 100%;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const InterviewContent = styled.div`
  width: 1232px;
`;
const PageTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-top: 40px;
  padding-bottom: 30px;
`;
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TypeBox = styled.div`
  margin-left: 10px;
`;
const ButtonBox = styled.div`
  display: flex;

  margin-top: 20px;
  margin-bottom: 30px;
`;
const TechButton = styled.div`
  width: 110px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;

  cursor: pointer;
  background-color: ${props => props.color};
`;
const AttitudeButton = styled.div`
  width: 110px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;

  cursor: pointer;
  background-color: ${props => props.color};
`;

function InterviewList() {
  // api 데이터 받기
  const [apiData, setApiData] = useState([]);
  const getApiData = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      axios
        .get(
          `${defaultAPI}/cs-service/interview/list/get?category=all`,

          { headers: { Authorization: token } },
        )
        .then(res => {
          console.log(res);
          setApiData(res.data);
        })
        .catch(err => console.error(err));
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  // test
  const [page, setPage] = useState('All');
  const [data, setData] = useState([]);
  const getPage = page => {
    const pageData = [];
    for (let i = 0; i < apiData.length; i++) {
      if (apiData[i].category === page) {
        pageData.push(apiData[i]);
      }
    }
    setData(pageData);
  };

  const [cur, setCur] = useState(null);
  const [prev, setPrev] = useState(null);
  const handleClick = e => {
    setCur(e.target.id);
    if (e.target.id === 'cur') {
      getPage('인성');
      setPage('Attitude');
    } else {
      getPage('기술');
      setPage('Tech');
    }
  };

  useEffect(() => {
    if (cur !== null) {
      let current = document.getElementById(cur);
      current.style.backgroundColor = '#008ed0';
      current.style.color = '#fff';
    }
    if (prev !== null) {
      let previous = document.getElementById(prev);
      previous.style.backgroundColor = '#f6f7fb';
      previous.style.color = '#000';
    }
    setPrev(cur);
  }, [cur]);

  return (
    <InterviewWrapper>
      <InterviewContent>
        <PageTitle>
          <div style={{ fontSize: '24px', fontWeight: '600' }}>면접 질문</div>
          <div
            style={{
              marginLeft: '50px',
              marginRight: '50px',
              color: '#8a8888',
            }}
          >
            |
          </div>
          <div
            style={{ fontSize: '16px', fontWeight: '300', color: '#8a8888' }}
          >
            총 215개의 기업
          </div>
        </PageTitle>
        <TypeBox>
          <div style={{ fontSize: '18px', fontWeight: '600' }}>유형 선택</div>
          <ButtonBox>
            <AttitudeButton id="cur" onClick={handleClick}>
              # 인성 면접
            </AttitudeButton>
            <TechButton id="prev" onClick={handleClick}>
              # 기술 면접
            </TechButton>
          </ButtonBox>
        </TypeBox>
        {page === 'All' ? (
          <QuestionContainer>
            {apiData.map(it => (
              <QuestionBox key={it.interviewSeq} {...it} />
            ))}
          </QuestionContainer>
        ) : (
          <QuestionContainer>
            {data.map(it => (
              <QuestionBox key={it.interviewSeq} {...it} />
            ))}
          </QuestionContainer>
        )}
      </InterviewContent>
    </InterviewWrapper>
  );
}

export default InterviewList;
