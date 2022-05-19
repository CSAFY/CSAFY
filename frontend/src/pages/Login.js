/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

const LoginWrapper = styled.div`
  width: 517px;
  margin: auto;
  height: 697px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoImg = styled.img`
  height: 120px;

  padding-top: 3rem;
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-conent: center;
  align-items: center;
`;
// const Input = styled.input`
//   height: 60px;
//   width: 400px;
//   margin-top: 1rem;

//   border: 1px solid lightGray;
//   border-radius: 10px;
// `;

function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleChangeUserInfo = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    console.log('로그인');
  };

  return (
    <LoginWrapper>
      <LogoImg src="images/csafy.png" alt="Csafy" />
      <p
        style={{
          height: '20px',
          fontSize: '16px',
          paddingBottom: '3rem',
          margin: '0',
        }}
      >
        회원이 아니신가요?{' '}
        <Link
          to="/signup"
          style={{ textDecoration: 'none', fontWeight: '600' }}
        >
          회원가입
        </Link>
      </p>
      <InputForm>
        {/* <Input
          name="email"
          type="text"
          placeholder="이메일"
          onChange={handleChangeUserInfo}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChangeUserInfo}
        /> */}
        <TextField
          name="email"
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          sx={{ width: '352px', height: '57px', mt: '1rem' }}
          onChange={handleChangeUserInfo}
        />
        <TextField
          name="password"
          id="outlined-basic"
          label="비밀번호"
          type="password"
          variant="outlined"
          sx={{ width: '352px', height: '57px', mt: '1rem' }}
          onChange={handleChangeUserInfo}
        />
        <Button
          variant="dark"
          sx={{
            width: '352px',
            height: '57px',
            textAlign: 'center',
            display: 'block',
            mt: '1rem',
            mb: '1rem',
            bgcolor: '#008ED0',
            ':hover': {
              color: '#006D9F',
              bgcolor: '#D5F2FC',
            },

            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
          }}
          onClick={handleSubmit}
        >
          로그인
        </Button>
        <p>또는</p>

        <img
          src="images/google.png"
          alt="Google"
          style={{
            width: '32px',
            height: '32px',
            marginTop: '1rem',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        />
      </InputForm>
    </LoginWrapper>
  );
}

export default Login;
