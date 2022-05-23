import React from 'react';

// RESPONSIVE
import { useMediaQuery } from 'react-responsive';

// STYLED
import styled from 'styled-components';
import swal from 'sweetalert2';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  return isMobile ? children : null;
};

const MobileWrapper = styled.div`
  background-image: url(/images/back-tmp.png);
  background-size: cover;
  background-repeat: no-repeat;
  // background-color: white;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StoreBox = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  width: 90vw;
`;

function MobilePage() {
  const handleAppStore = () => {
    swal.fire({
      icon: 'info',
      position: 'middle',
      title: 'Appstore 심사 중입니다.',
      // width: '80%',
      // height: '300px',

      // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
      // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    });
  };
  // '모바일 버전' 버튼
  const handleMobile = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.csafy.csafy_android',
      '_blank',
    );
  };
  return (
    <Mobile>
      <MobileWrapper>
        <div
          style={{
            // height: '140px',
            width: '90vw',
            fontSize: '30px',
            fontWeight: 'bold',
            margin: '0 0 39px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 'auto' }}>막막한 CS 공부</p>
          <p style={{ margin: 'auto' }}>학습부터 면접까지 한 번에!</p>
        </div>

        <div
          style={{
            // height: '92px',
            // margin: '39px 128px 0 129px',
            // width: '80vw',
            fontSize: '16px',
            textAlign: 'center',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: 'auto' }}>개발자들의 필수 관문, CS 면접 준비</p>
          <p style={{ margin: 'auto' }}>
            어디서부터 어떻게 시작해야할 지 모르겠다면?
          </p>
          <br />
          <p style={{ margin: 'auto' }}>
            시험부터 면접까지{' '}
            <strong
              style={{
                color: '#008ED0',
                fontWeight: '800',
              }}
            >
              C;SAFY
            </strong>
            에서 준비했습니다.
          </p>
          <div style={{ marginTop: '3rem' }}>
            모바일 환경에 최적화된{' '}
            <strong
              style={{
                color: '#008ED0',
                fontWeight: '800',
              }}
            >
              앱
            </strong>
            을 통해 만나보세요!
          </div>
        </div>

        <StoreBox>
          <img
            src="images/app.png"
            alt="Appstore"
            style={{ width: '40%', cursor: 'pointer' }}
            onClick={handleAppStore}
          />
          <img
            src="images/play.png"
            alt="Playstore"
            style={{ width: '40%', cursor: 'pointer' }}
            onClick={handleMobile}
          />
        </StoreBox>
      </MobileWrapper>
    </Mobile>
  );
}

export default MobilePage;
