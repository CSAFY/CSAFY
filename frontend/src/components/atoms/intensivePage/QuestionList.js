import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";


function QuestionList(props) {
    
  const againToggleButton = props.categori.map((data, index) => {
    let paths = ''
    if (data.title === "키워드 학습"){
      paths = "keywordstudy"
    } else if (data.title === "4지 선다"){
      paths = "fourwaystudy"
    }else if (data.title === "OX 퀴즈"){
      paths = "oxstudy"
    }else if (data.title === "키워드 검색"){
      paths = "csafy"
    }
    return(
    <ToggleBtn
      key={index}
      onClick={() => props.selectKategorie(data)}
      able = {data.title === props.value ? "Y" : "N" }
      >
      <span style={{width:"60px"}}>
        <img src={`images/${paths}.png`} alt={paths} style={{ height:`25px`}} ></img>
      </span>
      <span style={{width:"100px"}}>
        {data.title}
      </span>
      
    </ToggleBtn>)
    
  })
  

  return (
      
      <div>
        <TagText>
          집중 학습 모드
        </TagText>
        
        {againToggleButton}
        
      </div>
  );
}
export default QuestionList;

const ToggleBtn = styled.button` 
  width : 170px;
  font-size : 17px;
  font-family : SUIT;
  font-weight : 600;
  display : flex;
  justify-content : center;
  border: 0;
  height : 60px;
  margin : 0 0 10px 0;
  align-items: center;
  padding: 0 0px 0 0px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;

  ${(props) => {
    if (props.able === "Y") {
      return css`
        {
          background-color: #42A7E8;
          color: #fff;
        }
      `;
    } else {
      return css`
        
      `;
    }
  }}
`

const TagText = styled.div`   
  
  flex-grow: 0;
  margin: 0 0 15px;
  font-family: SUIT;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #7f898f;
`