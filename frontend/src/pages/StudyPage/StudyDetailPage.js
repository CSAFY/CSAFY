import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailHr,
 } from "./StudyDetailPage.styled"

import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoData } from "../../recoils";

import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"
import Drawer from "../../components/atoms/studypage/Drawer"




function StudyDetailPage() {
  const videoDatas = useRecoilValue(videoData)
  const Url = `https://www.youtube.com/embed/${videoDatas.videoId}`




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

