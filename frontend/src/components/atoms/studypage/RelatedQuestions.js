import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function RelatedQuestions() {
  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [ddd, setddd] = useState(
    [{ title : "OSI 7계층에 대해 설명해보세요.", answer : "src1"},
    { title : "http란?", answer : "답답1"},
    { title : "문제문제~1", answer : "답답3"},
    { title : "문제문제~1", answer : "답답4"},
    { title : "문제문제~1", answer : "답답5"},
    { title : "문제문제~1", answer : "답답6"}])
  
  const RelatedQuestions = ddd.map((data, index) => 
    <Accordion 
      expanded={expanded === `panel${index + 1}`} 
      onChange={handleChange(`panel${index + 1}`)}
      key ={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {data.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  
  )
  
  return (
    <StudyDetailDiv>
      <StudyDetailText>
        관련 질문
      </StudyDetailText>
      {RelatedQuestions}
    </StudyDetailDiv>
  );
}

export const StudyDetailDiv = styled.div`
  width: 100%;
  height: 320px;
`

export const StudyDetailHr = styled.hr`
  
  margin: 32px 0px 21px 0px;
`

export const StudyDetailText = styled.div`
  font-size: 24px;
  height: 60px;
  width: 500px;
`
