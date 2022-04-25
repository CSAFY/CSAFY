import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoData } from "../../recoils";
import styled, { css } from "styled-components";


function StudyDetailPage() {
  const videoDatas = useRecoilValue(videoData)
  const Url = `https://www.youtube.com/embed/${videoDatas.videoId}`
  return (
    <FullLayOut>
      <MyiFrame
        src={Url}
      ></MyiFrame>
    </FullLayOut>
  
  )
}
export default StudyDetailPage

const MyiFrame = styled.iframe`
  
  width : 700px;
  height : 394px;
  allowfullscreen
  src : ${(props) => props.videoId}
`

const FullLayOut = styled.div`
  height : 100vh;
`