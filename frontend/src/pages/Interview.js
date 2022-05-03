import React, { useState, useEffect } from 'react';

// STYLED
import styled from 'styled-components';
import QuestionBox from '../components/QuestionBox';

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

function Interview() {
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      question: '프로젝트 중 문제가 발생했을 때 어떻게 대처하셨나요?',
      category: '인성',
    },
    {
      id: 2,
      question:
        '다른 지원자들과 비교했을 때 본인이 이 점만은 제일 낫다고 생각하는 것은 무엇인가요?',
      category: '인성',
    },
    {
      id: 3,
      question: '맵과 해쉬맵의 시간복잡도가 어떻게 되는지 설명해주세요.',
      category: '기술',
    },
  ]);
  // test
  const [page, setPage] = useState('All');
  const [data, setData] = useState([]);
  const getPage = page => {
    const pageData = [];
    for (let i = 0; i < dummyData.length; i++) {
      if (dummyData[i].category === page) {
        pageData.push(dummyData[i]);
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
            {dummyData.map(it => (
              <QuestionBox key={it.id} {...it} />
            ))}
          </QuestionContainer>
        ) : (
          <QuestionContainer>
            {data.map(it => (
              <QuestionBox key={it.id} {...it} />
            ))}
          </QuestionContainer>
        )}
      </InterviewContent>
    </InterviewWrapper>
  );
}

export default Interview;
