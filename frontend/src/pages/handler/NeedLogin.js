/* eslint-disable */
import React, { useEffect } from 'react';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// STYLED
import styled from 'styled-components';
import Progress from '../../components/Progress';

const PaySuccessWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 417px);

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;

  filter: blur(1rem);
`;
const PaySuccessContent = styled.div`
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

function NeedLogin() {
  let navigate = useNavigate();

  // 3초 후 귀환
  useEffect(() => {
    let timerInterval;
    swal
      .fire({
        icon: 'warning',
        position: 'middle',
        title: '로그인이 필요한 페이지입니다.',
        text: '3초 후 홈으로 돌아갑니다.',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          swal.showLoading();
          const b = swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            // b.textContent = swal.getTimerLeft()
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      })
      .then(result => {
        if (result.dismiss === swal.DismissReason.timer) {
          // 타이머 종료
          navigate('/');
        }
      });
  }, []);

  return (
    <PaySuccessWrapper>
      <PaySuccessContent>
        <AlertBox>
          <div>잠시만 기다려 주세요.</div>
          <Progress />
        </AlertBox>
      </PaySuccessContent>
    </PaySuccessWrapper>
  );
}

export default NeedLogin;
