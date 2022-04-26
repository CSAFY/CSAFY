import { MyiFrame,
  FullLayOut,
  DetailLayOut,
  TitleText,
  StudyDetailDiv,
  StudyDetailText,
  StudyDetailHr,
  FlexDiv,
  RelatedQuestions
 } from "./StudyDetailPage.styled"

import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoData } from "../../recoils";
import styled, { css } from "styled-components";
import ExampleCard from "../../components/atoms/studypage/ExampleCard"


function StudyDetailPage() {
  const videoDatas = useRecoilValue(videoData)
  const Url = `https://www.youtube.com/embed/${videoDatas.videoId}`


  const [quiz, setQuiz] = useState([])
  const againQuiz = quiz.map((data) => 
    
      <ExampleCard
        key={data}
        >
      </ExampleCard>
  )

  return (
    <FullLayOut>
      <DetailLayOut>
        <TitleText>
          {videoDatas.title}
        </TitleText>
        <MyiFrame
          src={Url}
        ></MyiFrame>

        <StudyDetailHr></StudyDetailHr>

        <StudyDetailDiv>
          <StudyDetailText>
            관련 모의고사
          </StudyDetailText>

          <FlexDiv>
            <ExampleCard>

            </ExampleCard>
            <ExampleCard>

            </ExampleCard>
            <ExampleCard>

            </ExampleCard>
          </FlexDiv>
          
        </StudyDetailDiv>

        <StudyDetailHr></StudyDetailHr>

        <StudyDetailDiv>
          <StudyDetailText>
            관련 질문
          </StudyDetailText>
          <RelatedQuestions>
            OSI 7계층에 대해 설명해보세요.
          </RelatedQuestions>
          <RelatedQuestions>
            OSI 7계층에 대해 설명해보세요.
          </RelatedQuestions>
          <RelatedQuestions>
            OSI 7계층에 대해 설명해보세요.
          </RelatedQuestions>
          <RelatedQuestions>
            OSI 7계층에 대해 설명해보세요.
          </RelatedQuestions>

        </StudyDetailDiv>
      </DetailLayOut>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

