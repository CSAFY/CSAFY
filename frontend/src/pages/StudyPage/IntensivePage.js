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
import SearchKeyWords from "../../components/atoms/intensivePage/SearchKeyWords"
import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"

import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


function IntensivePage() {
  const [nowCate, setNowCate] = useState('자료구조')
  const [nowChoice, setNowChoice] = useState("키워드 학습")
  const categorys = useRecoilValue(category)

  
  let navigate = useNavigate();

  const checkLogin=() => {
    const checking = Swal.fire({
      icon: 'error',
      title: '로그인을 해주세요!',
      text: '서비스를 이용하려면 로그인이 필요합니다.',
    })
    .then(() => {
      navigate("/");
    })
    return checking
  }

  useEffect(() => {
    const JWT = window.localStorage.getItem("jwt")
    if (JWT === null ) {
      checkLogin()
    } else {
      console.log("good")
    }
  }, [])

  
  const choice = [{ title : "키워드 학습"}, 
  {title : "4지 선다"}, 
   {title : "OX 퀴즈"},
   {title : "키워드 검색"}
   ]

  const cateChange = (event) => {
    setNowCate(event.target.value);
  };

  const ChoiceChange = (event) => {
    setNowChoice(event.title);
  };
  
  const CategoryItems = categorys.slice(1).map((data) => 
    <MenuItem key={data} value={data}>{data}</MenuItem>
  )
  
  const CategorySelect = (
    <Box sx={{ width: 170 ,  }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">과목</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nowCate}
          label="과목"
          onChange={cateChange}
          defaultValue={"자료구조"}
          sx={{fontWeight: 800, fontSize: "17px"}}
        >
          {CategoryItems}
        </Select>
      </FormControl>
    </Box>
  )
  const location = useLocation();

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
    if ((nowChoice === "키워드 학습" ) && (nowKeyWords.page === 2)){
      return(
        <div>
          {nowKeyWords.liked === true ? 
            <img src="images/star.png" alt="star" 
            style={{width:`50px`, height:`50px`, cursor: "pointer"}} 
            onClick={() => ToggleFavorites()}></img>
            : <img src="images/nonstar.png" alt="nonstar"
            style={{width:`50px`, height:`50px`, cursor: "pointer"}} 
            onClick={() => ToggleFavorites()}></img>
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
          selectKategorie = {(data) =>ChoiceChange(data)}
          value = {nowChoice}
          categori = {choice}
          nowCate = {nowCate}
          >
        </QuestionList>

        { nowChoice === "키워드 학습" ?  <KeyWordCard Cate={nowCate}></KeyWordCard>
        : nowChoice === "4지 선다" ?  <FourWayRace Cate={nowCate}></FourWayRace>
        : nowChoice === "OX 퀴즈" ?  <OXquiz Cate={nowCate}></OXquiz>
        : nowChoice === "키워드 검색" ?  <SearchKeyWords ></SearchKeyWords>
        : null}
        {/* // <Routes>
        //   <Route exact={true} path="KeyWordCard" element={<KeyWordCard Cate={nowCate}/>} />
        //   <Route exact={true} path="FourWayRace" element={<FourWayRace Cate={nowCate}/>} />
        //   <Route exact={true} path="OXquiz" element={<OXquiz  Cate={nowCate}/>} />
        // </Routes> */}
      </FlexDiv>
        
      </DetailLayOut>
    </FullLayOut>
  )
}
export default IntensivePage
