import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


function QuestionList(props) {
  // const [alignment, setAlignment] = useState('전체');

  // const handleAlignment = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  //   props.selectKategorie(event.target.value)
  // };

  
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']

  const againToggleButton = props.categori.map((data, index) => 
    
      <ToggleButton
        key={index}
        value={data.path}
        color={btncolors[index % 7]}
        >
        <Link to={`/IntensivePage/${data.path}`}>
          {data.title}
        </Link>
      </ToggleButton>
    
  )
  return (
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
  );
}
export default QuestionList;