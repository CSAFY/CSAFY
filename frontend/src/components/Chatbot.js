import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// chatbot
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

function Chatbot() {
  const navigate = useNavigate();

  const contactAdmin = () => {
    navigate('/userChat');
  };

  const steps = [
    {
      id: '0',
      message: '안녕하세요 함께 공부하는 C;SAFY입니다.',
      trigger: '1',
    },
    {
      id: '1',
      options: [{ value: 1, label: '시작하기', trigger: '2' }],
    },
    {
      id: '2',
      message: '문의할 서비스 유형을 선택해주세요.',
      trigger: '3',
    },
    {
      id: '3',
      options: [
        { value: 2, label: '유형 1', trigger: '4' },
        { value: 3, label: '유형 2', trigger: '5' },
        { value: 7, label: '상담사 연결하기', trigger: '7' },
      ],
    },
    {
      id: '4',
      message: '유형 1 답변',
      trigger: '6',
    },
    {
      id: '5',
      message: '유형 2 답변',
      trigger: '6',
    },
    {
      id: '6',
      options: [{ value: 4, label: '뒤로가기', trigger: '2' }],
    },
    {
      id: '7',
      message: '상담사와 연결되었습니다.',
      end: true,
    },
  ];

  const theme = {
    width: '370px',
    height: '680px',
    borderRadius: '30px',
    background: 'white',
  };

  // 커뮤니티 페이지에서 안보이게 하기
  const location = useLocation();

  if (location.pathname === '/community') return null;

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        handleEnd={contactAdmin}
        steps={steps}
        floating={true}
        headerTitle={'C;SAFY'}
        placeholder={'채팅이 불가능한 채널입니다.'}
      />
    </ThemeProvider>
  );
}

export default Chatbot;
