import React, { useState } from 'react';
import styled from 'styled-components';
// MUI
import { Button, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
  width: 517px;
  height: 697px;
  margin: auto;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoImg = styled.img`
  height: 120px;

  padding-top: 3rem;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-conent: center;
  align-items: center;
`;

const SignupWrapper = styled.div`
  width: 517px;
  height: 834px;
  margin: auto;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AuthModal({ state, setState, setSignup, signup }) {
  // LOGIN
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log('로그인');
  };
  // SIGNUP
  const navigate = useNavigate();
  const [service, setService] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
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
  const emailRegex =
    /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSignupInfo = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    setToggle({
      emailIsValid: true,
      passwordIsValid: true,
      passwordCheckIsValid: true,
      agreementIsValid: true,
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    // Validation
    if (!emailRegex.test(signupInfo.email)) {
      setToggle({
        ...toggle,
        emailIsValid: false,
      });
      setErrMsg('올바르지 않은 이메일 양식입니다.');
      return;
    } else if (!passwordRegex.test(signupInfo.password)) {
      setToggle({
        ...toggle,
        passwordIsValid: false,
      });
      setErrMsg('영문, 숫자 2개 이상을 조합하여 8자리 이상이여야 합니다.');
      return;
    } else if (signupInfo.password !== signupInfo.passwordCheck) {
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
        email: signupInfo.email,
        nickname: 'test',
        password: signupInfo.password,
        username: 'username',
      })
      // 일단 회원가입 후 메인 페이지로 이동
      .then((res) => {
        // 모달 없애기
        setSignup(false);
        // navigate
        navigate('/mypage');
      })
      .catch((err) => console.error(err));

    // 초기화
    setSignupInfo({
      email: '',
      password: '',
      passwordCheck: '',
    });
  };

  const TuplioAuthTest = (e) => {
    window.location.href = `https://tupli.kr/api/v1/oauth2/authorization/google?redirect_uri=https://tupli.kr/oauth/redirect`;
  };

  return (
    <>
      {state === 'login' ? (
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
            <span
              style={{ fontWeight: '600', color: '#008ed0', cursor: 'pointer' }}
              onClick={() => setState('signup')}
            >
              회원가입
            </span>
          </p>
          <InputBox>
            <TextField
              name="email"
              id="outlined-basic"
              label="이메일"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleLoginInfo}
            />
            <TextField
              name="password"
              id="outlined-basic"
              label="비밀번호"
              type="password"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleLoginInfo}
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
          </InputBox>
        </LoginWrapper>
      ) : (
        <SignupWrapper>
          <LogoImg src="images/csafy.png" alt="Csafy" />
          <p
            style={{
              height: '20px',
              fontSize: '16px',
              paddingBottom: '3rem',
              margin: '0',
            }}
          >
            이미 회원이신가요?{' '}
            <span
              style={{ fontWeight: '600', color: '#008ed0', cursor: 'pointer' }}
              onClick={() => {
                setState('login');
              }}
            >
              로그인
            </span>
          </p>
          <InputBox>
            <TextField
              name="email"
              id="outlined-basic"
              label="이메일"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleSignupInfo}
              error={
                signupInfo.email === '' || emailRegex.test(signupInfo.email)
                  ? false
                  : true
              }
            />
            {toggle.emailIsValid ? null : (
              <div
                style={{
                  color: 'red',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                <div>{errMsg}</div>
              </div>
            )}
            <TextField
              name="password"
              id="outlined-basic"
              label="비밀번호"
              type="password"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleSignupInfo}
              error={
                signupInfo.password === '' ||
                passwordRegex.test(signupInfo.password)
                  ? false
                  : true
              }
            />
            {toggle.passwordIsValid ? null : (
              <div
                style={{
                  color: 'red',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                <div>{errMsg}</div>
              </div>
            )}
            <TextField
              name="passwordCheck"
              id="outlined-basic"
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleSignupInfo}
              error={
                signupInfo.passwordCheck === '' ||
                signupInfo.password === signupInfo.passwordCheck
                  ? false
                  : true
              }
            />
            {toggle.passwordCheckIsValid ? null : (
              <div
                style={{
                  color: 'red',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                {errMsg}
              </div>
            )}
            <FormGroup sx={{ mt: '19px', mb: '19px' }}>
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
                <div
                  style={{
                    color: 'red',
                    width: '100%',
                  }}
                >
                  {errMsg}
                </div>
              )}
            </FormGroup>
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
              onClick={handleSignup}
            >
              가입하기
            </Button>

            <p>또는</p>

            <Button
              variant="dark"
              sx={{
                width: '352px',
                height: '57px',
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
          </InputBox>
        </SignupWrapper>
      )}
    </>
  );
}

export default AuthModal;
