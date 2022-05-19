/* eslint-disable */
import { Button } from '@mui/material';
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [service, setService] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });

  // VALIDATION
  const [errMsg, setErrMsg] = useState('올바르지 않은 이메일 양식입니다.');
  const [toggle, setToggle] = useState({
    emailIsValid: true,
    passwordIsValid: true,
    passwordCheckIsValid: true,
    agreementIsValid: true,
  });
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChangeUserInfo = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setToggle({
      emailIsValid: true,
      passwordIsValid: true,
      passwordCheckIsValid: true,
      agreementIsValid: true,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Validation
    if (!emailRegex.test(userInfo.email)) {
      setToggle({
        ...toggle,
        emailIsValid: false,
      });
      setErrMsg('올바르지 않은 이메일 양식입니다.');
      return;
    } else if (!passwordRegex.test(userInfo.password)) {
      setToggle({
        ...toggle,
        passwordIsValid: false,
      });
      setErrMsg(
        '비밀번호는 영문, 숫자 중 2개 이상을 조합하여 최소 8자리 이상이여야 합니다.',
      );
      return;
    } else if (userInfo.password !== userInfo.passwordCheck) {
      setToggle({
        ...toggle,
        passwordCheckIsValid: false,
      });
      setErrMsg('비밀번호가 일치하지 않습니다.');
      return;
    } else if (service === false || privacy === false) {
      setToggle({
        ...toggle,
        agreementIsValid: false,
      });
      setErrMsg('필수 항목을 동의하셔야 합니다.');
      return;
    }

    // api 연결 테스트용
    axios
      .post(`https://tupli.kr/api/v1/account/signup`, {
        email: userInfo.email,
        nickname: 'test',
        password: userInfo.password,
        username: 'username',
      })
      // 일단 회원가입 후 메인 페이지로 이동
      .then(res => navigate('/mypage'))
      .catch(err => console.error(err));

    // 초기화
    setUserInfo({
      email: '',
      password: '',
      passwordCheck: '',
    });
  };

  const TuplioAuthTest = e => {
    window.location.href = `https://tupli.kr/api/v1/oauth2/authorization/google?redirect_uri=https://tupli.kr/oauth/redirect`;
  };

  // console.log('🐸', service, privacy);

  return (
    <div className="Signup_wrapper">
      <div className="Signup">
        <div className="logo_img">
          <img src="images/csafy.png" alt="Csafy" />
        </div>
        <p>
          이미 회원이신가요?{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            로그인
          </Link>
        </p>
        <div className="input_box">
          <input
            name="email"
            type="text"
            value={userInfo.email}
            onChange={handleChangeUserInfo}
            placeholder="이메일"
          />
          {toggle.emailIsValid ? null : (
            <div className="invalid_input">{errMsg}</div>
          )}
          <input
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChangeUserInfo}
            placeholder="비밀번호"
          />
          {toggle.passwordIsValid ? null : (
            <div className="invalid_input">{errMsg}</div>
          )}
          <input
            name="passwordCheck"
            type="password"
            value={userInfo.passwordCheck}
            onChange={handleChangeUserInfo}
            placeholder="비밀번호 확인"
          />
          {toggle.passwordCheckIsValid ? null : (
            <div className="invalid_input">{errMsg}</div>
          )}
          <div className="check_box">
            <label>
              <input
                name="service"
                type="checkbox"
                onClick={() => setService(!service)}
              />{' '}
              [필수] C;SAFY 이용 약관 동의
            </label>
            <label>
              <input
                name="privacy"
                type="checkbox"
                onClick={() => setPrivacy(!privacy)}
              />{' '}
              [필수] 개인정보 수집 및 이용 동의
            </label>
            {toggle.agreementIsValid ? null : (
              <div className="invalid_input">{errMsg}</div>
            )}
          </div>
        </div>
        <div className="button_box">
          <Button
            variant="dark"
            sx={{
              width: '412px',
              height: '55px',
              textAlign: 'center',
              display: 'block',
              mt: '1rem',
              bgcolor: '#008ED0',

              ':hover': {
                color: '#006D9F',
                bgcolor: '#D5F2FC',
              },
            }}
            onClick={handleSubmit}
          >
            ✉️ 가입하기
          </Button>
          <p>또는</p>
          <Button
            variant="dark"
            sx={{
              width: '412px',
              height: '55px',
              textAlign: 'center',
              display: 'block',
              mt: '1rem',
              border: '1px solid lightgray',
              ':hover': {
                color: '#006D9F',
                bgcolor: '#D5F2FC',
              },
            }}
            // 테스트용
            onClick={TuplioAuthTest}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="images/google.png"
                alt="google"
                style={{ height: '20px', width: '20px' }}
              />{' '}
              <span> 구글로 가입하기</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
