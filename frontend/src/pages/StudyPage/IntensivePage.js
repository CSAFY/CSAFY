import { 
  FullLayOut,
  DetailLayOut,
  FlexDiv,
  StudyDetailHr,
  GridDiv,
  FlexDivs
 } from "./IntensivePage.styled"

import "../../components/atoms/intensivePage/DelInputArrow.css"

import { useEffect,  useState } from "react";
import {  Route,  Routes, useLocation  } from 'react-router';
import axios from 'axios';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { useRecoilValue, useRecoilState } from "recoil";
import { category, keyWordData, likeKeyWord } from "../../recoils";

import QuestionList from "../../components/atoms/intensivePage/QuestionList"
import KeyWordCard from "../../components/atoms/intensivePage/KeyWordCard"
import FourWayRace from "../../components/atoms/intensivePage/FourWayRace"
import ShortAnswer from "../../components/atoms/intensivePage/ShortAnswer"
import OXquiz from "../../components/atoms/intensivePage/OXquiz"
import LodingPage from "../../components/atoms/intensivePage/LodingPage"
import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"


function IntensivePage() {
  const [nowCate, setNowCate] = useState('자료구조')
  const [nowChoice, setNowChoice] = useState('')
  const categorys = useRecoilValue(category)
  const choice = [{ title : "키워드 학습", path : "KeyWordCard"}, 
  {title : "4지 선다", path :"FourWayRace"}, 
   {title : "OX 퀴즈", path :"OXquiz"}]

  const cateChange = (event) => {
    setNowCate(event.target.value);
  };

  const ChoiceChange = (event) => {
    setNowChoice(event.target.text);
  };
  
  const CategoryItems = categorys.slice(1).map((data) => 
    <MenuItem key={data} value={data}>{data}</MenuItem>
  )
  
  const CategorySelect = (
    <Box sx={{ width: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">과목</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nowCate}
          label="과목"
          onChange={cateChange}
          defaultValue={"전체"}
        >
          {CategoryItems}
        </Select>
      </FormControl>
    </Box>
  )
  const location = useLocation();
  

  const relatedDisPlay = () => {
    if (location.pathname === '/IntensivePage/KeyWordCard'){
      return(
        <div>
          <RelatedExam>
          </RelatedExam>
          <StudyDetailHr></StudyDetailHr>
          <RelatedQuestions>
          </RelatedQuestions>
        </div>
      )
    }
  }

  const [nowKeyWords, setNowKeyWords] = useRecoilState(likeKeyWord)
  const [keyWords, setKeyWords] = useRecoilState(keyWordData)

  const ToggleFavorites = (bools) => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/keyword/${nowKeyWords.keywordSeq}/likes`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {
      const tmp = keyWords.slice()
      setNowKeyWords({
        explanation: nowKeyWords.explanation,
        key: nowKeyWords.key,
        keywordSeq: nowKeyWords.keywordSeq,
        liked: !nowKeyWords.liked,
        page: 2,
        index: nowKeyWords.index
      })
      const data = {
        keywordSeq: nowKeyWords.keywordSeq,
        key: nowKeyWords.key,
        explanation: nowKeyWords.explanation,
        liked: !nowKeyWords.liked,
      }
      tmp[nowKeyWords.index] = data
      setKeyWords(tmp)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const keyWordLike = () => {
    if ((location.pathname === '/IntensivePage/KeyWordCard') && (nowKeyWords.page === 2)){
      return(
        <div>
          {nowKeyWords.liked === true ? 
            <StarIcon color="warning" 
            sx={{width:`50px;`, height:`50px;`}} 
            onClick={() => ToggleFavorites()}></StarIcon>
            : <StarBorderIcon color="warning" 
            sx={{width:`50px;`, height:`50px;`}} 
            onClick={() => ToggleFavorites()}></StarBorderIcon>
          }
        </div>
      )
    }
  }

  return (
    <FullLayOut>
      <DetailLayOut>
        <FlexDivs>
          {CategorySelect}
          {keyWordLike()}
        </FlexDivs>
      <FlexDiv>
        <QuestionList 
          selectKategorie = {ChoiceChange}
          value = {nowChoice}
          categori = {choice}
          nowCate = {nowCate}
          disabled ={nowCate === "" ? true: false}
          >
        </QuestionList>

        <Routes>
          <Route exact={true} path="/" element={<LodingPage />} />
          <Route exact={true} path="KeyWordCard" element={<KeyWordCard Cate={nowCate}/>} />
          <Route exact={true} path="FourWayRace" element={<FourWayRace Cate={nowCate}/>} />
          {/* <Route exact={true} path="ShortAnswer" element={<ShortAnswer />} /> */}
          <Route exact={true} path="OXquiz" element={<OXquiz  Cate={nowCate}/>} />
        </Routes>
      </FlexDiv>
      
        {/* {relatedDisPlay()} */}
        
      </DetailLayOut>
    </FullLayOut>
  )
}
export default IntensivePage
