/* eslint-disable */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert2';
import Progress from '../../components/Progress';
import { defaultAPI } from '../../utils/api';

// STYLED
import styled from 'styled-components';

const PaySuccessWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 417px);

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f6f7fb;
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

function KakaopaySuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const pgToken = location.search.split('=')[1];
  // console.log(pgToken);
  // console.log(location.search.split('=')[1]);

  useEffect(() => {
    KakaopayReceipt(pgToken);
  }, []);

  const KakaopayReceipt = pgToken => {
    axios({
      method: 'POST',
      url: defaultAPI + '/pay-service/kakaoPay/success',
      params: { pgToken: pgToken },
      headers: { Authorization: localStorage.getItem('jwt') },
    })
      .then(res => {
        console.log(res.data);
        // this.SET_PREMIUM();
        swal.fire({
          icon: 'success',
          title: '후원 감사합니다.',
          text: res.data.item_name + '회원으로 전환되었습니다.',
          scrollbarPadding: false,
        });
        navigate('/');
        // router.push('/');
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: '결제 실패',
          text: '서버가 혼잡합니다. 다시 시도해 주세요.',
        });
      });
  };

  return (
    <PaySuccessWrapper>
      <PaySuccessContent>
        <AlertBox>
          <div>결제가 완료되었습니다.</div>
          <div>잠시만 기다려 주세요.</div>
          <Progress />
        </AlertBox>
      </PaySuccessContent>
    </PaySuccessWrapper>
  );
}

export default KakaopaySuccess;
