/* eslint-disable */
import React, { useEffect } from 'react';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const KakaopayFail = () => {
  let navigate = useNavigate();

  // 3초 후 귀환
  useEffect(() => {
    let timerInterval;
    swal
      .fire({
        icon: 'error',
        position: 'top',
        title: '결제 실패',
        html:
          '서버가 혼잡합니다. 나중에 다시 시도해주세요.<br>1초 후 홈으로 돌아갑니다.',
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
          navigate('/');
        }
      });
  }, []);

  return (
    <div>
      결제실패...
      <br />
      홈으로 이동중!
    </div>
  );
};

export default KakaopayFail;
