import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";


function QuestionList(props) {
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']
    
  const againToggleButton = props.categori.map((data, index) => 
  
    <ToggleButton
      component={Link}
      to={`/IntensivePage/${data.path}`}
      key={index}
      value={data.path}
      color={btncolors[index % 7]}
      sx={{ 
        borderRadius: "5px;",
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2);",
        backgroundColor: "#fff;",
        height:"60px;",
        margin:"10px 0 10px 0;"}}
      >
        {data.title} 
    </ToggleButton>
  )

  return (
      <ToggleButtonGroup
        orientation="vertical"
        value={props.value}
        exclusive
        onChange={() => props.selectKategorie()}
        aria-label="text alignment"
        color="primary"
        disabled = {props.disabled}
        sx={{width:"160px;", margin:"0 20px 0 0;"}}
      >
        
        {againToggleButton}
      </ToggleButtonGroup>
  );
}
export default QuestionList;

const MinBox = styled.div`
  width: 160px;
`