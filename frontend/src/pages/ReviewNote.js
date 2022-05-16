import React, { useState } from 'react';
// STYLED
import styled from 'styled-components';
import ReviewNoteBox from '../components/ReviewNoteBox';
import { Grid } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import Choices from '../components/Choices';
import ReviewChoices from '../components/ReviewChoices';

const ReviewNoteWrapper = styled.div`
  width: 100%;
  height: 1200px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;
const ReviewNoteContent = styled.div`
  width: 1232px;

  position: relative;
`;
const PageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 40px;
  padding-bottom: 30px;
`;
const TestList = styled.div`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
`;

function ReviewNote() {
  const naviagte = useNavigate();
  const [dummyData, setDummyData] = useState([
    {
      key: null,
      category: '네트워크',
      explanation:
        '쿠키나 세션을 쓰면 컴퓨터를 껐다가 켜도 상태 정보를 유지할 수 있다.',
      answer: 1,
    },
    {
      question: 'CSRF에 대한 설명으로 틀린 것은?',
      examples: [
        'Cross Site Response Forgery의 약자이다.',
        'Security Token를 사용하여 요청 파라미터값과 저장된 값을 비교하는 과정을 통해 대응할 수 있다.',
        '인터넷 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위를 특정한 웹사이트에 요청하도록 만드는 공격을 말한다.',
        '백엔드 단에서 Refferer 검증을 통해 승인된 도메인으로 요청시에만 처리하도록 하여 대응할 수 있다.',
      ],
      answer: 1,
      category: '네트워크',
      categoryChapter: '정보보안',
      testSeq: 10,
    },
    {
      question: 'XSS의 대응 기법으로 틀린 것은?',
      examples: [
        '웹 방화벽',
        '비밀번호변경',
        'XSS 방어 확장앱',
        'XSS 방어 라이브러리',
      ],
      answer: 2,
      category: '네트워크',
      categoryChapter: '정보보안',
      testSeq: 9,
    },
    {
      key: null,
      category: '네트워크',
      explanation:
        '쿠키나 세션을 쓰는 이유는 HTTP가 항상 연결되어 있지 않기 때문이다.',
      answer: 0,
    },
    {
      question: '세션의 설명으로 틀린 것은?',
      examples: [
        '용량 제한이 없다.',
        'HTTP 세션이란 클라이언트가 웹 서버에 연결된 순간부터 웹 브라우저를 닫아 서버와의 HTTP 통신을 끝낼 때 까지의 기간이다.',
        '서버에 세션 객체를 생성하며 각 클라이언트마다 중복된 세션 ID 값을 부여한다.',
        '쿠키를 사용하여 세션 ID값을 클라이언트에 보낸다.',
      ],
      answer: 3,
      category: '네트워크',
      categoryChapter: '쿠키와 세션',
      testSeq: 12,
    },
    {
      key: null,
      category: '네트워크',
      explanation:
        '비대칭키 암호화는 공개키는 내부에 존재하고, 비밀키는 외부에 존재한다. 대칭키를 동유하는 방식보다 비교적 안전하며, 다신 연산 성능이 떨어지는 편이다.',
      answer: 1,
    },
    {
      question: '단방향 암호화에 대한 설명으로 틀린 것은?',
      examples: [
        '따라서 이런 정보를 저장하기 위해 bcrypt와 같은 방식을 사용한다.',
        '대부분 힙 알고리즘을 이용해서 구현하며, 민감정보를 데이터베이스에 저장할 때 해당 방식을 사용한다.',
        '보통의 단방향 암호화는 빠른 성능을 보여, 무차별 대입 공격에 취약하다.',
        '단방향 암호화는 복호화 불가능한 암호화라고 한다.',
      ],
      answer: 1,
      category: '네트워크',
      categoryChapter: '정보보안',
      testSeq: 19,
    },
    {
      question: 'HTTP와 HTTPS의 차이점으로 틀린 것은?',
      examples: [
        'HTTP는 8000번 포트를 사용한다.',
        'HTTPS는 네트워크 상에서 중간에 제3자가 정보를 볼 수 없도록 공개키 암호화를 지원하고 있다. ',
        'HTTPS는 443번 포트를 사용한다.',
        'HTTPS는 HTTP에 데이터 암호화가 추가된 프로토콜이다.',
      ],
      answer: 2,
      category: '네트워크',
      categoryChapter: 'HTTP',
      testSeq: 17,
    },
    {
      question: 'CORS에 대한 설명으로 틀린 것은?',
      examples: [
        'Origin은 scheme, host, port로 이루어진 도메인을 의미한다.',
        '자신이 속한 출처를 기준으로, 다른 출처에서 API를 요청했을 때 해당 요청을 거부하는 정책이다.',
        'Cross Origin Resource Sharing의 약자이다.',
        'Origin은 서버에게 또는 클라이언트에게 현재 어떤 요청을 보내는지 알려주어야 한다',
      ],
      answer: 2,
      category: '네트워크',
      categoryChapter: 'HTTP',
      testSeq: 13,
    },
    {
      question: 'UDP에 대한 설명으로 틀린 것은?',
      examples: [
        'Transport layer에서 사용하는 프로토콜.',
        'User Datagram Protocol의 약자로 데이터를 데이터그램 단위로 처리하는 프로토콜',
        '비연결형, 신뢰성 없는 전송 프로토콜이다.',
        '데이터그램 단위로 쪼개면서 전송을 해야하기 때문에 네트워크 계층이다.',
      ],
      answer: 4,
      category: '네트워크',
      categoryChapter: 'TCP와 UDP',
      testSeq: 21,
    },
    {
      question: 'JWT의 설명으로 틀린 것은?',
      examples: [
        'JWT는 토큰 인증 방식에서 쓰인다.',
        'JWT는 헤더, 바디, 시그니쳐로 구분된다.',
        'JWT는 그 자체로 정보를 가지고 있기 때문에 세션의 단점을 보완할 수 있다.',
        'Json Web Token의 약자이다.',
      ],
      answer: 1,
      category: '네트워크',
      categoryChapter: '정보보안',
      testSeq: 18,
    },
    {
      question: 'HTTP 특징으로 틀린 것은?',
      examples: [
        'HTTP 프로토콜은 상태가 없는 (stateless) 프로토콜이다.',
        'HTTP 프로토콜은 다수의 요청 처리에 유리하다',
        'HTTP는 서버의 부하가 크다',
        'HTTP는 데이터를 주고 받기 위한 각각의 데이터 요청이 서로 독립적으로 관리된다',
      ],
      answer: 3,
      category: '네트워크',
      categoryChapter: 'HTTP',
      testSeq: 15,
    },
  ]);
  const testHeight = 250 + dummyData.length * 550;
  return (
    <ReviewNoteWrapper style={{ height: `${testHeight}px` }}>
      <ReviewNoteContent>
        {/* 카테고리 분류 버전 */}
        {/* <PageTitle>
          <div style={{ fontSize: '24px', fontWeight: '600' }}>오답노트</div>
        </PageTitle>
        <Grid container>
          {dummyData.map((data, idx) => (
            <Grid item xs={4}>
              <ReviewNoteBox key={idx} {...data} onClick={() => naviagte()} />
            </Grid>
          ))}
        </Grid> */}
        {/* 분류 없이 계속 쌓는 버전 */}
        <PageTitle>
          <div>오답노트</div>
        </PageTitle>
        <TestList>
          {dummyData.map((test, idx) => (
            <ReviewChoices key={idx} test={test} idx={idx} />
          ))}
        </TestList>
      </ReviewNoteContent>
    </ReviewNoteWrapper>
  );
}

export default ReviewNote;
