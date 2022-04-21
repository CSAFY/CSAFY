import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function KateImgCard({imgSrc, text}) {
  
  return (
    <CardBox>
      <CardImg
       src={imgSrc}>

      </CardImg>

      <TextContainer>
        <h4><b>John Doe</b></h4>
        <p>Architect & Engineer</p>
      </TextContainer>
    </CardBox>
  )
}
export default KateImgCard

const CardBox = styled.div`
  width: 25%;
  min-width: 200px;
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
const CardImg = styled.img`
  width:100%;
  border-radius: 5px 5px 0 0;
  src: ${(props) => props.src};
`