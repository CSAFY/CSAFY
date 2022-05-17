import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LinearWithValueLabel from "./LinearProgressWithLabel";

import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { keyWordData } from "../../../recoils";

import axios from 'axios';

import {
  QuestionText,
  ClickBtn,
  } from "./FourWayRace"


function KeyWordCard(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [keyWords, setKeyWords] = useRecoilState(keyWordData)
  const maxSteps = keyWords.length;

  const [selecCNT, setSelecCNT] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getData = async () => {
    const JWT = window.localStorage.getItem("jwt")
    const Url = `https://csafy.com/api/v1/cs-service/study/keyword?category=${props.Cate}&questionNum=${selecCNT}`
    axios({
      method: 'get',
      url:  Url,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {
      console.log(res.data)
      setKeyWords(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const onClickBtn = (data) => {
    setSelecCNT(data)
    setPageNumber(2)
  }

  useEffect(() => {
    setPageNumber(1)
    setSelecCNT(5)
  }, [props.Cate])

  useEffect(() => {
    if (pageNumber === 2){
      getData()
    }
  }, [pageNumber])

  


  if (pageNumber === 1) {
    return(
    <KeyWordCardDiv>
      <Title>
        키워드 학습하기
      </Title>
      
      {/* <QuestionText>
        📗 몇개의 키워드를 학습하고 싶나요?
      </QuestionText>
      <ClickBtn
        able={"Y"}
        onClick={() => onClickBtn(selecCNT)}
        >
        <input type={"number"} min="1" max="20" 
        onClick={(event)=> event.stopPropagation()}
        onChange={(event) => setSelecCNT(event.target.value)}
        value={selecCNT}></input>
        개
      </ClickBtn> */}
      <ClickBtn
        able={"Y"}
        onClick={() => {onClickBtn(9999) }}
        >
        학습시작
      </ClickBtn>
    </KeyWordCardDiv>)
  }else if (pageNumber === 2) {
    return(
    <KeyWordCardDiv >
      <QuestionText>
        📤 키워드를 선별 중입니다.
        
      </QuestionText>
      <QuestionText>
        잠시만 기다려 주세요 
      </QuestionText>
      
      <LinearWithValueLabel   setPageNumber={setPageNumber}/>
    </KeyWordCardDiv>)
  }else if (pageNumber === 3) {
    return(
      <Box  sx={{  flexGrow: 0 , margin: "auto", width: "600px"}}>
      <Cont>
        <ItemFront>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center",
              width: 480,
              height: 360,
              margin: "auto;",
              
              bgcolor: 'background.default',
            }}
          >
            <Typography component={'div'} sx={{width: 580}}>
              <Title>
                {keyWords[activeStep].key}
              </Title>
            </Typography>

          </Paper>
          <DarkCardDiv>
            마우스를 올리면 뜻을 볼 수 있어요 👆
          </DarkCardDiv>
        </ItemFront>

        <ItemBack>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
            height: 50,
            margin: '10px 5px 0 5px',
            pl: 2,
            bgcolor: 'background.default',
            
          }}
        >
          <Typography sx={{padding: "10px", fontSize: "35px"}}>{keyWords[activeStep].key}</Typography>
          
        </Paper>
        <Box sx={{ height: 380,  width: '90%', p: 2 , padding: "20px"}}>
          {keyWords[activeStep].explanation}
        </Box>
        
        </ItemBack>

      </Cont>

      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          margin : "20px 0 0 0",
          borderRadius: "20px",
          // boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
          // backgroundColor: "#fff"
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      
    </Box>
    )
  }
}
export default KeyWordCard


const DarkCardDiv = styled.div`
  height : 40px;
  flex-grow: 0;
  margin: auto 0 0;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-family: SUIT;
  font-size: 13px;
  background-color: #303446;
  border-radius: 10px;
`

const DarkCardText = styled.span`
  text-align: center;
  color: #fff;
  font-family: SUIT;
  font-size: 13px;
`

const ItemFront = styled.div`
  width: 600px;
  height: 400px;
  border :  solid ;
  font-size : 35px;
  backface-visibility : hidden;
  transition : 1s;
  border-radius: 15px;
  margin: auto;
  
`

const ItemBack = styled.div`
  width: 600px;
  height: 400px;
  margin: auto;
  border :  solid ;
  font-size : 35px;
  backface-visibility : hidden;
  transition : 1s;
  border-radius: 15px;
  
`

const Cont = styled.div`
  
  height: 400px;
  perspective: 800px;
  ${ItemFront} {
    position : absolute;
    transform : rotateX(0deg);
  }
  ${ItemBack} {
    position : absolute;
    transform : rotateX(-180deg);
  }
  :hover ${ItemFront} {
    transform : rotateX(180deg);
  }
  :hover ${ItemBack} {
    transform : rotateX(0deg);
  }
`

export const Title = styled.div`
  width: 90%;
  height: 60px;
  margin: 10px auto 15px; auto;
  flex-grow: 0;
  font-family: SUIT;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`

export const KeyWordCardDiv = styled.div`
  width: 60%;
  height: 210px;
  flex-grow: 0;
  margin: 10px auto 10px auto;
  padding: 20px 7px 11px 13px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
  display: grid;
  align-content: center;
  justify-items: center;
`