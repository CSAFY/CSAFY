import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function KateImgCard({imgSrc, text}) {
  
  return (
    <CardBox>
      <CutImg>
        <CardImg
        src={imgSrc}>

        </CardImg>

      </CutImg>
      

      <TextContainer>
        {text}
      </TextContainer>
    </CardBox>
  )
}
export default KateImgCard

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

// width: 480px;
//   height: 360px;
//   border-radius: 5px 5px 0 0;