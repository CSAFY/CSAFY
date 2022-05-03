import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from 'axios';
import { useRecoilState, useRecoilValue } from "recoil";
import { shortAnswerData } from "../../../recoils";

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function OXquiz() {
  const [shortAData, setShortAData] = useRecoilState(shortAnswerData)

  
  useEffect(() => {
    setShortAData({ 
      explanation : "단어에 대한 설명을 제시해 줍니다 . 한줄일지 두줄일지 모르고 여튼...",
      answer : "정답"})
  }, [])

  const [inputAnswerData, setInputAnswerData] = useState()
  const onChanges = (event) => {
    
    setInputAnswerData(event.target.value)
  }
  const [open, setOpen] = useState(false);
  
  return(
    <OXquizCardDiv>
      <MeaningDiv>
        {shortAData.explanation}
      </MeaningDiv>
      
      
      <AnswerInput
      placeholder="정답을 입력해 주세요"
      value={inputAnswerData}
      onChange={onChanges}>
      </AnswerInput>
      
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        
        <Alert
          severity= {shortAData.answer === inputAnswerData? "success" : "error" }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        정답 확인
      </Button>
      
    </Box>
      
    </OXquizCardDiv>

  )
}
export default OXquiz

const OXquizCardDiv = styled.div`
  width : 90%;
  height : 530px;
  align-Items: 'center';
  margin : 10px 20px 10px 20px;
  border : solid;
  justify-Content: "center";
`

const MeaningDiv = styled.div`
  width : 90%;
  height : 50%;
  margin : 40px auto 0 auto;
  text-align: left;
`

const AnswerInput = styled.input`
  width : 250px;
  height : 30px;
  border-radius: 11px;
  border: solid 2px #ebeef4;
  padding : 15px;
`

