import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Modal } from '@mui/material';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
// Recoil
import { useRecoilState } from 'recoil';
import { Token } from '../recoils/Token';

// STYLED
import styled from 'styled-components';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import { defaultAPI } from '../utils/api';
import VoiceRecord from './VoiceRecord';

const DetailBox = styled.div`
  width: 840px;
  height: 530px;
  // width: 100%;
  // height 100%;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
const Likes = styled.div`
  position: absolute;
  right: 20px;
  bottom: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
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
const Icon = styled.div`
  position: absolute;
  top: 322px;
  left: 50%;
  transform: translate(-50%);

  cursor: pointer;
`;

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
  height: '530px',
  bgcolor: '#fff',
  boxShadow: '0 0 11px 1px rgba(0, 142, 208, 0.12)',
  borderRadius: '9px',
  // p: 4,
};

export default function Hamburger() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  //
  const [modal, setModal] = React.useState(false);
  const handleModalClose = () => setModal(false);
  const handleModalOpen = () => {
    setModal(true);
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate('/');
    setAnchorEl(null);
  };

  //
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //
  const [interviewInfo, setInterviewInfo] = React.useState({});
  const [token, setToken] = useRecoilState(Token);
  const [randSeq, setRandSeq] = React.useState(1);
  // console.log(randSeq);
  // 좋아요 정보 가져오기(갱신)
  const getInterviewInfo = () => {
    axios
      .get(`${defaultAPI}/cs-service/interview/${randSeq}/info`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        setInterviewInfo(res.data);
      })
      .catch(err => console.error(err));
  };
  const handleLikes = () => {
    axios
      .post(`${defaultAPI}/cs-service/interview/${randSeq}/likes`, null, {
        headers: { Authorization: token },
      })
      .then(res => {
        // isliked 갱신
        getInterviewInfo();
      })
      .catch(err => console.error(err));
  };

  React.useEffect(() => {
    // 1부터 10 사이 정수
    setRandSeq(Math.floor(Math.random() * 10 + 1));
    getInterviewInfo();
  }, [modal]);

  return (
    <div>
      <MenuIcon
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        fontSize="large"
        sx={{ cursor: 'pointer' }}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleHome}>홈</MenuItem>
        <MenuItem onClick={handleModalOpen}>면접</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Modal
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={ModalStyle}> */}
        <DetailBox>
          {interviewInfo.category === '인성' ? (
            <AttitudeCategory>{interviewInfo.category}</AttitudeCategory>
          ) : (
            <TechCategory>{interviewInfo.category}</TechCategory>
          )}
          <Content>Q. {interviewInfo.question}</Content>
          <Icon>
            <VoiceRecord />
          </Icon>
          <Likes>
            {interviewInfo.liked ? (
              <ThumbUpIcon
                color="primary"
                sx={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleLikes}
              />
            ) : (
              <ThumbUpOffAltIcon
                color="primary"
                sx={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
                onClick={handleLikes}
              />
            )}
            {interviewInfo.interviewLikes}
          </Likes>
        </DetailBox>
        {/* </Box> */}
      </Modal>
    </div>
  );
}
