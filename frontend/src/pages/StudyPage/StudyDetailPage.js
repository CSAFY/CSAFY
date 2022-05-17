import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailHr,
 } from "./StudyDetailPage.styled"

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoData } from "../../recoils";

import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"
import Drawer from "../../components/atoms/studypage/Drawer"
import YouTubeVideo from "../../components/atoms/studypage/YouTubeVideo"

import BasicModal from '../../components/atoms/intensivePage/BasicModal';

import axios from 'axios';

function StudyDetailPage() {

  const videoDatas = useRecoilValue(videoData)
  return (
    <FullLayOut>
      
      
      <Drawer></Drawer>


      <DetailLayOut>
        <TitleText>
          {videoDatas.title}
        </TitleText>
        

        <YouTubeVideo
          videoId={videoDatas.videoId}
          id={videoDatas.id}
          categoryId={videoDatas.categoryId}>
        </YouTubeVideo>
      
        {/* <StudyDetailHr></StudyDetailHr>
        
        <RelatedExam>
        </RelatedExam>

        <StudyDetailHr></StudyDetailHr>

        <RelatedQuestions>
        </RelatedQuestions> */}

      </DetailLayOut>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

