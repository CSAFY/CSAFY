import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import LinearWithValueLabel from "./LinearProgressWithLabel";
import CusLinearWithValueLabel from "./CusLinearWithValueLabel";



import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useRecoilState } from "recoil";
import { fourWayRaceData } from "../../../recoils";

import axios from 'axios';


import Swal from 'sweetalert2';

function FourWayRace(props) {
  const [selecCNT, setSelecCNT] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [fourWayData, setFourWayData] = useRecoilState(fourWayRaceData)
  const maxSteps = fourWayData.length;

  const [isCorrects, setIsCorrects] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

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

  const [selectAnswerCNT, setSelectAnswerCNT] = useState(0);

  const isCorrect= (selectCorrect) => {
    if(isCorrects[activeStep] === 0){
      const tmp = isCorrects
      if(fourWayData[activeStep].answer === selectCorrect){
        tmp[activeStep] = 1
        setIsCorrects(tmp)
      } else {
        tmp[activeStep] = 2
        setIsCorrects(tmp)
      }
      setSelectAnswerCNT(selectAnswerCNT => selectAnswerCNT + 1)
    }
  }

  const getData = async () => {
    const Url = `https://csafy.com/api/v1/cs-service/test/multiple?category=${props.Cate}&questionNum=${selecCNT}`
    axios({
      method: 'get',
      url:  Url,
    })
    .then((res) => {
      setFourWayData(res.data)
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
      setSelectAnswerCNT(0)
    }
  }, [pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setSelecCNT(5)
    setActiveStep(0)
    setSelectAnswerCNT(0)
  },[props.Cate])

  const onClickBtn = (data) => {
    setSelecCNT(data)
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
    isCorrect(1)
  }
  const onClickTwo = () => {
    setSelectOne(0)
    setSelectTwo(2)
    setSelectThree(0)
    setSelectFour(0)
    isCorrect(2)
  }
  const onClickThree = () => {
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(3)
    setSelectFour(0)
    isCorrect(3)
  }
  const onClickFour = () => {
    setSelectOne(0)
    setSelectTwo(0)
    setSelectThree(0)
    setSelectFour(4)
    isCorrect(4)
  }

  const scorePostAPI = () => {
    const Url = `https://csafy.com/api/v1/cs-service/profile/scores/update`
    const JWT = window.localStorage.getItem("jwt")
    const score = isCorrects.reduce((acc, data) => {
      if(data === 1){
        return acc + 2
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
      // setResData(res.data)
      // handleOpen()
      setActiveStep(0)
      setSelectOne(0)
      setSelectTwo(0)
      setSelectThree(0)
      setSelectFour(0)
      setSelectAnswerCNT(0)
      const checking = Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${props.Cate}과목이 ${res.data.prevScore}점에서 ${res.data.nowScore}점으로 상승했습니다!!`,
        showConfirmButton: false,
        timer: 1500
      })
      return checking
    })
    .catch(err =>{
      console.log(err)
    })

  }


  const [open, setOpen] = useState(false);
  const [resData, setResData] = useState({"prevScore": null, "nowScore":null});
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setPageNumber(1)
  };


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
            {fourWayData[activeStep].examples[0]}
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
          {fourWayData[activeStep].examples[1]}
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
          {fourWayData[activeStep].examples[2]}
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
          {fourWayData[activeStep].examples[3]}
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
      <BtnDiv>
        <ClickBtn
          able={"Y"}
          onClick={() => onClickBtn(selecCNT)}
          >
          <CusInput type={"number"} min="1" max="20" 
          onClick={(event)=> event.stopPropagation()}
          onChange={(event) => setSelecCNT(event.target.value)}
          value={selecCNT}
          ></CusInput>
          <BtnText>문제</BtnText>
          
        </ClickBtn>
        <ClickBtn
          able={"Y"}
          onClick={() => onClickBtn(5)}
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
      <Box  sx={{  flexGrow: 1 , margin: "10px 20px 10px 20px", 
      borderRadius: "20px",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#fff"}}>
      
      <MeaningDiv>
          {fourWayData[activeStep].question}
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
        sx={{backgroundColor: "rgba(0,0,0,0);"}}
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

export const InterCardDiv = styled.div`
  width: 60%;
  flex-grow: 0;
  height: 180px;
  margin: 10px auto 10px auto;
  padding: 61px 7px 0 13px;
  border-radius: 9px;
  box-shadow: 0 0 11px 1px rgba(0, 142, 208, 0.12);
  background-color: #fff;
`

export const  Title = styled.div`
  width: 300px;
  height: 60px;
  margin: 15px auto 5px; auto;
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
  width: 350px;
  height: 30px;
  margin: 0 auto 10px auto;
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
export const QuestionText2 = styled.div`
  width: 350px;
  height: 30px;
  margin: 0 auto 15px auto;
  flex-grow: 0;
  font-family: SUIT;
  font-size: 23px;
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
  cursor: pointer;
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
        
      `;
    }
  }}
`

export const BtnDiv = styled.div`
margin-top: 25px;
`

export const BtnText = styled.span` 
  margin: 0 0 0 5px;
`

const FootBar = styled.div`
  width: 100%;
  height: 8px;
  flex-grow: 0;
  margin: 42px 0 0;
  background-color: #d7e4ec;
`

const MeaningDiv = styled.div`
  width: 90%;
  height: 150PX;
  margin: 20px auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: SUIT;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`

const FlexDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  height: 350px
`

const CardCoverDiv = styled.div`
  margin: 0 0 25px 0px;
  
`

const OXCard = styled.div`
  width: 400px;
  height: 155px;
  flex-grow: 0;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  border-radius: 11px;
  font-size: 20px;
  text-align: left;
  cursor: pointer;
  border: ${(props) => props.border}
  background-color: ${(props) => props.backgroundColor}
`

const QuestionTextDiv = styled.div`
  width: 100%;
  height: 170px;
  margin: 10px auto 15px; auto;
  padding: 15px 0;
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

export const CusInput = styled.input`  
  width: 25px;
  border:none;
`
