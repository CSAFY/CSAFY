import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";


function QuestionList(props) {
    
  const againToggleButton = props.categori.map((data, index) => 
      // <div>
      //   {data.title}
      // </div>
    // <ToggleButton
      
    //   key={index}
    //   value={data.title}
    //   color={btncolors[index % 7]}
    //   onClick={() => props.selectKategorie(data)}
    //   sx={{ 
    //     borderRadius: "5px;",
    //     boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2);",
    //     backgroundColor: "#fff;",
    //     height:"60px;",
    //     margin:"10px 0 10px 0;"}}
    //   >
    //     {data.title} 
    // </ToggleButton>
    
    <ToggleBtn
      key={index}
      onClick={() => props.selectKategorie(data)}
      able = {data.title === props.value ? "Y" : "N" }
      >
      
      <img src={`images/${data.title}.png`} alt={data.title} style={{width:`50px`, height:`30px`}} ></img>
      {data.title}
    </ToggleBtn>
    
  )
  // useEffect(()=>{
  //   console.log(props)
  // },[props])

  return (
      // <ToggleButtonGroup
      //   orientation="vertical"
      //   value={props.nowChoice}
      //   exclusive
      //   // onChange={props.selectKategorie()}
      //   aria-label="text alignment"
      //   color="primary"
        
      //   sx={{width:"160px;", margin:"0 20px 0 0;"}}
      // >
        
      //   {againToggleButton}
      // </ToggleButtonGroup>
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
  width : 180px;
  font-size : 17px;
  font-family : SUIT;
  font-weight : 600;
  display : flex;
  justify-content : space-between;
  border: 0;
  height : 60px;
  margin : 0 0 10px 0;
  align-items: center;
  padding: 0 20px 0 20px;
  
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
        cursor: default;
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