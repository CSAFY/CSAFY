import { Button, formControlLabelClasses } from '@mui/material';
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function Signup() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    interest: '',
  });

  const handleChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    // api 연결 테스트용
    axios
      .post(`https://tupli.kr/account/signup`, {
        createdAt: '2022-04-18T08:23:06.644Z',
        email: userInfo.email,
        modifiedAt: '2022-04-18T08:23:06.644Z',
        nickname: 'test',
        password: userInfo.password,
        userId: 13579,
        username: userInfo.username,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    // 초기화
    setUserInfo({
      username: '',
      email: '',
      password: '',
      company: '',
      interest: '',
    });
  };

  return (
    <div className="Signup">
      <h1>Create your account</h1>
      <div className="input_box">
        <div className="info_box">
          <p>Username</p>
          <input
            name="username"
            type="text"
            value={userInfo.username}
            onChange={handleChangeUserInfo}
          />
        </div>
        <div className="info_box">
          <p>Email address</p>
          <input
            name="email"
            type="text"
            value={userInfo.email}
            onChange={handleChangeUserInfo}
          />
        </div>
        <div className="info_box">
          <p>Password</p>
          <input
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChangeUserInfo}
          />
        </div>
        <div className="job_box">
          <div className="job_info_box">
            <p>목표 기업</p>
            <input
              name="company"
              type="text"
              value={userInfo.company}
              onChange={handleChangeUserInfo}
            />
          </div>
          <div className="job_info_box">
            <p>관심 분야</p>
            <input
              name="interest"
              type="text"
              value={userInfo.interest}
              onChange={handleChangeUserInfo}
            />
          </div>
        </div>

        <Button
          variant="contained"
          sx={{
            width: '100%',
            textAlign: 'center',
            display: 'block',
            mt: '3rem',
            ':hover': {
              color: '#006D9F',
              bgcolor: '#D5F2FC',
            },
          }}
          onClick={handleSubmit}
        >
          회원가입
        </Button>
        <Button
          sx={{
            width: '100%',
            textAlign: 'center',
            display: 'block',
            mt: '1rem',
            border: '1px solid',
            ':hover': {
              color: '#006D9F',
              bgcolor: '#D5F2FC',
            },
          }}
        >
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}

export default Signup;
