import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import { inputAdornmentClasses } from '@mui/material';

function SearchKeyWords() {
  
  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [seachKeyWords, setSeachKeyWords] = useState([
    { keywordSeq : null,
      key : "",
      explanation : "",
      liked : false},
  ])

  const [inputWord, setInputWord] = useState('')

  const getData = () => {
    axios({
      method: 'get',
      url: `https://csafy.com/api/v1/cs-service/study/keyword/search?keyword=${inputWord}`,
    })
    .then((res) => {
      setSeachKeyWords(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [inputWord])


  const RelatedQuestions = seachKeyWords.map((data, index) => 
    <Accordion 
      expanded={expanded === `panel${index + 1}`} 
      onChange={handleChange(`panel${index + 1}`)}
      key ={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 1}bh-content`}
        id={`panel${index + 1}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{data.key}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {data.explanation}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <MarginDiv>
      <FlexDiv>
        <KeyWordInput type={"text"} value={inputWord} onChange={(event) => setInputWord(event.target.value)}
          placeholder="검색어를 입력해주세요"></KeyWordInput>

        <SearchWordDel onClick={() => setInputWord("")}>
          Reset
        </SearchWordDel>
      </FlexDiv>
      
      
      <HeightDiv>
        {RelatedQuestions}
      </HeightDiv>
    </MarginDiv>
  )
}
export default SearchKeyWords


const SearchWordDel = styled.div` 
  width: 100px;
  height: 37px;
  border: solid 1px white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  margin-left: 10px;
`


const FlexDiv = styled.div` 
  display : flex;
`

const KeyWordInput = styled.input` 
  width: 300px;
  height: 35px;
  padding: 0 10px 0 10px;
`

const MarginDiv = styled.div`
  width: 800px;
  margin: auto;
  
`

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

const HeightDiv = styled.div`  
  margin: 50px auto 0 auto;
  width : 100%;
  height: 600px;
  overflow-y : scroll;
`