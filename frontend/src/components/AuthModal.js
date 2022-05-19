/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { defaultAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';

// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../recoils/LoginState';
import { Token } from '../recoils/Token';
import { Username } from '../recoils/Username';

// Styled
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';

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
const InputForm = styled.form`
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

  position: relative;
`;
const Policy = styled.div`
  text-align: center;
  position: absolute;
  bottom: 15px;
  font-size: 15px;
`;

function AuthModal({ state, setState, setSignup, setModal }) {
  const navigate = useNavigate();

  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const [username, setUserName] = useRecoilState(Username);

  // LOGIN
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleLoginInfo = e => {
    e.preventDefault();
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const submitLogin = e => {
    e.preventDefault();
    axios
      .post(`${defaultAPI}/user-service/account/login`, {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      // 일단 회원가입 후 메인 페이지로 이동
      .then(res => {
        // localStorage
        localStorage.setItem('jwt', res.data.token);
        // recoil
        setIsLoggedIn(true);
        setToken(res.data.token);
        // 모달 없애기
        setModal(false);
        // navigate
        navigate('/mypage');
        // navigate('/');
        // setToggleLogin('로그아웃');
      })
      .catch(err => {
        // console.log(err);
        // if (String(err).includes('404')) {
        //   console.log('404');
        //   alert('이메일 및 비밀번호를 확인해주세요.');
        // }
        alert('이메일 및 비밀번호를 확인해주세요.');
      });
  };

  // SIGNUP
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
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSignupInfo = e => {
    e.preventDefault();
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    setToggle({
      emailIsValid: true,
      passwordIsValid: true,
      passwordCheckIsValid: true,
      agreementIsValid: true,
    });
  };
  const submitSignup = e => {
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

    // api 연결 - 회원가입
    axios
      .post(`${defaultAPI}/user-service/signup`, {
        email: signupInfo.email,
        nickname: 'test',
        password: signupInfo.password,
        username: 'noname',
      })
      // 회원가입 후 마이페이지로 바로 이동
      .then(res => {
        // console.log(res);
        setTimeout(() => {
          axios
            .post(`${defaultAPI}/user-service/account/login`, {
              email: signupInfo.email,
              password: signupInfo.password,
            })
            .then(res => {
              // localStorage
              localStorage.setItem('jwt', res.data.token);
              // recoil
              setIsLoggedIn(true);
              setToken(res.data.token);
              // 모달 없애기
              setModal(false);
              // navigate
              navigate('/mypage');
              // setToggleLogin('로그아웃');
            })
            .catch(err => {
              console.error(err);
            });
        }, 500);
      })
      .catch(err => {
        if (String(err).includes('400')) {
          console.log('400');
          alert('이미 존재하는 이메일 주소입니다.');
        }
      });
  };

  // Oauth
  const googleOauth = () => {
    // CSAFY
    window.location.href = `https://csafy.com/api/v3/oauth2/authorization/google?redirect_uri=https://csafy.com/oauth/redirect`;
  };

  // 이용약관 보기
  const handleTerms = () => {
    navigate('/terms');
    setModal(false);
  };
  const handlePrivacy = () => {
    navigate('/privacy');
    setModal(false);
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
          <InputForm onSubmit={submitLogin}>
            <TextField
              name="email"
              label="이메일"
              variant="outlined"
              sx={{ width: '352px', height: '57px', mt: '1rem' }}
              onChange={handleLoginInfo}
            />
            <TextField
              name="password"
              label="비밀번호"
              type="password"
              autoComplete="off"
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
              type="submit"
              onClick={submitLogin}
            >
              로그인
            </Button>
            <p>또는</p>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#f1fcff',
                // border: '1px solid black',
                borderRadius: '50%',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="images/google.png"
                alt="Google"
                style={{
                  width: '32px',
                  height: '32px',
                  // marginTop: '1rem',
                  cursor: 'pointer',
                }}
                onClick={googleOauth}
              />
            </div>
          </InputForm>
        </LoginWrapper>
      ) : (
        <SignupWrapper>
          <LogoImg src="images/csafy.png" alt="Csafy" />
          <p
            style={{
              height: '20px',
              fontSize: '16px',
              paddingBottom: '20px',
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
          <InputForm>
            <TextField
              name="email"
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
              label="비밀번호"
              type="password"
              autoComplete="off"
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
              label="비밀번호 확인"
              type="password"
              autoComplete="off"
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
                <span>[필수] 개인정보 수집 및 이용 동의</span>
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
                mt: '10px',
                // mb: '1rem',
                bgcolor: '#008ED0',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },

                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
              }}
              onClick={submitSignup}
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
                // mt: '1rem',
                border: '1px solid lightgray',
                ':hover': {
                  color: '#006D9F',
                  bgcolor: '#D5F2FC',
                },
              }}
              // oauth
              onClick={googleOauth}
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
          </InputForm>
          <Policy>
            <div>
              가입을 하면 C;SAFY의
              <br />
              <span
                onClick={handleTerms}
                style={{
                  color: '#008ed0',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                이용약관
              </span>
              ,{' '}
              <span
                onClick={handlePrivacy}
                style={{
                  color: '#008ed0',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                개인정보취급방침 및 개인정보3자제공
              </span>
              <br />에 동의하게 됩니다.
            </div>
          </Policy>
        </SignupWrapper>
      )}
    </>
  );
}

export default AuthModal;
