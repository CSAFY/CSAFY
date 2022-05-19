/* eslint-disable */
import React, { useEffect } from 'react';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const KakaopayCancel = () => {
  let navigate = useNavigate();

  // 3초 후 귀환
  useEffect(() => {
    let timerInterval;
    swal
      .fire({
        icon: 'error',
        position: 'top',
        title: '결제 취소',
        html: '결제를 취소하셨습니다.<br>1초 후 홈으로 돌아갑니다.',
        timer: 1000,
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
          navigate('/mypage');
        }
      });
  }, []);

  return (
    <div>
      결제취소!
      <br />
      홈으로 이동중!
    </div>
  );
};

export default KakaopayCancel;
