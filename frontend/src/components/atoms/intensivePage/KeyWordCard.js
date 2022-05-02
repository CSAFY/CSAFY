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

const steps = [
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
];

 function KeyWordCard() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNowState(false)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNowState(false)
  };

  const [nowState, setNowState] = useState(false)
  const OpenCard = () => {
    setNowState(true)
  }
  const CloseCard = () => {
    setNowState(false)
  }

  

  function ClickKeyWordCard() {
    if (nowState === false) {
      return (
        <div onClick={OpenCard}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: "center",
              height: 482,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography >{steps[activeStep].label}</Typography>
          </Paper>
        </div>
      )
    } else {
    return(
    <div onClick={CloseCard}>
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
        <Typography >{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 400,  width: '90%', p: 2 }}>
        {steps[activeStep].description}
      </Box>
    </div>
    )
    }
  }

  return (
    <Box id="zz"  sx={{  flexGrow: 1 , margin: "10px 20px 10px 20px"}}>
      
      {ClickKeyWordCard()}

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
  );
}
export default KeyWordCard
