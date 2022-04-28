import { 
  FullLayOut,
  FlexDiv
 } from "./IntensivePage.styled"

import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Router, Routes } from 'react-router';
import axios from 'axios';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useRecoilValue } from "recoil";
import { category } from "../../recoils";

import QuestionList from "../../components/atoms/studypage/QuestionList"
import KeyWordCard from "../../components/atoms/studypage/KeyWordCard"
import FourWayRace from "../../components/atoms/studypage/FourWayRace"
import ShortAnswer from "../../components/atoms/studypage/ShortAnswer"
import OXquiz from "../../components/atoms/studypage/OXquiz"

function IntensivePage() {

  const [nowCate, setNowCate] = useState('')
  const [nowChoice, setNowChoice] = useState('')
  const categorys = useRecoilValue(category)
  const choice = [{ title : "키워드 학습", path : "KeyWordCard"}, 
  {title : "4지 선다", path :"FourWayRace"}, 
  {title : "단답형", path :"ShortAnswer"},
   {title : "OX 퀴즈", path :"OXquiz"}]

  const cateChange = (event) => {
    setNowCate(event.target.value);
    
  };

  const ChoiceChange = (event) => {
    setNowChoice(event.target.value);
  };
  

  const CategoryItems = categorys.slice(1).map((data) => 
    <MenuItem key={data} value={data}>{data}</MenuItem>
  )
  
  const CategorySelect = (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nowCate}
          label="카테고리"
          onChange={cateChange}
        >
          {CategoryItems}
        </Select>
      </FormControl>
    </Box>
  )


  return (
    <FullLayOut>
      {CategorySelect}
      <FlexDiv>
        <QuestionList
          selectKategorie = {ChoiceChange}
          value = {nowChoice}
          categori = {choice}
          >
        </QuestionList>

        {/* <KeyWordCard>

        </KeyWordCard> */}
        <Routes>
            <Route path="KeyWordCard" element={<KeyWordCard />} />
            <Route path="FourWayRace" element={<FourWayRace />} />
            <Route path="ShortAnswer" element={<ShortAnswer />} />
            <Route path="OXquiz" element={<OXquiz />} />
          </Routes>
      </FlexDiv>
      
    </FullLayOut>
  )
}
export default IntensivePage