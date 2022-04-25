import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { videoData } from "../../../recoils";

function ThumbNailCard({imgSrc, title, videoId}) {
  const setVideo = useSetRecoilState(videoData);

  const onClickCard = () => {
    const tmp = {
      "videoId" : videoId,
      "title" : title,
      "src" : imgSrc
    }
    setVideo(tmp)
    console.log("click")
  }

  return (
    <CardBox>

      <Link to="/StudyDetailPage" onClick={onClickCard}>
        <CutImg>
          <CardImg
          src={imgSrc}>

          </CardImg>

        </CutImg>
        

        <TextContainer>
          {title}
        </TextContainer>
      </Link>
    </CardBox>
  )
}
export default ThumbNailCard

const CardBox = styled.div`
  width: 40%;
  min-width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin : 1em;
  ${
    css`
    :hover{
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    `
  }
`

const TextContainer = styled.div`
  padding: 2px 16px;
`
const CutImg = styled.div`
  width: 300px; 
  height: 166px; 
  overflow: hidden;
  
`
const CardImg = styled.img`
  width: 300px;
  margin: -29px 0px -100px 0px;
  src: ${(props) => props.src};
`
