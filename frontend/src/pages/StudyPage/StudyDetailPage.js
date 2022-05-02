import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailDiv,
  StudyDetailText,
  StudyDetailHr,
  // RelatedQuestions
 } from "./StudyDetailPage.styled"

import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoData } from "../../recoils";
import styled, { css } from "styled-components";
import RelatedExam from "../../components/atoms/studypage/RelatedExam"
import RelatedQuestions from "../../components/atoms/studypage/RelatedQuestions"
import Drawer from "../../components/atoms/studypage/Drawer"




function StudyDetailPage() {
  const videoDatas = useRecoilValue(videoData)
  const Url = `https://www.youtube.com/embed/${videoDatas.videoId}`




  //임시 데이터
  const [ddd, setddd] = useState(
    [{ title : "OSI 7계층에 대해 설명해보세요.", answer : "src1"},
    { title : "http란?", answer : "답답1"},
    { title : "문제문제~1", answer : "답답3"},
    { title : "문제문제~1", answer : "답답4"},
    { title : "문제문제~1", answer : "답답5"},
    { title : "문제문제~1", answer : "답답6"}])


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

        <StudyDetailDiv>
          <StudyDetailText>
            관련 질문
          </StudyDetailText>
          
          <RelatedQuestions
            data = {ddd}>

          </RelatedQuestions>

        </StudyDetailDiv>
      </DetailLayOut>
      
    </FullLayOut>
  
  )
}
export default StudyDetailPage

