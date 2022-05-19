import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LinearWithValueLabel from "./LinearProgressWithLabel";
import CusLinearWithValueLabel from "./CusLinearWithValueLabel";

import { useRecoilState } from "recoil";
import { oxquizData } from "../../../recoils";

import axios from 'axios';



import Swal from 'sweetalert2';

import {
  FourCardDiv,
  QuestionText,
  ClickBtn,
  Title,
  BtnDiv,
  BtnText,
  CusInput,
  InterCardDiv,
  QuestionText2
  } from "./FourWayRace"


function OXquiz(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  
  const [oxData, setOXData] = useRecoilState(oxquizData)
  const maxSteps = oxData.length;

  const [pageNumber, setPageNumber] = useState(1)
  const [selecCNT, setSelecCNT] = useState(5)

  const [isCorrects, setIsCorrects] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSelectO(2)
    setSelectX(2)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSelectO(2)
    setSelectX(2)
  };

  const getData = async () => {
    const Url = `https://csafy.com/api/v1/cs-service/study/multiple/ox?category=${props.Cate}&questionNum=${selecCNT}`
    axios({
      method: 'get',
      url:  Url,
    })
    .then((res) => {
      setOXData(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  useEffect(() => {
    if (pageNumber === 2){
      getData()
      setIsCorrects([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
      setActiveStep(0)
    }
  }, [pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setSelecCNT(5)
    setActiveStep(0)
  },[props.Cate])

  const [selectO, setSelectO] = useState(2)
  const [selectX, setSelectX] = useState(2)

  const onClickO = () => {
    setSelectO(0)
    setSelectX(2)
    isCorrect(0)
  }
  const onClickX = () => {
    setSelectO(2)
    setSelectX(1)
    isCorrect(1)
  }

  const [selectAnswerCNT, setSelectAnswerCNT] = useState(0);

  const isCorrect= (selectOX) => {
    if(isCorrects[activeStep] === 0){
      const tmp = isCorrects
      if(oxData[activeStep].answer === selectOX){
        tmp[activeStep] = 1
        setIsCorrects(tmp)
      } else {
        tmp[activeStep] = 2
        setIsCorrects(tmp)
      }
      setSelectAnswerCNT(selectAnswerCNT => selectAnswerCNT + 1)
    }
  }

  const OXCardPack = (
    <FlexDiv>
      <CardCoverDiv>
        <OXCard onClick={onClickO}
          border={selectO === 2 ?  "solid 2px #ebeef4;" 
                : selectO === oxData[activeStep].answer ? "solid 2px #25b26d;" 
                : "solid 2px  #e12e2e;"}
          backgroundColor={selectO === 2 ?  "#fff;" 
          : selectO === oxData[activeStep].answer ? "#f2fbf6;"
          : "#FFD5D2;"}>
          <O>
            O
          </O>
        </OXCard>
        <AnsText>
        {selectO === 2 ?  " " 
          : selectO === oxData[activeStep].answer ? "정답입니다" 
          : "틀렸습니다"}
        </AnsText>
      </CardCoverDiv>
      <CardCoverDiv>
        
        <OXCard onClick={onClickX}
        border={selectX === 2 ?  "solid 2px #ebeef4;" 
        : selectX === oxData[activeStep].answer ? "solid 2px #25b26d;" 
        : "solid 2px  #e12e2e;"}
        backgroundColor={selectX === 2 ?  "#fff;" 
        : selectX === oxData[activeStep].answer ? "#f2fbf6;"
        : "#FFD5D2;"}>
          <X>
            X
          </X>
        </OXCard>
        <AnsText>
        {selectX === 2 ?  " " 
          : selectX === oxData[activeStep].answer ? "정답입니다" 
          : "틀렸습니다"}
        </AnsText>
      </CardCoverDiv>
    </FlexDiv>
  )
  
  const [resData, setResData] = useState({"prevScore": null, "nowScore":null});

  const scorePostAPI = () => {
    const Url = `https://csafy.com/api/v1/cs-service/profile/scores/update`
    const JWT = window.localStorage.getItem("jwt")
    const score = isCorrects.reduce((acc, data) => {
      if(data === 1){
        return acc + 1
      } else {
        return acc
      }
    }, 0)
    axios({
      method: 'post',
      url:  Url,
      headers: {
        Authorization: JWT
      },
      data: {
        "subject" : props.Cate,
        "score" : score
      },
    })
    .then((res) => {
      
      const checking = Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${props.Cate}과목이 ${res.data.prevScore}점에서 ${res.data.nowScore}점으로 상승했습니다!!`,
        showConfirmButton: false,
        timer: 1500
      })
      // setResData(res.data)
      // handleOpen()
      
      setActiveStep(0)
      setSelectO(2)
      setSelectX(2)
      setSelectAnswerCNT(0)
      return checking
    })
    .catch(err =>{
      console.log(err)
    })

  }


  

  const onClickBtn = (data) => {
    setSelecCNT(data)
    setPageNumber(2)
  }

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setPageNumber(1)
  };

  if (pageNumber === 1) {
    return(
    <FourCardDiv>
      <Title>
        OX 문제풀기
      </Title>
      
      <QuestionText>
        📗 몇 문제를 풀기를 원하시나요?
      </QuestionText>
      <BtnDiv>
        <ClickBtn
          able={"Y"}
          onClick={() => onClickBtn(selecCNT)}
          >
          <CusInput type={"number"} min="1" max="20" 
          onClick={(event)=> event.stopPropagation()}
          onChange={(event) => setSelecCNT(event.target.value)}
          value={selecCNT}></CusInput>
          <BtnText>문제</BtnText>
          
        </ClickBtn>
        <ClickBtn
          able={"Y"}
          onClick={() => {onClickBtn(5) }}
          >
          알아서 해주세요
        </ClickBtn>
      </BtnDiv>
    </FourCardDiv>)
  }else if (pageNumber === 2) {
    return(
    <InterCardDiv >
      <QuestionText2>
        📤 문제를 선별 중입니다.
        
      </QuestionText2>
      <QuestionText2>
        잠시만 기다려 주세요 
      </QuestionText2>
      
      <LinearWithValueLabel   setPageNumber={setPageNumber}/>
    </InterCardDiv>)
  }else if (pageNumber === 3) {
    return(
      <Box  sx={{  flexGrow: 1 , width:"980px;", margin: "10px 20px 10px 20px", 
      borderRadius: "20px",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#fff"}}>
      
      <MeaningDiv>
        {oxData[activeStep].key !== null? 
          <KeyDiv>
            {oxData[activeStep].key}에 대한 설명이 맞는지 선택하세요.
          </KeyDiv>
        :null}

        <TextDiv>
          {oxData[activeStep].explanation}
        </TextDiv>

      </MeaningDiv>
        {OXCardPack}
        
        
        {/* <BasicModal 
          isOpen={open} 
          handleClose={handleClose} 
          prevScore={resData.prevScore} 
          nowScore={resData.nowScore} 
          Cate={props.Cate}
          >
          </BasicModal> */}
      <CusLinearWithValueLabel 
        selectAnswerCNT={selectAnswerCNT}
        maxSteps={maxSteps}
      ></CusLinearWithValueLabel>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{width: "95%;",backgroundColor: "rgba(0,0,0,0);"}}
        nextButton={
          <Button
            size="small"
            onClick={activeStep === maxSteps - 1? scorePostAPI :handleNext}
            disabled={(activeStep === maxSteps - 1) && (selectAnswerCNT !== maxSteps) || (isCorrects[activeStep] === 0)}
          >
            {activeStep === maxSteps - 1 ?  "제출하기":"Next"}
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
export default OXquiz



const MeaningDiv = styled.div`
  width : 90%;
  height : 210PX;
  margin : 50px auto 0 auto;
  text-align: center;
`

const KeyDiv = styled.div`
  font-size: 30px;
  height: 80px;
`

const TextDiv = styled.div`
  font-size: 25px;
`



const FlexDiv = styled.div`
  display: flex;
  align-content: center;
  justify-Content: "center";
`
const CardCoverDiv = styled.div`
  margin: 0 auto 0 auto;
  height: 174px;
`
const OXCard = styled.div`
  width: 230px;
  height: 140px;
  flex-grow: 0;
  margin-bottom: 10px;
  padding: 0 0.1px 0 0;
  border-radius: 11px;
  cursor: pointer;
  border: ${(props) => props.border}
  background-color: ${(props) => props.backgroundColor}
`

const O = styled.span`  
  width: 95px;
  height: 88px;
  font-family: SUIT;
  font-size: 105px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #e12e2e;
`

const X = styled.span`  
  width: 95px;
  height: 88px;
  margin: 0 0 36px;
  font-family: SUIT;
  font-size: 105px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1c45d8;
`

const AnsText = styled.div`
  text-align: left;
  margin-left: 10px;
`

