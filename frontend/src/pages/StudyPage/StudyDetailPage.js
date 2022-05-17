import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailHr,
  ButtonBox,
  ArrowAndLabel,
  BtnText,
  CategoryShowDiv,
  FlexSpan
 } from "./StudyDetailPage.styled"

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { videoData, studyData } from "../../recoils";

import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"
import Drawer from "../../components/atoms/studypage/Drawer"
import YouTubeVideo from "../../components/atoms/studypage/YouTubeVideo"

import BasicModal from '../../components/atoms/intensivePage/BasicModal';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';

import axios from 'axios';

function StudyDetailPage() {

  const [videoDatas, setVideoDatas ]= useRecoilState(videoData)
  const [studyDatas, setStudyDatas] = useRecoilState(studyData)
  const [beforStudy, setBeforStudy] = useState(false)
  const [afterStudy, setAfterStudy] = useState(false)
  
  const clickBeforBtn = () => {
    let beforId = null
    if (videoDatas.id === 1){
      beforId = studyDatas[studyDatas.length - 1]
    }else {
      beforId = studyDatas[videoDatas.id - 2]
    }
    console.log(beforId)
    setVideoDatas(beforId)
  }

  const clickAfterBtn = () => {
    
    let afterId = null
    if (videoDatas.id === studyDatas.length){
      afterId = studyDatas[0]

    }else {
      afterId = studyDatas[videoDatas.id ]
    }
    console.log(afterId)
    setVideoDatas(afterId)
  }

  const ToggleFavorites = (bools) => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/${videoDatas.id}/favorites`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {  
      const tmp = { ...videoDatas}
      tmp.favorites = bools
      setVideoDatas(tmp)

      let tmp_data = studyDatas.slice()
      tmp_data[tmp.id - 1] = tmp
      setStudyDatas(tmp_data)
    })
    .catch(err =>{
      console.log(err)
    })
  }


  return (
    <FullLayOut>
      <Drawer></Drawer>
      <DetailLayOut>
        <FlexSpan>
          <FlexSpan>
            <CategoryShowDiv>
              {videoDatas.categoryId}
            </CategoryShowDiv>
            <CategoryShowDiv>
              {videoDatas.category2Id}
            </CategoryShowDiv>
          </FlexSpan>
          <span>
            {videoDatas.seen === 1? 
              <CheckCircleOutlineSharpIcon color="success" sx={{width:`32px;`, height:`32px;`}}></CheckCircleOutlineSharpIcon>
              : null}
            {videoDatas.favorites === 1?
              <StarIcon color="warning" 
                sx={{width:`32px;`, height:`32px;`}} 
                onClick={() => ToggleFavorites(0)}></StarIcon>
              :<StarBorderIcon color="warning" 
                sx={{width:`32px;`, height:`32px;`}} 
                onClick={() => ToggleFavorites(1)}></StarBorderIcon>}
          </span>
        </FlexSpan>
        
        <TitleText>
          {videoDatas.title}
        </TitleText>
        
        <YouTubeVideo
          videoId={videoDatas.videoId}
          id={videoDatas.id}
          categoryId={videoDatas.categoryId}>
        </YouTubeVideo>
      
        <StudyDetailHr></StudyDetailHr>
        {/* <RelatedExam>
        </RelatedExam>

        <StudyDetailHr></StudyDetailHr>

        <RelatedQuestions>
        </RelatedQuestions> */}
        <ButtonBox>
          <ArrowAndLabel onClick={() => clickBeforBtn()}>
            <ArrowBackIcon sx={{width:"45px;", height : "45px;"}}></ArrowBackIcon>
            <BtnText >이전 강의</BtnText>
          </ArrowAndLabel>
          <ArrowAndLabel onClick={() => clickAfterBtn()}>
            <BtnText >다음 강의</BtnText>
            <ArrowForwardIcon sx={{width:"45px;", height : "45px;"}}></ArrowForwardIcon>
          </ArrowAndLabel>
          
        </ButtonBox>

      </DetailLayOut>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

