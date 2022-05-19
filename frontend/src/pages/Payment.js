/* eslint-disable */
import React from 'react';
import { Button } from '@mui/material';
import { defaultAPI } from '../utils/api';
import axios from 'axios';
import swal from 'sweetalert2';

function Payment() {
  const buyPremium = () => {
    const token = localStorage.getItem('jwt');

    // 실제 적용시, 이미 프리미엄 유저인지 확인하는 것 필요
    axios({
      method: 'GET',
      url: defaultAPI + '/pay-service/kakaoPay/',
      headers: { Authorization: token },
    })
      .then(res => {
        window.location.href = res.data;
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
    <div>
      <h1>Payment</h1>
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
        onClick={buyPremium}
      >
        결제
      </Button>
    </div>
  );
}

export default Payment;
