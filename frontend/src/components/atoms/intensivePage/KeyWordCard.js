import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { keyWordData } from "../../../recoils";


function KeyWordCard() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useRecoilState(keyWordData)
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setNowState(false)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // setNowState(false)
  };

  // const [nowState, setNowState] = useState(false)
  // const OpenCard = () => {
  //   setNowState(true)
  // }
  // const CloseCard = () => {
  //   setNowState(false)
  // }

  useEffect(() => {
    setSteps([
      {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
      },
      {
        label: 'Create an ad group',
        description:
          'An ad group contains one or more ads which target a shared set of keywords.',
      },
      {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
      },
    ])
  }, [])

  // function ClickKeyWordCard() {
  //   if (nowState === false) {
  //     return (
  //       <div onClick={OpenCard}>
  //         <Paper
  //           square
  //           elevation={0}
  //           sx={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: "center",
  //             height: 442,
  //             pl: 2,
  //             bgcolor: 'background.default',
  //           }}
  //         >
  //           <Typography >{steps[activeStep].label}</Typography>

  //         </Paper>
  //         <DarkCardDiv>
  //           <DarkCardText>
  //             카드를 클릭하면 뜻을 볼 수 있어요 👆
  //           </DarkCardText>
  //         </DarkCardDiv>
  //       </div>
  //     )
  //   } else {
  //     return(
  //     <div onClick={CloseCard}>
  //       <Paper
  //         square
  //         elevation={0}
  //         sx={{
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: "center",
  //           height: 50,
  //           pl: 2,
  //           bgcolor: 'background.default',
            
  //         }}
  //       >
  //         <Typography sx={{padding: "10px"}}>{steps[activeStep].label}</Typography>
  //       </Paper>
  //       <Box sx={{ height: 400,  width: '90%', p: 2 }}>
  //         {steps[activeStep].description}
  //       </Box>
  //     </div>
  //     )
  //   }
  // }

  

  return (
    <Box  sx={{  flexGrow: 1 , margin: "10px 20px 10px 20px", minWidth: "600px"}}>
      
      {/* {ClickKeyWordCard()} */}
      <Cont>

        <ItemFront>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center",
              height: 442,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography >{steps[activeStep].label}</Typography>

          </Paper>
          <DarkCardDiv>
            {/* <DarkCardText> */}
              마우스를 올리면 뜻을 볼 수 있어요 👆
            {/* </DarkCardText> */}
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
            pl: 2,
            bgcolor: 'background.default',
            
          }}
        >
          <Typography sx={{padding: "10px"}}>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 400,  width: '90%', p: 2 }}>
          {steps[activeStep].description}
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
          boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff"}}
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
  );
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
`

const DarkCardText = styled.span`
  text-align: center;
  color: #fff;
  font-family: SUIT;
  font-size: 13px;
`

const ItemFront = styled.div`
  width: 100%;
  border :  solid ;
  font-size : 35px;
  backface-visibility : hidden;
  transition : 1s;
`

const ItemBack = styled.div`
  
  border :  solid ;
  font-size : 35px;
  backface-visibility : hidden;
  transition : 1s;
`

const Cont = styled.div`
  
  height : 482px;
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