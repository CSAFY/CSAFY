import { useEffect,  useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, 
};

export default function BasicModal(props) {
  
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.Cate}과목
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.prevScore}점에서 {props.nowScore}점으로 상승했습니다!!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
