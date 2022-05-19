/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

const SpentTime = ({ mm, ss, message }) => {
  // const navigate = useNavigate();
  const [minutes, setMinutes] = useState(parseInt(mm));
  const [seconds, setSeconds] = useState(parseInt(ss));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        swal.fire({
          icon: 'warning',
          title: '시간 종료.',
          text: message,
          scrollbarPadding: false,
        });
        clearInterval(countdown);
      } else {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default SpentTime;
