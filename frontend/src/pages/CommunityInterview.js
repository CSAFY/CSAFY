/* eslint-disable */
import React, { useState } from 'react';

import styled from 'styled-components';
import { Button, Modal } from '@mui/material';
import AudioRecorder from '../components/AudioRecorder';

const DetailBox = styled.div`
  width: 840px;
  height: 530px;
  // width: 100%;
  // height 100%;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.7);
  // background-color: transparent;
  // filter: blur(4px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const AttitudeCategory = styled.div`
  width: 78px;
  height: 31px;
  border-radius: 18px;
  background-color: #def9ff;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 20px;
`;
const TechCategory = styled.div`
  width: 78px;
  height: 31px;
  border-radius: 18px;
  background-color: #d2fae2;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 20px;
`;
const Content = styled.div`
  width: 90%;
  font-size: 30px;
  font-weight: 600;

  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%);
`;
const Icon = styled.div`
  position: absolute;
  top: 322px;
  left: 50%;
  transform: translate(-50%);

  cursor: pointer;
`;

function CommunityInterview({
  getInterviewInfo,
  interviewInfo,
  modal,
  setModal,
  onHandleEnd,
}) {
  // const [modal, setModal] = useState(true);
  const handleModalClose = () => {
    setModal(false);
    console.log('1. end');
    onHandleEnd();
    console.log('2. end');
  };
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DetailBox>
          {interviewInfo.category === '인성' ? (
            <AttitudeCategory>{interviewInfo.category}</AttitudeCategory>
          ) : (
            <TechCategory>{interviewInfo.category}</TechCategory>
          )}
          <Content>Q. {interviewInfo.question}</Content>
          <Icon>
            <AudioRecorder cnt={interviewInfo.question} />
          </Icon>
          {/* <ButtonDiv> */}
          <Button
            sx={{
              position: 'absolute',
              bottom: '30px',
              left: '80px',
              fontSize: '18px',
              color: '#000',
              ':hover': {
                color: '#fff',
                bgcolor: '#008ed0',
              },
              // fontWeight: '600',
            }}
            onClick={handleModalClose}
          >
            면접 종료
          </Button>
          <Button
            sx={{
              position: 'absolute',
              bottom: '30px',
              right: '80px',
              fontSize: '18px',
              color: '#000',
              ':hover': {
                color: '#fff',
                bgcolor: '#008ed0',
              },
            }}
            onClick={getInterviewInfo}
          >
            다음 문제
          </Button>
        </DetailBox>
      </Modal>
    </div>
  );
}

export default CommunityInterview;
