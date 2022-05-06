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
import Ttt from "../../components/atoms/studypage/Ttt"



function StudyDetailPage() {
  const videoDatas = useRecoilValue(videoData)
  const Url = `https://www.youtube.com/embed/${videoDatas.videoId}`
  const datas = videoDatas.videoId


  return (
    <FullLayOut>
      
      
      <Drawer></Drawer>


      <DetailLayOut>
        <TitleText>
          {videoDatas.title}
        </TitleText>
        <MyiFrame
          src={Url}
        ></MyiFrame>

        <StudyDetailHr></StudyDetailHr>

        <YouTubeVideo
          id={datas}>
        </YouTubeVideo>

        <RelatedExam>
        </RelatedExam>

        <StudyDetailHr></StudyDetailHr>

        <RelatedQuestions>
        </RelatedQuestions>

      </DetailLayOut>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

