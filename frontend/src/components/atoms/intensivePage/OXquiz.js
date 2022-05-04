import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useRecoilState } from "recoil";
import { oxquizData } from "../../../recoils";


function OXquiz() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  
  const [oxData, setOXData] = useRecoilState(oxquizData)
  const maxSteps = oxData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSelectO(0)
    setSelectX(0)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSelectO(0)
    setSelectX(0)
  };

  useEffect(() => {
    setOXData([{ 
      explanation : "단어에 대한 설명을 제시해 줍니다 . 한줄일지 두줄일지 모르고 여튼...",
      answer : 2},
      { 
        explanation : "단어에 대한 설명을 제시해 줍니다 . 모르고 여튼...",
        answer : 1}
    ])
  }, [])

  const [selectO, setSelectO] = useState(0)
  const [selectX, setSelectX] = useState(0)


  const onClickO = () => {
    setSelectO(1)
    setSelectX(0)
  }
  const onClickX = () => {
    setSelectO(0)
    setSelectX(2)
  }

  const OXCardPack = (
    <FlexDiv>
      
      <CardCoverDiv>
        
        <OXCard onClick={onClickO}
          border={selectO === 0 ?  "solid 2px #ebeef4;" 
                : selectO === oxData[activeStep].answer ? "solid 2px #25b26d;" 
                : "solid 2px  #e12e2e;"}
          backgroundColor={selectO === 0 ?  "#fff;" 
          : selectO === oxData[activeStep].answer ? "#f2fbf6;"
          : "#FFD5D2;"}>
          <O>
            O
          </O>
        </OXCard>
        {selectO === 0 ?  " " 
          : selectO === oxData[activeStep].answer ? "정답입니다" 
          : "틀렸습니다"}
      </CardCoverDiv>
      <CardCoverDiv>
        
        <OXCard onClick={onClickX}
        border={selectX === 0 ?  "solid 2px #ebeef4;" 
        : selectX === oxData[activeStep].answer ? "solid 2px #25b26d;" 
        : "solid 2px  #e12e2e;"}
        backgroundColor={selectX === 0 ?  "#fff;" 
        : selectX === oxData[activeStep].answer ? "#f2fbf6;"
        : "#FFD5D2;"}>
          <X>
            X
          </X>
        </OXCard>
        {selectX === 0 ?  " " 
          : selectX === oxData[activeStep].answer ? "정답입니다" 
          : "틀렸습니다"}
      </CardCoverDiv>
    </FlexDiv>
  )
  
  return(
    <Box  sx={{  flexGrow: 1 , margin: "10px 20px 10px 20px", 
    borderRadius: "20px",
    boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff"}}>
    
    <MeaningDiv>
        {oxData[activeStep].explanation}
      </MeaningDiv>
      {OXCardPack}
      <FootBar></FootBar>
    <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
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
export default OXquiz


const MeaningDiv = styled.div`
  width : 90%;
  height : 240PX;
  margin : 20px auto 0 auto;
  text-align: left;
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
  height: 154px;
  flex-grow: 0;
  
  padding: 0 0.1px 0 0;
  border-radius: 11px;
  
  border: ${(props) => props.border}
  background-color: ${(props) => props.backgroundColor}
`

const O = styled.span`  
  width: 95px;
  height: 88px;
  font-family: SUIT;
  font-size: 96px;
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
  font-size: 96px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1c45d8;
`

const FootBar = styled.div`
  width: 100%;
  height: 8px;
  flex-grow: 0;
  margin: 42px 0 0;
  background-color: #d7e4ec;
`