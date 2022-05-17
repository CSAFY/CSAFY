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

import axios from 'axios';

function StudyDetailPage() {

  const [videoDatas, setVideoDatas ]= useRecoilState(videoData)
  const studyDatas = useRecoilValue(studyData)
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


  return (
    <FullLayOut>
      <Drawer></Drawer>
      <DetailLayOut>
        <FlexSpan>
          <CategoryShowDiv>
            {videoDatas.categoryId}
          </CategoryShowDiv>
          <CategoryShowDiv>
            {videoDatas.category2Id}
          </CategoryShowDiv>
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

