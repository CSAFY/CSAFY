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

  const kategori = ["전체", "네트워크", "보안", "컴퓨터구조", "웹서비스", "Rma"];
  const btncolors = ['standard' , 'primary' , 'secondary' , 'error' , 'info' , 'success' , 'warning']

  const againToggleButton = kategori.map((data, index) => 
    <ToggleButton
      key={index}
      value={data}
      color={btncolors[index % 7]}
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

    >
      
      {againToggleButton}
    </ToggleButtonGroup>
  );
}
export default CategoryList;