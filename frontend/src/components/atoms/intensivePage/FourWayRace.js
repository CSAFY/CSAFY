import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import LinearWithValueLabel from "./LinearProgressWithLabel";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useRecoilState } from "recoil";
import { fourWayRaceData } from "../../../recoils";

function FourWayRace() {
  const [selecCNT, setSelecCNT] = useState(5)

  const [pageNumber, setPageNumber] = useState(1)

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [fourWayData, setFourWayData] = useRecoilState(fourWayRaceData)
  const maxSteps = fourWayData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(0)
    setSelectFour(0)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(0)
    setSelectFour(0)
  };

  useEffect(() => {
    setFourWayData([
      { 
      explanation : "단어에 대한 설명을 제시해 줍니다 . 한줄일지 두줄일지 모르고 여튼...11",
      answer : 1,
      example : ["보기 1번", "보기 2번", "보기 3번", "보기 4번"]
      },
      { 
        explanation : " . 모르고 여튼...22",
        answer : 2,
        example : ["1번", " 2번", " 3번", " 4번"]
      },
      { 
        explanation : "단어에 대한 설명을 제시해 . 모르고 여튼...33",
        answer : 3,
        example : ["보 ", "보", "보", "보"]
      },
      { 
        explanation : "단어에 대한  . 모르고 여튼...44",
        answer : 4,
        example : ["보기 1", "보기 2", "보기 3", "보기 4"]
      }
    ])
  }, [])
  
  const onClickBtn = (data) => {
    setPageNumber(2)
  }

  const [selectOne, setSelectOne] = useState(0)
  const [selectTwo, setSelectTwo] = useState(0)
  const [selectThree, setSelectThree] = useState(0)
  const [selectFour, setSelectFour] = useState(0)
  const onClickOne = () => {
    setSelectOne(1)
    setSelectTwo(0)
    setSelectThree(0)
    setSelectFour(0)
  }
  const onClickTwo = () => {
    setSelectOne(0)
    setSelectTwo(2)
    setSelectThree(0)
    setSelectFour(0)
  }
  const onClickThree = () => {
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(3)
    setSelectFour(0)
  }
  const onClickFour = () => {
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(0)
    setSelectFour(4)
  }


  const OXCardPack = (
    <FlexDiv>
      <CardCoverDiv>
        <OXCard onClick={onClickOne}
          border={selectOne === 0 ?  "solid 2px #ebeef4;" 
                : selectOne === fourWayData[activeStep].answer ? "solid 2px #25b26d;" 
                : "solid 2px  #e12e2e;"}
          backgroundColor={selectOne === 0 ?  "#fff;" 
          : selectOne === fourWayData[activeStep].answer ? "#f2fbf6;"
          : "#FFD5D2;"}>
            {fourWayData[activeStep].example[0]}
        </OXCard>
      </CardCoverDiv>

      <CardCoverDiv>
        <OXCard onClick={onClickTwo}
        border={selectTwo === 0 ?  "solid 2px #ebeef4;" 
        : selectTwo === fourWayData[activeStep].answer ? "solid 2px #25b26d;" 
        : "solid 2px  #e12e2e;"}
        backgroundColor={selectTwo === 0 ?  "#fff;" 
        : selectTwo === fourWayData[activeStep].answer ? "#f2fbf6;"
        : "#FFD5D2;"}>
          {fourWayData[activeStep].example[1]}
        </OXCard>
      </CardCoverDiv>

      <CardCoverDiv>
        <OXCard onClick={onClickThree}
        border={selectThree === 0 ?  "solid 2px #ebeef4;" 
        : selectThree === fourWayData[activeStep].answer ? "solid 2px #25b26d;" 
        : "solid 2px  #e12e2e;"}
        backgroundColor={selectThree === 0 ?  "#fff;" 
        : selectThree === fourWayData[activeStep].answer ? "#f2fbf6;"
        : "#FFD5D2;"}>
          {fourWayData[activeStep].example[2]}
        </OXCard>
      </CardCoverDiv>

      <CardCoverDiv>
        <OXCard onClick={onClickFour}
        border={selectFour === 0 ?  "solid 2px #ebeef4;" 
        : selectFour === fourWayData[activeStep].answer ? "solid 2px #25b26d;" 
        : "solid 2px  #e12e2e;"}
        backgroundColor={selectFour === 0 ?  "#fff;" 
        : selectFour === fourWayData[activeStep].answer ? "#f2fbf6;"
        : "#FFD5D2;"}>
          {fourWayData[activeStep].example[3]}
        </OXCard>
      </CardCoverDiv>
    </FlexDiv>
  )
  
  if (pageNumber === 1) {
    return(
    <FourCardDiv>
      <Title>
        4지선다 문제풀기
      </Title>
      <QuestionText>
        📗 몇 문제를 풀기를 원하시나요?
      </QuestionText>
      <ClickBtn
        able={"Y"}
        onClick={() => onClickBtn(selecCNT)}
        >
        <input type={"number"} min="1" max="15" 
        onClick={(event)=> event.stopPropagation()}
        onChange={(event) => setSelecCNT(event.target.value)}
        value={selecCNT}></input>
        문제
      </ClickBtn>
      <ClickBtn
        able={"Y"}
        onClick={() => onClickBtn(5)}
        >
        알아서 해주세요
      </ClickBtn>
    </FourCardDiv>)
  }else if (pageNumber === 2) {
    return(
    <FourCardDiv >
      <QuestionText>
        📤 문제를 선별 중입니다.
        
      </QuestionText>
      <QuestionText>
        잠시만 기다려 주세요 
      </QuestionText>
      
      <LinearWithValueLabel   setPageNumber={setPageNumber}/>
    </FourCardDiv>)
  }else if (pageNumber === 3) {
    return(
      <Box  sx={{  flexGrow: 1 , margin: "10px 20px 10px 20px", 
      borderRadius: "20px",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#fff"}}>
      
      <MeaningDiv>
        {fourWayData[activeStep].explanation}/
        answer : {fourWayData[activeStep].answer}/
        one:{selectOne}/
        two:{selectTwo}/
        th:{selectThree}/
        fo:{selectFour}
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
      
    </Box>)
  }
  
}
export default FourWayRace

export const FourCardDiv = styled.div`
  width: 60%;
  height: 210px;
  flex-grow: 0;
  margin: 10px auto 10px auto;
  padding: 20px 7px 11px 13px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
`

export const  Title = styled.div`
  width: 300px;
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


export const QuestionText = styled.div`
  width: 300px;
  height: 30px;
  margin: 0 auto 20px auto;
  flex-grow: 0;
  font-family: SUIT;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`

export const ClickBtn = styled.button`  
  
  flex-grow: 0;
  margin: 0 5px 0 5px;
  padding: 11px 35px 10px 36px;
  border-radius: 60px;
  border: solid 1px #008ed0;
  background-color: #fff;
  
  ${(props) => {
    if (props.able === "Y") {
      return css`
        :hover {
          color: #fff;
          background: #008ed0;
        }
      `;
    } else {
      return css`
        cursor: default;
      `;
    }
  }}
`



const FootBar = styled.div`
  width: 100%;
  height: 8px;
  flex-grow: 0;
  margin: 42px 0 0;
  background-color: #d7e4ec;
`

const MeaningDiv = styled.div`
  width : 90%;
  height : 200PX;
  margin : 20px auto 0 auto;
  text-align: left;
`

const FlexDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
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