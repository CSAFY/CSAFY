/* eslint-disable */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Recoil
import { useRecoilState } from 'recoil';
import { LoginState } from '../../recoils/LoginState';
import { Token } from '../../recoils/Token';

// STYLED
import styled from 'styled-components';
import Progress from '../../components/Progress';

const AuthHandlerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 417px);

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
`;

const AuthHandlerContent = styled.div`
  width: 1232px;
  height: 100%;
  position: relative;
`;

const AlertBox = styled.div`
  width: 543px;
  height: 151px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function AuthHandler() {
  // Recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [token, setToken] = useRecoilState(Token);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const jwt = location.search.split('=')[1];
  // console.log(token);

  useEffect(() => {
    localStorage.setItem('jwt', jwt);
    setToken(jwt);
    setIsLoggedIn(true);
    navigate('/');
  }, []);

  return (
    <AuthHandlerWrapper>
      <AuthHandlerContent>
        <AlertBox>
          <div>로그인 중입니다.</div>
          <Progress />
        </AlertBox>
      </AuthHandlerContent>
    </AuthHandlerWrapper>
  );
}
