import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";


function QuestionList(props) {
  // const [alignment, setAlignment] = useState('전체');

  // const handleAlignment = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  //   props.selectKategorie(event.target.value)
  // };

  
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']
  const [check, setCheck] = useState(true)

  useEffect(() => {
    setCheck(false)
  }, [props.nowCate])
  
  const againToggleButton = props.categori.map((data, index) => 
  
    <ToggleButton
      component={Link}
      to={`/IntensivePage/${data.path}`}
      key={index}
      value={data.path}
      color={btncolors[index % 7]}
      sx={{ border: "solid"}}
      disabled = {check}
      >
        {data.title} 
    </ToggleButton>
  )

  return (
    <MinBox>
      <ToggleButtonGroup
        orientation="vertical"
        value={props.value}
        exclusive
        onChange={props.selectKategorie}
        aria-label="text alignment"
        color="primary"
        
      >
        
        {againToggleButton}
      </ToggleButtonGroup>
    </MinBox>
  );
}
export default QuestionList;

const MinBox = styled.div`
  min-width: 120px
  
`