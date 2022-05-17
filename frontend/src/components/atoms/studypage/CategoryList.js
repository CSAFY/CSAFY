import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup   from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from "react";
import { createTheme } from '@mui/material/styles';


function CategoryList(props) {
  const [alignment, setAlignment] = useState('전체');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.selectKategorie(event.target.value)
  };

  
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']

  const againToggleButton = props.categori.map((data, index) => 
    <ToggleButton
      key={index}
      value={data}
      color={btncolors[index % 7]}
      sx={{width: "120px;"}}
      >
      
      {data}
    </ToggleButton>
  )
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
      sx={{margin: "40px 0 0 0;", width: "120px;"}}
    >
      
      {againToggleButton}
    </ToggleButtonGroup>
  );
}
export default CategoryList;